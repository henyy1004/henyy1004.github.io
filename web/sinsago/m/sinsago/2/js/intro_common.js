/* common */
$(document).ready(function(){
	$('img[usemap]').rwdImageMaps();
	//$('.select_st1').customSelect();
	//bxslider();
	sitego();
	yearlist();
	height();
	imgView();
})

$(window).resize(function(){
	height();
});

var body = $('body');
var gnbw = $('.gnbwrap');
var gnbUl = $('#gnb ul');
var gnbLi = $('#gnb li');

$('.btn_allmenu').on('click', function(){
	if(gnbw.hasClass('gnbOn')){
			gnbHide();
		}else{
			gnbView();		
		}
	return false;
});

/* gnb */
function gnbView(){
	body.addClass('ovh')
	$('.gnbbg').addClass('on');
	body.bind('touchmove',function(e){e.preventDefault()});
	gnbUl.removeAttr('style');
	gnbw.stop().animate({left : '0'}, 200).addClass('gnbOn');
	$('#gnb > ul > li:first-child').addClass('on');
	$('#gnb > ul > li:first-child > ul').css({'display':'block'});
	function cssGnb(width) {
		var windowW = $(window).width();
		if (windowW > 1024){
			$('.gnbbg').removeClass('on');
			body.removeClass('ovh');
			body.unbind();
			gnbw.removeClass('gnbOn').removeAttr('style');
			gnbLi.removeClass('on');
			gnbUl.removeAttr('style');
		}
	}
	$(function() {
		$(window).resize(function() {
			cssGnb($(this).width());
		}).resize();
	});
	
	
}
function gnbHide(){
	gnbw.stop().animate({left : '-270px'}, 200, function(){
		$('.gnbbg').removeClass('on');
		gnbw.removeAttr('style').removeClass('gnbOn');
	});
	body.removeClass('ovh');
	body.unbind();
	gnbLi.removeClass('on');
	gnbUl.removeAttr('style');

}
$('#gnb > ul > li > a').on('click', function(){
	if(gnbw.hasClass('gnbOn')){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
			$(this).next().stop().animate({height : 'toggle'}, 200);
		}else{
			gnbLi.removeClass('on');
			$('#gnb li ul').stop().slideUp(200);
			$(this).parent().addClass('on');
			$(this).next().stop().animate({height : 'toggle'}, 200);
		}
		return false;
	}
});

$('.depth1menu li > a.on').on('click', function(){
	if($(this).parent().hasClass('on')){
		$(this).parent().removeClass('on');
		$('.depth1menu_view').css({'display':'none'});
	}else{
		$(this).parent().addClass('on');
		$('.depth1menu_view').css({'display':'block'});
	}
	return false;
});

function bxslider(){
	$('.bxslider01').bxSlider({
		mode: 'fade',
		auto: true,
		speed: 500,
		controls: false,
	});
	$('.bxslider02').bxSlider({
		auto: false,
		pager: true,
		pagerType: 'short',
		speed: 500
	});
}

function sitego(){
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 'auto',
		freeMode: true
	});
}

function yearlist(){
	var obj = $('.yearlist');
	var obj_child = obj.children();
	$('.yearlist dt').on('click',function(){
		var idx = $(this).index();
		var open_obj = obj_child.eq(idx);
		if($(this).hasClass('sbjOn')){
			$(this).removeClass('sbjOn');
			$(this).next('dd').css({'display':'none'});
			$('.yearlist dt').parents('dl').css({'height':'30px'});
		}else{
			$('.yearlist dt').removeClass('sbjOn');
			$('.yearlist dd').css({'display':'none'});
			$('.yearlist dt').parents('dl').css({'height':'30px'});
			$(this).addClass('sbjOn');
			$(this).next('dd').css({'display':'block'});
			$(this).parents('dl').css({'height':'auto'});
			$(window).scrollTop(open_obj.offset().top);
		}
	});
}

function height(){
	var bu1h = $('.bu1').height();
	var bu3h = $('.bu3').height();
	$('.bu2').css({'height':bu1h+22});
	$('.bu4').css({'height':bu3h+22});
}


/* s : 170425 */
function imgView(){	
	var view_slider = $('.view_img_wrap .img_big_box .slider');
	view_slider.bxSlider({
		mode: 'fade',
		pager: true,
		speed: 500,
		pagerCustom:'.view_img_wrap .bx-thumb',
		controls:false,
		onSlideBefore: function(el, oldidx, newidx) {
			img_change(newidx);
		},
	});
}

function img_change(val){
	$('.tit_box li').removeClass("on");
	$('#title'+val).addClass("on");
}
/* e : 170425 */

$('.tab a').click(function(i){this.i=i}).click(function(){
	var idx = $(this).index();
	$(this).parent().parent().find('.hiddenarea').removeClass('on');
	$(this).parent().parent().find('.tab a').removeClass('on');
	$(this).addClass('on');
	$(this).parent().parent().find('.hiddenarea:eq('+idx+')').addClass('on');
	return false;
});

$('.faqList .sbj').on('click',function(){
	var ths = $(this).parent(),
		ans = $(this).next();
	if(ths.hasClass('on')){
		ths.removeClass('on');
		ans.slideUp(100);
	}else{
		$('.faqList li').removeClass('on');
		$('.faqList li .ans').slideUp(100);
		ths.addClass('on');
		ans.slideDown(100);
	}
});
$('.vodList .item a').on('click',function(){
	$('.vodList .item a').removeClass('on');
	$(this).addClass('on');
	return false
});

/* s : 170407 */
var count = 0;
function modalView(idValue,e){
	count ++; 
	if(count == "1"){						
		new daum.roughmap.Lander({
			"timestamp" : "1492144349951",
			"key" : "h75g",
			"mapWidth" : "258",
			"mapHeight" : "148"
		}).render();			
	}
	modalClose();
	$('.modalpop').append($("<div class='trplayer'></div>"));
	$('body').addClass('modal');
	$('.modalpop').addClass('on');
}

function modalClose(){
	$('.trplayer').remove();
	$('body').removeClass('modal');
	$('.modalpop').removeClass('on');
}
/* e : 170407 */
