





//
function show(c) { 
 if (document.getElementById && document.getElementById(c)!= null) 
 node = document.getElementById(c).style.display=''; 
 else if (document.layers && document.layers[c]!= null) 
 document.layers[c].display = ''; 
 else if (document.all) 
 document.all[c].style.display = ''; 
} 
 
function hide(c) { 
 if (document.getElementById && document.getElementById(c)!= null) 
 node = document.getElementById(c).style.display='none'; 
 else if (document.layers && document.layers[c]!= null) 
 document.layers[c].display = 'none'; 
 else if (document.all) 
 document.all[c].style.display = 'none'; 
}

//공지사항

function noticeTab1() {
 show('notice01');
 hide('notice02');
 hide('notice03');
 
 document.getElementById("change_btn_01").innerHTML = "<img src='../html/images/main/tab_1_on.jpg' alt='' />";
 document.getElementById("change_btn_02").innerHTML = "<img src='../html/images/main/tab_2.jpg' alt='' />";
 document.getElementById("change_btn_03").innerHTML = "<img src='../html/images/main/tab_3.jpg' alt='' />";
}
 
function noticeTab2() {
 hide('notice01');
 show('notice02');
 hide('notice03');
 
 document.getElementById("change_btn_01").innerHTML = "<img src='../html/images/main/tab_1.jpg' alt='' />";
 document.getElementById("change_btn_02").innerHTML = "<img src='../html/images/main/tab_2_on.jpg' alt='' />";
 document.getElementById("change_btn_03").innerHTML = "<img src='../html/images/main/tab_3.jpg' alt='' />";
}
function noticeTab3() {
 hide('notice01');
 hide('notice02');
 show('notice03');
 
 document.getElementById("change_btn_01").innerHTML = "<img src='../html/images/main/tab_1.jpg' alt='' />";
 document.getElementById("change_btn_02").innerHTML = "<img src='../html/images/main/tab_2.jpg' alt='' />";
 document.getElementById("change_btn_03").innerHTML = "<img src='../html/images/main/tab_3_on.jpg' alt='' />";
 
}



//Quick
var quickTimer; //전역변수로변경(2010-10-25)
var pauseFlag = false;
function initMoving(target, position, topLimit, btmLimit) {
	if (!target)
		return false;

	var obj = target;
	obj.initTop = position;
	obj.topLimit = topLimit;
	obj.bottomLimit = document.documentElement.scrollHeight - btmLimit;

	obj.style.position = "absolute";
	obj.top = obj.initTop;
	obj.left = obj.initLeft;

	if (typeof(window.pageYOffset) == "number") {
		obj.getTop = function() {
			return window.pageYOffset;
		}
	} else if (typeof(document.documentElement.scrollTop) == "number") {
		obj.getTop = function() {
			return document.documentElement.scrollTop;
		}
	} else {
		obj.getTop = function() {
			return 0;
		}
	}

	if (self.innerHeight) {
		obj.getHeight = function() {
			return self.innerHeight;
		}
	} else if(document.documentElement.clientHeight) {
		obj.getHeight = function() {
			return document.documentElement.clientHeight;
		}
	} else {
		obj.getHeight = function() {
			return 500;
		}
	}

	quickTimer = setInterval(function() {
		if(pauseFlag === true) return;
		if (obj.initTop > 0) {
			pos = obj.getTop() + obj.initTop;
		} else {
			pos = obj.getTop() + obj.getHeight() + obj.initTop;
			//pos = obj.getTop() + obj.getHeight() / 2 - 15;
		}

		if (pos > obj.bottomLimit)
			pos = obj.bottomLimit;
		if (pos < obj.topLimit)
			pos = obj.topLimit;

		interval = obj.top - pos;
		obj.top = obj.top - interval / 3;
		obj.style.top = obj.top + "px";
	}, 30)
}

//swf
function swf(src,w,h){
	html = '';
	html += '<object type="application/x-shockwave-flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" id="param" width="'+w+'" height="'+h+'">';
	html += '<param name="movie" value="'+src+'">';
	html += '<param name="quality" value="best">';
	html += '<param name="wmode" value="transparent">';
	html += '<embed src="'+src+'" quality=best width="'+w+'" height="'+h+'" quality="best" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent"><\/embed>';
	html += '<\/object>';
	document.write(html);
}

function swf1(src,w,h){
	html = '';
	html += '<object type="application/x-shockwave-flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" id="param" width="'+w+'" height="'+h+'">';
	html += '<param name="movie" value="'+src+'">';
	html += '<param name="quality" value="best">';
	html += '<param name="wmode" value="window">';
	html += '<embed src="'+src+'" quality=best width="'+w+'" height="'+h+'" quality="best" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent"><\/embed>';
	html += '<\/object>';
	document.write(html);
}





//img mouseOver
function mouseOn(obj,bool) {
	if(bool)
	obj.src="../../html/images/cscenter/" +obj.id+ "_on.jpg";
	else
	obj.src="../../html/images/cscenter/" +obj.id+ ".jpg";
}

/* Img RollOver */
function imageOver(imgEl) {
	imgEl.src = imgEl.src.replace(".jpg", "_on.jpg");
}
function imageOut(imgEl) {
	imgEl.src = imgEl.src.replace("_on.jpg", ".jpg");
}

/* Img RollOver */
function imageOver2(imgEl) {
	imgEl.src = imgEl.src.replace("off", "on");
}
function imageOut2(imgEl) {
	imgEl.src = imgEl.src.replace("on", "off");
}

//img mouseOver2
function mouseOn2(obj,bool) {
	if(bool)
	obj.src="../../html/images/classroom/" +obj.id+ "_on.png";
	else
	obj.src="../../html/images/classroom/" +obj.id+ ".png";
}

/* Img RollOver2 */
function imageOver2(imgEl) {
	imgEl.src = imgEl.src.replace(".png", "_on.png");
}
function imageOut2(imgEl) {
	imgEl.src = imgEl.src.replace("_on.png", ".png");
}


//찾아보기 버튼
function change()
{
        document.p_form.filename.value=document.p_form.photo.value; 
}


//submain faq tab
function tab(value, total, img, div, cscenter) {
//alert(value+"/  /"+div+"/  /"+img+"/  /"+total);
	for (var i=1; i<=total; i++) {
		if (i==value) {
			document.getElementById(img+i).src="../../images/"+cscenter+"/"+img+i+"_on.jpg";
			document.getElementById(div+i).style.display="";
		}
		else {
			document.getElementById(img+i).src="../../images/"+cscenter+"/"+img+i+".jpg";
			document.getElementById(div+i).style.display="none";
		}
	}
}

//투명처리ie6

 function setPng24(obj) {
        obj.width=obj.height=1;
        obj.className=obj.className.replace(/\bpng24\b/i,'');
        obj.style.filter =
        "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
        obj.src='';
        return '';
    }

// min-height
function min_height(obj,h){
    if(obj.readyState != "complete") return "auto";
    if(obj.offsetHeight<h){
        obj.style.height="0";
        obj.style.height=h+"px";
    }

}
function getnavigatorType(){
  if( navigator.appName == "Netscape"){
   return "Netscape " + navigator.appVersion.charAt(0);
  }else if (  navigator.appName == "Microsoft Internat Explorer" ){
   if( navigator.appVersion.charAt(0) == "4" ){
    if( navigator.appVersion.indexOf("MSIE 5") != -1 ){
     return "ie 5";
    }else if( navigator.appVersion.indexOf("MSIE 6") != -1 ){
     return "ie 6";
    }else if( navigator.appVersion.indexOf("MSIE 7") != -1 ){
     return "ie 7";
    }else{
     return "ie 4";
    }
   }else if ( navigator.appVersion.charAt(0) == "5"){
    return "ie 5";
   }
  }else{
   return "";
  }
 }

if(typeof console === "undefined") { 
    console = { log: function() { } }; 
} 
/*
if (!window.console) { 
    window.console = { 
        log: function () {}, 
    }; 
} 

(!console) ? console.log=function(){} : console.log('Logging is supported.'); 
*/


 

