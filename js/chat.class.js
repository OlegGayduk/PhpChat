'use strict';

export class chat {

	//constructor() {
	//	return 0;
	//}
//
	function getURLParam(oTarget, sVar) { 
        return decodeURI(oTarget.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

	function nanoScroll(nano) {

	}

	function scrollMsgsContainer(elem) {
		elem.scrollTop = elem.scrollHeight;
	} 

	function showMsgs(id) {

	}

	function xmlRequests(type,url,params,elem) {

	}
};