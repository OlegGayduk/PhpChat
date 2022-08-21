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

                $result = sqlRequests::check_writer_status($db,$ses_id,$get_sell,$summ);

                if($result != false) {
                    echo true;
                } else {
                    echo false;
                }

                //if($text == false && $date == false) {
                //	list($status) = sqlRequests::check_writer_status($db,$ses_id,$get_sell,$summ);
                //	echo $status;
                //} else {
                //	echo json_encode(array($text,$date,$status));
                //}
    
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