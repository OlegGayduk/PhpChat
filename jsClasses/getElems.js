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