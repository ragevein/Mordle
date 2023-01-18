<?php
// (A) DB SETTINGS
error_reporting(E_ALL & ~E_NOTICE);
define("DB_HOST", "localhost");
define("DB_NAME", "4hammersforge");
define("DB_CHARSET", "utf8mb4");
define("DB_USER", "root");
define("DB_PASSWORD", "Dragonfire90!");

// // (B) CONNECT TO DATABASE
try {
    $pdo = new PDO(
      "mysql:host=" . DB_HOST. ";charset=" . DB_CHARSET . ";dbname=" . DB_NAME, DB_USER, DB_PASSWORD
    );
  } catch (Exception $ex) { exit($ex->getMessage()); }
$now = date('Y-m-d');
  // // (C) GET words //OUTER JOIN users ON mordle.m_user = users.u_id mordle.mordle.mordle.mordle.mordle.mordle.
  $stmt = $pdo->prepare("SELECT * FROM mordle  WHERE m_date = '".$now."'");
  $stmt->execute();
  $words = $stmt->fetchAll();
  foreach ($words as $u) {
    $def = str_replace("&ap", "'", $u['m_def']);
    $use = str_replace("&ap", "'", $u['m_use']);
    printf('{"id":'.$u['m_id'].', "word": "'.$u['m_word'].'", "def": "'.$def.'", "use": "'.$use.'", "auth": "'.$u['m_user'].'"}');
  }
  // need to add a catch that if now results then to randomly 
  // selected a word and update its date to todays date
  
  // (D) CLOSE DATABASE CONNECTION
  $pdo = null;
  $stmt = null;
  //"<div>[%u] %s</div>", ], 
?>