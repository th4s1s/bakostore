<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $token = $_GET["token"];
    require '../auth.php';
    if (!auth($token)) {
        http_response_code(403); // Forbidden
        return;
    }

    require '../connect.php';
    $sql = "SELECT * FROM users WHERE is_admin = 0";
    $result = $mysqli->query($sql);
    $users = [];

    while ($row = $result->fetch_assoc()) {
        $users[] = [
            'username' => $row['username'],
            'password' => $row['password'],
            'name' => $row['name'],
            'phone' => $row['phone'],
            'token' => $row['token'],
            'avatar' => $row['avatar']
        ];
    }

    echo json_encode($users);
    $mysqli->close();
}
else {
    http_response_code(405); // Method Not Allowed
}
?>