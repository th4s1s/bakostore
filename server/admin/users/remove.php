<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = $_POST["token"];
    require '../auth.php';
    if (!auth($token)) {
        http_response_code(403); // Forbidden
        return;
    }
    
    $username = $_POST["username"];

    require '../../connect.php';

    $stmt = $mysqli->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows <= 0) {
        echo "User not found";
    }
    else {
        $stmt = $mysqli->prepare("DELETE FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);

        $result = $stmt->execute();

        if ($result) {
            echo "Deleted user successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $mysqli->error;
        }
    }

    $stmt->close();
    $mysqli->close();
}
else {
    http_response_code(405); // Method Not Allowed
}
?>