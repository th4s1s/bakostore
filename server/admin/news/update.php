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

    $id = $_POST['id'];
    $title = $_POST['title'];
    $content = $_POST['content'];

    $cover = upload('news');
    if ($cover === false) {
        $cover = $_POST['cover'];
    }

    require '../connect.php';

    $sql = "UPDATE news SET title = '$title', content = '$content', cover = '$cover' WHERE id = '$id'";
    $result = $mysqli->query($sql);

    if ($result) {
        echo "News updated successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $mysqli->error;
    }

    $mysqli->close();
}
else {
    http_response_code(405); // Method Not Allowed
}
?>