<?php

ini_set("default_charset","UTF-8");

class db {
    
    public static function connection() {
        $db = new mysqli('localhost', 'root', '','chat');

        if (mysqli_connect_errno()) {
           printf("Не удалось подключиться к базе данных. Код ошибки: %s\n",mysqli_connect_error());
           return false;
           exit();
        } else {
           return $db;
           exit();
        }
    } 
}

?>
