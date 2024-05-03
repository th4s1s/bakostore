<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $token = $_POST['token'];

    require 'connect.php';
    $stmt = $mysqli->prepare("SELECT * FROM users WHERE username = ? and token = ?");
    $stmt->bind_param("ss", $username, $token);

    $stmt->execute();

    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    $stmt->close();

    if ($user and $user['is_admin'] == 1) {
        http_response_code(200); // OK
    }
    else {
        http_response_code(401); // Unauthorized
    }
}
else {
    http_response_code(405); // Method Not Allowed
}
?>