<?php    
    if ($_SERVER["REQUEST_METHOD"] == "GET") {

        header("Access-Control-Allow-Origin: *");

            
        header("Access-Control-Allow-Headers: Content-Type");

        if (!isset($_GET["username"])) {
            http_response_code(404);
            exit;
        }

        $username = $_GET["username"];

        $mysqli = new mysqli('bakostore-server.mysql.database.azure.com', 'root123', '@Bako123', 'btl');

        if ($mysqli->connect_error) {
            die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
        }

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