"use strict";

//var h = 0;

var j;

var a = 0;
//var n = 0;
var i = 0;

var arr = new Array();

var date;
var load;
var clicked;
var textAreaValue;

var count = 0;
var unread = 0;

var loadMore;
var loadDialogs;

var lastMsg;
var lastDialog;

var dialogsArr = new Array();
var dialogsLengthArr = new Array();

var msgsArr = new Array();
//var msgsLengthArr = new Array();

var msgsLengthArr2 = new Array();

var myArr = new Array();
var usersInf = new Array();

var checkWriterStatus;
var checkNewMsgs;

var avaMainSell;
var avaInterlocutor;

var msgSize;

function getUrlParam(oTarget, sVar) { 
    return decodeURI(oTarget.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function getDate() {

    var dat = new Date();

    if(true) {
        if(dat.getMinutes() >= 10) {
            if(dat.getSeconds() >= 10) {
                return dat.getHours() + ':' + dat.getMinutes() + ':' + dat.getSeconds();
            } else {
                return dat.getHours() + ':' + dat.getMinutes() + ':0' + dat.getSeconds();
            }
        } else {
            if(dat.getSeconds() >= 10) {
                return dat.getHours() + ':0' + dat.getMinutes() + ':' + dat.getSeconds();
            } else {
                return dat.getHours() + ':0' + dat.getMinutes() + ':0' + dat.getSeconds();
            }
        }
    } else {
        return false;
    }
}

var messFileUploadActs = {

    fileUpload: function(t,name) {

        if(t.files[0]) {
            this.upload(name);
            return true;
        } else {
            return false;
        }
    },
    
    upload: function(name) {

        var xhr = new XMLHttpRequest();
    
        var formData = new FormData(name);

        xhr.onload = xhr.onerror = function() {
          if (this.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
          } else {
            //alert(xhr.responseText);

            msgsActs.parseJson(JSON.parse(xhr.responseText));
                        
            msgsActs.scrollMsgs();

            getElems.getClassElem('msgs-send-textarea',0).value = "";

          }
        };

        //xhr.upload.onprogress = function(event) {
        //    log(parseInt(event.loaded / event.total * 100, 10) + '%');
        //}

        xhr.open("POST", "../php/messFileUpload.php" + window.location.search, true);

        //xhr.setRequestHeader("Content-Type", "multipart/formData");
        //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //xhr.send(formData);

        //alert(formData);

        if(usersInf['dialogStatus'] != false && getElems.getIdElem(getUrlParam(location.search, 'sell')) != false) {
            if(msgSize == 'full' && msgSize != undefined) {

                formData.append('date' , getDate());

                //xhr.send('&date=' + getDate());
                xhr.send(formData);
                //xhr.send(formData);
            } else {

                formData.append('date' , getDate());
                formData.append('myAlias' , myArr['alias']);
                formData.append('myAva' , myArr['ava']);

                //xhr.send(formData + '&date=' + encodeURIComponent(getDate()) + '&myAlias=' + encodeURIComponent(myArr['alias']) + '&myAva=' + encodeURIComponent(myArr['ava']));
                //xhr.send(formData);
                //xhr.send('&date=' + getDate());
                xhr.send(formData);
            }
        } else {
            //xhr.send(formData + '&date=' + encodeURIComponent(getDate()) + '&myAlias=' + encodeURIComponent(myArr['alias']) + '&myAva=' + encodeURIComponent(myArr['ava']) + '&myStatus=' + encodeURIComponent(myArr['status']) +'&poluchAlias=' + encodeURIComponent(usersInf['alias']) + '&poluchAva=' + encodeURIComponent(usersInf['ava']) +'&poluchStatus=' + encodeURIComponent(usersInf['status']));
            xhr.send(formData);
        }
    },
};

var menuActs = {
    openMenuAct:function() {
        if(getElems.getClassElem('tg-dropdown-menu-wrap',0) != false && getElems.getClassElem('tg-dropdown-menu-wrap',0).style.height == '170px'){
            getElems.getClassElem('tg-dropdown-menu-wrap',0).style.visibility='hidden';
            getElems.getClassElem('tg-dropdown-menu-wrap',0).style.height='0px';
        } else {
            getElems.getClassElem('tg-dropdown-menu-wrap',0).style.height='170px';
            getElems.getClassElem('tg-dropdown-menu-wrap',0).style.visibility='visible';
        }
    },
    openSetBarAct:function() {

        getElems.getClassElem('set-bar-wrap',0).innerHTML = "<div class='set-modal-head'>"+
        "<span class='set'>Настройки</span>"+
        "<span class='close-set-wrap' onclick='menuActs.closeSetBarAct()'>Закрыть</span>"+
        "<div class='ava'></div><span class='alias-set'>ZeroCool</span>"+
        "<div class='select-ava' onclick='avaUploadActs.beginFileUpload(this);'>"+
        "<form name='avaSet' id='upload' method='post' enctype='multipart/form-data'>"+
        "<div id='drop'>"+
        "<div class='camera'>"+
        "<div class='circle'>"+
        "</div></div><input id='ava-set-file' type='file' name='fupload' multiple  accept='image/jpeg,image/png,image/gif' onchange='avaUploadActs.fileUpload(this);'/></div></form></div></div>";

        getElems.getClassElem('set-bar-wrap',0).style.visibility = 'visible';
        getElems.getClassElem('back',0).style.visibility = 'visible';
    
        getElems.getClassElem('tg-dropdown-menu-wrap',0).style.visibility='hidden';
        getElems.getClassElem('tg-dropdown-menu-wrap',0).style.height='0px';
    },
    closeSetBarAct:function() {
        getElems.getClassElem('back',0).style.visibility = 'hidden';
        getElems.getClassElem('set-bar-wrap',0).style.visibility = 'hidden';
    },
    logOutAct:function() {
        xhr({type:'POST',url:urls.logOutUrl,sendContent:0,elem:0});
    },
};

var getElems = {
    getIdElem: function(id) {
        if(document.getElementById(id) != undefined) {
            return document.getElementById(id);
        } else {
            return false;
        }
    },
    getClassElem: function(name,n) {
        if(document.getElementsByClassName(name)[n] != undefined) {
            return document.getElementsByClassName(name)[n];
        } else {
            return false;
        }
    },
    getTagElem: function(el,tag) {
        if(el != undefined && tag != undefined) {
            return el.getElementsByTagName(tag);
        } else {
            return false;
        }
    },
};

var windowActs = {
    windowResize: function(t) {
        //if(document.body.clientWidth <= 1000) {
        //    confirm("Would you like to switch to mobile version?");
        //}
    },
};

var urls = {
    showMsgsHistoryUrl: '//test/test3/php/showMsgs.php',
    showDialogsUrl: '//test/test3/php/showDialogs.php',
    sendMsgUrl: '//test/test3/php/sendMsg.php',
    logOutUrl: '//test/test3/php/logOut.php',
    getMoreMsgsUrl: '//test/test3/php/getMoreMsgs.php',
    writerStatusUrl: '//test/test3/php/writerStatus.php',
    deleteWriterStatusUrl: '//test/test3/php/deleteWriterStatus.php',
    checkWriterStatusUrl: '//test/test3/php/checkWriterStatus.php',
    checkNewMsgsUrl: '//test/test3/php/checkNewMsgs.php',
    receiptUsersInfUrl: '//test/test3/php/receiptUsersInf.php',
    receiptMyInfUrl: '//test/test3/php/receiptMyInf.php',
    sendFileUrl: '//test/test3/php/messFileUpload.php' 
};

function showUsersInf() {

}

var msgsActs = {
    showMsgsHistory: function(id) {

        if(clicked != id) {

            window.history.pushState("", "", '?sell='+ id);

            loadMore = true;
            unread = 0;

            window.history.replaceState("", "", '?sell='+ id);

            if(clicked != undefined) {
                dialogsActs.colorChange({id:clicked,dialogColor:'#fff'});
            }
        
            clicked = id;

            //$(getElems.getIdElem(id)).addClass('dialog-active');
        
            dialogsActs.colorChange({id:clicked,dialogColor:'rgb(70,90,124)'});
        
            xhr({type:'POST',url:urls.showMsgsHistoryUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('nano-content',1)});
        }

    },

    msgsSelect: function(id) {
        if(getElems.getIdElem(id).style.opacity != 1) {

            getElems.getIdElem(id).style.opacity = 1;

            getElems.getIdElem(id).innerHTML = "<div class='msg-selector-clicked'></div>";
    
            arr[i++] = id;
    
            ++count;

            getElems.getClassElem('msgs-send-form-wrap',0).innerHTML = "<div class='msgs-history-forward-btn'>Переслать <span style='color:#b9cfe3'>" + count + "</span></div>" +
            "<div class='msgs-history-repeat-btn'>Повторить <span style='color:#b9cfe3'>" + count + "</span></div>" +
            "<div class='msgs-history-delete-btn'>Удалить <span style='color:#b9cfe3'>" + count + "</span></div>" +
            "<div class='msgs-history-cancel-btn' onclick='msgsActs.selectCancel()'>Отмена</div>";

        } else {

            getElems.getIdElem(id).style.opacity = 0.5;

            getElems.getIdElem(id).innerHTML = "";

            --count;

            if(count == 0) {

                getElems.getClassElem('msgs-send-form-wrap',0).innerHTML = "<div class='msgs-ava-main-seller'><img class='msgs-ava-style' src=" + avaMainSell + " width='54' height='54'/></div>"+
                "<div class='msgs-ava-interlocutor'><img class='msgs-ava-style' src=" + avaInterlocutor + " width='54' height='54'/></div>"+
                "<form id='msgs-send-form' method='post'>" +
                "<textarea class='msgs-send-textarea' placeholder='Напишите сообщение...' name='text'></textarea>" +
                "<span type='submit' class='msgs-history-send-btn' onclick='msgsActs.sendMsgMain(event)'>ОТПРАВИТЬ</span></form>"; 

                getElems.getClassElem('msgs-send-textarea',0).focus();

            } else {
                getElems.getClassElem('msgs-send-form-wrap',0).innerHTML = "<div class='msgs-history-forward-btn'>Переслать <span style='color:#b9cfe3'>" + count + "</span></div>" +
                "<div class='msgs-history-repeat-btn'>Повторить <span style='color:#b9cfe3'>" + count + "</span></div>" +
                "<div class='msgs-history-delete-btn'>Удалить <span style='color:#b9cfe3'>" + count + "</span></div>" +
                "<div class='msgs-history-cancel-btn' onclick='msgsActs.selectCancel()'>Отмена</div>";
            }
        }
    },

    selectCancel: function() {

        for(i = 0;i < arr.length;i++) {
            getElems.getIdElem(arr[i]).style.opacity = 0.5;
            getElems.getIdElem(arr[i]).innerHTML = "";
        }

        count = 0;

        getElems.getClassElem('msgs-send-form-wrap',0).innerHTML = "<div class='msgs-ava-main-seller'><img class='msgs-ava-style' src=" + avaMainSell + " width='54' height='54'/></div>"+
        "<div class='msgs-ava-interlocutor'><img class='msgs-ava-style' src=" + avaInterlocutor + " width='54' height='54'/></div>"+
        "<form id='msgs-send-form' method='post'>" +
        "<textarea class='msgs-send-textarea' placeholder='Напишите сообщение...' name='text'></textarea>" +
        "<span type='submit' class='msgs-history-send-btn' onclick='msgsActs.sendMsgMain(event)'>ОТПРАВИТЬ</span></form>"; 

        getElems.getClassElem('msgs-send-textarea',0).focus();
    },

    msgsMouseOver: function(id) {
        if(getElems.getIdElem(id).style.visibility != 'visible') {
            getElems.getIdElem(id).style.visibility = 'visible';
        } else {
            getElems.getIdElem(id).style.visibility = 'hidden';
        }
    },

    msgsMouseOut: function(id) {
        getElems.getIdElem(id).style.visibility = 'hidden';
    },

    sendMsgMain: function(e) {
        if(window.location.search != "") {

            if(getElems.getClassElem('msgs-send-textarea',0) != false && getElems.getClassElem('msgs-send-textarea',0).value != '') {

                //if(getElems.getClassElem('msgs-send-textarea',0).value.test((([a-z]+\d+)|(\d+[a-z]+))[a-z\d]) != false) {

                    if(getElems.getClassElem('msgs-col-error',0) != false) getElems.getClassElem('nano-content',1).innerHTML = "";
    
                    e.preventDefault();

                    //alert(msgSize);

                    //alert(myArr['id']);
    
                    if(usersInf['dialogStatus'] != false && getElems.getIdElem(getUrlParam(location.search, 'sell')) != false) {
                        if(msgSize == 'full' && msgSize != undefined) {
                            xhr({type:'POST',url:urls.sendMsgUrl + window.location.search,sendContent:'text=' + encodeURIComponent(getElems.getClassElem('msgs-send-textarea',0).value) + '&date=' + encodeURIComponent(getDate()),elem:0});
                        } else {
                            xhr({type:'POST',url:urls.sendMsgUrl + window.location.search,sendContent:'text=' + encodeURIComponent(getElems.getClassElem('msgs-send-textarea',0).value) + '&date=' + encodeURIComponent(getDate()) + '&myAlias=' + encodeURIComponent(myArr['alias']) + '&myAva=' + encodeURIComponent(myArr['ava']),elem:0});
                        }
                    } else {
                        xhr({type:'POST',url:urls.sendMsgUrl + window.location.search,sendContent:'text=' + encodeURIComponent(getElems.getClassElem('msgs-send-textarea',0).value) + '&date=' + encodeURIComponent(getDate()) + '&myAlias=' + encodeURIComponent(myArr['alias']) + '&myAva=' + encodeURIComponent(myArr['ava']) + '&myStatus=' + encodeURIComponent(myArr['status']) +'&poluchAlias=' + encodeURIComponent(usersInf['alias']) + '&poluchAva=' + encodeURIComponent(usersInf['ava']) +'&poluchStatus=' + encodeURIComponent(usersInf['status']),elem:0});
                    }
    
                    //xhr({type:'POST',url:urls.deleteWriterStatusUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('msgs-history-typing-wrap',0)});

                //} else {
                //    return false;
                //}
            } else {
                getElems.getClassElem('msgs-send-textarea',0).focus();
            }
        } else {
            return false;
        }
    },

    msgsHistoryAppend: function(response,n,msgsLengthArr) {

        var con = getElems.getClassElem('nano-content',1).scrollHeight;

        if(getElems.getClassElem('msgs-history-selected',0) == false) {

            $(getElems.getClassElem('nano-content',1)).append("<div class='msgs-history-selected'></div>");

            lastMsg = response[n]['id'];
        }

        if(getElems.getClassElem('msgs-history-typing-wrap',0) == false) {
            $(getElems.getClassElem('nano-content',1)).append("<div class='msgs-history-typing-wrap'><span class='msgs-history-typing-wrap-text'></span></div>");
        }

        var firstHeight = getElems.getClassElem('msgs-history-selected',0).scrollHeight;

        switch(response[n]['status']) {
            case 'readed':

                if(response[n]['sell'] != undefined) {
                    $(getElems.getClassElem('nano-content',0)).prepend("<div class='dialog-wrap' id=" + response[n]['sell'] + " onclick='msgsActs.showMsgsHistory(" + response[n]['sell'] + ")'>" +
                    "<img class='dialog-ava-wrap' src='" + response[n]['users_ava'] + "'/>" +
                    "<span id='dialog-seller'>" + response[n]['users_alias'] + "</span>" +
                    "<span id='dialog-date'>" + response[n]['date'] + "</span>" +
                    "<span id='dialog-last-msg'>" + response[n]['text'] + "</span>" +
                    "</div>");
                    dialogsActs.colorChange({id:response[n]['sell'],dialogColor:'rgb(70,90,124)'});
                }

                if(response[n]['alias'] != false && response[n]['alias'] != undefined) {

                    msgSize = 'full';

                    if(response[n]['file'] != undefined) {

                        //alert(response[n]['file']);

                        $(getElems.getClassElem('msgs-history-selected',0)).append("<div class='msg-wrap' onclick='msgsActs.msgsSelect("+response[n]['id']+")'>"+
                            "<div class='msg-wrap-big'>"+
                                "<div class='msg-content'>"+
                                    "<div class='msg-selector full-msg-selector' id="+response[n]['id']+"></div>"+
                                    "<div class='msg-ava-wrap'>"+
                                        "<img class='msg-ava' src='"+response[n]['ava']+"'/>"+
                                    "</div>"+
                                    "<span class='msg-date'>"+response[n]['date']+"</span>"+
                                    "<div class='msg-body'>"+
                                        "<span class='msg-alias'>"+response[n]['alias']+"</span>"+
                                        "<div class='msg-content-text'>"+
                                            "<a href='"+response[n]['file']+"' class='msg-file-btn' download>"+
                                                "<i class='msg-file-btn-icon'></i>"+
                                            "</a>"+
                                            "<div class='msg-doc-info'>"+
                                                "<div class='msg-doc-name-wrap'>"+
                                                    "<a href='"+ response[n]['file'] +"' class='msg-doc-name' title='" + response[n]['text'] + "' download>"+
                                                        "Файл "+ response[n]['text'] +
                                                    "</a>"+
                                                "</div>"+
                                                "<div class='msg-doc-acts-wrap'>"+
                                                    "<a href='"+response[n]['file']+"' class='msg-download' download>"+
                                                        "Download"+
                                                    "</a>"+
                                                "</div>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"); 
                    } else {
                        $(getElems.getClassElem('msgs-history-selected',0)).append("<div class='msg-wrap' onclick='msgsActs.msgsSelect("+response[n]['id']+")'>"+
                            "<div class='msg-wrap-big'>"+
                                "<div class='msg-content'>"+
                                    "<div class='msg-selector full-msg-selector' id="+response[n]['id']+"></div>"+
                                    "<div class='msg-ava-wrap'>"+
                                        "<img class='msg-ava' src='"+response[n]['ava']+"'/>"+
                                    "</div>"+
                                    "<span class='msg-date'>"+response[n]['date']+"</span>"+
                                    "<div class='msg-body'>"+
                                        "<span class='msg-alias'>"+response[n]['alias']+"</span>"+
                                        "<div class='msg-content-text'>"+
                                            "<span class='msg-text'>"+response[n]['text']+"</span>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"); 
                    }
                } else {

                    msgSize = 'min';

                    if(response[n]['file'] != undefined) {

                        $(getElems.getClassElem('msgs-history-selected',0)).append("<div class='msg-wrap' onclick='msgsActs.msgsSelect("+response[n]['id']+")'>"+
                            "<div class='msg-wrap-big'>"+
                                "<div class='msg-content'>"+
                                    "<i class='msg-selector' id="+response[n]['id']+"></i>"+
                                    "<span class='msg-date'>"+response[n]['date']+"</span>"+
                                    "<div class='msg-body msg-body-min'>"+
                                        "<div class='msg-content-text'>"+
                                            "<a href='"+response[n]['file']+"' class='msg-file-btn' download>"+
                                                "<i class='msg-file-btn-icon'></i>"+
                                            "</a>"+
                                            "<div class='msg-doc-info'>"+
                                                "<div class='msg-doc-name-wrap'>"+
                                                    "<a href='"+ response[n]['file'] +"' class='msg-doc-name' title='" + response[n]['text'] + "' download>"+
                                                        "Файл "+ response[n]['text'] +
                                                    "</a>"+
                                                "</div>"+
                                                "<div class='msg-doc-acts-wrap'>"+
                                                    "<a href='"+response[n]['file']+"' class='msg-download' download>"+
                                                        "Download"+
                                                    "</a>"+
                                                "</div>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"); 
                    } else {
                        $(getElems.getClassElem('msgs-history-selected',0)).append("<div class='msg-wrap' onclick='msgsActs.msgsSelect("+response[n]['id']+")'>"+
                            "<div class='msg-wrap-big'>"+
                                "<div class='msg-content'>"+
                                    "<i class='msg-selector' id="+response[n]['id']+"></i>"+
                                    "<span class='msg-date'>"+response[n]['date']+"</span>"+
                                    "<div class='msg-body msg-body-min'>"+
                                        "<div class='msg-content-text'>"+
                                            "<span class='msg-text'>"+response[n]['text']+"</span>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"); 
                    }
                }
            break;
            case 'unread':

                if(response[n]['sell'] != undefined) {
                    $(getElems.getClassElem('nano-content',0)).prepend("<div class='dialog-wrap' id=" + response[n]['sell'] + " onclick='msgsActs.showMsgsHistory(" + response[n]['sell'] + ")'>" +
                    "<img class='dialog-ava-wrap' src='" + response[n]['users_ava'] + "'/>" +
                    "<span id='dialog-seller'>" + response[n]['users_alias'] + "</span>" +
                    "<span id='dialog-date'>" + response[n]['date'] + "</span>" +
                    "<span id='dialog-last-msg'>" + response[n]['text'] + "</span>"+
                    "</div>");
                    dialogsActs.colorChange({id:response[n]['sell'],dialogColor:'rgb(70,90,124)'});
                }

                if(response[n]['alias'] != false && response[n]['alias'] != undefined) {

                    msgSize = 'full';

                    if(response[n]['file'] != undefined) {

                        $(getElems.getClassElem('msgs-history-selected',0)).append("<div class='msg-wrap' onclick='msgsActs.msgsSelect("+response[n]['id']+")'>"+
                            "<div class='msg-wrap-big msg-unread'>"+
                                "<div class='msg-content'>"+
                                    "<div class='msg-selector full-msg-selector' id="+response[n]['id']+"></div>"+
                                    "<div class='msg-ava-wrap'>"+
                                        "<img class='msg-ava' src='"+response[n]['ava']+"'/>"+
                                    "</div>"+
                                    "<span class='msg-date'>"+response[n]['date']+"</span>"+
                                    "<div class='msg-body'>"+
                                        "<span class='msg-alias'>"+response[n]['alias']+"</span>"+
                                        "<div class='msg-content-text'>"+
                                            "<a href='"+response[n]['file']+"' class='msg-file-btn' download>"+
                                                "<i class='msg-file-btn-icon'></i>"+
                                            "</a>"+
                                            "<div class='msg-doc-info'>"+
                                                "<div class='msg-doc-name-wrap'>"+
                                                    "<a href='"+ response[n]['file'] +"' class='msg-doc-name' title='" + response[n]['text'] + "' download>"+
                                                        "Файл "+ response[n]['text'] +
                                                    "</a>"+
                                                "</div>"+
                                                "<div class='msg-doc-acts-wrap'>"+
                                                    "<a href='"+response[n]['file']+"' class='msg-download' download>"+
                                                        "Download"+
                                                    "</a>"+
                                                "</div>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"); 
                    } else {
                        $(getElems.getClassElem('msgs-history-selected',0)).append("<div class='msg-wrap' onclick='msgsActs.msgsSelect("+response[n]['id']+")'>"+
                            "<div class='msg-wrap-big msg-unread'>"+
                                "<div class='msg-content'>"+
                                    "<div class='msg-selector full-msg-selector' id="+response[n]['id']+"></div>"+
                                    "<div class='msg-ava-wrap'>"+
                                        "<img class='msg-ava' src='"+response[n]['ava']+"'/>"+
                                    "</div>"+
                                    "<span class='msg-date'>"+response[n]['date']+"</span>"+
                                    "<div class='msg-body'>"+
                                        "<span class='msg-alias'>"+response[n]['alias']+"</span>"+
                                        "<div class='msg-content-text'>"+
                                            "<span class='msg-text'>"+response[n]['text']+"</span>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"); 
                    }
                } else {

                    msgSize = 'min';

                    if(response[n]['file'] != undefined) {

                        $(getElems.getClassElem('msgs-history-selected',0)).append("<div class='msg-wrap' onclick='msgsActs.msgsSelect("+response[n]['id']+")'>"+
                            "<div class='msg-wrap-big msg-unread'>"+
                                "<div class='msg-content'>"+
                                    "<i class='msg-selector' id="+response[n]['id']+"></i>"+
                                    "<span class='msg-date'>"+response[n]['date']+"</span>"+
                                    "<div class='msg-body msg-body-min'>"+
                                        "<div class='msg-content-text'>"+
                                            "<a href='"+response[n]['file']+"' class='msg-file-btn' download>"+
                                                "<i class='msg-file-btn-icon'></i>"+
                                            "</a>"+
                                            "<div class='msg-doc-info'>"+
                                                "<div class='msg-doc-name-wrap'>"+
                                                    "<a href='"+ response[n]['file'] +"' class='msg-doc-name' title='" + response[n]['text'] + "' download>"+
                                                        "Файл "+ response[n]['text'] +
                                                    "</a>"+
                                                "</div>"+
                                                "<div class='msg-doc-acts-wrap'>"+
                                                    "<a href='"+response[n]['file']+"' class='msg-download' download>"+
                                                        "Download"+
                                                    "</a>"+
                                                "</div>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"); 
                    } else {
                        $(getElems.getClassElem('msgs-history-selected',0)).append("<div class='msg-wrap' onclick='msgsActs.msgsSelect("+response[n]['id']+")'>"+
                            "<div class='msg-wrap-big msg-unread'>"+
                                "<div class='msg-content'>"+
                                    "<i class='msg-selector' id="+response[n]['id']+"></i>"+
                                    "<span class='msg-date'>"+response[n]['date']+"</span>"+
                                    "<div class='msg-body msg-body-min'>"+
                                        "<div class='msg-content-text'>"+
                                            "<span class='msg-text'>"+response[n]['text']+"</span>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"); 
                    }
                }

            break;
        }
        
        getElems.getClassElem('msgs-send-textarea',0).value = "";
        getElems.getClassElem('msgs-send-textarea',0).focus();

        var con2 = getElems.getClassElem('msgs-history-selected',0).scrollHeight;


        if(getElems.getClassElem('msgs-history-selected',0).scrollHeight > con) {
            getElems.getClassElem('msgs-history-selected',0).style.marginTop = "0px";
            this.scrollMsgs();
        } else {

            getElems.getClassElem('msgs-history-selected',0).style.marginTop = con - getElems.getClassElem('msgs-history-selected',0).scrollHeight - 30 + 'px';

            if(getElems.getClassElem('msgs-history-selected',0).scrollHeight > con) {
                getElems.getClassElem('msgs-history-selected',0).style.marginTop = "0px";
                this.scrollMsgs();
            }
        }
    },

    newMsgsPrepend: function(response,n,arr) {

        if(n == arr.length) {
            lastMsg = response[n]['id'];
            //alert(lastMsg);
        }

        switch(response[n]['status']) {
            case 'readed':

                if(response[n]['alias'] != false && response[n]['alias'] != undefined) {

                    if(response[n]['file'] != undefined) {

                        $(getElems.getClassElem('msgs-history-selected',0)).prepend("<div class='msg-wrap' onclick='msgsActs.msgsSelect("+response[n]['id']+")'>"+
                            "<div class='msg-wrap-big'>"+
                                "<div class='msg-content'>"+
                                    "<div class='msg-selector full-msg-selector' id="+response[n]['id']+"></div>"+
                                    "<div class='msg-ava-wrap'>"+
                                        "<img class='msg-ava' src='"+response[n]['ava']+"'/>"+
                                    "</div>"+
                                    "<span class='msg-date'>"+response[n]['date']+"</span>"+
                                    "<div class='msg-body'>"+
                                        "<span class='msg-alias'>"+response[n]['alias']+"</span>"+
                                        "<div class='msg-content-text'>"+
                                            "<a href='"+response[n]['file']+"' class='msg-file-btn' download>"+
                                                "<i class='msg-file-btn-icon'></i>"+
                                            "</a>"+
                                            "<div class='msg-doc-info'>"+
                                                "<div class='msg-doc-name-wrap'>"+
                                                    "<a href='"+ response[n]['file'] +"' class='msg-doc-name' title='" + response[n]['text'] + "' download>"+
                                                        "Файл "+ response[n]['text'] +
                                                    "</a>"+
                                                "</div>"+
                                                "<div class='msg-doc-acts-wrap'>"+
                                                    "<a href='"+response[n]['file']+"' class='msg-download' download>"+
                                                        "Download"+
                                                    "</a>"+
                                                "</div>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"); 
                    } else {
                        $(getElems.getClassElem('msgs-history-selected',0)).prepend("<div class='msg-wrap' onclick='msgsActs.msgsSelect("+response[n]['id']+")'>"+
                            "<div class='msg-wrap-big'>"+
                                "<div class='msg-content'>"+
                                    "<div class='msg-selector full-msg-selector' id="+response[n]['id']+"></div>"+
                                    "<div class='msg-ava-wrap'>"+
                                        "<img class='msg-ava' src='"+response[n]['ava']+"'/>"+
                                    "</div>"+
                                    "<span class='msg-date'>"+response[n]['date']+"</span>"+
                                    "<div class='msg-body'>"+
                                        "<span class='msg-alias'>"+response[n]['alias']+"</span>"+
                                        "<div class='msg-content-text'>"+
                                            "<span class='msg-text'>"+response[n]['text']+"</span>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"); 
                    }
                } else {

                    if(response[n]['file'] != undefined) {

                        $(getElems.getClassElem('msgs-history-selected',0)).prepend("<div class='msg-wrap' onclick='msgsActs.msgsSelect("+response[n]['id']+")'>"+
                            "<div class='msg-wrap-big'>"+
                                "<div class='msg-content'>"+
                                    "<i class='msg-selector' id="+response[n]['id']+"></i>"+
                                    "<span class='msg-date'>"+response[n]['date']+"</span>"+
                                    "<div class='msg-body msg-body-min'>"+
                                        "<div class='msg-content-text'>"+
                                            "<a href='"+response[n]['file']+"' class='msg-file-btn' download>"+
                                                "<i class='msg-file-btn-icon'></i>"+
                                            "</a>"+
                                            "<div class='msg-doc-info'>"+
                                                "<div class='msg-doc-name-wrap'>"+
                                                    "<a href='"+ response[n]['file'] +"' class='msg-doc-name' title='" + response[n]['text'] + "' download>"+
                                                        "Файл "+ response[n]['text'] +
                                                    "</a>"+
                                                "</div>"+
                                                "<div class='msg-doc-acts-wrap'>"+
                                                    "<a href='"+response[n]['file']+"' class='msg-download' download>"+
                                                        "Download"+
                                                    "</a>"+
                                                "</div>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"); 
                    } else {
                        $(getElems.getClassElem('msgs-history-selected',0)).prepend("<div class='msg-wrap' onclick='msgsActs.msgsSelect("+response[n]['id']+")'>"+
                            "<div class='msg-wrap-big'>"+
                                "<div class='msg-content'>"+
                                    "<i class='msg-selector' id="+response[n]['id']+"></i>"+
                                    "<span class='msg-date'>"+response[n]['date']+"</span>"+
                                    "<div class='msg-body msg-body-min'>"+
                                        "<div class='msg-content-text'>"+
                                            "<span class='msg-text'>"+response[n]['text']+"</span>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"); 
                    }
                }
            break;
    
            case 'unread':

                if(response[n]['alias'] != false && response[n]['alias'] != undefined) {

                    if(response[n]['file'] != undefined) {

                        $(getElems.getClassElem('msgs-history-selected',0)).prepend("<div class='msg-wrap' onclick='msgsActs.msgsSelect("+response[n]['id']+")'>"+
                            "<div class='msg-wrap-big msg-unread'>"+
                                "<div class='msg-content'>"+
                                    "<div class='msg-selector full-msg-selector' id="+response[n]['id']+"></div>"+
                                    "<div class='msg-ava-wrap'>"+
                                        "<img class='msg-ava' src='"+response[n]['ava']+"'/>"+
                                    "</div>"+
                                    "<span class='msg-date'>"+response[n]['date']+"</span>"+
                                    "<div class='msg-body'>"+
                                        "<span class='msg-alias'>"+response[n]['alias']+"</span>"+
                                        "<div class='msg-content-text'>"+
                                            "<a href='"+response[n]['file']+"' class='msg-file-btn' download>"+
                                                "<i class='msg-file-btn-icon'></i>"+
                                            "</a>"+
                                            "<div class='msg-doc-info'>"+
                                                "<div class='msg-doc-name-wrap'>"+
                                                    "<a href='"+ response[n]['file'] +"' class='msg-doc-name' title='" + response[n]['text'] + "' download>"+
                                                        "Файл "+ response[n]['text'] +
                                                    "</a>"+
                                                "</div>"+
                                                "<div class='msg-doc-acts-wrap'>"+
                                                    "<a href='"+response[n]['file']+"' class='msg-download' download>"+
                                                        "Download"+
                                                    "</a>"+
                                                "</div>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"); 
                    } else {
                        $(getElems.getClassElem('msgs-history-selected',0)).prepend("<div class='msg-wrap' onclick='msgsActs.msgsSelect("+response[n]['id']+")'>"+
                            "<div class='msg-wrap-big msg-unread'>"+
                                "<div class='msg-content'>"+
                                    "<div class='msg-selector full-msg-selector' id="+response[n]['id']+"></div>"+
                                    "<div class='msg-ava-wrap'>"+
                                        "<img class='msg-ava' src='"+response[n]['ava']+"'/>"+
                                    "</div>"+
                                    "<span class='msg-date'>"+response[n]['date']+"</span>"+
                                    "<div class='msg-body'>"+
                                        "<span class='msg-alias'>"+response[n]['alias']+"</span>"+
                                        "<div class='msg-content-text'>"+
                                            "<span class='msg-text'>"+response[n]['text']+"</span>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"); 
                    }
                } else {

                    if(response[n]['file'] != undefined) {

                        $(getElems.getClassElem('msgs-history-selected',0)).prepend("<div class='msg-wrap' onclick='msgsActs.msgsSelect("+response[n]['id']+")'>"+
                            "<div class='msg-wrap-big msg-unread'>"+
                                "<div class='msg-content'>"+
                                    "<i class='msg-selector' id="+response[n]['id']+"></i>"+
                                    "<span class='msg-date'>"+response[n]['date']+"</span>"+
                                    "<div class='msg-body msg-body-min'>"+
                                        "<div class='msg-content-text'>"+
                                            "<a href='"+response[n]['file']+"' class='msg-file-btn' download>"+
                                                "<i class='msg-file-btn-icon'></i>"+
                                            "</a>"+
                                            "<div class='msg-doc-info'>"+
                                                "<div class='msg-doc-name-wrap'>"+
                                                    "<a href='"+ response[n]['file'] +"' class='msg-doc-name' title='" + response[n]['text'] + "' download>"+
                                                        "Файл "+ response[n]['text'] +
                                                    "</a>"+
                                                "</div>"+
                                                "<div class='msg-doc-acts-wrap'>"+
                                                    "<a href='"+response[n]['file']+"' class='msg-download' download>"+
                                                        "Download"+
                                                    "</a>"+
                                                "</div>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"); 
                    } else {
                        $(getElems.getClassElem('msgs-history-selected',0)).prepend("<div class='msg-wrap' onclick='msgsActs.msgsSelect("+response[n]['id']+")'>"+
                            "<div class='msg-wrap-big msg-unread'>"+
                                "<div class='msg-content'>"+
                                    "<i class='msg-selector' id="+response[n]['id']+"></i>"+
                                    "<span class='msg-date'>"+response[n]['date']+"</span>"+
                                    "<div class='msg-body msg-body-min'>"+
                                        "<div class='msg-content-text'>"+
                                            "<span class='msg-text'>"+response[n]['text']+"</span>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"); 
                    }
                }
            break;
        } 
    },

    sendMsgFromKey: function(e) {
        if(e.keyCode == "13") {
            //alert(lastMsg);
            getElems.getClassElem('msgs-history-send-btn',0).click();
            xhr({type:'POST',url:urls.deleteWriterStatusUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('msgs-history-typing-wrap',0)});
        }
    },

    appendPeerWrap: function(j) {

        getElems.getClassElem('tg-head-main-peer-wrap',0).innerHTML = "<div class='tg-head-peer-dropdown' onclick='msgsActs.showUsersInf("+j+")'>"+
        "<span class='tg-head-peer-title'>"+j['alias']+"</span>"+
        "<span class='tg-head-peer-status'>"+j['status']+"</span>"+
        "</div>"+
        "<div class='tg-head-media-dropdown' onclick='msgsActs.showHistoryMedia()'><span class='tg-head-media-title'>Медия</span></div>"+
        "<div class='tg-head-set-dropdown' onclick='msgsActs.showHistorySet()'><span class='tg-head-set-title'>Редактировать</span></div>";

        getElems.getClassElem('msgs-ava-interlocutor',0).innerHTML = "<img class='msgs-ava-style' src=" + j['ava'] + " width='54' height='54'/>";

        avaInterlocutor = j['ava'];

        xhr({type:'POST',url:urls.receiptMyInfUrl,sendContent:0,elem:0});
    },

    showUsersInf: function(j) {

    },

    writerStatus: function(t) {
        if(t.value != "") {
            if(window.textAreaValue != 1) {
                window.textAreaValue = 1;
                xhr({type:'POST',url:urls.writerStatusUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('msgs-history-typing-wrap',0)});
            }
        } else {
            window.textAreaValue = 0;
            xhr({type:'POST',url:urls.deleteWriterStatusUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('msgs-history-typing-wrap',0)});
        }    
    },

    showHistoryMedia: function() {

    },

    showHistorySet: function() {

    },

    scrollMsgs: function() {
        $('.nano').nanoScroller();
        getElems.getClassElem('nano-content',1).scrollTop = getElems.getClassElem('nano-content',1).scrollHeight;
    },

    getMoreMsgs: function(t) {
        if(loadMore != false) {
            if(t.scrollTop == 0) {
            //if(t.scrollTop <= 10) {
                //alert(lastMsg);
                xhr({type:'POST',url:urls.getMoreMsgsUrl + window.location.search,sendContent:'lastMsg=' + encodeURIComponent(lastMsg),elem:getElems.getClassElem('nano-content',1)});
            }
        }
    },

    parseJson: function(j) {

        var h = 0;
        var n = 0;

        var msgsLength = new Array();
        var msgsLengthArr = new Array();

        for(var key in j) {
            msgsLengthArr[h++] = key;
            msgsLength[h - 1] = key;
        }

        //++i;
 
        for(var i = 0; i < msgsLength.length; ++i) {
            ++n;
            msgsArr[j[n]['id']] = [];
            this.msgsHistoryAppend(j,n,msgsLengthArr);
        }
    },

    parseNewMsgs: function(j) {

        var h = 0;
        var n = 0;

        var msgsLength = new Array();
        var msgsLengthArr = new Array();

        for(var key in j) {
            msgsLengthArr[h++] = key;
            msgsLength[h - 1] = key;
        }
 
        for(var i = 0; i < msgsLength.length; ++i) {
            ++n;
            msgsArr[j[n]['id']] = [];
            this.newMsgsPrepend(j,n,msgsLengthArr);
        }
    },   
};

var dialogsActs = {
    colorChange: function(params) {

        var dialog = getElems.getIdElem(params.id);
        var spans = getElems.getTagElem(dialog,'span');
        
        switch(params.dialogColor) {

            case 'rgb(70,90,124)':

                dialog.style.background = params.dialogColor;
            
                for (var i = 0; i < spans.length; i++) {
                    spans[i].style.color = '#fff';     
                }
            break;
        
            case '#fff':
                var colorValues = ["#000","#999","#666"];
        
                dialog.style.background = 'transparent';
            
                for (var i = 0; i < spans.length; i++) {  
                    spans[i].style.color = colorValues[i];  
                }
            break;
        }
    },

    parseJson: function(j) {
        var a = 0;
        var c = 0;
    
        for(var key in j) {
            dialogsLengthArr[a++] = key;
        }
    
        for(var i = 0; i < dialogsLengthArr.length; ++i) {

            ++c;

            dialogsArr[j[c]['id']] = [j[c]['ava'],j[c]['alias'],j[c]['date'],j[c]['text']];

            $(getElems.getClassElem('nano-content',0)).append("<div class='dialog-wrap' id=" + j[c]['id'] + " onclick='msgsActs.showMsgsHistory(" + j[c]['id'] + ")'>" +
            "<img class='dialog-ava-wrap' src='" + j[c]['ava'] + "'/>" +
            "<span id='dialog-seller'>" + j[c]['alias'] + "</span>" +
            "<span id='dialog-date'>" + j[c]['date'] + "</span>" +
            "<span id='dialog-last-msg'>" + j[c]['text'] + "</span>" +
            "</div>");

            if(c == dialogsLengthArr.length) lastDialog = j[c]['n'];
        }
    },

    getMoreDialogs: function(t) {
        if(t.scrollTop >= getElems.getClassElem("nano-content",0).scrollHeight - 20) {
            xhr({type:'POST',url:urls.getMoreMsgsUrl + window.location.search,sendContent:'lastDialog=' + encodeURIComponent(lastDialog),elem:getElems.getClassElem('nano-content',1)});
        }
    },
};

function nanoStyle() {
    if(getElems.getClassElem('nano-pane',0) != false) {
        getElems.getClassElem('nano-pane',0).style.right = "0px";
        getElems.getClassElem('nano-pane',0).style.width = "2px";
    }
}

function receiptInf() {
    xhr({type:'POST',url:urls.receiptUsersInfUrl + window.location.search,sendContent:0,elem:0});
}

function showDialogs() {
    xhr({type:'POST',url:urls.showDialogsUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('nano-content',0)});
}

//function reloadReceivedMsg() {
//    xhr({type:'POST',url:urls.showDialogsUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('nano-content',0)});
//}

function xhr(params) {

    if(window.load != true) {

        var xhr = new XMLHttpRequest();
        
        //xhr.onprogress = function() {};

        window.load = true;
        
        switch(params.url) {
            case urls.showDialogsUrl + window.location.search:
                xhr.onload = xhr.onerror = function() {
                    if (this.status == 200) {

                        window.load = false; 

                        if(xhr.responseText != 0) {
    
                            dialogsActs.parseJson(JSON.parse(xhr.responseText));
        
                            if(window.location.search != "") {
                                if(getElems.getIdElem(getUrlParam(location.search, 'sell')) != false) {
                                    clicked = getUrlParam(location.search, 'sell');
                                    dialogsActs.colorChange({id:clicked,dialogColor:'rgb(70,90,124)'});

                                    //xhr = null;
                                }
                            } else {

                            }

                        } else {
                            window.loadDialogs = false;
                            $(getElems.getClassElem('nano-content',0)).append("<span class='empty-dialogs'>У вас пока что нет ни одного диалога</span>");
                        }
                    } else {
                        //alert(xhr.status + ': ' + xhr.statusText);
                        alert("Unable to connect to server! Try again later...");
                    }
                };
            break;
    
            case urls.showMsgsHistoryUrl + window.location.search:

                xhr.onprogress = function() {
                    $(params.elem).innerHTML = "<div class='main-msgs-history-preload'></div>";
                };

                xhr.onload = xhr.onerror = function() {
                    if (this.status == 200) {

                        window.load = false; 

                        params.elem.innerHTML = "";

                        receiptInf();
    
                        if(xhr.responseText == "<span class='msgs-col-error'>Переписка пуста.</span>") {
                            $(params.elem).append(xhr.responseText);

                            msgsActs.scrollMsgs();
                        } else {
                            msgsActs.parseJson(JSON.parse(xhr.responseText));
                            msgsActs.scrollMsgs();
                        }


                        (window.location.search != "") ? getElems.getClassElem('msgs-send-form-wrap',0).style.visibility='visible' : getElems.getClassElem('msgs-send-form-wrap',0).style.visibility='hidden';
                        getElems.getClassElem('msgs-send-textarea',0).focus();  
                    } else {
                        alert(xhr.status + ': ' + xhr.statusText);
                    }
                };
            break;
    
            case urls.sendMsgUrl + window.location.search:
                xhr.onload = xhr.onerror = function() {
                    if (this.status == 200) {

                        window.load = false;

                        //alert(xhr.responseText);

                        msgsActs.parseJson(JSON.parse(xhr.responseText));
                        
                        msgsActs.scrollMsgs();

                        getElems.getClassElem('msgs-send-textarea',0).value = "";
                    } else {
                        alert(xhr.status + ': ' + xhr.statusText);
                    }
                }; 
            break;
    
            case urls.logOutUrl: 
                xhr.onload = xhr.onerror = function() {
                    if (this.status == 200) {

                        window.load = false;

                        window.location.href = '//test/test3/logIn/come.php';
                    } else {
                        alert(xhr.status + ': ' + xhr.statusText);
                    }
                }; 
            break;
    
            case urls.getMoreMsgsUrl + window.location.search:
                xhr.onload = xhr.onerror = function() {
                    if (this.status == 200) {

                        window.load = false;

                        if(xhr.responseText != 0) {

                            var fromBottom = params.elem.scrollHeight - params.elem.scrollTop;

                            msgsActs.parseNewMsgs(JSON.parse(xhr.responseText));

                            $('.nano').nanoScroller();

                            params.elem.scrollTop = params.elem.scrollHeight - fromBottom;

                        } else {

                            loadMore = false;

                            //$(getElems.getClassElem('msgs-history-selected',0)).prepend("<div class='more'>Больше нет.</div>");

                            //<div class='unread-msgs-title'>Unread messages</div>

                            //$(getElems.getClassElem('msgs-history-selected',0)).prepend("<div class='unread-msgs-title'>Больше нет.</div>");
                        }
                    } else {
                        alert(xhr.status + ': ' + xhr.statusText);
                    }
                }; 
            break;

            case urls.writerStatusUrl + window.location.search:
                xhr.onload = xhr.onerror = function() {
                    window.load = false;
                    if (this.status != 200) {
                        alert(xhr.status + ': ' + xhr.statusText);
                    }
                };
            break;

            case urls.deleteWriterStatusUrl + window.location.search:
                xhr.onload = xhr.onerror = function() {
                    window.load = false;
                    if (this.status != 200) {
                        alert(xhr.status + ': ' + xhr.statusText);
                    }
                };
            break;

            case urls.checkWriterStatusUrl + window.location.search:
                xhr.onload = xhr.onerror = function() {
                    if (this.status == 200) {

                        window.load = false;

                        if(xhr.responseText == true) {
                            getElems.getClassElem('msgs-history-typing-wrap-text',0).innerHTML = window.dialogsArr[getUrlParam(location.search, 'sell')][1] + " набирает сообщение...";
                        } else {
                            getElems.getClassElem('msgs-history-typing-wrap-text',0).innerHTML = "";
                        }
                    } else {
                        alert(xhr.status + ': ' + xhr.statusText);
                    }
                }; 
            break;

            case urls.checkNewMsgsUrl + window.location.search:
                xhr.onload = xhr.onerror = function() {
                    if(this.status == 200) {

                        window.load = false;

                        //alert(xhr.responseText);

                        if(xhr.responseText != 'nothing') {

                            //if(xhr.responseText != 'error') {
    
                                if(xhr.responseText != false) {
    
                                    //alert(xhr.responseText);
    
                                    msgsActs.parseJson(JSON.parse(xhr.responseText));
                                     
                                    msgsActs.scrollMsgs();
    
                                    //reloadReceivedMsg();
    
                                } else {
                                    return false;
                                }
                            //} else {
//    
                            //}
                        } else {
                            return false;
                        }
                    } else {
                        alert(xhr.status + ': ' + xhr.statusText);
                    }
                };
            break;

            case urls.receiptUsersInfUrl + window.location.search:
                xhr.onload = xhr.onerror = function() {
                    if(this.status == 200) {

                        window.load = false;

                        if(xhr.responseText != 0) {

                            usersInf = JSON.parse(xhr.responseText);
    
                            msgsActs.appendPeerWrap(JSON.parse(xhr.responseText));

                        } else {
                            alert('Error: Is imposible to receive information.');
                        }
                    } else {
                        alert(xhr.status + ': ' + xhr.statusText);
                    }
                };
            break;

            case urls.receiptMyInfUrl:
                xhr.onload = xhr.onerror = function() {
                    if(this.status == 200) {

                        window.load = false;

                        if(xhr.responseText !=  'It seems that session is expired! Try to go through auentification again.') {

                            if(xhr.responseText != 0) {
    
                                myArr = JSON.parse(xhr.responseText);
        
                                getElems.getClassElem('msgs-ava-main-seller',0).innerHTML = "<img class='msgs-ava-style' src=" + myArr['ava'] + " width='54' height='54'/>";

                                avaMainSell = myArr['ava'];

                            } else {
                                alert('Error: Is imposible to receive information.');
                            }
                        } else {
                            alert(xhr.responseText);
                        }
                    } else {
                        alert(xhr.status + ': ' + xhr.statusText);
                    }
                };
            break;

            case urls.sendFileUrl + window.location.search:
                xhr.onload = xhr.onerror = function() {
                    if(this.status == 200) {

                        window.load = false;

                        //alert(xhr.responseText);

                        msgsActs.parseJson(JSON.parse(xhr.responseText));
                        
                        msgsActs.scrollMsgs();

                        getElems.getClassElem('msgs-send-textarea',0).value = "";
                    } else {
                        alert(xhr.status + ': ' + xhr.statusText);
                    }
                };
            break;
        }
        
        xhr.open(params.type,params.url,true);

        if(params.url != urls.sendFileUrl) {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        
        if(params.sendContent != 0) {
            xhr.send(params.sendContent);
        } else {
            xhr.send();
        }
    } else {
        return false;
    }
};

window.onpopstate = function() {

    getElems.getClassElem('tg-head-main-peer-wrap',0).innerHTML = "";

    if(clicked != undefined) {
        dialogsActs.colorChange({id:clicked,dialogColor:'#fff'});
    }

    if(window.location.search != "") {

       if(getElems.getIdElem(getUrlParam(location.search, 'sell')) != false) {
            clicked = getUrlParam(location.search, 'sell');
            dialogsActs.colorChange({id:clicked,dialogColor:'rgb(70,90,124)'});
        }

        xhr({type:'POST',url:urls.showMsgsHistoryUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('nano-content',1)});

    } else {

        getElems.getClassElem('nano-content',1).innerHTML = "";
        getElems.getClassElem('msgs-send-form-wrap',0).style.visibility='hidden';

        $(getElems.getClassElem('nano-content',1)).append("<span class='msgs-col-error'>Выберите диалог для начала общения</span>");
        msgsActs.scrollMsgs();
    }
};

window.onload = function() {

    $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
      alert(JSON.stringify(data, null, 2));
    });

    $('.nano').nanoScroller();

    xhr({type:'POST',url:urls.showDialogsUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('nano-content',0)});

    if(window.location.search != "") {
        if(window.load == true) {

            window.load = false;

            xhr({type:'POST',url:urls.showMsgsHistoryUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('nano-content',1)});

            //checkNewMsgs = setInterval(function() {
            //    xhr({type:'POST',url:urls.checkNewMsgsUrl + window.location.search,sendContent:0,elem:0});
            //},2000);
        }
    } else {
        $(getElems.getClassElem('nano-content',1)).append("<span class='msgs-col-error'>Выберите диалог для начала общения</span>");
    }
};

