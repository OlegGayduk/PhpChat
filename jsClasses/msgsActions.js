var msgsActions = {

    showMsgsHistory: function(id) {

        getElems.getClassElem('msgs-ava-main-seller',0).innerHTML = "<img class='msgs-ava-style' src=" + dialogsArr[id][0] + " width='60' height='60'/>";

        if(window.clicked != id) window.history.pushState("", "", '?sell='+ id); 

        window.history.replaceState("", "", '?sell='+ id);
    
        dialogsActions.colorChange({id:window.clicked,dialogColor:'#fff'});
    
        window.clicked = id;
    
        dialogsActions.colorChange({id:window.clicked,dialogColor:'rgb(70,90,124)'});
    
        xhr({type:'POST',url:urls.showMsgsHistoryUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('nano-content',1)});

        checkWriterStatus = setInterval(function() {
            xhr({type:'POST',url:urls.checkWriterStatusUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('msgs-history-typing-wrap',0)});
        },2000);
        
        checkNewMsgs = setInterval(function() {
            xhr({type:'POST',url:urls.checkNewMsgsUrl + window.location.search,sendContent:0,elem:0});
        },5000);

    },

    msgsSelect: function(id) {
        if(getElems.getIdElem(id).style.visibility != 'visible') {

            getElems.getIdElem(id).style.visibility = 'visible';
    
            arr[i++] = id;
    
            ++count;

            getElems.getClassElem('msgs-send-form-wrap',0).innerHTML = "<div class='msgs-history-forward-btn'>Переслать <span style='color:#b9cfe3'>" + count + "</span></div>" +
            "<div class='msgs-history-repeat-btn'>Повторить <span style='color:#b9cfe3'>" + count + "</span></div>" +
            "<div class='msgs-history-delete-btn'>Удалить <span style='color:#b9cfe3'>" + count + "</span></div>" +
            "<div class='msgs-history-cancel-btn' onclick='msgsActions.selectCancel()'>Отмена</div>";
        } else {
            getElems.getIdElem(id).style.visibility = 'hidden';
            --count;
            if(count == 0) {
                getElems.getClassElem('msgs-send-form-wrap',0).innerHTML = "<form id='msgs-send-form' method='post'>" +
                "<textarea class='msgs-send-textarea' placeholder='Напишите сообщение...' name='text'></textarea>" +
                "<span type='submit' class='msgs-history-send-btn' onclick='msgsActions.sendMsgMain(event)'>ОТПРАВИТЬ</span></form>";                
                getElems.getClassElem('msgs-send-textarea',0).focus();
            } else {
                getElems.getClassElem('msgs-send-form-wrap',0).innerHTML = "<div class='msgs-history-forward-btn'>Переслать <span style='color:#b9cfe3'>" + count + "</span></div>" +
                "<div class='msgs-history-repeat-btn'>Повторить <span style='color:#b9cfe3'>" + count + "</span></div>" +
                "<div class='msgs-history-delete-btn'>Удалить <span style='color:#b9cfe3'>" + count + "</span></div>" +
                "<div class='msgs-history-cancel-btn' onclick='msgsActions.selectCancel()'>Отмена</div>";
            }
        }
    },

    selectCancel: function() {

        for(i = 0;i < arr.length;i++){
            getElems.getIdElem(arr[i]).style.visibility = 'hidden';
        }

        count = 0;

        getElems.getClassElem('msgs-send-form-wrap',0).innerHTML = "<form id='msgs-send-form' method='post'>" +
        "<textarea class='msgs-send-textarea' placeholder='Напишите сообщение...' name='text'></textarea>" +
        "<span type='submit' class='msgs-history-send-btn' onclick='msgsActions.sendMsgMain(event)'>ОТПРАВИТЬ</span></form>";

        getElems.getClassElem('msgs-send-textarea',0).focus();
    },

    sendMsgMain: function(e) {
        if(window.location.search != "") {
            if(getElems.getClassElem('msgs-send-textarea',0) != false && getElems.getClassElem('msgs-send-textarea',0).value != '') {
                if(getElems.getClassElem('msgs-col-error',0) != false) getElems.getClassElem('nano-content',1).innerHTML = "";

                e.preventDefault();

                xhr({type:'POST',url:urls.sendMsgUrl + window.location.search,sendContent:'text=' + encodeURIComponent(getElems.getClassElem('msgs-send-textarea',0).value) + '&date=' + encodeURIComponent(getDate()),elem:0});

                xhr({type:'POST',url:urls.deleteWriterStatusUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('msgs-history-typing-wrap',0)});
            } else {
                getElems.getClassElem('msgs-send-textarea',0).focus();
            }
        } else {
            return false;
        }
    },

    msgsHistoryAppend: function(response,n) {
        if(getElems.getClassElem('msgs-history-selected',0) != false) {

            var firstHeight = getElems.getClassElem('msgs-history-selected',0).scrollHeight;

            switch(response[n]['status']) {
                case 'readed':
                     if(response[n]['alias'] != false) {
                        $(getElems.getClassElem('msgs-history-selected',0)).append("<div class='msg-wrap'>"+
                        "<span class='msg-text'>"+response[n]['text']+"</span>"+
                        "<span class='msg-date'>"+response[n]['date']+"</span>"+
                        "</div>"); 
                    } else {
                        $(getElems.getClassElem('msgs-history-selected',0)).append("<div class='msg-wrap'>"+
                        "<span class='msg-text'>"+response[n]['text']+"</span>"+
                        "<span class='msg-date'>"+response[n]['date']+"</span>"+
                        "</div>"); 
                    }
                break;

                case 'unread':
                    if(response[n]['alias'] != false) {
                        $(getElems.getClassElem('msgs-history-selected',0)).append("<div class='msg-wrap msg-unread'>"+
                        "<span class='msg-text'>"+response[n]['text']+"</span>"+
                        "<span class='msg-date'>"+response[n]['date']+"</span>"+
                        "</div>"); 
                    } else {
                        $(getElems.getClassElem('msgs-history-selected',0)).append("<div class='msg-wrap msg-unread'>"+
                        "<span class='msg-text'>"+response[n]['text']+"</span>"+
                        "<span class='msg-date'>"+response[n]['date']+"</span>"+
                        "</div>"); 
                    }
                break;
            }
            
            if(getElems.getClassElem('msgs-history-typing-wrap',0) == false && n == msgsLengthArr.length) {
                $(getElems.getClassElem('nano-content',1)).append("<div class='msgs-history-typing-wrap'><span class='msgs-history-typing-wrap-text'></span></div>");
            }   
            
            getElems.getClassElem('msgs-send-textarea',0).value = "";
            getElems.getClassElem('msgs-send-textarea',0).focus();

            var con = getElems.getClassElem('nano-content',1).scrollHeight;

            var cont = getElems.getClassElem('nano-content',1).scrollHeight - getElems.getClassElem('msgs-history-selected',0).scrollHeight;
            var secondHeight = getElems.getClassElem('msgs-history-selected',0).scrollHeight - firstHeight;
    
            if(getElems.getClassElem('msgs-history-selected',0).scrollHeight >= con) {
                getElems.getClassElem('msgs-history-selected',0).style.marginTop = "0px";
                this.scrollMsgs();
            } else {
                getElems.getClassElem('msgs-history-selected',0).style.marginTop = cont - secondHeight + 'px';
                if(getElems.getClassElem('msgs-history-selected',0).scrollHeight >= con) {
                    getElems.getClassElem('msgs-history-selected',0).style.marginTop = "0px";
                    this.scrollMsgs();
                }
            }
        } else {

            $(getElems.getClassElem('nano-content',1)).append("<div class='msgs-history-selected'></div>");
    
            var firstHeight = getElems.getClassElem('msgs-history-selected',0).scrollHeight;
    
            switch(response[n]['status']) {
                case 'readed':
                     if(response[n]['alias'] != false) {
                        $(getElems.getClassElem('msgs-history-selected',0)).append("<div class='msg-wrap'>"+
                        "<span class='msg-text'>"+response[n]['text']+"</span>"+
                        "<span class='msg-date'>"+response[n]['date']+"</span>"+
                        "</div>"); 
                    } else {
                        $(getElems.getClassElem('msgs-history-selected',0)).append("<div class='msg-wrap'>"+
                        "<span class='msg-text'>"+response[n]['text']+"</span>"+
                        "<span class='msg-date'>"+response[n]['date']+"</span>"+
                        "</div>"); 
                    }
                break;
    
                case 'unread':
                    if(response[n]['alias'] != false) {
                        $(getElems.getClassElem('msgs-history-selected',0)).append("<div class='msg-wrap msg-unread'>"+
                        "<span class='msg-text'>"+response[n]['text']+"</span>"+
                        "<span class='msg-date'>"+response[n]['date']+"</span>"+
                        "</div>"); 
                    } else {
                        $(getElems.getClassElem('msgs-history-selected',0)).append("<div class='msg-wrap msg-unread'>"+
                        "<span class='msg-text'>"+response[n]['text']+"</span>"+
                        "<span class='msg-date'>"+response[n]['date']+"</span>"+
                        "</div>"); 
                    }
                break;
            }  
            
            if(getElems.getClassElem('msgs-history-typing-wrap',0) == false && msgsLengthArr.length == 1) {
                $(getElems.getClassElem('nano-content',1)).append("<div class='msgs-history-typing-wrap'><span class='msgs-history-typing-wrap-text'></span></div>");
            }                  
            
            getElems.getClassElem('msgs-send-textarea',0).value = "";
            getElems.getClassElem('msgs-send-textarea',0).focus();
    
            var cont = getElems.getClassElem('nano-content',1).scrollHeight - getElems.getClassElem('msgs-history-selected',0).scrollHeight;
            
            getElems.getClassElem('msgs-history-selected',0).style.marginTop = cont - firstHeight + 'px';
        }
    },

    sendMsgFromKey: function(e) {
        if(e.keyCode == "13") {
            getElems.getClassElem('msgs-history-send-btn',0).click();
            xhr({type:'POST',url:urls.deleteWriterStatusUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('msgs-history-typing-wrap',0)});
        }
    },

    appendPeerWrap: function() {

        getElems.getClassElem('tg-head-main-peer-wrap',0).innerHTML = "<div class='tg-head-peer-dropdown'>"+
        "<span class='tg-head-peer-title'>"+"</span>"+
        "<span class='tg-head-peer-status'>был(а) в сети сегодня в 17:27</span>"+
        "</div>"+
        "<div class='tg-head-media-dropdown' onclick='msgsActions.showHistoryMedia()'><span class='tg-head-media-title'>Медия</span></div>"+
        "<div class='tg-head-set-dropdown' onclick='msgsActions.showHistorySet()'><span class='tg-head-set-title'>Редактировать</span></div>";

        getElems.getClassElem('tg-head-peer-title',0).innerHTML = window.dialogsArr[getUrlParam(location.search, 'sell')][1];
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

    scrollMsgs: function() {
        $('.nano').nanoScroller();
        getElems.getClassElem('nano-content',1).scrollTop = getElems.getClassElem('nano-content',1).scrollHeight;
    },

    parseJson: function(j) {
        var h = 0;
        var n = 0;

        var msgsLength = new Array();

        for(var key in j) {
            msgsLengthArr[h++] = key;
            msgsLength[h - 1] = key;
        }
 
        for(var i = 0; i < msgsLength.length; ++i) {
            ++n;
            msgsArr[j[n]['id']] = [];
            this.msgsHistoryAppend(j,n);
        }
    },
};