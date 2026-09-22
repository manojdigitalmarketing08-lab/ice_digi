<?php
// Order store for verify_payment.php / webhook.php / create_order.php / the
// invoice mailer.
//
// Uses MySQL when DB_HOST (and friends) are defined in secrets.php — that's
// the real setup on Hostinger. When those constants are absent (e.g. running
// locally via router.php with no MySQL server at hand), it falls back to a
// local SQLite file automatically, so local testing keeps working unchanged.

function get_db() {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    if (defined('DB_HOST')) {
        $port = defined('DB_PORT') ? DB_PORT : 3306;
        $dsn = 'mysql:host=' . DB_HOST . ';port=' . $port . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        $pdo = new PDO($dsn, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->exec("CREATE TABLE IF NOT EXISTS orders (
            reference_id   VARCHAR(64) PRIMARY KEY,
            order_type     VARCHAR(16) NOT NULL,
            name           VARCHAR(190) NOT NULL,
            email          VARCHAR(190) NOT NULL,
            phone          VARCHAR(20) NOT NULL,
            amount         DECIMAL(10,2) NOT NULL,
            pg_order_id    VARCHAR(64),
            transaction_id VARCHAR(64),
            redirect_url   VARCHAR(500),
            status         VARCHAR(16) NOT NULL DEFAULT 'pending',
            created_at     VARCHAR(32) NOT NULL,
            paid_at        VARCHAR(32)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
        return $pdo;
    }

    // Local dev fallback — no MySQL credentials configured.
    $dbFile = __DIR__ . '/../data/orders.sqlite';
    $dataDir = dirname($dbFile);
    if (!is_dir($dataDir)) {
        mkdir($dataDir, 0755, true);
    }
    $pdo = new PDO('sqlite:' . $dbFile);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("CREATE TABLE IF NOT EXISTS orders (
        reference_id  TEXT PRIMARY KEY,
        order_type    TEXT NOT NULL,
        name          TEXT NOT NULL,
        email         TEXT NOT NULL,
        phone         TEXT NOT NULL,
        amount        REAL NOT NULL,
        pg_order_id   TEXT,
        transaction_id TEXT,
        redirect_url  TEXT,
        status        TEXT NOT NULL DEFAULT 'pending',
        created_at    TEXT NOT NULL,
        paid_at       TEXT
    )");
    return $pdo;
}

function create_order_record($referenceId, $orderType, $name, $email, $phone, $amount, $pgOrderId, $redirectUrl) {
    $stmt = get_db()->prepare("INSERT INTO orders
        (reference_id, order_type, name, email, phone, amount, pg_order_id, redirect_url, status, created_at)
        VALUES (:ref, :type, :name, :email, :phone, :amount, :pg, :redirect, 'pending', :created)");
    $stmt->execute([
        ':ref'      => $referenceId,
        ':type'     => $orderType,
        ':name'     => $name,
        ':email'    => $email,
        ':phone'    => $phone,
        ':amount'   => $amount,
        ':pg'       => $pgOrderId,
        ':redirect' => $redirectUrl,
        ':created'  => gmdate('c'),
    ]);
}

function get_order_record($referenceId) {
    $stmt = get_db()->prepare("SELECT * FROM orders WHERE reference_id = :ref");
    $stmt->execute([':ref' => $referenceId]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row ?: null;
}

// Double-submit guard: if this customer already has a still-pending order for
// the same order type placed in the last $windowMinutes, reuse its payment
// link instead of creating a brand new BulkPe order (and a brand new charge)
// for an accidental double-click, page reload, or resubmitted form.
function find_recent_pending_order($email, $orderType, $windowMinutes) {
    $cutoff = gmdate('c', time() - $windowMinutes * 60);
    $stmt = get_db()->prepare("SELECT * FROM orders
        WHERE email = :email AND order_type = :type AND status = 'pending' AND created_at > :cutoff
        ORDER BY created_at DESC LIMIT 1");
    $stmt->execute([':email' => $email, ':type' => $orderType, ':cutoff' => $cutoff]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row ?: null;
}

// Atomic claim: only succeeds (returns true) for whichever caller — the
// browser-redirect verify or the webhook — gets there first. The other one
// sees rowCount() === 0 and knows the order was already handled, so it skips
// re-sending the invoice email.
function mark_order_paid($referenceId, $transactionId) {
    $stmt = get_db()->prepare("UPDATE orders SET status = 'paid', transaction_id = :txn, paid_at = :paid
        WHERE reference_id = :ref AND status != 'paid'");
    $stmt->execute([':txn' => $transactionId, ':paid' => gmdate('c'), ':ref' => $referenceId]);
    return $stmt->rowCount() === 1;
}
