<?php
require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

function build_mailer() {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = BREVO_SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = BREVO_SMTP_USERNAME;
    $mail->Password = BREVO_SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = BREVO_SMTP_PORT;
    $mail->setFrom(MAIL_FROM_EMAIL, MAIL_FROM_NAME);
    $mail->isHTML(true);
    return $mail;
}

function render_invoice_html($order, $lines) {
    $rows = '';
    foreach ($lines['items'] as $item) {
        $rows .= '<tr><td style="padding:6px 0;">' . htmlspecialchars($item[0]) . '</td>'
               . '<td style="padding:6px 0;text-align:right;">' . htmlspecialchars(format_money($item[1])) . '</td></tr>';
    }
    $orderLabel = $order['order_type'] === 'buy' ? 'purchase' : 'rental';

    return '
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#211f2e;">
      <h2 style="color:#6C4EF5;margin-bottom:4px;">' . htmlspecialchars(BUSINESS_NAME) . '</h2>
      <p>Hi ' . htmlspecialchars($order['name']) . ', thanks for your ' . $orderLabel . '! Your payment has been received.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        ' . $rows . '
        <tr><td style="padding:6px 0;">Tax</td><td style="padding:6px 0;text-align:right;">' . htmlspecialchars(format_money($lines['tax'])) . '</td></tr>
        <tr style="font-weight:bold;border-top:1px solid #ddd;"><td style="padding:10px 0;">Total Paid</td><td style="padding:10px 0;text-align:right;">' . htmlspecialchars(format_money($lines['total'])) . '</td></tr>
      </table>
      <p style="margin-top:16px;font-size:12px;color:#8b87a0;">
        Order Reference: ' . htmlspecialchars($order['reference_id']) . '<br>
        Transaction ID: ' . htmlspecialchars($order['transaction_id'] ?: '-') . '
      </p>
      <p style="margin-top:16px;">Your detailed invoice is attached as a PDF.</p>
    </div>';
}

// Returns ['customer' => bool, 'admin' => bool, 'error' => string|null]
function send_invoice_email($order, $pdfContent) {
    $lines = build_invoice_lines($order['order_type']);

    // TEST MODE: real customer email is overridden by TEST_CUSTOMER_EMAIL /
    // TEST_ADMIN_EMAIL in secrets.php. Remove those constants before going live
    // so real customers receive their own invoice.
    $customerEmail = defined('TEST_CUSTOMER_EMAIL') && TEST_CUSTOMER_EMAIL ? TEST_CUSTOMER_EMAIL : $order['email'];
    $adminEmail = defined('TEST_ADMIN_EMAIL') && TEST_ADMIN_EMAIL ? TEST_ADMIN_EMAIL : null;

    $result = ['customer' => false, 'admin' => false, 'error' => null];

    try {
        $mail = build_mailer();
        $mail->addAddress($customerEmail, $order['name']);
        if ($adminEmail) {
            $mail->addBCC($adminEmail);
        }
        $mail->Subject = 'Your ' . BUSINESS_NAME . ' order confirmation — ' . $order['reference_id'];
        $mail->Body = render_invoice_html($order, $lines);
        $mail->AltBody = 'Thanks for your order. Total paid: ' . format_money($lines['total']) . '. Reference: ' . $order['reference_id'];
        $mail->addStringAttachment($pdfContent, 'invoice-' . $order['reference_id'] . '.pdf', 'base64', 'application/pdf');
        $mail->send();
        $result['customer'] = true;
        $result['admin'] = (bool) $adminEmail;
    } catch (PHPMailerException $e) {
        $result['error'] = $e->getMessage();
    }

    return $result;
}
