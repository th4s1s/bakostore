<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = $_POST["token"];
    require '../auth.php';
    if (!auth($token)) {
        http_response_code(403); // Forbidden
        return;
    }
    
    $id = $_POST['id'];

    require '../../connect.php';

    $stmt = $mysqli->prepare("DELETE FROM products WHERE id = ?");
    $stmt->bind_param("i", $id);

    $result = $stmt->execute();

    if ($result) {
        echo "Deleted product successfully";
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