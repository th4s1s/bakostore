<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "btl";

// Create connection
$mysqli = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_error . ') ' . $mysqli->connect_error);

}
?>