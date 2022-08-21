var menuActions = {
    openMenuAction:function() {
        if(getElems.getClassElem('tg-dropdown-menu-wrap',0) != false && getElems.getClassElem('tg-dropdown-menu-wrap',0).style.height == '220px'){
            getElems.getClassElem('tg-dropdown-menu-wrap',0).style.visibility='hidden';
            getElems.getClassElem('tg-dropdown-menu-wrap',0).style.height='0px';
        } else {
            getElems.getClassElem('tg-dropdown-menu-wrap',0).style.height='220px';
            getElems.getClassElem('tg-dropdown-menu-wrap',0).style.visibility='visible';
        }
    },
    openSetBarAction:function() {
        getElems.getClassElem('set-bar-wrap',0).innerHTML = "<div class='set-modal-head'>"+
        "<span class='set'>Настройки</span>"+
        "<span class='close-set-wrap' onclick='menuActions.closeSetBarAction()'>Закрыть</span>"+
        "<div class='ava'></div><span class='alias-set'>ZeroCool</span>"+
        "<div class='select-ava' onclick='avaUploadActions.beginFileUpload(this);'>"+
        "<form name='avaSet' id='upload' method='post' enctype='multipart/form-data'>"+
        "<div id='drop'>"+
        "<div class='camera'>"+
        "<div class='circle'>"+
        "</div></div><input id='ava-set-file' type='file' name='fupload' multiple  accept='image/jpeg,image/png,image/gif' onchange='avaUploadActions.fileUpload(this);'/></div></form></div></div>";

        getElems.getClassElem('set-bar-wrap',0).style.visibility = 'visible';
        getElems.getClassElem('back',0).style.visibility = 'visible';
    
        getElems.getClassElem('tg-dropdown-menu-wrap',0).style.visibility='hidden';
        getElems.getClassElem('tg-dropdown-menu-wrap',0).style.height='0px';
    },
    closeSetBarAction:function() {
        getElems.getClassElem('back',0).style.visibility = 'hidden';
        getElems.getClassElem('set-bar-wrap',0).style.visibility = 'hidden';
    },
    logOutAction:function() {
        xhr({type:'POST',url:urls.logOutUrl,sendContent:0,elem:0});
    },
};