<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (!isset($_POST["pid"]) || !isset($_POST["username"]) || !isset($_POST["comment"]) || !isset($_POST["rating"]) || !isset($_POST["token"])) {
            http_response_code(400); // Bad Request
            exit;
        }

        $pid = intval($_POST["pid"]);
        $username = $_POST["username"];
        $comment = $_POST["comment"];
        $rating = intval($_POST["rating"]);
        $token = $_POST["token"];

        if (strlen($comment) < 1 || strlen($comment) > 500) {
            http_response_code(400); // Bad Request
            exit;
        }

        if ($rating < 1 || $rating > 5) {
            http_response_code(400); // Bad Request
            exit;
        }

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

        $stmt = $mysqli->prepare("INSERT INTO comments (pid, username, comment, rating) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("issi", $pid, $username, $comment, $rating);

        $stmt->execute();

        $stmt->close();
        $mysqli->close();

        http_response_code(201); // Created
        exit;
    }
    else {
        http_response_code(405); // Method Not Allowed
    }
?>