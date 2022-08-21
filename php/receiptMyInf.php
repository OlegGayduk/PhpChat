<?php

ini_set("default_charset","UTF-8");        

require_once("../classes/db.class.php");
require_once("../classes/checkSessValues.class.php");
require_once("../classes/sqlRequests.class.php");

if(isset($_POST)) {
    
    if(checkSessValues::check_ses_id_value() != false) {

        $ses_id = CheckSessValues::check_ses_id_value();

        if(db::connection() != false) {

        	$db = db::connection();

        	if(sqlRequests::receipt_inf($db,$ses_id) != false) {

        		list($alias,$status,$ava) = sqlRequests::receipt_inf($db,$ses_id);

        		echo json_encode(array('id' => $ses_id,'alias' => $alias, 'status' => $status, 'ava' => $ava));
            } else {
            	exit("error");
            }
        } else {
        	exit("error");
        }
    } else {
        exit("error");
    }
} else {
    exit("error");
}

?>