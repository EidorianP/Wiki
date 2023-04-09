<?php
if (isset($_POST['submit']))

{    
    $email = $_POST['email'];
    $password = $_POST['password'];

    $db = new PDO('mysql:host=localhost;dbname=utilisateurs' . ';port=' . 3306, 'root', '');

    $sql = "SELECT * FROM user where email = '$email' ";
    $result = $db->prepare($sql);
    $result->execute();

    if($result->rowCount() > 0)
    {

    }
    else
    {
        $password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO user (email, password) VALUES ('$email', '$password')";
        $req = $db->prepare($sql);
        $req->execute();
        echo "Enregistrement effectué";
    }
}




?>