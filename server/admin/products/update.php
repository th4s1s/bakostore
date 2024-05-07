<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = $_POST["token"];
    require '../auth.php';
    if (!auth($token)) {
        http_response_code(403); // Forbidden
        return;
    }
    
    require '../upload.php';

    $id = $_POST['id'];
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];

    $image = upload('product');
    if ($image === false) {
        $image = $_POST['image'];
    }

    $type = $_POST['type'];

    require '../../connect.php';

    $stmt = $mysqli->prepare("UPDATE products SET name = ?, description = ?, price = ?, image = ?, type = ? WHERE id = ?");
    $stmt->bind_param("ssissi", $name, $description, $price, $image, $type, $id);

    $result = $stmt->execute();

    if ($result) {
        echo "Product updated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $mysqli->error;
    }

    $stmt->close();
    $mysqli->close();
}
else {
    http_response_code(405); // Method Not Allowed
}
?>