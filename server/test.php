<?php
$mysqli = new mysqli('localhost', 'root', '', 'shop');

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

$result = $mysqli->query("SELECT * FROM products");

$products = array();
while($row = $result->fetch_assoc()) {
    $products[] = $row;
}

$res = array(
    'code' => 200,
    'data' => $products
);
$mysqli->close();

header('Content-Type: application/json; charset=utf-8');
echo json_encode($res);

exit();
?>