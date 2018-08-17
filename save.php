<?php

if (!isset($_POST)) die('ok');
$jsonString = file_get_contents('users.json') or '[]';
$data = json_decode($jsonString, true);

array_push($data,$_POST['user']);
print_r ($_POST);
$newJsonString = json_encode($data);
file_put_contents('users.json', $newJsonString);


?>