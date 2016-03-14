<?php
	//http://stackoverflow.com/questions/18382740/cors-not-working-php
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

    // $query = "SELECT id, nom_lieu, description, photo, lat, lng FROM Lieu WHERE id <> 1";
		// $query2 = "SELECT nom_couleur FROM Categorie, Categorise, Lieu WHERE Categorie.id = Categorise.id AND Categorise.id_Lieu = Lieu.id";
		$query = "SELECT nom, couleur, Lieu.id, nom_lieu, adresse, description, photo, lat, lng FROM Categorie, Categorise, Lieu WHERE Categorie.id = Categorise.id AND Categorise.id_Lieu = Lieu.id";


		// poser la question pour les tables qui sont pas avec les foreignKey la
		// SELECT nom_lieu, description, lat, lng, nom_couleur FROM Lieu , Categorie WHERE id_Lieu = id_Lieu_categorise AND id_categorise = id_Categorie

    $result = $pdo->query($query);
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
      $rows[] = array(
			'id' => $row['id'],
			'nom' => $row['nom_lieu'],
			'description' => $row['description'],
			'photo' => $row['photo'],
			'adresse' => $row['adresse'],
			'categorie' =>$row['nom'],
			'couleur' => $row['couleur']
							);
    }

		$result = json_encode($rows);

		echo $result;


    ?>
