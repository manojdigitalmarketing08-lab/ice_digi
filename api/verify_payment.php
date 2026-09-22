<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/lib/payment_confirm.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['error' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true) ?: [];
$referenceId = isset($input['reference_id']) ? trim($input['reference_id']) : '';

if ($referenceId === '') {
    send_json(['verified' => false, 'error' => 'Missing reference id'], 400);
}

$result = confirm_payment($referenceId);
send_json($result, $result['verified'] ? 200 : 400);
