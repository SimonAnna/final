<?php
  require_once(__DIR__ . "/../model/config.php");
  
  $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
  $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_EMAIL);
  
  
  $salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";
  
  $hashedpassword = crypt($password, $salt);
  
  $query = $_SESSION["connection"]->query("INSERT INTO users SET "
          . "username = '$username',"
          . "password = '$hashedpassword',"
          . "salt = '$salt',");
  
  $_SESSION["name"] = $username;
  
  if($query) {
      //need for Ajax
      echo "true";
  } 
  else {
      echo "<p>" . $_SESSION["connection"]->error . "</p>";
  }