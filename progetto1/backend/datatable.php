<?php

//importo la connessione
require("connessione.php");

$query = sprintf ("select count(employees.id) as nRighe from employees");
$nRighe = $connect->query($query);
$nRighe = mysqli_fetch_all($nRighe, MYSQLI_ASSOC);
$nRighe = $nRighe[0]["nRighe"];

// print_r($nRighe[0]["nRighe"]);

if(isset($_GET["length"]) && isset($_GET["start"])){
    $length = $_GET["length"];
    $start = $_GET["start"];
    $query = sprintf("select * from employees limit %d,%d",$length*$start,$length);
}else{
    // $query = sprintf("select * from employees");
}

$risultato = $connect->query($query);
//print_r($risultato);

$risultato = mysqli_fetch_all($risultato, MYSQLI_ASSOC);
//print_r($risultato);

//trasformo in json
// print_r(json_encode($risultato));




$output = array();
$output["draw"] = intval($_GET["draw"]);
$output["recordsTotal"] = intval($nRighe);
$output["recordsFiltered"] = intval($nRighe);
$output["data"] = $risultato;






print_r(json_encode($output));


?>