<?php

//importo la connessione
require("connessione.php");


if(isset($_GET["size"]) && isset($_GET["page"])){
    $size = $_GET("size");
    $page = $_GET("page");
    $query = sprintf("select * from employees limit %d,%d",$size*$page,$size);
}else{
    $query = sprintf("select * from employees");
}


$risultato = $connect->query($query);
//print_r($risultato);

$risultato = mysqli_fetch_all($risultato, MYSQLI_ASSOC);
//print_r($risultato);

//trasformo in json
print_r(json_encode($risultato));

?>