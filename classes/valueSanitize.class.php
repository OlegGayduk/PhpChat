<?php

ini_set("default_charset","UTF-8");

class Sanitize {
	public function value_sanitize($val) {
		if(isset($val)) {
			if($val != "") {
			    $val = htmlspecialchars($val);
			    $val = stripcslashes($val);
			    $val = addslashes($val);
			    return $val;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}

?>