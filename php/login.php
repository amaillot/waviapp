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
    $pseudo = $request->pseudo;
    $password = $request->password;
  }

  if ($pseudo == NULL) {
    $error[] = array(
      'prenom' => 'Erreur'
    );
    $result = json_encode($error);
    echo $result;
  }else{
$query="SELECT * FROM Utilisateur WHERE pseudonyme='$pseudo'";

  $result = $pdo->query($query);


    while($row = $result->fetch(PDO::FETCH_ASSOC)){
      $rows[] = array(
			'id' => $row['id'],
			'prenom' => $row['prenom'],
			'nom' => $row['nom'],
			'pseudo' => $row ['pseudonyme'],
			'mail' => $row['mail'],
			'password' => $row['motdepasse'],
			'avatar' =>$row['avatar'],
			'description' => $row['description']
							);
      $pass = $row['motdepasse'];
    }

    $error[] = array(
      'prenom' => 'Erreur'
    );

  if ($password == $pass){
    $result = json_encode($rows);
    echo $result;
  }else {
    $result = json_encode($error);
    echo $result;
  }
}




 ?>
