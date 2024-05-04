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

    if (!ctype_alnum($username) || !ctype_alnum(str_replace(' ', '', $name))) {
        http_response_code(400); // Bad Request
        exit;
    }

    require '../connect.php';

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
    $stmt = $mysqli->prepare("INSERT INTO users (username, password, name, phone, token, is_admin) VALUES (?, ?, ?, ?, ?, 1)");
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
