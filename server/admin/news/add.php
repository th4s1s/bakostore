<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = $_POST["token"];
    require '../auth.php';
    if (!auth($token)) {
        http_response_code(403); // Forbidden
        return;
    }
    
    require '../upload.php';

    $title = $_POST['title'];
    $content = $_POST['content'];

    $cover = upload('news');
    if ($cover === false) {
        echo "Upload failed";
        return;
    }

    require '../connect.php';

    $sql = "INSERT INTO news (title, content, cover) VALUES ('$title', '$content', '$cover')";
    $result = $mysqli->query($sql);

    if ($result) {
        echo "News created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $mysqli->error;
    }

    $mysqli->close();
}
else {
    http_response_code(405); // Method Not Allowed
}
?>