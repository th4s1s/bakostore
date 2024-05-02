<?php
function upload($type) {
    $target_dir = "../../../client/public/img/" . $type . "/";
    $name = hash_file('sha256', $_FILES["fileToUpload"]["tmp_name"]);
    $imageFileType = strtolower(pathinfo($_FILES["fileToUpload"]["name"], PATHINFO_EXTENSION));
    $target_file = $target_dir . $name . '.' . $imageFileType;
    $uploadOk = 1;

    if (!file_exists($target_dir)) {
        echo "No such directory exists.";
    }

    // Check if image file is a actual image or fake image
    if(isset($_POST["submit"])) {
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        if($check == false) {
            echo "File is not an image.";
            $uploadOk = 0;
        }
    }
    
    // Check file size
    if ($_FILES["fileToUpload"]["size"] > 5000000) {
        echo "File is too large.";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if($imageFileType !== "jpg" && $imageFileType !== "png" && $imageFileType !== "jpeg" && $imageFileType !== "webp") {
        echo "Only JPG, JPEG, PNG and webp files are allowed.";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.\n";
        return false;
    // if everything is ok, try to upload file
    } else {
        // Check if file already exists
        if (file_exists($target_file)) {
            return "/img" . explode("/img", $target_file)[1];
        }
        else if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            echo "File uploaded successfully.";
            return "/img" . explode("/img", $target_file)[1];
        } else {
            echo "Something went wrong.";
            return false;
        }
    }
}
?>