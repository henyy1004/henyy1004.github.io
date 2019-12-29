$(document).ready(function(){
	/* 스크롤바 올리기 */	
	window.addEventListener('load', function(){
	  setTimeout(scrollTo, 0, 0, 1);
	}, false);
	/* 팝업 */
	if ($('#popup_wrap').size() != 0){
		if ($('#popup_wrap').show()) {
			$('.wrap').find('a').toggleClass('no-highlight');
		}
	}
	/* 하단배너 */
	new Swipe(document.getElementById('banner'), {
		auto: 4000,
		callback: function(event, index, elem) {
			$('.paging_swipe span').removeClass('on').eq(index).addClass('on');;
		}
	});
})

/* height */
$(function(){
	contH = $('#content').innerHeight();
	headH = $('#headWrap').innerHeight();
	footH = $('#footWrap').innerHeight();
});

function sizeTo(){
	var wholeH = $(window).height();
	var cal_cH = wholeH-headH-footH;

	if (contH < cal_cH) {
		$('#content').height(cal_cH);
	}
	else if (contH > cal_cH) {
		$('#content').height(contH);
	}
}

$(window).resize( function(){
	//var height = $(window).height();
	//var width = $(window).width();
    
	//if(width>height) sizeTo();
	//else sizeTo();
});

$(function(){
	//sizeTo();
});

/* 팝업닫기 */
function popcls() {	
	var days="";
    if (document.getElementById("chk_day").checked) {
        days=3600 * 24 * 365;
    } else {        
		days=3600 * 24;
    }	

	SetCookie('GUIDE_POPUP', 'done', days, '/');

    $('#popup_wrap').hide();
    $('.wrap').find('a').toggleClass('no-highlight')
}

/* 수강중인 강좌 */
$(function(){
	$(".lecture_list > dt > a").click(function(){
		if( $(this).parent().hasClass("closed") ){
			$(this).parent().nextUntil("dt").show();
			$(this).parent().removeClass("closed");
		} else{
			$(this).parent().nextUntil("dt").hide();
			$(this).parent().addClass("closed");
		}
	});
});

/* 문항별 학습 */
$(function(){
	$(".lesson").mouseenter(function(){
		var obj = $("<a href='#'>").addClass("fakeA").addClass("closed").appendTo(this);
		obj.click(function(){
			if( $(this).hasClass("closed") ){
				$(this).removeClass("closed").parent().removeClass("closed").nextUntil(".lesson").removeClass("closed");
			} else{
				$(this).addClass("closed").parent().addClass("closed").nextUntil(".lesson").addClass("closed");
			}
			return false;
		});
	}).mouseleave(function(){
		$(".fakeA").remove();
	});
	$(".click").mouseenter(function(){
		var obj = $("<a href='#'>").addClass("fakeB").appendTo($(this));
		var t = $(this).parent().parent();
		obj.click(function(){
			if( t.hasClass("closed") ){
				t.removeClass("closed");
			} else{
				t.addClass("closed");
			}
			return false;
		});
	}).mouseleave(function(){
		$(".fakeB").remove();
	});
});

/* 22_강좌안내 */
$(function(){
	$(".recom").click(function(){
		if($(this).next().css("display") == "none"){
			$(this).addClass("closed").next().show();
		}else{
			$(this).removeClass("closed").next().hide();
		};
	});
});

/* 33_피클샘학습Q */
$(function(){
	$(".recom2").click(function(){
		if($(this).next().css("display") == "none"){
			$(this).addClass("closed").next().show();
		}else{
			$(this).removeClass("closed").next().hide();
		};
	});
});


// 인풋값 삭제
function clearTextField(form,name){
	 document.forms[form][name].value="";	 
}

function goLogin(ch) {
    if(confirm('로그인이 필요한 서비스입니다. \r\n로그인 페이지로 이동하시겠습니까?'))
	    location.href = "/member/login.aspx?ch=" + ch;	
}

function goLoginBack(ch, url) {
    if(confirm('로그인이 필요한 서비스입니다. \r\n로그인 페이지로 이동하시겠습니까?'))
	    location.href = "/member/login.aspx?ch=" + ch + "&refurl=" + url;	
}

function Popup_setCookie(name, value, expiredays) {	
    var todayDate = new Date();

    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function chkVideo(){
	var ua="{{ua}}";
	if(ua.indexOf("iphone os 3")>-1){
		alert("사용하시는 IOS 버전에서는 지원하지 않는 기능입니다. IOS를 최신버전으로 업그레이드 해 주세요");
		return;
	}
}

function play(contentCd){
	/*
							chkVideo();

							var video = document.getElementById(video);
							video.play();		
		*/					
							location.href="http://pmp.sinsago.co.kr/sinsagopmp/"+contentCd+".mp4"
						}

/* 팝업2닫기 */
function popcls2() {	
	var days="";
    if (document.getElementById("chk_day2").checked) {		
        days=3600 * 24
		SetCookie('PREM_POPUP', 'done', days, '/');
    }	

    $('#popup_prem').hide();
    $('.wrap').find('a').toggleClass('no-highlight')
}

/* 에듀매니져 팝업 */
function popcls3() {	
	var days="";
    if (document.getElementById("chk_day3").checked) {		
        days = 3600 * 24
		SetCookie('EDU_POPUP', 'done', days, '/');
    }	

    $('#popup_edu').hide();
    $('.wrap').find('a').toggleClass('no-highlight')
}

/* 쎈100문항 제공안내 팝업 */
function popcls4(mode,ch) {	

	var days="";
    if (document.getElementById("chk_day4").checked) {		
        days = 3600 * 24 * 365
		SetCookie('SSEN_POPUP', 'done', days, '/');
    }	

    $('#popup_ssen').hide();
    $('.wrap').find('a').toggleClass('no-highlight')

	if(mode=="go"){
		location.href="/classroom/course_open.aspx?ch="+ch;				
	}
}

document.addEventListener("touchstart", function (event) {
    $(function () {				
        if (GetCookie("GUIDE_POPUP") != "done") {
						$('#popup_wrap').removeClass("hidden");
						$('#popup_wrap').show();
				}
    })
}, false);

function goPrem(){
	popcls2();
	window.open("http://pickle.sinsago.co.kr/classroom/prem_info.aspx?ch=m");
}


//강좌체험관
//ui관련
//증등고등초등
function grade(ele,tcd){
		$('.select_grade a').removeClass('on');
		$(ele).addClass('on');

		changeApply1(tcd);
}

//강좌체험관
$(function(){
	$(".applytap li").each(function(idx){
		$(this).click(function(){
			$(".applytap li").each(function(idx){
				$(this).find("img").attr("src",$(this).find("img").attr("src").replace("_on.png",".png"));
				$(this).removeClass("on");
				$(".applycon").eq(idx).hide();

			});
				
			$(this).find("img").attr("src",$(this).find("img").attr("src").replace(".png","_on.png"));
			$(".applycon").eq(idx).show(); 
			$(this).addClass("on");
		});		
	});
});

$(function(){
	$(".applybtn").click(function(){
		$(".applycon").eq(0).hide(); 
		$(".applytap li").eq(0).removeClass("on");
		$(".applytap li").eq(0).find("img").attr("src",$(".applytap li").eq(0).find("img").attr("src").replace("_on.png",".png"));

		$(".applycon").eq(1).show(); 		
		$(".applytap li").eq(1).addClass("on");		
		$(".applytap li").eq(1).find("img").attr("src",$(".applytap li").eq(1).find("img").attr("src").replace(".png","_on.png"));
	});
});

$(function(){
	$(".ques_noti").click(function(){	
		if($(".ques_box").css("display") == "block"){
			$(".ques_noti .btn_cocky").html("꼭 읽어보세요! ▼");
			$(".ques_box").hide();			
		}else{
			$(".ques_noti .btn_cocky").html("꼭 읽어보세요! ▲");
			$(".ques_box").show();

		}
	});
});

var CSS3 = {
    returnTranslate: function (x, y, z) {
        return {
            '-webkit-transform': 'translate3d(' + (x + '%') + ', ' + y + 'px, ' + z + 'px)',
            '-moz-transform': 'translate3d(' + (x + '%') + ', ' + y + 'px, ' + z + 'px)',
            'transform': 'translate3d(' + (x + '%') + ', ' + y + 'px, ' + z + 'px)'
        }
    },

    returnAnimateSpeed: function (speed) {
        return {
            '-webkit-transition': '-webkit-transform ' + speed + 'ms ease-in-out',
            '-moz-transition': '-moz-transform ' + speed + 'ms ease-in-out',
            'transition': 'transform ' + speed + 'ms ease-in-out'
        }
    }
};


/* 메인 롤링 배너 
$(function () {
    if ($('#main_rolling').length) {

        var elem = document.getElementById('main_rolling');
        var dots = $('.main_visual .paging_swipe').find('span');

        window.mySwipe = Swipe(elem, {
			speed : 400,
			auto : 3000,
			continuous: true,
			disableScroll : false,
			stopPropagation : true,
			callback: function (index) {
                var i = dots.length;
                while (i--) {
                    dots[i].className = ' ';
                }
                dots[index].className = 'on';
            }
        });
    }
});
*/

function goLink(el){
	location.href = "main.aspx?ch=" + el.value;
}

// 전체 메뉴 이동 
$(function () {
	var allShow = $('.menu_btn, .close_menu'),
		allMenu = $('.allLink');
		wrapper = $('.wrapper');
		allShow.on('click', function(){
		if(allMenu.hasClass('active')) {
			allMenu.removeClass('active');
			allMenu.hide();
			wrapper.css("height","100%");
		}else {
			allMenu.addClass('active');
			allMenu.show();
			wrapper.css("height",allMenu.css("height"));

		}
		return false;
	});
});

/*카카오톡 연결*/
function executeURLLink(msg,url)
{
    /* 
    msg, url, appid, appname은 실제 서비스에서 사용하는 정보로 업데이트되어야 합니다. 
    */
    kakao.link("talk").send({
        msg : msg,
        url : "http://"+url.replace("http://",""),
        appid : "pickle.sinsago.co.kr",
        appver : "2.0",
        appname : "신사고피클",
        type : "link"
    });

}

function executeAPPLink()
{
    /* 
      msg, url, appid, appname, metainfo는 실제 서비스에서 사용하는 정보로 업데이트되어야 합니다. 
    */
    kakao.link("talk").send({
        msg : "카카오링크를 사용하여 메세지를 전달해보세요.\n 줄바꿈",
        url : "http://link.kakao.com",
        appid : "m.kakao.com",
        appver : "2.0",
        appname : "카카오",
        metainfo : JSON.stringify({metainfo : [ {os:"android", devicetype: "phone",installurl:"market://details?id=com.kakao.talk", executeurl : "kakaoagit://testtest"},{os:"ios", devicetype:"pad",installurl:"items://itunes.apple.com/us/app/kakaotalk/id362057947?mt=8",executeurl : "kakaoagit://testtest"}]}),
        type : "app"
    });
}

function executeKakaoStoryLink()
{
    kakao.link("story").send({   
        post : "http://m.media.daum.net/entertain/enews/view?newsid=20120927110708426",
        appid : "m.media.daum.net",
        appver : "1.0",
        appname : "미디어디음",
        urlinfo : JSON.stringify({title:"(광해) 실제 역사적 진실은?", desc:"(광해 왕이 된 남자)의 역사성 부족을 논하다.", imageurl:["http://m1.daumcdn.net/photo-media/201209/27/ohmynews/R_430x0_20120927141307222.jpg"], type:"article"})
    });
}
