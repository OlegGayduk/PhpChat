<?php

ini_set("default_charset","UTF-8");

class showMsgs {

    public static function summ($get_sell,$ses_id) {
        if($ses_id != 0 && $get_sell != 0) {
            $summ = $ses_id + $get_sell;
            return $summ;
        } else {
            return false;
            exit();
        }
    }
 
    public static function msgs_cycl($mess_sql_requests_res) {
    
        if($mess_sql_requests_res != false) {
                    
            list($result,$row) = $mess_sql_requests_res;
    
            if($row != false && $result != false) {

                //$unreadCount = 0;

                $a = 0;
                $arr = array();
    
                do {
                    if($row['status'] != 0) {

                        if($row['otpr_ava'] != false && $row['otpr_alias'] != false) {

                            if($row['file'] != "" ) {
                                $arr[++$a] = array('id' => htmlspecialchars($row['id']), 'otpr_id' => htmlspecialchars($row['otpr_id']), 'ava' => htmlspecialchars($row['otpr_ava']), 'alias' => htmlspecialchars($row['otpr_alias']),'text' => htmlspecialchars($row['text']),'file' => htmlspecialchars($row['file']),'date' => htmlspecialchars($row['date_min']), 'status' => 'readed');
                            } else {
                                $arr[++$a] = array('id' => htmlspecialchars($row['id']), 'otpr_id' => htmlspecialchars($row['otpr_id']), 'ava' => htmlspecialchars($row['otpr_ava']), 'alias' => htmlspecialchars($row['otpr_alias']),'text' => htmlspecialchars($row['text']),'date' => htmlspecialchars($row['date_min']), 'status' => 'readed');
                            }
                        } else {
                            if($row['file'] != "") {
                                $arr[++$a] = array('id' => htmlspecialchars($row['id']),'text' => htmlspecialchars($row['text']),'file' => htmlspecialchars($row['file']),'date' => htmlspecialchars($row['date_min']), 'status' => 'readed');
                            } else {
                                $arr[++$a] = array('id' => htmlspecialchars($row['id']),'text' => htmlspecialchars($row['text']),'date' => htmlspecialchars($row['date_min']), 'status' => 'readed');
                            }
                        }
                    } else {

                        if($row['otpr_ava'] != false && $row['otpr_alias'] != false) {
                            if($row['file'] != "") {
                                $arr[++$a] = array('id' => htmlspecialchars($row['id']), 'otpr_id' => htmlspecialchars($row['otpr_id']),'ava' => htmlspecialchars($row['otpr_ava']), 'alias' => htmlspecialchars($row['otpr_alias']),'text' => htmlspecialchars($row['text']),'file' => htmlspecialchars($row['file']),'date' => htmlspecialchars($row['date_min']), 'status' => 'unread');
                            } else {
                                $arr[++$a] = array('id' => htmlspecialchars($row['id']), 'otpr_id' => htmlspecialchars($row['otpr_id']),'ava' => htmlspecialchars($row['otpr_ava']), 'alias' => htmlspecialchars($row['otpr_alias']),'text' => htmlspecialchars($row['text']),'date' => htmlspecialchars($row['date_min']), 'status' => 'unread');
                            }
                        } else {
                            if($row['file'] != "") {
                                $arr[++$a] = array('id' => htmlspecialchars($row['id']),'text' => htmlspecialchars($row['text']),'file' => htmlspecialchars($row['file']),'date' => htmlspecialchars($row['date_min']), 'status' => 'unread');
                            } else {
                                $arr[++$a] = array('id' => htmlspecialchars($row['id']),'text' => htmlspecialchars($row['text']),'date' => htmlspecialchars($row['date_min']), 'status' => 'unread');
                            }
                        }
                    }
                } while($row = $result->fetch_assoc());

                echo json_encode($arr);

                return true;

            } else {
                return false;
                //exit();
            }
        } else {
            return false;
            //exit();
        }
    }
}

?>