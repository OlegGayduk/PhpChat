<?php

ini_set("default_charset","UTF-8");

require_once("../classes/db.class.php");
require_once("../classes/checkSessValues.class.php");
require_once("../classes/sqlRequests.class.php");
require_once("../classes/showMsgs.class.php");
require_once("../classes/valueSanitize.class.php");

$sanitize = new Sanitize();

if(checkSessValues::check_ses_id_value() != false) {
    
    $ses_id = CheckSessValues::check_ses_id_value();

    if(isset($_GET['sell'])) {
    
    	if($sanitize -> value_sanitize($_GET['sell']) != false) {
    
            $get_sell = $sanitize -> value_sanitize($_GET['sell']);

            $summ = $ses_id + $get_sell;
        
            if(db::connection() != false) { 
            
                $db = db::connection();

                sqlRequests::writer_status($db,$ses_id,$summ);
                
            } else {
            	exit("error");
            }
        } else {
        	exit("error");
        }
    } else {
    	exit('error');
    }
} else {
	exit("error");
}




?>