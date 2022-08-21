<?php

ini_set('default_charset','UTF-8');

require_once("../classes/db.class.php");
require_once("../classes/checkSessValues.class.php");
require_once("../classes/sqlRequests.class.php");
require_once("../classes/showMsgs.class.php");
require_once("../classes/valueSanitize.class.php");

if(isset($_POST)) {
	
    if(checkSessValues::check_ses_id_value() != false) {

    	$ses_id = checkSessValues::check_ses_id_value();

    	$sanitize = new Sanitize();

    	if($sanitize -> value_sanitize($_GET['sell']) != false) {

            $get_sell = $sanitize -> value_sanitize($_GET['sell']);

            $summ = $ses_id + $get_sell;

            if($sanitize -> value_sanitize($_POST['lastMsg']) != false) {

                $last_msg = $sanitize -> value_sanitize($_POST['lastMsg']);

                if(db::connection() != false) {

                    $db = db::connection();

                    if(sqlRequests::get_more_msgs($db,$last_msg,$ses_id,$summ) != false) {

                        $new_msgs = sqlRequests::get_more_msgs($db,$last_msg,$ses_id,$summ);

                        echo $new_msgs;

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
    	exit("<span style='font: 14px/18px Arial,Helvetica,Verdana,sans-serif;position:absolute;left:0;right:0;text-align: center;top:50%;'>Фатальная ошибка,пройдите авторизацию повторно!</span>");
    }
} else {
	exit('Unable to connect to database!');
}


?>