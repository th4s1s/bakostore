<?php    
if ($_SERVER["REQUEST_METHOD"] == "GET") {

    header("Access-Control-Allow-Origin: *");

    
    header("Access-Control-Allow-Headers: Content-Type");

    if (!isset($_GET["id"])) {
        http_response_code(404);
        exit;
    }

    $id = intval($_GET["id"]);

    require "../connect.php";

    $stmt = $mysqli->prepare("SELECT * FROM news WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();
    $news = $result->fetch_assoc();

    $stmt->close();

    $mysqli->close();

    http_response_code(200);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($news);

    exit(0);
}
?>