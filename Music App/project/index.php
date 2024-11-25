<?php

include 'connect.php';

?>

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Home</title>

   <!-- Font Awesome CDN link -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css">

   <!-- Custom CSS file link -->
   <link rel="stylesheet" href="css/style.css">

</head>
<body>

<section class="playlist">

   <h3 class="heading">Music Playlist</h3>
   
   <!-- Search and Filter Form -->
   <form action="" method="GET" class="search-form">
      <input type="text" name="search" placeholder="Search By Name Or Artist..." class="box" value="<?= isset($_GET['search']) ? htmlspecialchars($_GET['search']) : '' ?>">
      <select name="category" class="box">
         <option value="">Choose Category:</option>
         <?php
         // Fetch distinct categories for the dropdown
         $categories_query = $conn->prepare("SELECT DISTINCT category FROM `music_tracks`");
         $categories_query->execute();
         if ($categories_query->rowCount() > 0) {
            while ($category_row = $categories_query->fetch(PDO::FETCH_ASSOC)) {
               $selected = (isset($_GET['category']) && $_GET['category'] == $category_row['category']) ? 'selected' : '';
               echo '<option value="' . htmlspecialchars($category_row['category']) . '" ' . $selected . '>' . htmlspecialchars($category_row['category']) . '</option>';
            }
         }
         ?>
      </select>
      <button type="submit" class="filter_btn">Filter</button>
   </form>

   <div class="box-container">

   <?php
      // Fetch user inputs
      $search = isset($_GET['search']) ? filter_var($_GET['search'], FILTER_SANITIZE_STRING) : '';
      $category = isset($_GET['category']) ? filter_var($_GET['category'], FILTER_SANITIZE_STRING) : '';

      // Prepare SQL query with optional filters
      $query = "SELECT * FROM `music_tracks` WHERE 1";

      if ($search) {
         $query .= " AND (`title` LIKE :search OR `composer` LIKE :search)";
      } elseif ($category) {
         $query .= " AND `category` = :category";
      }

      $select_songs = $conn->prepare($query);

      // Bind values dynamically
      if ($search) {
         $select_songs->bindValue(':search', '%' . $search . '%');
      } elseif ($category) {
         $select_songs->bindValue(':category', $category);
      }

      // Execute query
      $select_songs->execute();

      // Display results
      if ($select_songs->rowCount() > 0) {
         while ($fetch_song = $select_songs->fetch(PDO::FETCH_ASSOC)) {
   ?>

   <div class="box">
      <?php if ($fetch_song['image'] != '') { ?>
         <img src="uploaded_album/<?= htmlspecialchars($fetch_song['image']); ?>" alt="" class="album">
      <?php } else { ?>
         <img src="images/disc.png" alt="" class="album">
      <?php } ?>
      <div>
         <div class="name"><?= htmlspecialchars($fetch_song['title']); ?></div>
         <em class="artist"><?= htmlspecialchars($fetch_song['composer']); ?></em>
         <p><strong class="artist"><?= htmlspecialchars($fetch_song['category']); ?></strong></p>
      </div>
      <div class="flex">
         <div class="play" data-src="uploaded_music/<?= htmlspecialchars($fetch_song['audio_file']); ?>"><i class="fas fa-play"></i></div>
         <!-- <a href="uploaded_music/<?= htmlspecialchars($fetch_song['audio_file']); ?>" download><i class="fas fa-download"></i><span>download</span></a> -->
      </div>
   </div>
   <?php
         }
      } else {
         echo '<p class="empty">No music found!</p>';
      }
   ?>

   </div>
   
   <div class="box more-btn">
      <a href="upload_music.php" class="btn">Upload Music</a>
   </div>

</section>

<div class="music-player">

   <i class="fas fa-times" id="close"></i>

   <div class="box">
      <img src="" class="album" alt="">
      <div class="name"></div>
      <div class="artist"></div>
      <audio src="" controls class="music"></audio>
   </div>

</div>

<!-- Custom JS file link -->
<script src="js/script.js"></script>
   
</body>
</html>
