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
    
    $username = $_POST["username"];

    require '../connect.php';

    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $mysqli->query($sql);

    if ($result->num_rows <= 0) {
        echo "User not found";
    }
    else {
        $sql = "DELETE FROM users WHERE username = '$username'";
        $result = $mysqli->query($sql);

        if ($result) {
            echo "Deleted user successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $mysqli->error;
        }
    }

    $mysqli->close();
}
else {
    http_response_code(405); // Method Not Allowed
}
?>