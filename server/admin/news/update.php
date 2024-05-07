<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
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

    require '../../connect.php';

    $stmt = $mysqli->prepare("UPDATE news SET title = ?, content = ?, cover = ? WHERE id = ?");
    $stmt->bind_param("sssi", $title, $content, $cover, $id);

    $result = $stmt->execute();

    if ($result) {
        echo "News updated successfully";
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