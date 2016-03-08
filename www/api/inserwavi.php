<?php

 $db = new PDO ('mysql:host=localhost; dbname=wavi', 'root', 'root');

$result = $db->prepare('
INSERT INTO Utilisateur(pseudonyme, motdepasse)
VALUES (:user, :password)'
);

$result->execute(array(
    ':user'=> $_POST['user'],
    ':password'=> $_POST['password']

));


 ?>
