<?php
function auth($token) {

    header("Access-Control-Allow-Origin: *");


    header("Access-Control-Allow-Headers: Content-Type");
    
    require '../../connect.php';
    $stmt = $mysqli->prepare("SELECT * FROM users WHERE token = ?");
    $stmt->bind_param("s", $token);

    $stmt->execute();

    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    $stmt->close();

    if ($user and $user['is_admin'] == 1) {
        return true;
    }
    else {
        return false;
    }
}
?>