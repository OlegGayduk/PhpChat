<?php

ini_set("default_charset","UTF-8");        

require_once("../classes/db.class.php");
require_once("../classes/checkSessValues.class.php");
require_once("../classes/sqlRequests.class.php");
require_once("../classes/avaUpload.class.php");

if(checkSessValues::check_ses_id_value() != false) {

    $ses_id = checkSessValues::check_ses_id_value();

    $upload = new avaUpload();

    $path_to_90_directory = '../avatars/';
    $filename =  $_FILES['fupload']['name'];
    $source =  $_FILES['fupload']['tmp_name']; 
    $target =  $path_to_90_directory.$filename;

    if($upload -> ava_format_check($filename) != false) {

        $upload -> file_move($source,$target);

        $im = $upload -> img_create_from($path_to_90_directory,$filename);
        
        if($upload -> img_broadcast($path_to_90_directory,$filename,$im) != false) {

            $ava = $upload -> img_broadcast($path_to_90_directory,$filename,$im);
            
            if(true) {
                if(db::connection() != false) { 
            
                    $db = db::connection();
            
                    sqlRequests::ava_upload_request($db,$ses_id,$ava);

                    echo $ava;
    
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
} else {
    exit("error");
}

?>