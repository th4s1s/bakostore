<?php    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        header("Access-Control-Allow-Origin: *");

            
        header("Access-Control-Allow-Headers: Content-Type");

        if (!isset($_POST["username"]) || !isset($_POST["token"]) || !isset($_POST["pid"]) || !isset($_POST["amount"])) {
            http_response_code(404);
            exit;
        }

        $username = $_POST["username"];
        $token = $_POST["token"];
        $pid = intval($_POST["pid"]);
        $amount = intval($_POST["amount"]);

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

        $stmt = $mysqli->prepare("CALL UpdateCart(?, ?, ?)");
        $stmt->bind_param("sii", $username, $pid, $amount);
        $stmt->execute();

        $stmt->close();

        $mysqli->close();

        http_response_code(200); // OK
    }
    else {
        http_response_code(405); // Method Not Allowed
    }
?>