<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
      header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
      header('Access-Control-Allow-Credentials: true');
      header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }

  // Access-Control headers are received during OPTIONS requests
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
          header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

      if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
          header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

      exit(0);
  }

  $pdo = new PDO('mysql:host=localhost;dbname=wavi;', 'root', 'root');

  $query="SELECT id, nom, couleur FROM Categorie";

  $result = $pdo->query($query);
  while($row = $result->fetch(PDO::FETCH_ASSOC)){
    $rows[] = array(
    'id' =>$row['id'],
    'nom' => $row['nom'],
    'couleur' => $row['couleur']
            );
  }


  $result = json_encode($rows);

  echo $result;



 ?>
