<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (!isset($_POST["username"]) || !isset($_POST["token"]) || !isset($_POST["name"]) || !isset($_POST["avatar"]) || !isset($_POST["phone"])) {
            http_response_code(404);
            exit;
        }

        require "upload.php";
        $avatar = upload("user");
        if ($avatar === false) {
            $avatar = $_POST["avatar"];
        }

        $username = $_POST["username"];
        $token = $_POST["token"];
        $name = $_POST["name"];
        $phone = $_POST["phone"];

        $mysqli = new mysqli('localhost', 'root', '', 'btl');

        if ($mysqli->connect_error) {
            die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
        }

        $stmt = $mysqli->prepare("SELECT * FROM users WHERE username = ? AND token = ?");
        $stmt->bind_param("ss", $username, $token);
        $stmt->execute();

        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        $stmt->close();

        if (!$user) {
            http_response_code(401); // Unauthorized
            exit;
        }

        $stmt = $mysqli->prepare("UPDATE users SET name = ?, phone = ?, avatar = ? WHERE username = ? and token = ?");
        $stmt->bind_param("sssss", $name, $phone, $avatar, $username, $token);
        $stmt->execute();

        $stmt->close();

        $stmt = $mysqli->prepare("SELECT * FROM users WHERE username = ? AND token = ?");
        $stmt->bind_param("ss", $username, $token);

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
    }
    else {
        http_response_code(405); // Method Not Allowed
    }
?>