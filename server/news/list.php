<?php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $mysqli = new mysqli('localhost', 'root', '', 'btl');

    if ($mysqli->connect_error) {
        die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
    }

    $result = $mysqli->query("SELECT * FROM news");

    $news = array();
    while($row = $result->fetch_assoc()) {
        $news[] = $row;
    }
    

    $mysqli->close();

    http_response_code(200);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($news);

    exit(0);
}
?>