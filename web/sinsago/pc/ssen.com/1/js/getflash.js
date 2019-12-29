<!--
//=================================================================================================================================
// IE 설계 변경에 따른 웹 어플리케이션 로드 변경
//=================================================================================================================================

var EmbedStr = "";
function GetFlash(url,x,y) { 
	EmbedStr = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0' width='" + x + "' height='" + y + "'>";
	EmbedStr += "<param name='allowScriptAccess' value='always' />";
	EmbedStr += "<param name='movie' value='" + url + "' />";
	EmbedStr += "<param name='quality' value='high' />";
	EmbedStr += "<param name='bgcolor' value='#ffffff' />";
	EmbedStr += "<param name='menu' value='false' />";
	EmbedStr += "<param name='wmode' value='transparent' />";
	EmbedStr += "<embed src='" + url + "' id='flashObject' name='flashObject' quality='high' menu='false' wmode='transparent' bgcolor='#ffffff' width='" + x + "' height='" + y + "' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' />";
	EmbedStr += "</object>";
	
	document.write(EmbedStr);
	return;
}

var EmbedStr = "";
function GetFlash2(url,x,y,fn) { 
	EmbedStr = "<object id='" + fn + "' name='" + fn + "' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0' width='" + x + "' height='" + y + "'>";
	EmbedStr += "<param name='allowScriptAccess' value='always' />";
	EmbedStr += "<param name='movie' value='" + url + "' />";
	EmbedStr += "<param name='quality' value='high' />";
	EmbedStr += "<param name='bgcolor' value='#ffffff' />";
	EmbedStr += "<param name='menu' value='false' />";
	EmbedStr += "<param name='wmode' value='transparent' />";
	EmbedStr += "<embed id='" + fn + "' name='" + fn + "' src='" + url + "' quality='high' menu='false' wmode='transparent' bgcolor='#ffffff' width='" + x + "' height='" + y + "' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' />";
	EmbedStr += "</object>";
	
	document.write(EmbedStr);
	return;
}


function GetMPlayer(x,y) {
	EmbedStr += "<OBJECT id='dmbPlayer' classid='CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6' width='" + x + "' height='" + y + "' TYPE='application/x-oleobject' VIEWASTEXT >";
	EmbedStr += "<param name='autoStart' value='true'>";
	EmbedStr += "<param name='windowlessVideo' value='false'>";
	EmbedStr += "<param name='uiMode' value='none'>";
	EmbedStr += "<param name='volume' value='100'>";
	EmbedStr += "<param name='stretchToFit' value='true'>";
	EmbedStr += "<param name='autoRewind' value='false'>";
	EmbedStr += "<param name='transparentAtStart' value='true'>";
	EmbedStr += "<param name='enableContextMenu' value='false'>";
	EmbedStr += "</OBJECT>";
	document.write(EmbedStr);
	return;
}


//=================================================================================================================================
// 레이어 팝업 처리
//=================================================================================================================================




//팝업창 활성화
function popupVisiable()
{
	document.getElementById("layer_pop").style.visibility = "visible";
	document.getElementById("pop_content").style.visibility = "visible";
}

//팝업칭 숨기기
function popupHidden()
{
	document.getElementById("layer_pop").style.visibility = "hidden";
	document.getElementById("pop_content").style.visibility = "hidden";
}

-->

