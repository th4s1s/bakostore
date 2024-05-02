<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    require '../connect.php';
    $sql = "SELECT * FROM products";
    $result = $mysqli->query($sql);
    $products = [];

    while ($row = $result->fetch_assoc()) {
        $products[] = [
            'id' => $row['id'],
            'name' => $row['name'],
            'description' => $row['description'],
            'price' => $row['price'],
            'image' => $row['image'],
            'type' => $row['type'],
            'rating' => $row['rating']
        ];
    }

    echo json_encode($products);
    $mysqli->close();
}
else {
    http_response_code(405); // Method Not Allowed
}
?>