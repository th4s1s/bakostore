<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require '../upload.php';

    $id = $_POST['id'];
    $title = $_POST['title'];
    $content = $_POST['content'];

    $cover = upload('news');
    if ($image === false) {
        http_response_code(500); // Internal Server Error
        return;
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