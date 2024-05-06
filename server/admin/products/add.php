<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    header("Access-Control-Allow-Origin: *");

    header("Access-Control-Allow-Headers: Content-Type");

    $token = $_POST["token"];
    require '../auth.php';
    if (!auth($token)) {
        http_response_code(403); // Forbidden
        return;
    }
    
    require '../upload.php';

    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];

    $image = upload('product');
    if ($image === false) {
        http_response_code(500); // Internal Server Error
        return;
    }

    $type = $_POST['type'];

    require '../connect.php';

    $sql = "INSERT INTO products (name, description, price, image, type) VALUES ('$name', '$description', '$price', '$image', '$type')";
    $result = $mysqli->query($sql);

    if ($result) {
        echo "Product created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $mysqli->error;
    }

    $mysqli->close();
}
else {
    http_response_code(405); // Method Not Allowed
}
?>