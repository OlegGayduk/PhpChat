<?php

ini_set("default_charset","UTF-8");

class avaUpload {

	public function ava_format_check($file) {
		if(preg_match('/[.](JPG)|(jpg)|(gif)|(GIF)|(png)|(PNG)$/',$file)) {
			return true;
		} else {
			return false;
		}
	}

	public function file_move($source,$target) {
    	move_uploaded_file($source,$target);
    }

	public function img_create_from($path,$file) {

    	if(preg_match('/[.](GIF)|(gif)$/',$file)) {
            $im = imagecreatefromgif($path.$file); 
        } else if(preg_match('/[.](PNG)|(png)$/',$file)) {
            $im = imagecreatefrompng($path.$file);
        } else if(preg_match('/[.](JPG)|(jpg)|(jpeg)|(JPEG)$/',$file)) {
            $im = imagecreatefromjpeg($path.$file);
        } 

        return $im;
	}

    public function img_broadcast($path,$file,$im) {
    	$w  = 350; 
        $w_src = imagesx($im);
        $h_src = imagesy($im);
    
        $dest = imagecreatetruecolor($w,$w);
    
        if($w_src > $h_src) {
            imagecopyresampled($dest, $im, 0, 0,round((max($w_src,$h_src)-min($w_src,$h_src))/2),0, $w, $w,min($w_src,$h_src),min($w_src,$h_src));
        }
    
        if($w_src < $h_src) {
            imagecopyresampled($dest, $im, 0, 0, 0, 0, $w, $w,min($w_src,$h_src),min($w_src,$h_src)); 
        }
    
        if ($w_src == $h_src) {
            imagecopyresampled($dest,$im, 0, 0, 0, 0, $w, $w, $w_src, $w_src);
        }
                 
        $date = time(); 
               
        imagejpeg($dest,$path.$date.".jpg");
        $avatar = $path.$date.".jpg";
    
        //$delfull = $path.$file; 
        //unlink($delfull);

        if(true) {
        	return $avatar;
        } else {
        	return false;
        } 
    }
    
}    




?>