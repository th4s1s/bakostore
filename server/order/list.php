<?php    
if ($_SERVER["REQUEST_METHOD"] == "GET") {

    header("Access-Control-Allow-Origin: *");

    
    header("Access-Control-Allow-Headers: Content-Type");

    if(!isset($_GET["username"])) {
        http_response_code(404);
        exit;
    }

    $username = $_GET["username"];

    require "../connect.php";

    $stmt = $mysqli->prepare("CALL GetOrderList(?)");
    $stmt->bind_param("s", $username);
    $stmt->execute();

    $result = $stmt->get_result();
    $orders = array();
    while($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }

    $stmt->close();

    $mysqli->close();

    http_response_code(200);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($orders);

    exit(0);
}
?>