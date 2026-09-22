<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['error' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true) ?: [];
$orderType = isset($input['orderType']) ? $input['orderType'] : 'rent';
$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phoneRaw = trim($input['phone'] ?? '');

// The checkout form displays the phone number with US-style formatting
// ("(555) 123-4567") — BulkPe rejects that as an invalid phone value, so
// strip it down to digits, keeping the last 10 (a plain local mobile number).
$phoneDigits = preg_replace('/\D/', '', $phoneRaw);
$phone = substr($phoneDigits, -10);

if ($name === '' || $email === '' || strlen($phone) !== 10) {
    send_json(['error' => 'Missing or invalid customer details'], 400);
}

// Double-submit guard: a double-click, page reload, or resubmitted form
// within ORDER_REUSE_WINDOW_MINUTES for the same email + order type reuses
// the existing pending order's payment link instead of creating (and
// charging) a brand new one.
$existing = find_recent_pending_order($email, $orderType, ORDER_REUSE_WINDOW_MINUTES);
if ($existing) {
    send_json([
        'redirect_url' => $existing['redirect_url'],
        'reference_id' => $existing['reference_id'],
        'pg_order_id'  => $existing['pg_order_id'],
    ]);
}

$amount = calculate_total_amount($orderType);
$referenceId = 'icd_' . time() . '_' . bin2hex(random_bytes(4));

$base = site_base_url();
$successUrl = $base . '/checkout.html?ref=' . urlencode($referenceId) . '&type=' . urlencode($orderType);
$failureUrl = $base . '/checkout.html?ref=' . urlencode($referenceId) . '&type=' . urlencode($orderType) . '&failed=1';

$payload = json_encode([
    'reference_id' => $referenceId,
    'amount'       => $amount,
    'name'         => $name,
    'phone'        => $phone,
    'email'        => $email,
    'success_url'  => $successUrl,
    'failure_url'  => $failureUrl,
]);

$ch = curl_init('https://api.bulkpe.in/client/createPGCollection');
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
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) {
    send_json(['error' => 'Could not reach BulkPe', 'detail' => $curlError], 502);
}

$result = json_decode($response, true);

if ($httpCode >= 400 || empty($result['status']) || empty($result['data']['redirectUrl'])) {
    error_log('[create_order] BulkPe rejected payload=' . $payload . ' httpCode=' . $httpCode . ' response=' . $response);
    send_json(['error' => 'BulkPe order creation failed', 'detail' => $result], $httpCode >= 400 ? $httpCode : 502);
}

create_order_record($referenceId, $orderType, $name, $email, $phone, $amount, $result['data']['pg_order_id'], $result['data']['redirectUrl']);

send_json([
    'redirect_url' => $result['data']['redirectUrl'],
    'reference_id' => $result['data']['reference_id'],
    'pg_order_id'  => $result['data']['pg_order_id'],
]);
