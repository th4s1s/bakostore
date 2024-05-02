<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if(!isset($_GET["username"])) {
        http_response_code(404);
        exit;
    }

    $username = $_GET["username"];

    $mysqli = new mysqli('localhost', 'root', '', 'btl');

    if ($mysqli->connect_error) {
        die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
    }

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