<?php

ini_set("default_charset","UTF-8");

class showDialogs {

    public static function dialogs_cycl($mess_sql_requests_res) {
    
        if($mess_sql_requests_res != false) {
                    
            list($result,$row,$ses_id) = $mess_sql_requests_res;
    
            if($row != false && $result != false) {

                $a = 0;
                $arr = array();
    
                do {
                    if($row['status'] == 1) {
                        if(strlen($row['text']) >= 22) {

                            $text = mb_substr($row['text'],0,22,'UTF-8');

                            if($row['otpr_id'] == $ses_id) {

                                $arr[++$a] = array("n" => htmlspecialchars($row['id']),"id" => htmlspecialchars($row['poluch_id']),"ava" => htmlspecialchars($row['poluch_ava']),"alias" => htmlspecialchars($row['poluch_alias']),"date" => htmlspecialchars($row['date']),"text" => htmlspecialchars($text.'...'),);

                            } else {

                                $arr[++$a] = array("n" => htmlspecialchars($row['id']),"id" => htmlspecialchars($row['otpr_id']),"ava" => htmlspecialchars($row['otpr_ava']),"alias" => htmlspecialchars($row['otpr_alias']),"date" => htmlspecialchars($row['date']),"text" => htmlspecialchars($text.'...'),);

                            }
                        } else {
                            if($row['otpr_id'] == $ses_id) {

                                $arr[++$a] = array("n" => htmlspecialchars($row['id']),"id" => htmlspecialchars($row['poluch_id']),"ava" => htmlspecialchars($row['poluch_ava']),"alias" => htmlspecialchars($row['poluch_alias']),"date" => htmlspecialchars($row['date']),"text" => htmlspecialchars($row['text']),);

                            } else {

                                $arr[++$a] = array("n" => htmlspecialchars($row['id']),"id" => htmlspecialchars($row['otpr_id']),"ava" => htmlspecialchars($row['otpr_ava']),"alias" => htmlspecialchars($row['otpr_alias']),"date" => htmlspecialchars($row['date']),"text" => htmlspecialchars($row['text']),);

                            }
                        }
                    } else {
                        if(strlen($row['text']) >= 22) {

                            $text = mb_substr($row['text'],0,22,'UTF-8');

                            if($row['otpr_id'] == $ses_id) {

                                $arr[++$a] = array("n" => htmlspecialchars($row['id']),"id" => htmlspecialchars($row['poluch_id']),"ava" => htmlspecialchars($row['poluch_ava']),"alias" => htmlspecialchars($row['poluch_alias']),"date" => htmlspecialchars($row['date']),"text" => htmlspecialchars($text.'...'),);

                            } else {

                                $arr[++$a] = array("n" => htmlspecialchars($row['id']),"id" => htmlspecialchars($row['otpr_id']),"ava" => htmlspecialchars($row['otpr_ava']),"alias" => htmlspecialchars($row['otpr_alias']),"date" => htmlspecialchars($row['date']),"text" => htmlspecialchars($text.'...'),);

                            }

                        } else {
                            if($row['otpr_id'] == $ses_id) {

                                $arr[++$a] = array("n" => htmlspecialchars($row['id']),"id" => htmlspecialchars($row['poluch_id']),"ava" => htmlspecialchars($row['poluch_ava']),"alias" => htmlspecialchars($row['poluch_alias']),"date" => htmlspecialchars($row['date']),"text" => htmlspecialchars($row['text']),);

                            } else {

                                $arr[++$a] = array("n" => htmlspecialchars($row['id']),"id" => htmlspecialchars($row['otpr_id']),"ava" => htmlspecialchars($row['otpr_ava']),"alias" => htmlspecialchars($row['otpr_alias']),"date" => htmlspecialchars($row['date']),"text" => htmlspecialchars($row['text']),);

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