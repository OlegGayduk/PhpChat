var getURLParam=function(a,b){return decodeURI(a.replace(new RegExp("^(?:.*[&\\?]"+encodeURI(b).replace(/[\.\+\*]/g,"\\$&")+"(?:\\=([^&]*))?)?.*$","i"),"$1"))},navBarOpen=function(){"48px"==getClass("nav-bar-set")[0].style.top?(getClass("nav-bar-set")[0].style.visibility="hidden",getClass("nav-bar-set")[0].style.top="-298px"):(getClass("nav-bar-set")[0].style.visibility="visible",getClass("nav-bar-set")[0].style.top="48px")},searchOninput=function(a){return getClass("del-search")[0].style.visibility="visible",a.value<=0&&(getClass("del-search")[0].style.visibility="hidden"),0},searchClean=function(a){return getId("search").value="",a.style.visibility="hidden",0},setOpen=function(){return getClass("set-bar-wrap")[0].style.visibility="visible",getClass("set-bar-wrap")[0].innerHTML="<div class='main-inf'><span class='set'>Настройки</span><span class='close-set-wrap' onclick='setClose()'>Закрыть</span><div class='ava'></div><span class='alias-set'>ZeroCool</span><div class='select-ava' onclick='beginFileUpload(this);'><form name='avaSet' id='upload' method='post' enctype='multipart/form-data'><div id='drop'><div class='camera'><div class='circle'></div></div><input id='ava-set-file' type='file' name='fupload' multiple  accept='image/' onchange='fileUpload(this);'/></div></form></div></div>",getClass("back")[0].style.visibility="visible",getClass("nav-bar-set")[0].style.visibility="hidden",getClass("nav-bar-set")[0].style.top="-298px",0},setClose=function(){return getClass("set-bar-wrap")[0].style.visibility="hidden",getClass("back")[0].style.visibility="hidden",0},getId=function(a){return document.getElementById(a)},getClass=function(a){return document.getElementsByClassName(a)},textAreaFocus=function(){getId("msg-sell").focus()},msgsScroll=function(){$(".nano").nanoScroller(),$(".nano").nanoScroller({scroll:"bottom"})},scrollMsgsContainer=function(a){a.scrollTop=a.scrollHeight},lastMessId,send=function(a){""!=getId("msg-sell").value?(a.preventDefault(),xhr("POST","//test/test3/php/sendMsg.php"+location.search,"text="+encodeURIComponent(getId("msg-sell").value),getClass("nano-content")[1]),scrollMsgsContainer(getId("msg-content")),getId("msg-sell").value="",textAreaFocus()):textAreaFocus()},avaGetRes,xhr=function(a,b,c,d){var e=new XMLHttpRequest;e.onprogress=function(){getClass("ball")[0].style.visibility="visible"},b=="//test/test3/php/msgsGet.php"+location.search&&0!=d&&(e.onload=e.onerror=function(){if(200==this.status){getClass("ball")[0].style.visibility="hidden";var a=d.scrollHeight-d.scrollTop;$(d).prepend(e.responseText),$(".nano").nanoScroller(),d.scrollTop=d.scrollHeight-a}else alert(e.status+": "+e.statusText)}),b=="//test/test3/php/sendMsg.php"+location.search&&(e.onload=e.onerror=function(){200==this.status?(getClass("ball")[0].style.visibility="hidden",$(d).append(e.responseText),msgsScroll()):alert(e.status+": "+e.statusText)}),0!=d&&b=="//test/test3/php/showMsgs.php"+location.search?e.onload=e.onerror=function(){200==this.status?(getClass("ball")[0].style.visibility="hidden",b=="//test/test3/php/msgsGet.php"+location.search&&0!=d?$(d).prepend(e.responseText):(d.innerHTML="",$(d).append(e.responseText),msgsScroll())):alert(e.status+": "+e.statusText)}:b=="//test/test3/php/avasGet.php"+location.search?e.onload=e.onerror=function(){200==this.status?(getClass("ball")[0].style.visibility="hidden",window.avaGetRes=e.responseText,getId("sell-form").innerHTML="<div id='ava-interlocutor'><img src='"+JSON.parse(window.avaGetRes)[1]+"' width='50' height='50' style='border-radius:100%;'></div><div id='ava-sell'><img src='"+JSON.parse(window.avaGetRes)[0]+"' width='50' height='50' style='border-radius:100%;'></div><form method='post' id='msg-form'><textarea id='msg-sell' placeholder='Напишите сообщение...' cols='50' name='text'></textarea><div class='smile'></div><span type='submit' class='send' onclick='send(event)'>Отправить</span></form>",textAreaFocus()):alert(e.status+": "+e.statusText)}:b=="//test/test3/php/getLastMessId.php"+location.search&&(e.onload=e.onerror=function(){200==this.status?getClass("ball")[0].style.visibility="hidden":alert(e.status+": "+e.statusText)}),e.open(a,b,!0),e.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),0!=c?e.send(c):e.send()},ajaxRequestDialogs=function(){return xhr("POST","//test/test3/php/showDialogs.php"+location.search,0,getClass("nano-content")[0]),!0},ajaxRequestMsgs=function(){return xhr("POST","//test/test3/php/showMsgs.php"+location.search,0,getClass("nano-content")[1]),!0},chatsCycl=function(){for(var a=getClass("dialog").length,b=getClass("dialog")[0].getElementsByTagName("span"),c=["#000","#999","#666"],d=0;d<a;d++){getClass("dialog")[d].style.background="#fff";for(var e=getClass("dialog")[d].getElementsByTagName("span"),f=0;f<b.length;f++)e[f].style.color=c[f]}},showMsgs=function(a){return msgsScroll(),getURLParam(location.search,"sell")!=a&&(window.history.pushState("","","?sell="+a),window.history.replaceState("","","?sell="+a),ajaxRequestMsgs(),scrollMsgsContainer(getClass("nano-content")[1]),avasGet()),""!=window.location.search&&(chatsCycl(),getClass("msgs-open-inf-content")[0].style.visibility="visible"),colorChange(a,"rgb(70,90,124)","#fff"),getId("sell-form").style.visibility="visible",textAreaFocus(),msgsScroll(),!0},colorChange=function(a,b,c){if(0!=a||void 0!=a||""!=a||null!=a){getId(a).style.background=b;var d=getId(a),e=d.getElementsByTagName("span"),f=["#000","#999","#666"];if("#000"==c)for(var g=0;g<e.length;g++)e[g].style.color=f[g];else if("#fff"==c)for(var g=0;g<e.length;g++)e[g].style.color=c;return!0}return!1},nanoChatsStyle=function(){getClass("nano-pane")[0].style.zindex="100000px",getClass("nano-pane")[0].style.right="-2px",getClass("nano-pane")[0].style.width="3px",getClass("nano-slider")[0].style.borderRadius="0px"},count=0,arr=new Array,i=0,msgSelect=function(a){"visible"!=getId(a).style.visibility?(getId(a).style.visibility="visible",arr[i++]=a,getId("sell-form").innerHTML=++count,getId("sell-form").innerHTML="<div class='forward-btn'>Переслать <span style='color:#b9cfe3'>"+count+"</span></div><div class='repeat-btn'>Повторить <span style='color:#b9cfe3'>"+count+"</span></div><div class='delete-btn'>Удалить <span style='color:#b9cfe3'>"+count+"</span></div><div class='cancel-btn' onclick='msgsActionsClose()'>Отмена</div>"):(getId(a).style.visibility="hidden",getId("sell-form").innerHTML=--count,0==count?(getId("sell-form").innerHTML="<div id='ava-interlocutor'><img src='"+JSON.parse(window.avaGetRes)[1]+"' width='50' height='50' style='border-radius:100%;'></div><div id='ava-sell'><img src='"+JSON.parse(window.avaGetRes)[0]+"' width='50' height='50' style='border-radius:100%;'></div><form method='post' id='msg-form'><textarea id='msg-sell' placeholder='Напишите сообщение...' cols='50' name='text'></textarea><span type='submit' class='send' onclick='send(event)'>Отправить</span></form>",textAreaFocus()):getId("sell-form").innerHTML="<div class='forward-btn'>Переслать <span style='color:#b9cfe3'>"+count+"</span></div><div class='repeat-btn'>Повторить <span style='color:#b9cfe3'>"+count+"</span></div><div class='delete-btn'>Удалить <span style='color:#b9cfe3'>"+count+"</span></div><div class='cancel-btn' onclick='msgsActionsClose()'>Отмена</div>")},msgsActionsClose=function(){for(i=0;i<arr.length;i++)getId(arr[i]).style.visibility="hidden";count=0,getId("sell-form").innerHTML="<div id='ava-interlocutor'><img src='"+JSON.parse(window.avaGetRes)[1]+"' width='50' height='50' style='border-radius:100%;'></div><div id='ava-sell'><img src='"+JSON.parse(window.avaGetRes)[0]+"' width='50' height='50' style='border-radius:100%;'></div><form method='post' id='msg-form'><textarea id='msg-sell' placeholder='Напишите сообщение...' cols='50' name='text'></textarea><span type='submit' class='send' onclick='send(event)'>Отправить</span></form>",textAreaFocus()},avasGet=function(){xhr("POST","//test/test3/php/avasGet.php"+location.search,0,0)};window.onpopstate=function(){chatsCycl(),ajaxRequestMsgs(),""==location.search?(getId("sell-form").style.visibility="hidden",getClass("msgs-open-inf-content")[0].style.visibility="hidden"):(scrollMsgsContainer(getId("msg-content")),getId("sell-form").style.visibility="visible");var a=getURLParam(location.search,"sell");return 0!=a||void 0!=a||""!=a||(getId("sell-form").style.visibility="hidden"),!0},window.onload=function(a){if(ajaxRequestMsgs(),""!=location.search){var b=getURLParam(location.search,"sell");return showMsgs(b),avasGet(),textAreaFocus(),scrollMsgsContainer(getId("msg-content")),nanoChatsStyle(),getClass("nano-content")[1].onscroll=function(){return void 0==getId(1)&&void(0==getClass("nano-content")[1].scrollTop&&xhr("POST","//test/test3/php/msgsGet.php"+location.search,0,getClass("nano-content")[1]))},!0}return getClass("msgs-open-inf-content")[0].style.visibility="hidden",!1};var log=function(a){document.getElementsByClassName("ava")[0].innerHTML=a},beginFileUpload=function(a){var b=document.getElementById("upload").getElementsByTagName("input")[0];b.click()},fileUpload=function(a){var b=a.files[0];return!!b&&(upload(b),!0)},upload=function(a){var b=new XMLHttpRequest,c=new FormData(document.forms.avaSet);b.onload=b.onerror=function(){if(200!=this.status)alert(b.status+": "+b.statusText);else if("error"!=b.responseText){var a=document.getElementsByClassName("ava")[0];a.innerHTML="<img src='"+b.responseText+"' class='ava-included' width='72' height='72'>"}else alert(xht.responseText)},b.upload.onprogress=function(a){log(parseInt(a.loaded/a.total*100,10)+"%")},b.open("POST","../php/avaUpload.php",!0),b.send(c)};

var getURLParam = function(oTarget, sVar) { 
    return decodeURI(oTarget.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
};


var navBarOpen = function() {
    if(getClass('nav-bar-set')[0].style.top == '48px'){
        getClass('nav-bar-set')[0].style.visibility='hidden';
        getClass('nav-bar-set')[0].style.top='-298px';
    } else {
        getClass('nav-bar-set')[0].style.visibility='visible';
        getClass('nav-bar-set')[0].style.top='48px';
    }
};

var searchOninput = function(t) {

    getClass('del-search')[0].style.visibility = 'visible';

    if(t.value <= 0) {
        getClass('del-search')[0].style.visibility = 'hidden';
    }

    return 0 ;
};

var searchClean = function(t) {
    
    getId('search').value = '';
    t.style.visibility = 'hidden';

    return 0;
};

var setOpen = function() {
    getClass('set-bar-wrap')[0].style.visibility = 'visible';
    getClass('set-bar-wrap')[0].innerHTML = "<div class='main-inf'><span class='set'>Настройки</span><span class='close-set-wrap' onclick='setClose()'>Закрыть</span><div class='ava'></div><span class='alias-set'>ZeroCool</span><div class='select-ava' onclick='beginFileUpload(this);'><form name='avaSet' id='upload' method='post' enctype='multipart/form-data'><div id='drop'><div class='camera'><div class='circle'></div></div><input id='ava-set-file' type='file' name='fupload' multiple  accept='image/' onchange='fileUpload(this);'/></div></form></div></div>";

    getClass('back')[0].style.visibility = 'visible';

    getClass('nav-bar-set')[0].style.visibility='hidden';
    getClass('nav-bar-set')[0].style.top='-298px';

    return 0;
};

var setClose = function() {
    getClass('set-bar-wrap')[0].style.visibility = 'hidden';
    getClass('back')[0].style.visibility = 'hidden';

    return 0;
};

var getId = function(id) {
    return document.getElementById(id);
};

var getClass = function(name) {
    return document.getElementsByClassName(name);
};

var textAreaFocus = function() {
    getId('msg-sell').focus();
};

var msgsScroll = function() {
    $('.nano').nanoScroller();
    $('.nano').nanoScroller({ scroll: 'bottom' });
};

var scrollMsgsContainer = function(elem) {
    elem.scrollTop = elem.scrollHeight;
};

var lastMessId;

var send = function(e) {
    if(getId('msg-sell').value != '') {
        e.preventDefault();
        xhr('POST','//test/test3/php/sendMsg.php' + location.search,'text=' + encodeURIComponent(getId('msg-sell').value),getClass('nano-content')[1]);
        scrollMsgsContainer(getId('msg-content'));
        getId('msg-sell').value = '';
        textAreaFocus();
    } else {
        textAreaFocus();
    }
};


var avaGetRes;

var xhr = function(type,url,params,elem) {

    var xhr = new XMLHttpRequest();
    
    xhr.onprogress = function() {
        getClass('ball')[0].style.visibility = 'visible';
    };

    if(url == '//test/test3/php/msgsGet.php' + location.search && elem != 0) {
        xhr.onload = xhr.onerror = function() {
          if (this.status == 200) {
               getClass('ball')[0].style.visibility = 'hidden';
               var fromBottom = elem.scrollHeight - elem.scrollTop;
               $(elem).prepend(xhr.responseText);
               $('.nano').nanoScroller();
               elem.scrollTop = elem.scrollHeight - fromBottom;
          } else {
            alert(xhr.status + ': ' + xhr.statusText);
          }
        };
    }

    if(url == '//test/test3/php/sendMsg.php' + location.search) {
        xhr.onload = xhr.onerror = function() {
          if (this.status == 200) {
            getClass('ball')[0].style.visibility = 'hidden';
            $(elem).append(xhr.responseText);
            msgsScroll();
            //alert(getClass('msg-non-read-short')[10].getElementsByTagName('id').append);
          } else {
            alert(xhr.status + ': ' + xhr.statusText);
          }
        };
    } 

    if(elem != 0 && url=='//test/test3/php/showMsgs.php' + location.search) {
        xhr.onload = xhr.onerror = function() {
          if (this.status == 200) {

              getClass('ball')[0].style.visibility = 'hidden';

              if(url == '//test/test3/php/msgsGet.php' + location.search && elem != 0) {
                $(elem).prepend(xhr.responseText);
              } else {
                elem.innerHTML = '';
                $(elem).append(xhr.responseText);
                msgsScroll();
              }

          } else {
            alert(xhr.status + ': ' + xhr.statusText);
          }
        };
    } else if(url == '//test/test3/php/avasGet.php' + location.search) {
        xhr.onload = xhr.onerror = function() {
          if (this.status == 200) {
            getClass('ball')[0].style.visibility = 'hidden';
            window.avaGetRes = xhr.responseText;
            getId('sell-form').innerHTML = "<div id='ava-interlocutor'><img src='" + JSON.parse(window.avaGetRes)[1] + "' width='50' height='50' style='border-radius:100%;'></div><div id='ava-sell'><img src='" + JSON.parse(window.avaGetRes)[0] + "' width='50' height='50' style='border-radius:100%;'></div><form method='post' id='msg-form'><textarea id='msg-sell' placeholder='Напишите сообщение...' cols='50' name='text'></textarea><div class='smile'></div><span type='submit' class='send' onclick='send(event)'>Отправить</span></form>";
            textAreaFocus();
          } else {
            alert(xhr.status + ': ' + xhr.statusText);
          }
        };
    } else if(url == '//test/test3/php/getLastMessId.php' + location.search) {
        xhr.onload = xhr.onerror = function() {
          if (this.status == 200) {
            getClass('ball')[0].style.visibility = 'hidden';
          } else {
            alert(xhr.status + ': ' + xhr.statusText);
          }
        };
    } 

    xhr.open(type,url,true);

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    if(params != 0) {
        xhr.send(params);
    } else {
        xhr.send();
    }

};

var ajaxRequestDialogs = function() {

    xhr("POST",'//test/test3/php/showDialogs.php' + location.search,0,getClass('nano-content')[0]);
    
    return true;
};

var ajaxRequestMsgs = function() {

    xhr("POST",'//test/test3/php/showMsgs.php' + location.search,0,getClass('nano-content')[1]);

    return true;
};

var chatsCycl = function() {

    var elements = getClass('dialog').length;
    var dialogElems = getClass('dialog')[0].getElementsByTagName('span');
    var colors = ["#000","#999","#666"];

    for(var i = 0; i < elements; i++) {
        getClass('dialog')[i].style.background = '#fff';
        var el = getClass('dialog')[i].getElementsByTagName('span');
        for(var e = 0; e < dialogElems.length; e++) {
            el[e].style.color = colors[e];
        }
    }
};

var showMsgs = function(id) {

    msgsScroll();
    
    if(getURLParam(location.search, 'sell') != id) {

        window.history.pushState("", "", '?sell='+ id); 
        window.history.replaceState("", "", '?sell='+ id);

        ajaxRequestMsgs();

        scrollMsgsContainer(getClass('nano-content')[1]);

        avasGet();
    }
    
    if(window.location.search != "") {
        chatsCycl();
        getClass('msgs-open-inf-content')[0].style.visibility = 'visible';
    }

    colorChange(id,"rgb(70,90,124)","#fff");

    getId('sell-form').style.visibility = 'visible';

    textAreaFocus();
    msgsScroll();

    return true;
};

var colorChange = function(id,color,textColor) {

	if(id != 0 || id != undefined || id != "" || id != null) {

	    getId(id).style.background = color;
    
	    var dialogElem = getId(id);
        var elements = dialogElem.getElementsByTagName('span');
    
        var colorValues = ["#000","#999","#666"];
    
        if(textColor == '#000') {
        	for (var i = 0; i < elements.length; i++) {  
                elements[i].style.color = colorValues[i];  
            }
        } else if(textColor == '#fff'){
        	for (var i = 0; i < elements.length; i++) {
                elements[i].style.color= textColor;     
            }
        }
        return true;
    } else {
    	return false;
    }
};

var nanoChatsStyle = function() {
    //getClass('nano-pane')[0].style.zindex = '100000px';
    getClass('nano-pane')[0].style.right = '-2px';
    getClass('nano-pane')[0].style.width = '3px';
    getClass('nano-slider')[0].style.borderRadius = '0px';
};

var count = 0;

var arr = new Array();

var i = 0;

var msgSelect = function(id) {
    if(getId(id).style.visibility != 'visible') {

        getId(id).style.visibility = 'visible';

        arr[i++] = id;

        getId('sell-form').innerHTML = ++count;

        getId('sell-form').innerHTML = "<div class='forward-btn'>Переслать <span style='color:#b9cfe3'>" + count + "</span></div><div class='repeat-btn'>Повторить <span style='color:#b9cfe3'>" + count + "</span></div><div class='delete-btn'>Удалить <span style='color:#b9cfe3'>" + count + "</span></div><div class='cancel-btn' onclick='msgsActionsClose()'>Отмена</div>";
    } else {
        getId(id).style.visibility = 'hidden';
        getId('sell-form').innerHTML = --count;
        if(count == 0) {
            getId('sell-form').innerHTML = "<div id='ava-interlocutor'><img src='" + JSON.parse(window.avaGetRes)[1] + "' width='50' height='50' style='border-radius:100%;'></div><div id='ava-sell'><img src='" + JSON.parse(window.avaGetRes)[0] + "' width='50' height='50' style='border-radius:100%;'></div><form method='post' id='msg-form'><textarea id='msg-sell' placeholder='Напишите сообщение...' cols='50' name='text'></textarea><span type='submit' class='send' onclick='send(event)'>Отправить</span></form>";
            textAreaFocus();
        } else {
            getId('sell-form').innerHTML = "<div class='forward-btn'>Переслать <span style='color:#b9cfe3'>" + count + "</span></div><div class='repeat-btn'>Повторить <span style='color:#b9cfe3'>" + count + "</span></div><div class='delete-btn'>Удалить <span style='color:#b9cfe3'>" + count + "</span></div><div class='cancel-btn' onclick='msgsActionsClose()'>Отмена</div>";
        }
    }
};

var msgsActionsClose = function() {
    for(i = 0;i < arr.length;i++){
        getId(arr[i]).style.visibility = 'hidden';
    }
    count = 0;
    getId('sell-form').innerHTML = "<div id='ava-interlocutor'><img src='" + JSON.parse(window.avaGetRes)[1] + "' width='50' height='50' style='border-radius:100%;'></div><div id='ava-sell'><img src='" + JSON.parse(window.avaGetRes)[0] + "' width='50' height='50' style='border-radius:100%;'></div><form method='post' id='msg-form'><textarea id='msg-sell' placeholder='Напишите сообщение...' cols='50' name='text'></textarea><span type='submit' class='send' onclick='send(event)'>Отправить</span></form>";
    textAreaFocus();
};

var avasGet = function() {
    xhr("POST",'//test/test3/php/avasGet.php' + location.search,0,0)
};

window.onpopstate = function() {

	chatsCycl();
    
    ajaxRequestMsgs();
    
    if(location.search == "") {
    	getId('sell-form').style.visibility = 'hidden';
        getClass('msgs-open-inf-content')[0].style.visibility = 'hidden';
        //ajaxRequestMsgs();
    } else {
        scrollMsgsContainer(getId('msg-content'));
    	getId('sell-form').style.visibility = 'visible';
    }

    var id = getURLParam(location.search, 'sell');

    if(id != 0 || id != undefined || id != "") {
        //colorChange(id,"rgb(70,90,124)","#fff");
    } else {
    	getId('sell-form').style.visibility = 'hidden';
    }
    
    return true;
};

window.onload = function(event) {

    ajaxRequestMsgs();
    
	if(location.search != "") {

        var decUrl = getURLParam(location.search, 'sell');

        showMsgs(decUrl);

        avasGet();

        textAreaFocus();

        scrollMsgsContainer(getId('msg-content'));

        nanoChatsStyle();

        //var s = getClass('nano-content')[1].scrollHeight;
//
        //alert(s);

        getClass('nano-content')[1].onscroll = function() {
            if(getId(1) == undefined) {
                if(getClass('nano-content')[1].scrollTop == 0) {
                    xhr("POST",'//test/test3/php/msgsGet.php' + location.search,0,getClass('nano-content')[1])
                }
            } else {
                return false;
            }
        };

	    return true;

    } else {
        getClass('msgs-open-inf-content')[0].style.visibility = 'hidden';
    	return false;
    }
};

var log = function(html) {
    document.getElementsByClassName('ava')[0].innerHTML = html;
}

var beginFileUpload = function(t) {
    var input = document.getElementById('upload').getElementsByTagName('input')[0];
    input.click();
};

var fileUpload = function(t) {

    var file = t.files[0];

    if(file) {
        upload(file);
        return true;
    } else {
        return false;
    }
};

var upload = function(file) {

    var xhr = new XMLHttpRequest();

    var formData = new FormData(document.forms.avaSet);

    xhr.onload = xhr.onerror = function() {
      if (this.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
      } else {
        if(xhr.responseText != 'error') {
            var pc = document.getElementsByClassName("ava")[0];
            pc.innerHTML = "<img src='" + xhr.responseText + "' class='ava-included' width='72' height='72'>";
        } else {
          alert(xht.responseText);
        }
      }
    };

    xhr.upload.onprogress = function(event) {
        log(parseInt(event.loaded / event.total * 100, 10) + '%');
    }

    xhr.open("POST", "../php/avaUpload.php", true);

    xhr.send(formData);
};
