<?php

session_start();

ini_set("default_charset","UTF-8");

require_once("../classes/db.class.php"); 
require_once("../classes/checkSessValues.class.php");
require_once("../classes/valueSanitize.class.php");
require_once("../classes/sqlRequests.class.php"); // file with main inspections and sql requests of all site5

if(isset($_POST)) { // checks the global post array

    $sanitize = new Sanitize();
    //$mainFuncs = new mainFuncs(); // makes the new specimen of class 'mainFuncs'
    //$sql_requests = new sqlRequests();

	if($sanitize -> value_sanitize($_POST['login']) != false) { // sanitizes of first (login) global post variable

        $log = $sanitize -> value_sanitize($_POST['login']);

	    if($sanitize -> value_sanitize($_POST['pass']) != false) { // sanitizes of second (pass) global post variable

            $pass = $sanitize -> value_sanitize($_POST['pass']);
           
            if(db::connection() != false) { 

                $db = db::connection();
    
                if(sqlRequests::log_sql_requests($db,$log,$pass) != false) { // makes sql requests into database and uses first and second global post variables as arguments 

                    $id = sqlRequests::log_sql_requests($db,$log,$pass); // assigns returning variables from function with sql requests to some another variables 
                    
                    if(isset($id) && $id != "") { // additional inspection,which checks our variables one mor time for greater security

                        $_SESSION['id'] = $id;

                        //sqlRequests::auto_requests($db,$id);

                        echo "true"; // if all actions will return true,we will return an identifier

                        exit();

                    } else {
                        // if additional inspection will return false,we will show an error
                        exit('Fatal error!');
                    }
                } else {
                 // if 'logSqlRequests' function will return false,we will show an error
                    exit('Login and Pass are incorrect!');
                }
            } else {
                exit('Check your connection to the internet!');
            } 
        } else {
        	 // if 'sanitizePassValue' function will return false,we will show an error
            exit('Fill the all fields!');
        }
    } else {
    	 // if 'sanitizeLogValue' function will return false,we will show an error
        exit('Fill the all fields!');
    }
} else {
	 // if the global array 'post' does not exist,we will show an error
	exit('Fatal error!');
}

?>