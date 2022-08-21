<?php

session_start();

ini_set("default_charset","UTF-8");

class checkSessValues {
	public static function check_ses_id_value() {
        if(isset($_SESSION['id'])) {
            return $_SESSION['id'];
        } else {
            return false;
        }
    }
}



?>