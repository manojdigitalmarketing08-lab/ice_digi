<?php
// Shared config for all api/ endpoints: CORS-free same-origin headers, pricing table, secrets.

require_once __DIR__ . '/secrets.php';
require_once __DIR__ . '/lib/db.php';

header('Content-Type: application/json');

// Non-secret business details printed on invoices — placeholders until real
// registration/address/GST details are provided.
const BUSINESS_NAME = 'IceDigitec';
const BUSINESS_ADDRESS = 'Address on file — update in api/config.php';
const BUSINESS_GST = '';

// How long a double-submitted form (same email + order type) reuses the
// existing pending BulkPe payment link instead of creating a new one. Kept
// well under BulkPe's observed ~14-15 minute link validity (seen live on
// their hosted payment page) so we never hand back an expired link — if the
// window were as long as the link's actual TTL, a customer who reloads near
// the boundary could get a dead redirect_url with no way to pay.
const ORDER_REUSE_WINDOW_MINUTES = 8;

// Mirrors js/checkout.js pricing table — kept in sync manually since the frontend
// has no build step to share a single source of truth with PHP.
// TEST MODE: real prices below are commented out and replaced with a ₹1 total
// (tax zeroed too) so live payment testing costs almost nothing. Restore the
// real values and TAX_RATE before going live.
function get_pricing_table() {
    return [
        'rent' => ['product' => 1.00, 'config' => 0.00, 'addons' => 0.00, 'logistics' => 0.00],
        'buy'  => ['product' => 1.00, 'config' => 0.00, 'addons' => 0.00, 'logistics' => 0.00],
        // 'rent' => ['product' => 1850.00, 'config' => 310.00, 'addons' => 165.00, 'logistics' => 175.00],
        // 'buy'  => ['product' => 4200.00, 'config' => 310.00, 'addons' => 165.00, 'logistics' => 149.00],
    ];
}

const TAX_RATE = 0.00; // TEST MODE — restore to 0.08 before going live

// Server-side total calculation — never trust an amount sent from the client.
// NOTE: despite BulkPe's docs saying `amount` is in paise, live testing showed
// it's actually charged as a plain rupee amount (sending 100 charged ₹100,
// not ₹1) — so this returns rupees, not paise.
function calculate_total_amount($orderType) {
    $table = get_pricing_table();
    $orderType = ($orderType === 'buy') ? 'buy' : 'rent';
    $p = $table[$orderType];
    $subtotal = $p['product'] + $p['config'] + $p['addons'] + $p['logistics'];
    $tax = $subtotal * TAX_RATE;
    $total = $subtotal + $tax;
    return round($total, 2);
}

function site_base_url() {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    return $scheme . '://' . $host;
}

function send_json($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}
