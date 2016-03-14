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


  $postdata = file_get_contents("php://input");
  if (isset($postdata)) {
    $request = json_decode($postdata);
    $id = $request->id;
    $tous = $request->tous;
  }

  $pdo = new PDO('mysql:host=localhost;dbname=wavi;', 'root', 'root');

  if ($tous == 0) {

    $query = "SELECT contenu, prenom, date, avatar FROM Utilisateur, Commentaire, ecrit, Lieu
    WHERE Commentaire.id = ecrit.id_Commentaire AND Utilisateur.id = ecrit.id
    AND Commentaire.id_Lieu = Lieu.id AND Commentaire.id_Lieu = '$id' ORDER BY Commentaire.id DESC LIMIT 3";

  }else {

    $query = "SELECT contenu, prenom, date, avatar FROM Utilisateur, Commentaire, ecrit, Lieu
    WHERE Commentaire.id = ecrit.id_Commentaire AND Utilisateur.id = ecrit.id
    AND Commentaire.id_Lieu = Lieu.id AND Commentaire.id_Lieu = '$id' ORDER BY Commentaire.id DESC";

  }



  $result = $pdo->query($query);
  while($row = $result->fetch(PDO::FETCH_ASSOC)){
    $rows[] = array(
    'contenu' =>$row['contenu'],
    'prenom' => $row['prenom'],
    'date' => $row['date'],
    'avatar' => $row['avatar']
            );
  }


  $result = json_encode($rows);

  if($result == 'null'){
      echo '[{"contenu":"Aucun commentaire",
        "avatar":"http://i.skyrock.net/8187/35988187/pics/2430746741_small_1.jpg",
      "prenom":"Oups"}]';
  }else{
    echo $result;

  }


  ?>
