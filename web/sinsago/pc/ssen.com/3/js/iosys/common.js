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

/**
 * 유틸
 */
var IosUtil = {
	CHAR : function(_char){ 
    	return String.fromCharCode(_char); 
    },
    toObject : function(_str){
    	// if(_str.indexOf("{")==-1 && _str.indexOf("}")==-1) _str = "{" + _str + "}";	    	
        return eval("returnString2Object=" + _str);
    }
};	    

/**
 * 플래시 화면출력
 * <code> FlashObject('fid','test.swf',500,300); </code>
 * @author leedan
 * @since 2006.03.29
 * @update1 2010.07.23, 명칭변경 (jfIEFlashObject->FlashObject)
 * @update2 2010.09.09, 브라우저 호환성 작업 및 5번째 속성변경, 버전검사
 * @update3 2011.03.18, 모질라 계열 - 오류수정. (단, 로딩시 접근할 경우는 setTimeout(fn,100) 을 써야 할 듯...)
 */
function FlashObject(id, src, width, height, _options){
	document.write(FlashObjectString(id, src, width, height, _options));
	return window[id] = $.browser.msie?document.getElementById(id):document[id];
}
function FlashObjectString(id, src, width, height, _options){
	var options;
	if($.browser.opera || $.browser.safari){
		options = $.extend({
			bgcolor: '#FFFFFF',
			quality: 'high',
			menu: false, 
			allowScriptAccess: 'always',
			allowFullScreen: 'true', 
			swfversion: '10.0.0.0'
		}, _options);
	}else{
		options = $.extend({
			bgcolor: '#FFFFFF',
			quality: 'high',
			wmode: 'transparent',
			menu: false, 
			allowScriptAccess: 'always',
			allowFullScreen: 'true', 
			swfversion: '10.0.0.0'
		}, _options);
	}
	
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
}

/**
 * 팝업열기
 * <code> var popup = windowopen('about:blank','popup',800,600); </code>
 * @author leedan
 * @since 2007.09.12
 * @update 2010.07.23
 */
function windowopen(url, wname, width, height, scrollbars){
	width = width || 800;
	height = height || 600;
	scrollbars = (scrollbars!=undefined?scrollbars:"yes").toString().match(/yes|1|true/)?"yes":"no";
	var left = (screen.availWidth - width) / 2;
	var top = (screen.availHeight - height) / 2 / 1.4; // 화면상 시각적으로 맞는 높이로 변경함
	wname = window.open(url, wname, "left=" + left + ", top=" + top + ", width=" + width + ", height=" + height + ", scrollbars=" + scrollbars + ", status=yes, toolbar=no, menubar=no, location=no, titlebar=no, resizable=no");
	if(wname!=null)
		wname.focus();
	return wname;
}	
/**
 * 아스키문자열
 * <code> var c4 = char(4); </code>
 * @author leedan
 */
function char(charcode){
	return String.fromCharCode(charcode);
}
/*******************************************
*[LEEDAN]	DREAMWEAVER BASIC
*******************************************/
function MM_swapImgRestore() { //v3.0
	var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
	var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
	var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
		d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
	if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
		document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
	else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_showHideLayers() { //v6.0
	var i,p,v,obj,args=MM_showHideLayers.arguments;
	for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
	if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
	obj.visibility=v; }
}	