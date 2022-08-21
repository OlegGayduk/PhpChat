<?php

ini_set("default_charset","UTF-8");

class sqlRequests {

    public static function log_sql_requests($db,$log,$pass) {
        if($db != false) {

            $result = $db->query("SELECT login,password,id FROM test_users WHERE login='$log' and password='$pass'");

            if($result->num_rows > 0) {

                $row = $result->fetch_assoc();

                if($row['login'] != "" && $row['password'] != "" && $row['id'] != "") {

                    return $row['id'];
    
                } else {

                    $result->close();
                    $db->close();

                    return false;
                }
            } else {

                //$result->close();
                $db->close();

                return false;
            }
        } else {
            return false;
        }
    } 

    public static function auto_requests($db,$ses_id) {
        if($db != false) {

            $result = $db->query("SELECT avatar FROM avatars WHERE otpr='$ses_id'");
    
            if($result->num_rows == 0) {
                $ava = '../autoAva/autoAva.png';
                $db->query("INSERT INTO avatars(otpr,avatar) VALUES ('$ses_id','$ava')");
                //$result->close();
                $db->close();
                exit();
            } else {

                //$result->close();
                $db->close();

                return false;
            }
        } else {
            return false;
        }
    }

    public static function ava_upload_request($db,$ses_id,$ava) {
        if($db != false) {

            $result4 = $db->query("SELECT avatar FROM avatars WHERE otpr='$ses_id'");

            if($result4->num_rows > 0) {

                $result4->close();

                $db->query("UPDATE avatars SET avatar='$ava' WHERE otpr='$ses_id'");

                $db->close();

                exit();
            } else {

                $result4->close();

                $db->query("INSERT INTO avatars(otpr,avatar) VALUES ('$ses_id','$ava')");

                $db->close();

            }
        } else {
            return false;
        }
    }

    public static function msg_file_request($db,$ses_id,$ses_alias,$ses_ava,$sell,$summ,$text,$true_path,$date) {
        if($db != false) {

            $arr = array();
    
            $db->query("INSERT INTO test_msgs(otpr_id,otpr_alias,otpr_ava,text,file,date_min,summ,status) VALUES ('$ses_id','$ses_alias','$ses_ava','$text','$true_path','$date','$summ',0)");
    
            $result100 = $db->query("SELECT MAX(id) as id FROM test_msgs WHERE summ='$summ'");
    
            $row100 = $result100->fetch_assoc();
    
            $id = $row100['id'];
        
            $result = $db->query("SELECT otpr_id,otpr_alias,otpr_ava,text,file,date_min FROM test_msgs WHERE summ='$summ' and id='$id'");
        
            $row = $result->fetch_assoc();
    
            $arr[1] = array('id' => htmlspecialchars($id),'otpr_id' => htmlspecialchars($row['otpr_id']),'alias' => htmlspecialchars($row['otpr_alias']),'ava' => htmlspecialchars($row['otpr_ava']),'text' => htmlspecialchars($row['text']),'file' => htmlspecialchars($row['file']),'date' => htmlspecialchars($row['date_min']), 'status' => 'unread');
    
            return json_encode($arr);
        } else {
            return false;
        }
    }

    public static function msg_send_request_full($db,$ses_id,$ses_alias,$ses_ava,$sell,$summ,$text,$date) {
        if($db != false) {

            //$_SERVER['REMOTE_ADDR'];

            $key = 2324;

            $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);

            $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);

            $text= mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $key, $text, MCRYPT_MODE_ECB, $iv);

            $text = mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $key, $text, MCRYPT_MODE_ECB, $iv);

            //$text = $_SERVER['REMOTE_ADDR'];



            $arr = array();

            $db->query("INSERT INTO test_msgs(otpr_id,otpr_alias,otpr_ava,text,date_min,summ,status) VALUES ('$ses_id','$ses_alias','$ses_ava','$text','$date','$summ',0)");

            $result100 = $db->query("SELECT MAX(id) as id FROM test_msgs WHERE summ='$summ'");

            $row100 = $result100->fetch_assoc();

            $id = $row100['id'];
    
            $result = $db->query("SELECT otpr_id,otpr_alias,otpr_ava,text,date_min FROM test_msgs WHERE summ='$summ' and id='$id'");
    
            $row = $result->fetch_assoc();

            $arr[1] = array('id' => htmlspecialchars($id),'otpr_id' => htmlspecialchars($row['otpr_id']),'alias' => htmlspecialchars($row['otpr_alias']),'ava' => htmlspecialchars($row['otpr_ava']),'text' => htmlspecialchars($row['text']),'date' => htmlspecialchars($row['date_min']), 'status' => 'unread');

            return json_encode($arr);
                
        } else {
            return false;
        }
    }

    public static function msg_send_request_min($db,$ses_id,$sell,$summ,$text,$date) {
        if($db != false) {

            $arr = array();

            $db->query("INSERT INTO test_msgs(otpr_id,text,date_min,summ,status) VALUES ('$ses_id','$text','$date','$summ',0)");

            $result100 = $db->query("SELECT MAX(id) as id FROM test_msgs WHERE summ='$summ'");

            $row100 = $result100->fetch_assoc();

            $id = $row100['id'];
    
            $result = $db->query("SELECT otpr_id,text,date_min FROM test_msgs WHERE summ='$summ' and id='$id'");
    
            $row = $result->fetch_assoc();

            $arr[1] = array('id' => htmlspecialchars($id),'otpr_id' => htmlspecialchars($row['otpr_id']),'text' => htmlspecialchars($row['text']),'date' => htmlspecialchars($row['date_min']), 'status' => 'unread');

            return json_encode($arr);

        } else {
            return false;
        }
    }

    public function msg_dialog_send_request($db,$ses_id,$my_alias,$my_ava,$my_status,$sell,$users_alias,$users_ava,$users_status,$text,$date,$summ) {
        if($db != false) {

            $db->query("INSERT INTO test_dialogs2(otpr_id,otpr_alias,otpr_ava,otpr_status,poluch_id,poluch_alias,poluch_ava,poluch_status,msg_otpr,text,date,status) VALUES ('$ses_id','$my_alias','$my_ava','$my_status','$sell','$users_alias','$users_ava','$users_status','$ses_id','$text','$date',0)");


            $db->query("INSERT INTO test_msgs(otpr_id,text,date_min,summ,status) VALUES ('$ses_id','$text','$date','$summ',0)");

            $id = 1;

            $arr[1] = array('id' => htmlspecialchars($id),'otpr_id' => htmlspecialchars($ses_id),'text' => htmlspecialchars($text),'date' => htmlspecialchars($date), 'status' => 'unread','sell' => $sell,'users_alias' => $users_alias,'users_ava' => $users_ava,'users_status' => $users_status);

            return json_encode($arr);

        } else {
            return false;
        }
    }

    public function dialogs_requests($db,$ses_id) {
        if($db != false) {

            $result = $db->query("SELECT id,poluch_id,poluch_alias,poluch_ava,otpr_id,otpr_alias,otpr_ava,msg_otpr,text,date,status FROM dialogs WHERE otpr_id='$ses_id' OR poluch_id='$ses_id' ORDER BY date DESC LIMIT 15");
    
            if($result->num_rows > 0)  {

                $row = $result->fetch_assoc();
    
                return array($result,$row,$ses_id);
            } else {
                $result->close();

                $db->close();

                return false;
            }
        } else {
            return false;
        }
    }

    public static function mess_requests($db,$ses_id,$summ) {
        if($db != false) {

            $result16 = $db->query("SELECT otpr_id FROM test_msgs WHERE summ='$summ' and status=0");

            if($result16->num_rows > 0) {

                $row16 = $result16->fetch_assoc();
                
                if($ses_id != $row16['otpr_id']) {
    
                    do {
                       $db->query("UPDATE test_msgs SET status=1 WHERE summ='$summ' and status=0");
                    } while($row16 = $result16->fetch_assoc());

                    $result16->close();
                } else {
                    $result16->close();
                }
            } else {
                $result16->close();
            }

            $result20 = $db->query("SELECT MAX(id) as id FROM test_msgs WHERE summ='$summ'");

            if($result20->num_rows > 0) {

                $row20 = $result20->fetch_assoc();

                if($row20['id'] > 30) {

                    $val = $row20['id'] - 30;
    
                    $result2 = $db->query("SELECT id,text,file,otpr_id,otpr_alias,otpr_ava,date_min,status FROM test_msgs WHERE summ='$summ' and id > $val");
            
                    if($result2->num_rows > 0) {
            
                        $row2 = $result2->fetch_assoc();
            
                        return array($result2,$row2);

                    } else {
        
                        $db->close();
        
                        return false;
                    }
                } else {
                    $result2 = $db->query("SELECT id,text,file,otpr_id,otpr_alias,otpr_ava,date_min,status FROM test_msgs WHERE summ='$summ'");
            
                    if($result2->num_rows > 0) {
            
                        $row2 = $result2->fetch_assoc();
            
                        return array($result2,$row2);
                    } else {
        
                        $db->close();
        
                        return false;
                    }
                }
            } else {

                $db->close();
    
                return false;
            }
        } else {
            return false;
        }
    }

    public static function get_more_msgs($db,$last_msg,$ses_id,$summ) {
        if($db != false) {

            $result = $db->query("SELECT id,text,file,otpr_alias,otpr_ava,date_min,status FROM test_msgs WHERE summ='$summ' and id < $last_msg ORDER BY id DESC LIMIT 30");

            if($result->num_rows > 0) {

                $a = 0;
                $arr = array();

                $row = $result->fetch_assoc();
    
                do {
                    if($row['status'] != 0) {
                        if($row['otpr_ava'] != false && $row['otpr_alias'] != false) {
                            $arr[++$a] = array('id' => htmlspecialchars($row['id']), 'otpr_id' => htmlspecialchars($row['otpr_id']), 'ava' => htmlspecialchars($row['otpr_ava']), 'alias' => htmlspecialchars($row['otpr_alias']),'text' => htmlspecialchars($row['text']),'date' => htmlspecialchars($row['date_min']), 'status' => 'readed');
                        } else {
                            $arr[++$a] = array('id' => htmlspecialchars($row['id']),'text' => htmlspecialchars($row['text']),'date' => htmlspecialchars($row['date_min']), 'status' => 'readed');
                        }
                    } else {

                        if($row['otpr_ava'] != false && $row['otpr_alias'] != false) {
                            $arr[++$a] = array('id' => htmlspecialchars($row['id']), 'otpr_id' => htmlspecialchars($row['otpr_id']),'ava' => htmlspecialchars($row['otpr_ava']), 'alias' => htmlspecialchars($row['otpr_alias']),'text' => htmlspecialchars($row['text']),'date' => htmlspecialchars($row['date_min']), 'status' => 'unread');
                        } else {
                            $arr[++$a] = array('id' => htmlspecialchars($row['id']),'text' => htmlspecialchars($row['text']),'date' => htmlspecialchars($row['date_min']), 'status' => 'unread');
                        }
                    }
                } while($row = $result->fetch_assoc());

                return json_encode($arr);

            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function writer_status($db,$ses_id,$summ) {
        if($db != false) {
            $db->query("INSERT INTO status(dialog_id,writer_id) VALUES ('$summ','$ses_id')");
        } else {
            return false;
        }
    }

    public function delete_writer_status($db,$ses_id,$summ) {
        if($db != false) {
            $result = $db->query("SELECT dialog_id,writer_id FROM status WHERE dialog_id='$summ' and writer_id='$ses_id'");
            do {
                $db->query("DELETE FROM status WHERE dialog_id='$summ' and writer_id='$ses_id'");
            } while($row = $result->fetch_assoc());

            $result->close();
            $db->close();

            return true;
        } else {
            return false;
        }
    }

    public function check_writer_status($db,$ses_id,$get_sell,$summ) {
        if($db != false) {

            $result2 = $db->query("SELECT dialog_id,writer_id FROM status WHERE dialog_id='$summ' and writer_id='$get_sell'");

            if($result2->num_rows > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function check_new_msgs($db,$ses_id,$get_sell,$summ) {
        if($db != false) {

            $result = $db->query("SELECT id,text,file,otpr_id,otpr_alias,otpr_ava,date_min,status FROM test_msgs WHERE status=0 and otpr_id='$get_sell' and summ='$summ'");

            if($result->num_rows > 0) {

                $row = $result->fetch_assoc();
                
                $a = 0;
                $arr = array();
    
                do {

                    if($row['otpr_ava'] != false && $row['otpr_alias'] != false) {
                        $arr[++$a] = array('id' => htmlspecialchars($row['id']), 'ava' => htmlspecialchars($row['otpr_ava']), 'alias' => htmlspecialchars($row['otpr_alias']),'text' => htmlspecialchars($row['text']),'date' => htmlspecialchars($row['date_min']), 'status' => 'unread');
                    } else {
                        $arr[++$a] = array('id' => htmlspecialchars($row['id']),'text' => htmlspecialchars($row['text']),'date' => htmlspecialchars($row['date_min']), 'status' => 'unread');
                    }

                } while($row = $result->fetch_assoc());

                return $arr;

            } else {
                return 'nothing';
            }
        } else {
            return false;
        }
    }

    public static function receipt_inf($db,$id) {
        if($db != false) {

            $result = $db->query("SELECT * FROM test_users3 WHERE id='$id'");

            if($result->num_rows > 0) {

                $result2 = $db->query("SELECT alias,online FROM test_users3 WHERE id='$id'");
    
                if($result2->num_rows > 0) {
    
                    $row2 = $result2->fetch_assoc();
    
                    $result3 = $db->query("SELECT avatar FROM avatars WHERE id='$id'");
    
                    if($result3->num_rows > 0) {
    
                        $row3 = $result3->fetch_assoc();
    
                        $result4 = $db->query("SELECT * FROM test_dialogs2 WHERE otpr_id='$id' OR poluch_id='$id'");
    
                        if($result4->num_rows > 0) {
                            return array($row2['alias'],$row2['online'],$row3['avatar'],true);
                        } else {
                            return array($row2['alias'],$row2['online'],$row3['avatar'],false);
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}