window.onload = function() {
    xhr({type:'POST',url:urls.showDialogsUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('nano-content',0)});

    if(window.location.search != "") {
        if(window.load == true) {
            window.load = false;
            xhr({type:'POST',url:urls.showMsgsHistoryUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('nano-content',1)});
            
            checkWriterStatus = setInterval(function() {
                xhr({type:'POST',url:urls.checkWriterStatusUrl + window.location.search,sendContent:0,elem:getElems.getClassElem('msgs-history-typing-wrap',0)});
            },2000);
        }
    } else {
        $(getElems.getClassElem('nano-content',1)).append("<span class='msgs-col-error'>Выберите диалог для начала общения</span>");
    }
};