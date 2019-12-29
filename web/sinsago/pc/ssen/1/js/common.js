// slide
function bxslider(){
	$('.bxslider_01').bxSlider({
		auto:true,
		controls:false,
		speed:500,
		touchEnabled:false,
	});
	var bxc = $('.bx-controls').outerWidth()/2;
	$('.bx-controls').css({'margin-left' : -bxc});

	$('.bxslider_03').bxSlider({
		auto:true,
		controls:false,
		speed:500,
		touchEnabled:false,
	});
}


// gnb
$('.gnbwrap .gnb li').on('mouseenter', function(){
	$('.gnbwrap .view').fadeIn();

});
$('.gnbwrap').mouseleave(function(){
	$('.gnbwrap .view').fadeOut();
});

// family stie
$('#footer .site').on('click',function(){
	if($(this).hasClass('on')){
		$(this).removeClass('on');
		$(".site img").attr("src", $(this).find("img").attr("src" ).replace("_on" ,"_off"));
		$(".siteOver170424").css({'display':'none'});
	}else{
		$(this).addClass('on');
		$(".site img").attr("src", $(this).find("img").attr("src" ).replace("_off" ,"_on"));
		$(".siteOver170424").css({'display':'block'});
	}
	return false;
});


// main visual
$('.slide_container').slick({
	swipe:false,
	dots: true,
	infinite: true,
	speed: 300,
	slidesToShow: 1,
	centerMode: true,
	variableWidth: true,
});
// main visual arrow
$(".slide_wrap .slick-arrow.slick-prev").append('<span><img src="../images/btn/btn_bg_arrow_prev.png" /></span>');
$(".slide_wrap .slick-arrow.slick-next").append('<span><img src="../images/btn/btn_bg_arrow_next.png" /></span>');
$('.slide_wrap .slick-arrow.slick-prev').on('mouseenter', function(){
	$('.slide_wrap .slick-arrow.slick-prev span').stop().delay(0).animate({'left':15},100,'easeInSine');
	$('.slide_wrap .slick-arrow.slick-prev span').stop().delay(0).animate({'left':23},200,'easeInSine');
});
$('.slide_wrap .slick-arrow.slick-next').on('mouseenter', function(){
	$('.slide_wrap .slick-arrow.slick-next span').stop().delay(0).animate({'left':31},100,'easeInSine');
	$('.slide_wrap .slick-arrow.slick-next span').stop().delay(0).animate({'left':24},200,'easeInSine');
});

// best slide
$('.best_slide_container').slick({
	swipe:false,
	dots: false,
	infinite: true,
	speed: 300,
	slidesToShow: 2,
	slidesToScroll: 1,
		 variableWidth: true
});
// best slide arrow
$(".best_review .slick-arrow.slick-prev").append('<span><img src="../images/btn/btn_bg_arrow_prev.png" /></span>');
$(".best_review .slick-arrow.slick-next").append('<span><img src="../images/btn/btn_bg_arrow_next.png" /></span>');
$('.best_review .slick-arrow.slick-prev').on('mouseenter', function(){
	$('.best_review .slick-arrow.slick-prev span').stop().delay(0).animate({'left':13},200,'easeInSine');
	$('.best_review .slick-arrow.slick-prev span').stop().delay(0).animate({'left':21},200,'easeInSine');
});
$('.best_review .slick-arrow.slick-next').on('mouseenter', function(){
	$('.best_review .slick-arrow.slick-next span').stop().delay(0).animate({'left':33},200,'easeInSine');
	$('.best_review .slick-arrow.slick-next span').stop().delay(0).animate({'left':25},200,'easeInSine');
});

// book arrow
$(".book_slide .swiper-button-prev").append('<span><img src="../images/btn/btn_bg_arrow_prev.png" /></span>');
$(".book_slide .swiper-button-next").append('<span><img src="../images/btn/btn_bg_arrow_next.png" /></span>');
$('.book_slide .swiper-button-prev').on('mouseenter', function(){
	$('.book_slide .swiper-button-prev span').stop().delay(0).animate({'left':13},200,'easeInSine');
	$('.book_slide .swiper-button-prev span').stop().delay(0).animate({'left':21},200,'easeInSine');
});
$('.book_slide .swiper-button-next').on('mouseenter', function(){
	$('.book_slide .swiper-button-next span').stop().delay(0).animate({'left':33},200,'easeInSine');
	$('.book_slide .swiper-button-next span').stop().delay(0).animate({'left':25},200,'easeInSine');
});

// pr
$('.thumbnail li').click(function(){
	$('.thumbnail li').removeClass('on');
	$(this).addClass('on');
});
$('.thumbnail li.cf').click(function(){
	$(".video dt .img").attr("src", $(this).find("img").attr("src" ).replace("_s.jpg" ,"_b.jpg"));
	$(".video dd").text($(this).text());
});

// more button
$('.thumbnail .btn_more a').on('click',function(){
	sub3_more_play();
	$('.thumbnail .btn_more').stop().animate({'opacity':0},1000);
	$('.thumbnail .btn_more').css({'display':'none'});
	$('.thumbnail li.none').css({'display':'inline-block'});
});

// more button
$('.event .btn_more a').on('click',function(){
	sub7_more_play();
	$('.event .btn_more').stop().animate({'opacity':0},1000);
	$('.event .btn_more').css({'display':'none'});
	$('.event li.none').css({'display':'block'});
});

// btn_book mouseover
$('.book_info .btn a img').on('mouseenter',function(){
	$(this).each(function(){var sSrc = $(this).attr('src').replace('_off.png', '_on.png');$(this).attr('src', sSrc)});
});
$('.book_info .btn a img').on('mouseout',function(){
	$(this).each(function(){var sSrc = $(this).attr('src').replace('_on.png', '_off.png');$(this).attr('src', sSrc)});
});

// layer popup
function modalView(idValue,e) {
	modalClose();
	$('.modalpop').append($("<div class='trplayer'></div>"));
	$('body').addClass('modal');
	$(idValue).stop().addClass('on');
}

function modalClose(){
	$('body').removeClass('modal').removeClass('a-height');
	$('body').unbind();
	$('.trplayer').remove();
	$('.modalpop').removeClass('on');
	$('.modalwrap').removeAttr('style');
}



$(document).ready(function() {
	
	bxslider();
	$('.event_select select').msDropdown({roundedBorder:false});

	// top
	$("#quick").hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#quick').fadeIn();
		} else {
			$('#quick').fadeOut();
		}
	});
	$('#quick a').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
});


// fade effect
$(document).ready(function() {
	$('.slide_wrap').stop().animate({'opacity':1},700);
	sub1_play();
	sub2_play();
	sub3_play();
	sub456_play();
	sub7_play();
	sub8_play();
});

var current_scrollTop = $(window).scrollTop();
var screen_height = $(window).height();
var va_hei = 100;
var h_point = ((screen_height / 2) + current_scrollTop) + va_hei;

/*
//main
$(window).scroll(function(){
	current_scrollTop = $(window).scrollTop();
	screen_height = $(window).height();
	h_point = h_point = ((screen_height / 2) + current_scrollTop) + va_hei;

	if (h_point >= 1100 && h_point < 1300){
		//main2_play();
	}else if (h_point >= 1400 && h_point < 2000){
		main3_play();
	}else if (h_point >= 2000 && h_point < 2600){
		main4_play();
	}else if (h_point >= 2600 && h_point < 3225){
		main5_play();
	}
});
var main1_play = function (){
	$('.book_info .tit').stop().delay(400).animate({'opacity':1,'bottom':0},700,'easeOutExpo');
	$('.book_info > ul > li.fade_b1').stop().delay(800).animate({'opacity':1},1000,'easeOutExpo');
	$('.book_info > ul > li.fade_b2').stop().delay(1000).animate({'opacity':1},1000,'easeOutExpo');
	$('.book_info > ul > li.fade_b3').stop().delay(1200).animate({'opacity':1},1000,'easeOutExpo');
	$('.book_info > ul > li.fade_b4').stop().delay(1400).animate({'opacity':1},1000,'easeOutExpo');
};
var main3_play = function (){
	$('.book_info > ul > li.fade_b5').stop().delay(0).animate({'opacity':1},1000,'easeOutExpo');
	setTimeout(function() {$('.book_info > ul > li.fade_b6').stop().delay(0).animate({'opacity':1},1000,'easeOutExpo');}, 200);
};
var main4_play = function (){
	$('.best_review .tit').stop().delay(0).animate({'opacity':1,'bottom':0},500,'easeOutExpo');
	setTimeout(function() {$('.best_review .slidearea').stop().delay(0).animate({'opacity':1},1500,'easeOutExpo');}, 300);
};
var main5_play = function (){
	$('.talk_ssen .tit').stop().delay(0).animate({'opacity':1,'bottom':0},500,'easeOutExpo');
	setTimeout(function() {$('.talk_ssen ul > li.fade_ts1').stop().delay(0).animate({'opacity':1},1000,'easeOutExpo');}, 400);
	setTimeout(function() {$('.talk_ssen ul > li.fade_ts2').stop().delay(0).animate({'opacity':1},1000,'easeOutExpo');}, 600);
	setTimeout(function() {$('.talk_ssen ul > li.fade_ts3').stop().delay(0).animate({'opacity':1},1000,'easeOutExpo');}, 800);
	setTimeout(function() {$('.talk_ssen ul > li.fade_ts4').stop().delay(0).animate({'opacity':1},1000,'easeOutExpo');}, 1000);
};
*/

//sub1
var sub1_play = function (){
	$('#contents .visual').stop().delay(300).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .brand dt.fade_b1_1').stop().delay(700).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .brand dd.fade_b1_2').stop().delay(900).animate({'opacity':1},1000,'easeOutExpo');
	setTimeout(function() {graph();}, 1000);
	$('#contents .brand dt.fade_b2_1').stop().delay(1200).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .brand dd.fade_b2_2').stop().delay(1400).animate({'opacity':1},1000,'easeOutExpo');
};
function graph(){
	$('.graph td.y06 span').stop().delay(200).animate({'height':20},200,'easeOutExpo');
	setTimeout(function() {$('.graph td.y10 span').stop().delay(0).animate({'height':80},300,'easeOutExpo');}, 400);
	setTimeout(function() {$('.graph td.y12 span').stop().delay(0).animate({'height':150},300,'easeOutExpo');}, 600);
	setTimeout(function() {$('.graph td.y16 span').stop().delay(0).animate({'height':215},300,'easeOutExpo');}, 900);

	setTimeout(function() {$('.graph td.y06 em').stop().delay(0).animate({'opacity':1},200,'easeOutExpo');}, 1300);
	setTimeout(function() {$('.graph td.y06 strong').stop().delay(0).animate({'opacity':1},500,'easeOutExpo');}, 1700);
	setTimeout(function() {$('.graph td.y10 em').stop().delay(0).animate({'opacity':1},500,'easeOutExpo');}, 1600);
	setTimeout(function() {$('.graph td.y10 strong').stop().delay(0).animate({'opacity':1},500,'easeOutExpo');}, 1800);
	setTimeout(function() {$('.graph td.y12 em').stop().delay(0).animate({'opacity':1},500,'easeOutExpo');}, 1900);
	setTimeout(function() {$('.graph td.y12 strong').stop().delay(0).animate({'opacity':1},500,'easeOutExpo');}, 2100);
	setTimeout(function() {$('.graph td.y16 em').stop().delay(0).animate({'opacity':1},500,'easeOutExpo');}, 2200);
	/*
	setTimeout(function() {
		$('.graph td.y16 em').stop().delay(0).animate({'opacity':1},500,'easeOutExpo');
			setInterval(function(){
				$(".graph td.y16 em").animate({'opacity':0},300,'easeOutExpo');
				$(".graph td.y16 em").animate({'opacity':1},300,'easeOutExpo');
			}, 1000);
	}, 3000);
	*/
}

//sub2
var sub2_play = function (){
	$('.bg_gray').stop().delay(100).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .history ul').stop().delay(300).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .history li.hy1').stop().delay(500).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .history li.hy2').stop().delay(700).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .history li.hy3').stop().delay(900).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .history li.hy4').stop().delay(1100).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .history li.hy5').stop().delay(1300).animate({'opacity':1},1000,'easeOutExpo');
};

//sub3
var sub3_play = function (){
	$('#contents .video dt').stop().delay(300).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .video dd').stop().delay(500).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .thumbnail li.fade_tn1').stop().delay(700).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .thumbnail li.fade_tn2').stop().delay(900).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .thumbnail li.fade_tn3').stop().delay(1100).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .thumbnail li.fade_tn4').stop().delay(1300).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .thumbnail li.fade_tn5').stop().delay(1500).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .thumbnail li.fade_tn6').stop().delay(1700).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .thumbnail .btn_more').stop().delay(1900).animate({'opacity':1},1000,'easeOutExpo');
};
var sub3_more_play = function (){
	$('#contents .thumbnail li.fade_tn7').stop().delay(200).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .thumbnail li.fade_tn8').stop().delay(400).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .thumbnail li.fade_tn9').stop().delay(600).animate({'opacity':1},1000,'easeOutExpo');
};

//sub4 sub5 sub6
var sub456_play = function (){
	$('#contents .book_slide .swiper-pagination').stop().delay(300).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .book_slide .inner').stop().delay(500).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .book_slide .swiper-control').stop().delay(600).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .bottom_banner').stop().delay(700).animate({'opacity':1},1000,'easeOutExpo');
};

//sub7
var sub7_play = function (){
	$('#contents .event li.evt1').stop().delay(300).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .event li.evt2').stop().delay(500).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .event li.evt3').stop().delay(700).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .event li.evt4').stop().delay(900).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .event li.evt5').stop().delay(1100).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .event .btn_more').stop().delay(1300).animate({'opacity':1},1000,'easeOutExpo');
};
var sub7_more_play = function (){
	$('#contents .event li.evt6').stop().delay(200).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .event li.evt7').stop().delay(400).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .event li.evt8').stop().delay(600).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .event li.evt9').stop().delay(800).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .event li.evt10').stop().delay(1000).animate({'opacity':1},1000,'easeOutExpo');
};

//sub8
var sub8_play = function (){
	$('#contents .event_view').stop().delay(300).animate({'opacity':1},1000,'easeOutExpo');
	$('#contents .event_select').stop().delay(500).animate({'opacity':1},1000,'easeOutExpo');
};

// s * 180702 malgun Jung Hyein
// 열공 인증 게시글 내 슬라이드
$('.board_slide_container').slick({
	swipe:false,
	dots: false,
	infinite: true,
	speed: 300,
	slidesToShow: 1,
	variableWidth: true,
	autoplay: true
});

// event 네이게이션 스크립트
var event_navi = function () { 
	$(document).scroll(function () {
		if ($(document).scrollTop() <= 800) {
			$('.event_navigation').css('background-position', '0 0');
		}

		if ($(document).scrollTop() >= 800) {
			$('.event_navigation').css('background-position', '-138px 0');
		}
		
		if ($(document).scrollTop() >= 1100) {
			$('.event_navigation').css('background-position', '-276px 0');
		}

		if ($(document).scrollTop() >= 1950) {
			$('.event_navigation').css('background-position', '-414px 0');
		}
	});

	$('.btn_event_nav').on('click', function (e) {
		e.preventDefault();
	
		var target = this.hash;
		var $target = $(target);
	
		$('html, body').animate({
			'scrollTop': ($target.offset().top) - 300
		}, 400);
	});
};

event_navi();
// e * 180702 malgun Jung Hyein