if (window.console == undefined) { console = { log : function(){} }; }
/**
 * 로그 (console, debug, error, info)
 */
var IosLogger = { property : { CONSOLE : true, DEBUG : true, ERROR : true, INFO : true },
	console : function() {var args = arguments; var msg = ""; if(this.property.CONSOLE) { $.each(args, function(){msg += " : " + this}); console.log("[CONSOLE]" + msg);}},
	debug : function() {var args = arguments; var msg = ""; if(this.property.DEBUG) { $.each(args, function(){msg += " : " + this}); console.log("[DEBUG]" + msg);}},
	error : function() {var args = arguments; var msg = ""; if(this.property.ERROR) { $.each(args, function(){msg += " : " + this}); console.log("[ERROR]" + msg);}},
	info : function() {var args = arguments; var msg = ""; if(this.property.INFO) { $.each(args, function(){msg += " : " + this}); console.log("[INFO]" + msg);}}
};

var IosGlobal = {
	CONTEXT : null,
    CALENDER : {
		currentText: "오늘",
		closeText : "닫기",
		monthNames : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],        
		monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],        
		dayNames : ['일', '월', '화', '수', '목', '금', '토'],        
		dayNamesShort : ['일', '월', '화', '수', '목', '금', '토'],        
		dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'],
		showButtonPanel: true,
		dateFormat: "yy.mm.dd"
    }		
}

var IosUtil = {
	CHAR : function(_char){ 
    	return String.fromCharCode(_char); 
    },
    toObject : function(_str){
    	// if(_str.indexOf("{")==-1 && _str.indexOf("}")==-1) _str = "{" + _str + "}";	    	
        return eval("returnString2Object=" + _str);
    },
    actionForm : function(actionURL, formName){
        var tags = new Array(2);
        tags[0] = "INPUT";
        tags[1] = "SELECT";

        //폼객체 생성
        var frmObj = document.createElement("form");
        frmObj.name=formName;
        frmObj.id = formName;
        frmObj.method="post";
        frmObj.action=actionURL
        for(k=0;k<tags.length; k++){
            var coll = document.all.tags(tags[k]);
            if (coll!=null)
            {
                for (i=0; i<coll.length; i++) {
                    if(coll[i].name != '' && coll[i].name != 'method'){
                        if(coll[i].type == 'checkbox' && !coll[i].checked){
                            continue;
                        }
                        var hObj 	= document.createElement("input");
                        hObj.type 	= "hidden";
                        hObj.name 	= coll[i].name;
                        hObj.value 	= coll[i].value;
                        frmObj.appendChild(hObj);
                    }
                }
            }
        }
        document.body.appendChild(frmObj);
    },
    flashObject : function(id, src, width, height, _options){
    	document.write(this.flashObjectString(id, src, width, height, _options));
    	return window[id] = $.browser.msie?document.getElementById(id):document[id];
    },
    flashObjectString : function(id, src, width, height, _options){
    	var options = $.extend({
			bgcolor: '#FFFFFF',
			quality: 'high',
			wmode: 'transparent',
			menu: false, 
			allowScriptAccess: 'always',
			allowFullScreen: 'true', 
			swfversion: '10.0.0.0'
		}, _options);
    	// 버전검사
    	try{
    		var version = navigator.plugins&&navigator.mimeTypes.length?navigator.plugins["Shockwave Flash"].description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, "."):(new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").split(" ")[1].replace(/,/g,".");
    		if(parseInt(version.split(".")[0])<parseInt(options.swfversion.split(".")[0])){
    			if($.fn.dialog)
    				$(document).ready(function(){ $("<div title='FlashPlayer 권장버전' style='background-color:#ccc; text-align:center;'><div align='center'><p>FlashPlayer를 업그레이드 하세요.</p><p><a href='http://www.adobe.com/go/getflashplayer'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' width='112' height='33' /></a></p></div></div>").dialog({ modal: false, height: 100 }); });
    			else
    				alert("FlashPlayer를 업그레이드 하세요. \n - 현재버전 : " + version + "\n - 권장버전 : " + options.swfversion);
    				//self.close();
    		}
    	}catch(e){	}
    	
    	// 생성
    	var html = "";
    	if($.browser.msie){
    		html += "<object id='" + id + "' name='" + id + "' width='" + width + "' height='" + height + "' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab'>"; // http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0
    		html += "<param name='movie' value='" + src + "'/>";
    		for(var attr in options)
    			html += "<param name='" + attr + "' value='" + options[attr] + "'/>";
    		//html += "<div><h4>Content on this page requires a newer version of Adobe Flash Player.</h4><p><a href='http://www.adobe.com/go/getflashplayer'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' width='112' height='33' /></a></p></div>";
    		html += "</object>";
    	}else if(navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length){//if(!$.browser.msie){
    		html += "<object id='" + id + "' name='" + id + "' width='" + width + "' height='" + height + "' data='" + src + "' type='application/x-shockwave-flash'>";
    		for(var attr in options)
    			html += "<param name='" + attr + "' value='" + options[attr] + "'/>";
    		//html += "<param name='FlashVars' value='htmlId=" + id + "'/>";
    		//html += "<div><h4>Content on this page requires a newer version of Adobe Flash Player.</h4><p><a href='http://www.adobe.com/go/getflashplayer'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' width='112' height='33' /></a></p></div>";
    		// 모질라 계열에서 <object/> 태그 내에 다른 태그 존재시에 오류가 발생함.
    		html += "</object>";
    	}
    	return html;
    },
    loadScript : function(url, callback){
        // adding the script tag to the head as suggested before 
		var head = document.getElementsByTagName('head')[0]; 
		var script = document.createElement('script'); 
		script.type = 'text/javascript'; 
		script.src = url; 
		// then bind the event to the callback function  
		// there are several events for cross browser compatibility 
		script.onreadystatechange = callback; 
		script.onload = callback; 
		// fire the loading 
		head.appendChild(script); 
    }, 
    write : function(v_id){
    	document.write(document.getElementById(v_id).value);
    } 
};