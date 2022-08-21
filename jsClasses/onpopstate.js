window.onpopstate = function() {
    if(window.location.search != "") {
        xhr({type:'POST',url:urls.showMsgsHistoryUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('nano-content',1)});
    } else {
        getElems.getClassElem('nano-content',1).innerHTML = "";
        getElems.getClassElem('msgs-send-form-wrap',0).style.visibility='hidden';
        $(getElems.getClassElem('nano-content',1)).append("<span class='msgs-col-error'>Выберите диалог для начала общения</span>");
        msgsActions.scrollMsgs();

        clearInterval(checkWriterStatus);
        clearInterval(checkNewMsgs);

        checkWriterStatus = false;
        checkNewMsgs = false;
    }

    dialogsActions.colorChange({id:window.clicked,dialogColor:'#fff'});

    if(window.location.search != "") {

        if(checkWriterStatus == false && checkNewMsgs == false) {
            checkWriterStatus = setInterval(function() {
                xhr({type:'POST',url:urls.checkWriterStatusUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('msgs-history-typing-wrap',0)});
            },2000);
            
            checkNewMsgs = setInterval(function() {
                xhr({type:'POST',url:urls.checkNewMsgsUrl + window.location.search,sendContent:0,elem:0});
            },3000);
        } 

        window.clicked = getUrlParam(location.search, 'sell');
        dialogsActions.colorChange({id:window.clicked,dialogColor:'rgb(70,90,124)'});
    }
};