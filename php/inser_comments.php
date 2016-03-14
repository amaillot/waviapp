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

$postdata = file_get_contents("php://input");

if (isset($postdata)) {
$request = json_decode($postdata);
$lieu = $request->lieu;
$utilisateur = $request->utilisateur;
$commentaire = $request->commentaire;
}


$query="SELECT id FROM Commentaire ORDER BY id DESC LIMIT 1";

$result = $pdo->query($query);
while($row = $result->fetch(PDO::FETCH_ASSOC)){
  $id = $row['id'];
}
$id = $id+1;
echo $id;

$post = "INSERT INTO Commentaire (id, contenu, date, id_Lieu) VALUES ('$id', '$commentaire', '2016-03-04', '$lieu')";

$sth = $pdo->prepare($post);
$sth->execute();

$post2 = "INSERT INTO ecrit(id, id_Commentaire) VALUES ('$utilisateur', '$id')";

$sth = $pdo->prepare($post2);
$sth->execute();


 ?>
