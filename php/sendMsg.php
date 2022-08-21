<?php

ini_set("default_charset","UTF-8");        

require_once("../classes/db.class.php");
require_once("../classes/checkSessValues.class.php");
require_once("../classes/sqlRequests.class.php");
require_once("../classes/valueSanitize.class.php");

if(isset($_POST)) {
    
    if(checkSessValues::check_ses_id_value() != false) {

        $ses_id = checkSessValues::check_ses_id_value();

        $send = new Sanitize();

        if($send -> value_sanitize($_POST['text']) != false) {

            $text = $send -> value_sanitize($_POST['text']);

            if($send -> value_sanitize($_GET['sell']) != false) {

                $sell = $send -> value_sanitize($_GET['sell']);

                if($ses_id && $sell) {

                    $summ = $ses_id + $sell;

                    if($send -> value_sanitize($_POST['date']) != false) {

                        $date = $send -> value_sanitize($_POST['date']);

                        if(db::connection() != false) { 
            
                            //$date = date("H:i:s");
                        
                            $db = db::connection();

                            if($send -> value_sanitize($_POST['myAlias']) != false && $send->value_sanitize($_POST['myAva']) != false && $send->value_sanitize($_POST['myStatus']) != false && $send->value_sanitize($_POST['poluchAlias']) != false && $send->value_sanitize($_POST['poluchAva']) != false && $send->value_sanitize($_POST['poluchStatus']) != false) {

                                $val = sqlRequests::msg_dialog_send_request($db,$ses_id,$send->value_sanitize($_POST['myAlias']),$send->value_sanitize($_POST['myAva']),$send->value_sanitize($_POST['myStatus']),$sell,$send->value_sanitize($_POST['poluchAlias']),$send->value_sanitize($_POST['poluchAva']),$send->value_sanitize($_POST['poluchStatus']),$text,$date,$summ);

                            } else if($send -> value_sanitize($_POST['myAlias']) != false && $send->value_sanitize($_POST['myAva']) != false) {

                                $val = sqlRequests::msg_send_request_full($db,$ses_id,$send->value_sanitize($_POST['myAlias']),$send->value_sanitize($_POST['myAva']),$sell,$summ,$text,$date);

                            } else {

                                $val = sqlRequests::msg_send_request_min($db,$ses_id,$sell,$summ,$text,$date);

                            }
    
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
            exit(0);
        }
    } else {
        exit(0);
    }
} else {
    exit("Unable to connect to server! Try again later...");
}

?>