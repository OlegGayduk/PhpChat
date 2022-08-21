var dialogsActions = {
    colorChange: function(params) {
        if(getElems.getIdElem(params.id) != undefined && params.id != undefined) {

            var dialog = getElems.getIdElem(params.id);
            var spans = getElems.getTagElem(dialog,'span');
        
            switch(params.dialogColor) {
                case 'rgb(70,90,124)':
                    dialog.style.background=params.dialogColor;
                
                    for (var i = 0; i < spans.length; i++) {
                        spans[i].style.color = '#fff';     
                    }
                break;
        
                case '#fff':
                    var colorValues = ["#000","#999","#666"];
        
                    dialog.style.background=params.dialogColor;
                
                    for (var i = 0; i < spans.length; i++) {  
                        spans[i].style.color = colorValues[i];  
                    }
                break;
            }
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

            $(getElems.getClassElem('nano-content',0)).append("<div class='dialog-wrap' id=" + j[c]['id'] + " onclick='msgsActions.showMsgsHistory(" + j[c]['id'] + ")'>" +
            "<img class='dialog-ava-wrap' src='" + j[c]['ava'] + "'/>" +
            "<span id='dialog-seller'>" + j[c]['alias'] + "</span>" +
            "<span id='dialog-date'>" + j[c]['date'] + "</span>" +
            "<span id='dialog-last-msg'>" + j[c]['text'] + "</span>" +
            "</div>");
        }
    },
};