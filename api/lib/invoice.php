<?php
require_once __DIR__ . '/fpdf/fpdf.php';

// Recomputes the same line items calculate_total_amount() charged, from the
// order_type stored on the order — keeps the invoice and the actual charge
// impossible to drift apart.
function build_invoice_lines($orderType) {
    $table = get_pricing_table();
    $orderType = ($orderType === 'buy') ? 'buy' : 'rent';
    $p = $table[$orderType];
    $subtotal = $p['product'] + $p['config'] + $p['addons'] + $p['logistics'];
    $tax = $subtotal * TAX_RATE;
    $total = $subtotal + $tax;

    return [
        'items' => [
            [$orderType === 'buy' ? 'Product Price' : 'Rental (1 day)', $p['product']],
            ['Configuration', $p['config']],
            ['Add-ons', $p['addons']],
            [$orderType === 'buy' ? 'Shipping' : 'Delivery & Pickup', $p['logistics']],
        ],
        'subtotal' => $subtotal,
        'tax'      => $tax,
        'total'    => $total,
    ];
}

function format_money($n) {
    return 'Rs. ' . number_format($n, 2);
}

function generate_invoice_pdf($order) {
    $lines = build_invoice_lines($order['order_type']);

    $pdf = new FPDF();
    $pdf->AddPage();

    $pdf->SetFont('Arial', 'B', 18);
    $pdf->Cell(0, 10, BUSINESS_NAME, 0, 1);
    $pdf->SetFont('Arial', '', 9);
    $pdf->Cell(0, 5, BUSINESS_ADDRESS, 0, 1);
    if (BUSINESS_GST) {
        $pdf->Cell(0, 5, 'GSTIN: ' . BUSINESS_GST, 0, 1);
    }
    $pdf->Ln(6);

    $pdf->SetFont('Arial', 'B', 14);
    $pdf->Cell(0, 8, 'Invoice', 0, 1);
    $pdf->SetFont('Arial', '', 10);
    $pdf->Cell(0, 6, 'Invoice #: ' . $order['reference_id'], 0, 1);
    $pdf->Cell(0, 6, 'Date: ' . date('d M Y', strtotime($order['paid_at'] ?: $order['created_at'])), 0, 1);
    $pdf->Cell(0, 6, 'Order Type: ' . ($order['order_type'] === 'buy' ? 'Purchase' : 'Rental'), 0, 1);
    $pdf->Ln(4);

    $pdf->SetFont('Arial', 'B', 10);
    $pdf->Cell(0, 6, 'Billed To:', 0, 1);
    $pdf->SetFont('Arial', '', 10);
    $pdf->Cell(0, 6, $order['name'], 0, 1);
    $pdf->Cell(0, 6, $order['email'], 0, 1);
    $pdf->Cell(0, 6, $order['phone'], 0, 1);
    $pdf->Ln(6);

    $pdf->SetFont('Arial', 'B', 10);
    $pdf->Cell(120, 8, 'Description', 1);
    $pdf->Cell(60, 8, 'Amount', 1, 1, 'R');
    $pdf->SetFont('Arial', '', 10);
    foreach ($lines['items'] as $item) {
        $pdf->Cell(120, 8, $item[0], 1);
        $pdf->Cell(60, 8, format_money($item[1]), 1, 1, 'R');
    }
    $pdf->Cell(120, 8, 'Tax', 1);
    $pdf->Cell(60, 8, format_money($lines['tax']), 1, 1, 'R');
    $pdf->SetFont('Arial', 'B', 10);
    $pdf->Cell(120, 8, 'Total Paid', 1);
    $pdf->Cell(60, 8, format_money($lines['total']), 1, 1, 'R');

    $pdf->Ln(8);
    $pdf->SetFont('Arial', '', 9);
    $pdf->Cell(0, 6, 'Transaction ID: ' . ($order['transaction_id'] ?: '-'), 0, 1);
    $pdf->Cell(0, 6, 'BulkPe Order ID: ' . ($order['pg_order_id'] ?: '-'), 0, 1);

    return $pdf->Output('S'); // return raw PDF bytes as a string
}
