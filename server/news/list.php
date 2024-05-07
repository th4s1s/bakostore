<?php    
if ($_SERVER["REQUEST_METHOD"] == "GET") {

    header("Access-Control-Allow-Origin: *");

    
    header("Access-Control-Allow-Headers: Content-Type");

    require "../connect.php";

    $result = $mysqli->query("SELECT * FROM news ORDER BY id DESC");

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