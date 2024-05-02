<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST["username"]) || !isset($_POST["password"])) {
        http_response_code(400); // Bad Request
        exit;
    }

    $username = $_POST["username"];
    $password = $_POST["password"];

    if (!ctype_alnum($username) || !ctype_alnum($password)) {
        http_response_code(400); // Bad Request
        exit;
    }

    if (strlen($username) < 8 || strlen($username) > 25 || strlen($password) < 8 || strlen($password) > 25) {
        http_response_code(400); // Bad Request
        exit;
    }

    $mysqli = new mysqli('localhost', 'root', '', 'btl');

    if ($mysqli->connect_error) {
        die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
    }

    $password = hash('sha256', $password);
    $stmt = $mysqli->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);

    $stmt->execute();

    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    $stmt->close();
    $mysqli->close();

    if ($user) {
        http_response_code(200); // OK
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($user);
    }
    else {
        http_response_code(404); // Not Found
    }

    exit;
}
else {
    http_response_code(405); // Method Not Allowed
}
?>