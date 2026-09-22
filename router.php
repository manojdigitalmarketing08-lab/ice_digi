<?php
// Dev-only router for PHP's built-in server: `php -S localhost:8000 router.php`
// Serves static files (html/css/js/images) as-is and lets .php files execute
// normally, so api/*.php works the same way it does on the real Hostinger host.

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$path = realpath(__DIR__ . $uri);

// Block traversal outside the project root.
if ($path === false || strpos($path, realpath(__DIR__)) !== 0) {
    http_response_code(404);
    exit('Not found');
}

if (is_dir($path)) {
    $index = rtrim($path, '/\\') . '/index.html';
    if (is_file($index)) {
        readfile($index);
        return true;
    }
    http_response_code(404);
    exit('Not found');
}

if (is_file($path) && pathinfo($path, PATHINFO_EXTENSION) !== 'php') {
    return false; // let the built-in server serve the static file directly
}

if (is_file($path)) {
    return require $path; // execute .php files (e.g. api/*.php)
}

http_response_code(404);
exit('Not found');
