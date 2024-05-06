<?php
// Create connection
$mysqli = new mysqli('bakostore-server.mysql.database.azure.com', 'root123', '@Bako123', 'btl');

// Check connection
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_error . ') ' . $mysqli->connect_error);

}
?>