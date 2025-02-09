<?php    


    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        header("Access-Control-Allow-Origin: *");

    
        header("Access-Control-Allow-Headers: Content-Type");

        if (!isset($_POST["username"]) || !isset($_POST["token"]) || !isset($_POST["address"]) || !isset($_POST["phone"]) || !isset($_POST["ship"])) {
            http_response_code(404);
            exit;
        }

        $username = $_POST["username"];
        $token = $_POST["token"];
        $address = $_POST["address"];
        $phone = $_POST["phone"];
        $ship = intval($_POST["ship"]);

        if (strlen($phone) !== 10 || strpos($phone, '0') !== 0) {
            http_response_code(400); // Bad Request
            exit;
        }

        $mysqli = new mysqli('bakostore-server.mysql.database.azure.com', 'root123', '@Bako123', 'btl');

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

        $stmt = $mysqli->prepare("CALL Purchase(?, ?, ?, ?)");
        $stmt->bind_param("sssi", $username, $address, $phone, $ship);
        $stmt->execute();

        $stmt->close();

        $mysqli->close();

        http_response_code(200);
    }
    else {
        http_response_code(405); // Method Not Allowed
    }
?>