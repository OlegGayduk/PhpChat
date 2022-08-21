var lastMsg;

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