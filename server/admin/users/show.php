<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $token = $_GET["token"];
    require '../auth.php';
    if (!auth($token)) {
        http_response_code(403); // Forbidden
        return;
    }

    require '../../connect.php';
    $stmt = $mysqli->prepare("SELECT * FROM users WHERE token != ?");
    $stmt->bind_param("s", $token);

    $stmt->execute();

    $result = $stmt->get_result();
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

    $stmt->close();
    $mysqli->close();
}
else {
    http_response_code(405); // Method Not Allowed
}
?>