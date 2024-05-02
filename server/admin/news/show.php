<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    require '../connect.php';
    $sql = "SELECT * FROM news";
    $result = $mysqli->query($sql);
    $news = [];

    while ($row = $result->fetch_assoc()) {
        $news[] = [
            'id' => $row['id'],
            'title' => $row['title'],
            'content' => $row['content'],
            'date' => $row['date'],
            'cover' => $row['cover']
        ];
    }

    echo json_encode($news);
    $mysqli->close();
}
else {
    http_response_code(405); // Method Not Allowed
}
?>