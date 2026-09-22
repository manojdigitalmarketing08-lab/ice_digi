<?php
// BulkPe PG Collection webhook — configure in BulkPe Dashboard -> Settings ->
// Developer Controls -> Webhooks -> PG Collection with this file's public URL
// (e.g. https://yourdomain.com/api/webhook.php).
//
// BulkPe's docs don't document any signature/secret for verifying a webhook
// call actually came from them, so this endpoint never trusts the payload's
// own "status": "SUCCESS" claim. It only reads reference_id out of the body,
// then independently re-checks BulkPe's own transaction records before
// marking anything paid — the same safeguard verify_payment.php uses. That
// makes a forged POST to this URL harmless: it can only trigger a real check
// against BulkPe, never a fake payment confirmation.
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/lib/payment_confirm.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true) ?: [];
$referenceId = $input['data']['reference_id'] ?? ($input['reference_id'] ?? '');
$referenceId = trim((string) $referenceId);

if ($referenceId === '') {
    error_log('[webhook] payload missing reference_id: ' . file_get_contents('php://input'));
    http_response_code(200); // acknowledge anyway — nothing to retry
    exit;
}

$result = confirm_payment($referenceId);
error_log('[webhook] reference_id=' . $referenceId . ' verified=' . var_export($result['verified'], true)
    . ' emailed=' . var_export($result['email'] !== null, true));

// Always 200 once we've processed the callback, so BulkPe doesn't keep
// retrying a delivery we've already handled (including "not verified yet").
http_response_code(200);
echo json_encode(['received' => true]);
