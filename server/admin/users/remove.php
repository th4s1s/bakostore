<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
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