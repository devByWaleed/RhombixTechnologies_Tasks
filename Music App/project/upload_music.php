<?php

include 'connect.php';

if(isset($_POST['submit'])){

   $name = $_POST['name'];
   $name = filter_var($name, FILTER_SANITIZE_STRING);
   $artist = $_POST['artist'];
   $artist = filter_var($artist, FILTER_SANITIZE_STRING);
   $category = $_POST['category'];
   $category = filter_var($category, FILTER_SANITIZE_STRING);

   if(!isset($artist)){
      $artist = '';
   }

   $album = $_FILES['album']['name'];
   $album = filter_var($album, FILTER_SANITIZE_STRING);
   $album_size = $_FILES['album']['size'];
   $album_tmp_name = $_FILES['album']['tmp_name'];
   $album_folder = 'uploaded_album/'.$album;

   if(isset($album)){
      if($album_size > 2000000){
         $message[] = 'album size is too large!';
      }else{
         move_uploaded_file($album_tmp_name, $album_folder);
      }
   }else{
      $album = '';
   }

   $music = $_FILES['music']['name'];
   $music = filter_var($music, FILTER_SANITIZE_STRING);
   $music_size = $_FILES['music']['size'];
   $music_tmp_name = $_FILES['music']['tmp_name'];
   $music_folder = 'uploaded_music/'.$music;

   // Check if the music already exists in the database
   $check_music = $conn->prepare("SELECT * FROM `music_tracks` WHERE title = ? AND image = ? AND audio_file = ?");
   $check_music->execute([$name, $album, $music]);

   if($check_music->rowCount() > 0){
      $message[] = 'Music already exists in the database!';
   }else{
      // Proceed with the upload only if music does not exist
      if($music_size > 100000000){
         $message[] = 'Music size is too large!';
      }else{
         $upload_music = $conn->prepare("INSERT INTO `music_tracks`(title, composer, category, image, audio_file) VALUES(?,?,?,?,?)");
         $upload_music->execute([$name, $artist, $category, $album, $music]);
         move_uploaded_file($music_tmp_name, $music_folder);
         $message[] = 'New music uploaded!';
      }
   }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>upload music</title>

   <!-- font awesome cdn link  -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css">

   <!-- custom css file link  -->
   <link rel="stylesheet" href="css/style.css">

</head>
<body>

<?php
if(isset($message)){
   foreach($message as $message){
      echo '
      <div class="message">
         <span>'.$message.'</span>
         <i class="fas fa-times" onclick="this.parentElement.remove();"></i>
      </div>
      ';
   }
}
?>
   
<section class="form-container">

   <h3 class="heading">upload music</h3>

   <form action="" method="POST" enctype="multipart/form-data">
      <p>Music Name</p>
      <input type="text" name="name" placeholder="Enter Music Name" required maxlength="100" class="box">
      <p>Artist Name</p>
      <input type="text" name="artist" placeholder="Enter Artist Name" maxlength="100" class="box">
      <p>Music Category</p>
      <input type="text" name="category" placeholder="Enter Category" maxlength="100" class="box">
      <p>Select Music</p>
      <input type="file" name="music" class="box" required accept="audio/*">
      <p>Select Album</p>
      <input type="file" name="album" class="box" accept="image/*">
      <input type="submit" value="upload music" class="btn" name="submit">
      <a href="index.php" class="option-btn">Go To Home</a>
   </form>

</section>

</body>
</html>