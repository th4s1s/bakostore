<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];

    require '../connect.php';

    $sql = "Delete FROM news WHERE id = '$id'";
    $result = $mysqli->query($sql);

    if ($result) {
        echo "Deleted news successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $mysqli->error;
    }

    $mysqli->close();
}
else {
    http_response_code(405); // Method Not Allowed
}
?>