<?php
// Copy this file to secrets.php and fill in your real values.
// secrets.php is git-ignored — never commit real keys.

// BulkPe: Dashboard -> Settings -> Developer Controls -> Copy API Key.
define('BULKPE_API_KEY', 'your_bulkpe_api_key_here');

// MySQL database (Hostinger: hPanel -> Databases -> MySQL Databases).
// If these are left undefined, api/lib/db.php falls back to a local SQLite
// file automatically, so local dev works without a MySQL server.
define('DB_HOST', 'localhost');
define('DB_PORT', 3306);
define('DB_NAME', 'your_db_name');
define('DB_USER', 'your_db_user');
define('DB_PASS', 'your_db_password');

// Brevo SMTP: Dashboard -> SMTP & API -> SMTP.
define('BREVO_SMTP_HOST', 'smtp-relay.brevo.com');
define('BREVO_SMTP_PORT', 587);
define('BREVO_SMTP_USERNAME', 'your_smtp_login');
define('BREVO_SMTP_PASSWORD', 'your_smtp_key');

// Must be a sender verified in Brevo (Senders, Domains & Dedicated IPs).
define('MAIL_FROM_EMAIL', 'orders@yourdomain.com');
define('MAIL_FROM_NAME', 'IceDigitec');

// Remove these two (or leave blank) in production so real customers get
// their own invoice instead of every order going to test inboxes.
define('TEST_CUSTOMER_EMAIL', '');
define('TEST_ADMIN_EMAIL', '');
