<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST["username"]) || !isset($_POST["password"]) || !isset($_POST["name"]) || !isset($_POST["phone"])) {
        http_response_code(400); // Bad Request
        exit;
    }

    $username = $_POST["username"];
    $password = $_POST["password"];
    $name = $_POST["name"];
    $phone = $_POST["phone"];

    if (!ctype_alnum($username) || !ctype_alnum($password) || !ctype_alnum(str_replace(' ', '', $name))) {
        http_response_code(400); // Bad Request
        exit;
    }

    if (strlen($username) < 8 || strlen($username) > 25 || strlen($password) < 8 || strlen($password) > 25) {
        http_response_code(400); // Bad Request
        exit;
    }

    if (strlen($phone) !== 10 || strpos($phone, '0') !== 0) {
        http_response_code(400); // Bad Request
        exit;
    }

    $mysqli = new mysqli('localhost', 'root', '', 'btl');

    if ($mysqli->connect_error) {
        die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
    }

    $stmt = $mysqli->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        http_response_code(409); // Conflict
        exit;
    }
    $token = hash('sha256', $username . $password . $name . $phone . time());
    $password = hash('sha256', $password);
    $stmt = $mysqli->prepare("INSERT INTO users (username, password, name, phone, token) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $username, $password, $name, $phone, $token);

    if ($stmt->execute()) {
        http_response_code(201); // Created
    }
    else {
        http_response_code(500); // Internal Server Error
    }

    $stmt->close();
    $mysqli->close();
}
else {
    http_response_code(405); // Method Not Allowed
}
?>