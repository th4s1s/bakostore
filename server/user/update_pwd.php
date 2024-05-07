<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        header("Access-Control-Allow-Origin: *");

        header("Access-Control-Allow-Headers: Content-Type");
        
        if (!isset($_POST["token"]) || !isset($_POST["newpwd"]) || !isset($_POST["oldpwd"])){
            http_response_code(404);
            exit;
        }

        $token = $_POST["token"];
        $newpwd = $_POST["newpwd"];
        $oldpwd = $_POST["oldpwd"];

        require "../connect.php";

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