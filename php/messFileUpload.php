<?php

ini_set('default_charset','UTF-8');     

require_once("../classes/db.class.php");
require_once("../classes/checkSessValues.class.php");
require_once("../classes/sqlRequests.class.php");
require_once("../classes/valueSanitize.class.php");

if(checkSessValues::check_ses_id_value() != false) {

    $ses_id = checkSessValues::check_ses_id_value();

    //$uploaddir = '../sendFiles/';
    //$uploadfile = $uploaddir.basename($_FILES['uploadfile']['name']);
//
    //if(copy($_FILES['uploadfile']['tmp_name'], $uploadfile)) {
    //	exit('true');
    //} else {
    //	exit('false');
    //}

    $send = new Sanitize();

    if(is_uploaded_file($_FILES["filename"]["tmp_name"])) {

       $date = time(); 

       $extension = substr(strrchr($_FILES["filename"]["name"], '.'), 1);

       move_uploaded_file($_FILES["filename"]["tmp_name"], "../sendFiles/".$date.'.'.$extension);

       //$text = "../sendFiles/".$_FILES["filename"]["name"];

       $text = $_FILES["filename"]["name"];

       $true_path = "../sendFiles/".$date.'.'.$extension;

       //echo($_POST['date']);
       //echo($_GET['sell']);

        if(true) {
           if(db::connection() != false) {

           	   $db = db::connection();

           	   $send = new Sanitize();

           	    if($send->value_sanitize($_GET['sell']) != false) {

           	       $sell = $send->value_sanitize($_GET['sell']);

           	        if($send -> value_sanitize($_POST['date']) != false) {

                        $date = $send -> value_sanitize($_POST['date']);

                        $summ = $ses_id + $sell;

                        $val = sqlRequests::msg_file_request($db,$ses_id,$send->value_sanitize($_POST['myAlias']),$send->value_sanitize($_POST['myAva']),$sell,$summ,$text,$true_path,$date);
    
                        echo $val;
                    } else {
                    	exit(0);
                    }

                } else {
                	exit(0);
                }
           } else {
           	   exit(0);
           }
        } else {
        	exit(0);
        }
    } else {
       //echo($_POST['date']);
    	echo("Ошибка загрузки файла");
    }

} else {
    exit(0);
}


?>