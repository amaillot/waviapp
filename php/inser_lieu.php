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

		$query = "SELECT pseudonyme FROM Utilisateur";




    //http://stackoverflow.com/questions/15485354/angular-http-post-to-php-and-undefined
    $postdata = file_get_contents("php://input");
	if (isset($postdata)) {
		$request = json_decode($postdata);
		$nom = $request->nom;
		$categorie = $request->categorie;
		$description = $request->description;
		$adresse = $request->adresse;
    $utilisateur = $request->utilisateur;
    $photo = $request->photo;
}


$query="SELECT id FROM Lieu ORDER BY id DESC LIMIT 1";

$result = $pdo->query($query);
while($row = $result->fetch(PDO::FETCH_ASSOC)){
  $id = $row['id'];
}
$id = $id+1;
echo $id;

$adresse = utf8_decode($adresse);

$post = "INSERT INTO Lieu (id, nom_lieu, description, photo, adresse , id_Utilisateur)
VALUES ('$id', '$nom', '$description', '$photo' ,'$adresse', '$utilisateur')";

$sth = $pdo->prepare($post);
$sth->execute();

$post2 = "INSERT INTO Categorise(id, id_Lieu) VALUES ('$categorie', '$id')";

$sth = $pdo->prepare($post2);
$sth->execute();

$users = array(
		'nom' => $nom,
		'categorie' => $categorie,
		'description' => $description,
		'adresse' => $adresse,
    'utilisateur' => $utilisateur
	);

	$result = json_encode($users);

		echo ($result);

?>
