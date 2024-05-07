<?php
// Create connection
$mysqli = new mysqli('localhost', 'root', '', 'btl');

// Check connection
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_error . ') ' . $mysqli->connect_error);

}
?>