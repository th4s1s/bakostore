<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (!isset($_POST["token"]) || !isset($_POST["newpwd"]) || !isset($_POST["oldpwd"])){
            http_response_code(404);
            exit;
        }

        $token = $_POST["token"];
        $newpwd = $_POST["newpwd"];
        $oldpwd = $_POST["oldpwd"];

        $mysqli = new mysqli('localhost', 'root', '', 'btl');

        if ($mysqli->connect_error) {
            die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
        }

        $stmt = $mysqli->prepare("SELECT * FROM users WHERE token = ?");
        $stmt->bind_param("s", $token);
        $stmt->execute();

        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        $stmt->close();

        if (!$user || $user["password"] != $oldpwd) {
            http_response_code(401); // Unauthorized
            exit;
        }

        $stmt = $mysqli->prepare("UPDATE users SET password = ? WHERE token = ?");
        $stmt->bind_param("ss", $newpwd, $token);
        $stmt->execute();

        $stmt->close();

        $mysqli->close();

        http_response_code(200); // OK
    }
    else {
        http_response_code(405); // Method Not Allowed
    }
?>