<?php    
if ($_SERVER["REQUEST_METHOD"] == "GET") {

    header("Access-Control-Allow-Origin: *");

    
    header("Access-Control-Allow-Headers: Content-Type");
    
    require "../connect.php";

    $result = $mysqli->query("SELECT * FROM products ORDER BY id DESC");

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