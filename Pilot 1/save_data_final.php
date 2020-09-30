<?php
// the $_POST[] array will contain the passed in filename and data
// the directory "data" is writable by the server (chmod 777)
$filename = "data/".$_POST['filename'];
$data = $_POST['filedata'];
// write the file to disk
file_put_contents($filename, $data);

//delete partial file
$file_pointer = "data/".$_POST['deletename'];
if (!unlink($file_pointer)) {
    echo ("$file_pointer cannot be deleted due to an error");
}
else {
    echo ("$file_pointer has been deleted");
}  
?>
