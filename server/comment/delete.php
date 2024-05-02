<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST["id"]) || !isset($_POST["token"])) {
        http_response_code(400); // Bad Request
        exit;
    }

    $id = intval($_POST["id"]);
    $token = $_POST["token"];
    
    $mysqli = new mysqli('localhost', 'root', '', 'btl');
    
    if ($mysqli->connect_error) {
        die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
    }
    
    $stmt = $mysqli->prepare("SELECT * FROM users WHERE token = ? AND is_admin = 1");
    $stmt->bind_param("s", $token);

    $stmt->execute();

    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    $stmt->close();

    if (!$user) {
        if (!isset($_POST["username"])) {
            http_response_code(401); // Unauthorized
            exit;
        }
        else {
            $username = $_POST["username"];
    
            $stmt = $mysqli->prepare("SELECT DeleteComment(?, ?, ?) AS result");
            $stmt->bind_param("iss", $id, $username, $token);
    
            $stmt->execute();
    
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
    
            $stmt->close();
            $mysqli->close();
    
            if ($row['result'] === 1) {
                http_response_code(200); // OK
                exit;
            }
            else {
                http_response_code(401); // Unauthorized
                exit;
            }
        }
    }
    
    $stmt = $mysqli->prepare("DELETE FROM comments WHERE id = ?");
    $stmt->bind_param("i", $id);

    $stmt->execute();

    $stmt->close();
}
else {
    http_response_code(405); // Method Not Allowed
}
?>