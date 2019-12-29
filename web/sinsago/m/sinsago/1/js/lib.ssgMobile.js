$(document).ready(function () {  
    $("*[data-login-yn=Y]").bind("click", function () {
        return fnLoginCheck();
    });


    $("body *[data-submit*=orm]").bind("click", function () {
        var formName = $(this).attr("data-submit");
        var confirmMessage = $(this).attr("data-submit-confirm");
        var isLoginCheck = $(this).attr("data-login-yn") == "Y" ? true : false;
        var f = document.forms[formName];

        // 로그인 체크 속성까지 있다면 로그인 먼저
        if (!isLogin && isLoginCheck) {
            return fnLoginCheck();
        }
        else {
            if (validate(f)) {
                if (confirmMessage != "" && confirmMessage != undefined) {
                    if (confirm(confirmMessage)) {
                        f.submit();
                        return false;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    f.submit();
                    return false;
                }
            }
            else {
                return false;
            }
        }
    });
});

// 로그인 체크
function fnLoginCheck() {
	if (!isLogin) {		
		location.href = "/member/login.aspx?return_url=" + url.replace(/&/gi,'||');		
		return false;
	}
	else {
		return true;
	}
}

function BtnConfirmGo(obj, url) {
	var msg;
	if (typeof obj == "object") msg = obj.value;
	else msg = obj;
	if (confirm(msg + "하시겠습니까?")) {
		location.href = url;
	}
}

// 자료 다운로드
function download(path, fileExt, bulletinIdx, ssingPoint){
    download(path, fileExt, bulletinIdx, ssingPoint, "");
}

// 자료 다운로드
function download(path, fileExt, bulletinIdx, ssingPoint, mode) {
    if (fnLoginCheck()) {	// 로그인 체크      
        if (isMobile && isIos) {		// 모바일 확인
            if (fileExt == "zip" || fileExt == "hwp" || fileExt == "xls") {
                alert("해당기기에서는 지원하지 않는 서비스입니다.");
                return;
            }
        }
        if (path == "textbook") {
            location.href = "http://textbook.sinsago.co.kr/bbs/bbsDownload.aspx?bbs_seq=" + bulletinIdx;
        } else if (path == "bookPds" || path == "42") {
            if (ssingPoint != 0) {
                if ($("#down_" + bulletinIdx).attr("data-cnt") == "0") {
                    if (confirm("이 파일을 바로보기 또는 다운로드 하시면 \n" + ssingPoint + "씽이 차감됩니다. 이용하시겠습니까?\n (씽넘버 등록 후 이용시에는 무료 제공)")) {
                        $("#down_" + bulletinIdx).attr("data-cnt", "1");
                        location.href = "/study/book_pds_down.aspx?mode=" + mode + "&bulletin_idx=" + bulletinIdx + "&ssing_point=" + ssingPoint + "&path=" + path;
                    }                       
                } else {
                      	location.href = "/study/book_pds_down.aspx?mode=" + mode + "&bulletin_idx=" + bulletinIdx + "&ssing_point=" + ssingPoint + "&path=" + path;
                }
            } else {
                     	location.href = "/study/book_pds_down.aspx?mode=" + mode + "&bulletin_idx=" + bulletinIdx + "&ssing_point=" + ssingPoint + "&path=" + path;
            }
        }
        else {
            location.href = "/study/down.aspx?path=" + path + "&bulletin_idx=" + bulletinIdx + "&ssing_point=" + ssingPoint + "&mode=" + mode;           
        }
    }
}

function downloadNoLogin(path, fileExt, bulletinIdx, ssingPoint, mode) {
	if (isMobile && isIos) {		// 모바일 확인
		if (fileExt == "zip" || fileExt == "hwp" || fileExt == "xls") {
			alert("해당기기에서는 지원하지 않는 서비스입니다.");
			return;
		}
	}
	if (path == "textbook") {
		location.href = "http://textbook.sinsago.co.kr/bbs/bbsDownload.aspx?bbs_seq=" + bulletinIdx;
	} else if (path == "bookPds" || path == "42") {
		if (ssingPoint != 0) {
			if ($("#down_" + bulletinIdx).attr("data-cnt") == "0") {
				if (confirm("이 파일을 바로보기 또는 다운로드 하시면 \n" + ssingPoint + "씽이 차감됩니다. 이용하시겠습니까?\n (씽넘버 등록 후 이용시에는 무료 제공)")) {
					$("#down_" + bulletinIdx).attr("data-cnt", "1");
					location.href = "/study/book_pds_down.aspx?mode=" + mode + "&bulletin_idx=" + bulletinIdx + "&ssing_point=" + ssingPoint + "&path=" + path;
				}
			} else {
				location.href = "/study/book_pds_down.aspx?mode=" + mode + "&bulletin_idx=" + bulletinIdx + "&ssing_point=" + ssingPoint + "&path=" + path;
			}
		} else {
			location.href = "/study/book_pds_down.aspx?mode=" + mode + "&bulletin_idx=" + bulletinIdx + "&ssing_point=" + ssingPoint + "&path=" + path;
		}
	}
	else {
		location.href = "/study/down.aspx?path=" + path + "&bulletin_idx=" + bulletinIdx + "&ssing_point=" + ssingPoint;
	}
}


// 씽몰관련
var mall = {
	// 장바구니 담기
	basket : function(book_idx, mall_idx, mall_div){
		if(fnLoginCheck()){
			$.get("/ssing/ajax_basket_create.aspx?book_idx=" + book_idx + "&mall_idx=" + mall_idx + "&mall_div=" + mall_div, function(code){
				if(code == "success"){
					if(confirm("장바구니에 등록되었습니다. 장바구니를 확인하시겠습니까?")){
						location.href = "/mypage/shopping_basket.aspx?target_div=C";
					}
				}
				else if(code == "exist"){
					alert("이미 장바구니에 등록되었습니다.");
				}
				else if(code == "error"){
					alert("장바구니 등록 중 오류가 발생하였습니다.");
				}
				return;
			});
		}
	},

	// 구매하기
	buy : function(book_idx, mall_idx, mall_div){
		location.href = "/ssing/ajax_buy_create.aspx?book_idx=" + book_idx + "&mall_idx=" + mall_idx + "&mall_div=" + mall_div
	}
};

var isIE = (navigator.appName.indexOf("Microsoft") != -1) ? 1 : 0;
var isIE6 = (navigator.appVersion.indexOf("MSIE 6") != -1) ? 1 : 0;
var isIE7 = (navigator.appVersion.indexOf("MSIE 7") != -1) ? 1 : 0;
var isIE8 = (navigator.appVersion.indexOf("MSIE 8") != -1) ? 1 : 0;

function call(url, id, callback) {

    if (!id) id = "AJAX_DIV";
    var client = false;

    if (window.ActiveXObject) {
        try {
            client = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                client = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) { }
        }
    } else {
        client = new XMLHttpRequest();
    }
    if (client) {
        client.onreadystatechange = function () {
            if (client.readyState == 4) {

                //출력레이어가 없을 경우 생성
                var el = document.getElementById(id);
                if (!el) {
                    el = document.createElement("div");
                    el.style.display = 'none';
                    document.body.appendChild(el);
                }

                //IE의 경우 버그가 존재함. 그래서 &nbsp를 추가
                if (isIE && client.responseText.indexOf("<script") == 0) {
                    el.innerHTML = "<span style='display:none;'>&nbsp;</span>" + client.responseText;
                } else {
                    el.innerHTML = client.responseText;
                }

                if (callback) {
                    try {
                        eval(callback + "(client.responseText)");
                    } catch (e) { alert(callback + " 함수가 없습니다."); }
                }

                //자바스크립트 실행 (defer는 IE 에서 실행되어 안씀)
                var scripts = el.getElementsByTagName("script");
                for (var i = 0; i < scripts.length; i++) {
                    eval(scripts[i].innerHTML.replace("<!--", "").replace("-->", ""));
                }
            }
        }
        var f;
        if (f = document.forms[url]) {
            var parameters = "";
            for (var i = 0; i < f.elements.length; i++) {
                if (f.elements[i].name == "") continue;
                if (f.elements[i].type == "radio" || f.elements[i].type == "checkbox") {
                    if (f.elements[i].checked == false) continue;
                }
                parameters += f.elements[i].name + "=" + encodeURI(f.elements[i].value) + "&";
            }
            if (!f.action) f.action = location.href;
            client.open('POST', f.action, true);
            client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            client.setRequestHeader("Content-Length", parameters.length);
            client.setRequestHeader("Connection", "close");
            client.send(parameters);
        } else {
            client.open("GET", url, true);
            client.send(null);
        }
    }
}

function formatNumber(num) {
    var str = String(num)
    var re = /(-?[0-9]+)([0-9]{3})/; 

    while (re.test(str)) {
        str = str.replace(re, "$1,$2");
    }
    return str;
}

// 페이스북 공유(제목, 내용)
function facebookShare(url, title, summary) {
	url = "http://www.facebook.com/sharer/sharer.php?u=" + url;
	url = url.split("#").join("%23");
	url = encodeURI(url);
	window.open(url, "", "width=500px, height=300px, top=0px");
}

// 네이버 공유(제목, 내용)
function naverShare(url,title) {
	var link = "http://share.naver.com/web/shareView.nhn?url=" + encodeURI(encodeURIComponent(url))+"&title="+encodeURI(title);
	window.open(link, "", "width=500px, height=500px, top=0px");
}

// 트위터 공유(트윗)
function twitterShare(url, twit) {
	var url = "https://twitter.com/intent/tweet?original_referer=&text=" + encodeURI(twit) + "&url=" + url;
	window.open(url, "", "width=500px, height=300px, top=0px");
}

function GetCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	} else {
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
	if (end == -1) {
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}

function fnSetLength(obj) {
	//var firstBar = obj.value.lastIndexOf("-");
	//var objectLength = obj.value.length;
	//var lastWord = obj.value.substring(firstBar + 1, objectLength);
	document.getElementById("keyword1").value = '';
	document.getElementById("keyword2").value = '';
	if (obj == 97889283) {
		$("#keyword1").attr("maxlength", 4);
	}
	else if (obj == 978895977) {
		$("#keyword1").attr("maxlength", 3);
	}
}

function fnIsbnSubmit() {
	if ($("#isbnSelect").val() == "" || $("#isbnSelect").val() == null) {
		alert("도서 ISBN 번호를 정확히 입력해주세요.")
	}
	else if ($.trim($("#keyword1").val()).length < 3 || $.trim($("#keyword2").val()) == null || $.trim($("#keyword2").val()) == "") {
		alert("도서 ISBN 번호를 정확히 입력해주세요.")
	}
	else {
		var isbn = $("#isbnSelect").val() + "" + $("#keyword1").val() + "" + $("#keyword2").val();
		var f = document.forms['isbnForm'];
		f.submit();
	}
}

function checkNo(obj) {
	var r = new RegExp("^[0-9]+$");
	if(obj.value != ""){
		if(!r.test(obj.value)){
			alert("숫자만 입력 가능합니다.");		
			return;
		}
	}
}

function OpenWindow(nLink, nTarget, nWidth, nHeight, xPos, yPos) {
	if(typeof nLink == "object") url = nLink.href;
	else url = nLink;

	adjX = xPos ? xPos : (window.screen.width/2 - nWidth/2);
	adjY = yPos ? yPos : (window.screen.height/2 - nHeight/2 - 50);
	var qResult = window.open( url, nTarget, "width="+nWidth+", height="+nHeight+",left="+adjX+",top="+adjY+",toolbar=no,status=yes,scrollbars=no,resizable=no");
	//return qResult;
}

function OpenWindows(nLink, nTarget, nWidth, nHeight, xPos, yPos) {
	if(typeof nLink == "object") url = nLink.href;
	else url = nLink;

	adjX = xPos ? xPos : (window.screen.width/2 - nWidth/2);
	adjY = yPos ? yPos : (window.screen.height/2 - nHeight/2 - 50);
	var qResult = window.open( url, nTarget, "width="+nWidth+", height="+nHeight+",left="+adjX+",top="+adjY+",toolbar=no,status=yes,scrollbars=yes,resizable=no");
	//return qResult;
}

////////////////////////////////////////// 쿠키 관련 /////////////////////////////////////////////////////
//쿠키 저장
function SetCookie(name, value, expiredays) 
{
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );	
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function GetCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	} else {
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
	if (end == -1) {
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}

function DelCookie(name, path, domain)
{
    if (GetCookie(name)) {
        document.cookie = name + "=" + 
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}
