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
		$prenom = $request->prenom;
		$password = $request->password;
		$pseudo = $request->pseudo;
		$mail = $request->mail;
		$description = $request->description;
}

$post = "INSERT INTO Utilisateur (nom, prenom, pseudonyme, mail, motdepasse, avatar, description)
				 VALUES ('$nom', '$prenom', '$pseudo', '$mail', '$password', 'http://orig08.deviantart.net/3f1c/f/2014/019/a/0/chibi_base_para_avatar__3_by_zeta_d-d72t5a9.png', '$description')";
$sth = $pdo->prepare($post);
$sth->execute();

$users = array(
		'prenom' => $request->prenom,
		'nom' => $request->nom,
		'password' => $request->password,
		'mail' => $request->mail,
		'pseudo' => $request->pseudo,
		'description' => $request->description
	);

	$result = json_encode($users);

		echo ($result);

// $result = $pdo->query($query);
// while($row = $result->fetch(PDO::FETCH_ASSOC)){
// echo $row[pseudonyme];
// }
?>
