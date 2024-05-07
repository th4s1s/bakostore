<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
<<<<<<< Updated upstream
    $mysqli = new mysqli('localhost', 'root', '', 'btl');

    if ($mysqli->connect_error) {
        die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
    }
=======

    header("Access-Control-Allow-Origin: *");

    
    header("Access-Control-Allow-Headers: Content-Type");
    
    require '../connect.php';
>>>>>>> Stashed changes

    $result = $mysqli->query("SELECT * FROM products");

    $products = array();
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    $mysqli->close();

    http_response_code(200);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($products);

    exit(0);
}
?>