<?php
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        if (!isset($_GET["username"])) {
            http_response_code(404);
            exit;
        }

        $username = $_GET["username"];

<<<<<<< Updated upstream
        $mysqli = new mysqli('localhost', 'root', '', 'btl');

        if ($mysqli->connect_error) {
            die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
        }
=======
        require '../connect.php';
>>>>>>> Stashed changes

        $stmt = $mysqli->prepare("CALL GetCart(?)");
        $stmt->bind_param("s", $username);
        $stmt->execute();

        $result = $stmt->get_result();
        $cart = array();
        while($row = $result->fetch_assoc()) {
            $cart[] = $row;
        }

        $stmt->close();

        $mysqli->close();

        http_response_code(200);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($cart);
    }
    else {
        http_response_code(405); // Method Not Allowed
    }
?>