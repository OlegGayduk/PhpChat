<?php

ini_set("default_charset","UTF-8"); 

require_once("../classes/db.class.php");
require_once("../classes/checkSessValues.class.php");
require_once("../classes/sqlRequests.class.php");
require_once("../classes/showDialogs.class.php");

$sql_requests = new sqlRequests();

if(checkSessValues::check_ses_id_value() != false) {

    $ses_id = checkSessValues::check_ses_id_value();

    if(db::connection() != false) { 

        $db = db::connection();

        if($sql_requests->dialogs_requests($db,$ses_id) != false) {

            $mess_sql_requests_res = $sql_requests->dialogs_requests($db,$ses_id);
    
            if(showDialogs::dialogs_cycl($mess_sql_requests_res) == false) {
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

?>