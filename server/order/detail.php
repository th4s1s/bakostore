<?php    
    if ($_SERVER["REQUEST_METHOD"] == "GET") {

        header("Access-Control-Allow-Origin: *");

            
        header("Access-Control-Allow-Headers: Content-Type");

        if (!isset($_GET["id"])) {
            http_response_code(404);
            exit;
        }

        $id = intval($_GET["id"]);

        $mysqli = new mysqli('bakostore-server.mysql.database.azure.com', 'root123', '@Bako123', 'btl');

        if ($mysqli->connect_error) {
            die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
        }

        $stmt = $mysqli->prepare("CALL GetOrderDetail(?)");
        $stmt->bind_param("i", $id);
        $stmt->execute();

        $result = $stmt->get_result();
        $order = array();
        while($row = $result->fetch_assoc()) {
            $order[] = $row;
        }

        $stmt->close();

        $mysqli->close();

        http_response_code(200);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($order);

        exit(0);
    }
?>