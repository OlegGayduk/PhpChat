<?php

ini_set("default_charset","UTF-8");

require_once("../classes/db.class.php");
require_once("../classes/checkSessValues.class.php");
require_once("../classes/sqlRequests.class.php");
require_once("../classes/showMsgs.class.php");
require_once("../classes/valueSanitize.class.php");

$sanitize = new Sanitize();

if($sanitize -> value_sanitize($_GET['sell']) != false) {

    $get_sell = $sanitize -> value_sanitize($_GET['sell']);

    if(checkSessValues::check_ses_id_value() != false) {
    
        $ses_id = CheckSessValues::check_ses_id_value();

        if(showMsgs::summ($get_sell,$ses_id) != false) {

            $summ = showMsgs::summ($get_sell,$ses_id);
    
            if(db::connection() != false) { 
        
                $db = db::connection();
        
                if(sqlRequests::mess_requests($db,$ses_id,$summ) != false) {

                    $mess_sql_requests_res = sqlRequests::mess_requests($db,$ses_id,$summ);
        
                    if(showMsgs::msgs_cycl($mess_sql_requests_res) == false) {
                        exit("<span class='chat-non-selected'>Фатальная ошибка,проверьте подключение к интернету!</span>");
                    } 
    
                } else {
                    exit("<span class='msgs-col-error'>Переписка пуста.</span>");
                }
            } else {
                exit("<span class='chat-non-selected'>Проверьте подключение к интернету!</span>");
            }
        } else {
            exit("<span class='chat-non-selected'>Фатальная ошибка!</span>");
        }
    } else {
        exit("<span class='chat-non-selected'>Фатальная ошибка,пройдите авторизацию повторно!</span>");
    } 
} else {
    exit("<span class='msgs-col-error'>Выберите диалог для начала общения</span>");
}



?>