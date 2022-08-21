<?php

ini_set("default_charset","UTF-8");        

require_once("../classes/db.class.php");
require_once("../classes/checkSessValues.class.php");
require_once("../classes/sqlRequests.class.php");
require_once("../classes/valueSanitize.class.php");

if(isset($_POST)) {
    
    if(checkSessValues::check_ses_id_value() != false) {

        $ses_id = CheckSessValues::check_ses_id_value();

        $sended = new Sanitize();

        if($sended -> value_sanitize($_GET['sell']) != false) {

            $sell = $sended -> value_sanitize($_GET['sell']);

            if(db::connection() != false) {

            	$db = db::connection();

            	if(sqlRequests::receipt_inf($db,$sell) != false) {

            		list($alias,$status,$ava,$dialogStatus) = sqlRequests::receipt_inf($db,$sell);

            		echo json_encode(array('alias' => $alias, 'status' => $status, 'ava' => $ava, 'dialogStatus' => $dialogStatus));
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
        exit('It seems that session is expired! Try to go through auentification again.');
    }
} else {
    exit(0);
}

?>