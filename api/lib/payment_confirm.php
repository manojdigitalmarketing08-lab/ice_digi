<?php
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/invoice.php';
require_once __DIR__ . '/mailer.php';

// Shared by verify_payment.php (browser redirect back from BulkPe) and
// webhook.php (BulkPe's server-to-server callback). Never trusts a caller's
// claim that a payment succeeded — always re-checks BulkPe's own transaction
// records by reference_id. Safe to call twice for the same reference_id: the
// second caller sees the order already 'paid' and skips re-sending the email.
//
// Returns ['verified' => bool, 'reference_id', 'transaction_id', 'email' => array|null, 'error' => string|null]
function confirm_payment($referenceId) {
    $order = get_order_record($referenceId);
    if (!$order) {
        return ['verified' => false, 'reference_id' => $referenceId, 'error' => 'Unknown order reference'];
    }

    // Already confirmed by the other path (browser redirect vs webhook) —
    // nothing left to do, and no second email to send.
    if ($order['status'] === 'paid') {
        return ['verified' => true, 'reference_id' => $referenceId, 'transaction_id' => $order['transaction_id'], 'email' => null];
    }

    $payload = json_encode(['reference_id' => $referenceId]);
    $ch = curl_init('https://api.bulkpe.in/client/listAllUpiRoutingTransaction');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . BULKPE_API_KEY,
        ],
    ]);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false) {
        return ['verified' => false, 'reference_id' => $referenceId, 'error' => 'Could not reach BulkPe'];
    }

    $result = json_decode($response, true);
    if ($httpCode >= 400 || empty($result['status'])) {
        return ['verified' => false, 'reference_id' => $referenceId, 'error' => 'BulkPe lookup failed', 'detail' => $result];
    }

    $transactions = $result['data'] ?? [];
    if (isset($transactions['data']) && is_array($transactions['data'])) {
        $transactions = $transactions['data'];
    }

    $match = null;
    foreach ((is_array($transactions) ? $transactions : []) as $txn) {
        if (isset($txn['reference_id']) && $txn['reference_id'] === $referenceId) {
            $match = $txn;
            break;
        }
    }

    if (!$match || !isset($match['status']) || strtoupper($match['status']) !== 'SUCCESS') {
        return ['verified' => false, 'reference_id' => $referenceId, 'error' => 'Payment not confirmed', 'detail' => $match];
    }

    $transactionId = $match['transaction_id'] ?? null;

    // Atomic claim — if this returns false, the other path (webhook vs
    // browser redirect) already won the race and already sent the email.
    $claimed = mark_order_paid($referenceId, $transactionId);
    if (!$claimed) {
        return ['verified' => true, 'reference_id' => $referenceId, 'transaction_id' => $transactionId, 'email' => null];
    }

    $order = get_order_record($referenceId); // reload with paid_at/transaction_id set
    $pdf = generate_invoice_pdf($order);
    $emailResult = send_invoice_email($order, $pdf);

    return ['verified' => true, 'reference_id' => $referenceId, 'transaction_id' => $transactionId, 'email' => $emailResult];
}
