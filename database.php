<?php

$dbhost = "localhost";
$dbname = "sharov8e_myadmin";
$username = "sharov8e_myadmin";
$password = "2&nXFWIi";


$db = new PDO("mysql:host=$dbhost; dbname=$dbname;", $username, $password);

function get_check_up_all () {
    global $db; 
    $check_ups = $db->query("SELECT * FROM check_up");
    
    return $check_ups;
}

function get_check_up_tests ($id) {
    global $db; 
    $check_ups_tests = $db->query("SELECT t.name
                                    FROM tests as t
                                    INNER JOIN check_up_tests as ct
                                        ON t.id = ct.id_test
                                    INNER JOIN check_up as c
                                        ON c.id = ct.id_check_up
                                    WHERE c.id =".$id);
    
    return $check_ups_tests;
}