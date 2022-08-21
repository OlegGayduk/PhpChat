function xhr(params) {

    if(window.load != true) {

        var xhr = new XMLHttpRequest();
        
        xhr.onprogress = function() {};

        window.load = true;
        
        switch(params.url) {
            case urls.showDialogsUrl + window.location.search:
                xhr.onload = xhr.onerror = function() {
                    if (this.status == 200) {

                        window.load = false; 
    
                        if(xhr.responseText != 0) {
    
                            dialogsActions.parseJson(JSON.parse(xhr.responseText));
        
                            if(window.location.search != "") {
                                if(getElems.getIdElem(getUrlParam(location.search, 'sell')) != undefined) {
                                    window.clicked = getUrlParam(location.search, 'sell');
                                    dialogsActions.colorChange({id:window.clicked,dialogColor:'rgb(70,90,124)'});
                                }
                            }
                        } else {
                            $(getElems.getClassElem('nano-content',0)).append("<span class='empty-dialogs'>У вас пока что нет ни одного диалога</span>");
                        }
                    } else {
                        alert(xhr.status + ': ' + xhr.statusText);
                    }
                };
            break;
    
            case urls.showMsgsHistoryUrl + window.location.search:
                xhr.onload = xhr.onerror = function() {
                    if (this.status == 200) {

                        window.load = false; 
    
                        params.elem.innerHTML = "";
    
                        msgsActions.appendPeerWrap();
    
                        if(xhr.responseText == "<span class='msgs-col-error'>Переписка пуста.</span>") {
                            $(params.elem).append(xhr.responseText);
                            msgsActions.scrollMsgs();
                        } else {
                            msgsActions.parseJson(JSON.parse(xhr.responseText));
                            msgsActions.scrollMsgs();
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

                        msgsActions.parseJson(JSON.parse(xhr.responseText));
                        
                        msgsActions.scrollMsgs();

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
    
            case urls.getMoreMsgsUrl:
                xhr.onload = xhr.onerror = function() {
                    if (this.status == 200) {
                        window.load = false;
                        var fromBottom = elem.scrollHeight - elem.scrollTop;
                        $(params.elem).prepend(xhr.responseText);
                        $('.nano').nanoScroller();
                        elem.scrollTop = elem.scrollHeight - fromBottom;
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
                            getElems.getClassElem('msgs-history-typing-wrap-text',0).innerHTML = window.dialogsArr[getUrlParam(location.search, 'sell')][1] + " íàáèðàåò ñîîáùåíèå...";
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

                        if(xhr.responseText != 'error') {

                            if(xhr.responseText != false) {

                                msgsActions.parseJson(JSON.parse(xhr.responseText));

                                msgsActions.scrollMsgs();
                            } else {
                                return false;
                            }
                        } else {
                            //alert('error');
                        }
                    } else {
                        alert(xhr.status + ': ' + xhr.statusText);
                    }
                };
            break;
        }
        
        xhr.open(params.type,params.url,true);
        
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        if(params.sendContent != 0) {
            xhr.send(params.sendContent);
        } else {
            xhr.send();
        }
    } else {
        return false;
    }
};