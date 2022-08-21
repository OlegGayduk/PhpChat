<?php

ini_set("default_charset","UTF-8");

require_once("../classes/db.class.php");
require_once("../classes/checkSessValues.class.php");
require_once("../classes/mainFuncs.class.php");
require_once("../classes/showDialogs.class.php");

if(CheckSessValues::check_ses_id_value() != false) {
    $ses_id = CheckSessValues::check_ses_id_value();
} else {
    exit("<span style='font: 14px/18px Arial,Helvetica,Verdana,sans-serif;position:absolute;left:0;right:0;text-align: center;top:50%;'>Фатальная ошибка,пройдите авторизацию повторно!</span>");
} 
?>
<!DOCTYPE html>
<html>
<head>
    <title>Диалоги</title>
    <link rel="manifest" href="manifest.json">
    <link href="../css/main.css" rel="stylesheet" type="text/css"/>
    <script src="../js/overthrow.js" async></script>
    <script src='../js/jqueryLibrary.js' async></script>
    <script src="../js/nanoscroll.js" async></script>
    <script src="../js/mainMes.js" defer></script>
    <script src="../js/fileUpload.js" async></script>
</head>
<body>
<div class='page-wrap'>
    <div class='back' onclick='setClose()'></div>
        <div class='set-bar-wrap'></div>
    <div class='menu'>
        <div class='msgs-open-inf-content'>
            <div class='msgs-open-inf'></div>
            <div class='media'>Вложения</div>
            <div class='msgs-edit'>Действия</div>
        </div>
        <div class='nav-bar' onclick='navBarOpen()'>
           <span class='unnamed'>Secumes</span>
           <div class='bar'>
               <span class='bar1'></span>
               <span class='bar2'></span>
               <span class='bar3'></span>
           </div>
        </div>
        <div class='nav-bar-set'>
            <ul>
                <li onclick='setOpen()'>Настройки</li>
                <li>Помощь</li>
                <li>О Secumes</li>
                <li>Выйти</li>
            </ul>
        </div>
    </div> 
    <div class='main-container'>
        <div id='dialogs-container'>
            <div id='dialogs-main-content'>
                <div id='dialogs-search'>
                    <form method='post' id='search-form'>
                        <input id='search' placeholder='Поиск' name='search-text' type='text' oninput='searchOninput(this)'/>
                        <span class='lupa'></span>
                        <div class='del-search' onclick='searchClean(this)'>
                            <span id='del-search1'></span>
                            <span id='del-search2'></span>
                        </div>
                    </form>
                </div>
                <div id='dialogs-over' class='nano'> 
                    <div class='overthrow nano-content'>
                        <?php
                        if(db::connection() != false) { 
    
                            $db = db::connection();
                        
                            $mess_sql_requests_res = mainFuncs::dialogs_requests($db,$ses_id);
                        
                            if(showDialogs::dialogs_cycl($mess_sql_requests_res) == false) {
                                echo "<span class='empty-dialogs'>У вас пока что нет ни одного диалога</span>";
                            } 
                        } else {
                            exit("Проверьте подключение к интернету!");
                        }
                        ?>   
                    </div>                    
                </div>
            </div>
        </div>
        <div id='msg-container'>
            <div id='sell-form'>
                <div id='ava-interlocutor'></div>
                <div id='ava-sell'></div>
                <form method='post' id='msg-form'>
                    <textarea id='msg-sell' placeholder='Напишите сообщение...' cols='50' name='text'></textarea>
                    <span type='submit' class='send' onclick='send(event)'>Отправить</span>
                </form>     
            </div>
            <div class="msgs-history-typing-wrap"></div>
            <div id='msg-content' class='nano'> 
                <div class='ball'></div>
                <div class='overthrow nano-content'></div>
            </div>
        </div>
    </div>
</div>
</body>
</html>

