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
    
    $id = $_POST['id'];

    require '../connect.php';

    $stmt = $mysqli->prepare("DELETE FROM news WHERE id = ?");
    $stmt->bind_param("i", $id);

    $result = $stmt->execute();

    if ($result) {
        echo "Deleted news successfully";
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