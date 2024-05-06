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

    $title = $_POST['title'];
    $content = $_POST['content'];

    $cover = upload('news');
    if ($cover === false) {
        echo "Upload failed";
        return;
    }

    require '../connect.php';

    $stmt = $mysqli->prepare("INSERT INTO news (title, content, cover) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $content, $cover);

    $result = $stmt->execute();

    if ($result) {
        echo "News created successfully";
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