<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = $_POST["token"];
    require '../auth.php';
    if (!auth($token)) {
        http_response_code(403); // Forbidden
        return;
    }
    
    $id = $_POST['id'];

    require '../connect.php';

    $sql = "Delete FROM products WHERE id = '$id'";
    $result = $mysqli->query($sql);

    if ($result) {
        echo "Deleted product successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $mysqli->error;
    }

    $mysqli->close();
}
else {
    http_response_code(405); // Method Not Allowed
}
?>