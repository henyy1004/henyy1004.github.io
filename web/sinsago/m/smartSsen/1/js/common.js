/* common */
/* s : 170303 */
$(document).ready(function(){
	$('.uselist .conview').hover(function(){
		$(window).trigger('resize'); 
	});
})
/* e : 170303 */

$(document).ready(function(){
	$('.select_st1').customSelect();
	modalPos();
	// s : 20180411
	$('img[usemap]').rwdImageMaps();
	// e : 20180411
});

/* s : 171016 */
$('.ordertap1016 a').click(function(i){this.i=i}).click(function(){
	var idx = $(this).index();
	$(this).parent().parent().find('.hiddenarea').removeClass('on');
	$(this).parent().parent().find('.ordertap1016 a').removeClass('on');
	$(this).addClass('on');
	$(this).parent().parent().find('.hiddenarea:eq('+idx+')').addClass('on');
	return false;
});
$('.payctg li').on('click',function(){
	$('.paychoice').removeClass('on');
	$(this).addClass('on');
});
/* e : 171016 */


/* payment */
$('.paychoice').on('click',function(){
	$(this).parents().find('.payment').addClass('on')
});
$('.paychoice:first-child').on('click',function(){
	$(this).parents().find('.payment').removeClass('on')
});


/* tab */
$('.tab_01 a').click(function(i){this.i=i}).click(function(){
	var idx = $(this).index();
	$(this).parent().parent().find('.hiddenarea').removeClass('on');
	$(this).parent().parent().find('.tab_01 a').removeClass('on');
	$(this).addClass('on');
	$(this).parent().parent().find('.hiddenarea:eq('+idx+')').addClass('on');
	return false;
});

/* tab */
$('.tab_02 a').click(function(i){this.i=i}).click(function(){
	var idx = $(this).index();
	$(this).parent().parent().find('.hiddenarea').removeClass('on');
	$(this).parent().parent().find('.tab_02 a').removeClass('on');
	$(this).addClass('on');
	$(this).parent().parent().find('.hiddenarea:eq('+idx+')').addClass('on');
	return false;
});

/* tab */
//$('.tab_03 a').click(function(i){this.i=i}).click(function(){
//	var idx = $(this).index();
//	$(this).parent().parent().find('.hiddenarea').removeClass('on');
//	$(this).parent().parent().find('.tab_03 a').removeClass('on');
//	$(this).addClass('on');
//	$(this).parent().parent().find('.hiddenarea:eq('+idx+')').addClass('on');
//	return false;
//});

/* tab */
$('.tab_04 a').click(function(i){this.i=i}).click(function(){
	var idx = $(this).index();
	$(this).parent().parent().find('.hiddenarea_02').removeClass('on');
	$(this).parent().parent().find('.tab_04 a').removeClass('on');
	$(this).addClass('on');
	$(this).parent().parent().find('.hiddenarea_02:eq('+idx+')').addClass('on');
	return false;
});

/* modal */
var modalpop = $('.modalpop');
function modalPos(){
	var modalpopWidth = $('.modalpop').width();
	var modalpopHeight = $('.modalpop').height();
	$('modal').append($('<div class="trplayer"></div>'));
	$('.modalpop').css('margin-left',-modalpopWidth/2-3+'px');
	$('.modalpop').css('margin-top',-modalpopHeight/2-3+'px');
}
function modalHide(){
	modalpop.removeClass('on');
	$('.trplayer').remove();
}




/* main */
var fn_gnb = function (){
	var obj_open = $('#header .btn_allmenu');
	var obj_close = $('#gnb_menu .close, #gnb_menu .blank');
	
	obj_open.bind('click',function(){
		$('#gnb_menu').addClass('open');
	});
	obj_close.bind('click',function(){
		$('#gnb_menu').removeClass('open');
	});
};

var fn_main_books = function (){
	$('img[usemap]').rwdImageMaps();

	var obj_btn = $('.main_menu').children();
	var obj_layer = $('.main_books .sec');
	var flag = 0;

	obj_btn.each(function(i){ this.num = i});
	obj_btn.bind('click',function(){					
		obj_btn.removeClass('on');
		$(this).addClass('on');
		obj_layer.eq(flag).css({'z-index':'1'});
		obj_layer.eq(flag).stop().animate({'opacity':0},500);
		obj_layer.eq(this.num).css({'z-index':'10'});
		obj_layer.eq(this.num).stop().animate({'opacity':1},700);
		flag = this.num;
	});
};

var fn_introduce = function (){
	var obj = $('#introduce_box');
	
	var item1_2 = obj.find('.item1_2');
	var item1_3 = obj.find('.item1_3');
	var item1_4 = obj.find('.item1_4');
	var item2_2 = obj.find('.item2_2');
	var item2_3 = obj.find('.item2_3');
	var item2_4 = obj.find('.item2_4');
	var item3_2 = obj.find('.item3_2');
	var item3_3 = obj.find('.item3_3');
	var item3_4 = obj.find('.item3_4');
	var item3_5 = obj.find('.item3_5');
	var item4_2 = obj.find('.item4_2');
	var item4_3 = obj.find('.item4_3');
	var item4_4 = obj.find('.item4_4');
	var item4_5 = obj.find('.item4_5');
	var item4_6 = obj.find('.item4_6');
	var item5_2 = obj.find('.item5_2');
	var item5_3 = obj.find('.item5_3');
	var item5_4 = obj.find('.item5_4');
	var item5_5 = obj.find('.item5_5');
	var item5_6 = obj.find('.item5_6');
	var item5_7 = obj.find('.item5_7');

	var item_offset_1_2 = item1_2.offset().top;
	var item_offset_1_3 = item1_3.offset().top;
	var item_offset_1_4 = item1_4.offset().top;
	var item_offset_2_2 = item2_2.offset().top;
	var item_offset_2_3 = item2_3.offset().top;
	var item_offset_2_4 = item2_4.offset().top;
	var item_offset_3_2 = item3_2.offset().top;
	var item_offset_3_3 = item3_3.offset().top;
	var item_offset_3_4 = item3_4.offset().top;
	var item_offset_3_5 = item3_5.offset().top;
	var item_offset_4_2 = item4_2.offset().top;
	var item_offset_4_3 = item4_3.offset().top;
	var item_offset_4_4 = item4_4.offset().top;
	var item_offset_4_5 = item4_5.offset().top;
	var item_offset_4_6 = item4_6.offset().top;
	var item_offset_5_2 = item5_2.offset().top;
	var item_offset_5_3 = item5_3.offset().top;
	var item_offset_5_4 = item5_4.offset().top;
	var item_offset_5_5 = item5_5.offset().top;
	var item_offset_5_6 = item5_6.offset().top;
	var item_offset_5_7 = item5_7.offset().top;
	var item_offset_last = $('#introduce_bottom').offset().top;

	var current_scrollTop = $(window).scrollTop();
	var screen_height = $(window).height();
	var va_hei = -50;
	var h_point = ((screen_height / 2) + current_scrollTop) + va_hei;

	$(window).resize(function(){
		current_scrollTop = $(window).scrollTop();
		screen_height = $(window).height();
		h_point = h_point = ((screen_height / 2) + current_scrollTop) + va_hei;

		item_offset_1_2 = item1_2.offset().top;
		item_offset_1_3 = item1_3.offset().top;
		item_offset_1_4 = item1_4.offset().top;
		item_offset_2_2 = item2_2.offset().top;
		item_offset_2_3 = item2_3.offset().top;
		item_offset_2_4 = item2_4.offset().top;
		item_offset_3_2 = item3_2.offset().top;
		item_offset_3_3 = item3_3.offset().top;
		item_offset_3_4 = item3_4.offset().top;
		item_offset_3_5 = item3_5.offset().top;
		item_offset_4_2 = item4_2.offset().top;
		item_offset_4_3 = item4_3.offset().top;
		item_offset_4_4 = item4_4.offset().top;
		item_offset_4_5 = item4_5.offset().top;
		item_offset_4_6 = item4_6.offset().top;
		item_offset_5_2 = item5_2.offset().top;
		item_offset_5_3 = item5_3.offset().top;
		item_offset_5_4 = item5_4.offset().top;
		item_offset_5_5 = item5_5.offset().top;
		item_offset_5_6 = item5_6.offset().top;
		item_offset_5_7 = item5_7.offset().top;
		item_offset_last = $('#introduce_bottom').offset().top;
	});						

	var fn_move = function (){
		current_scrollTop = $(window).scrollTop();
		screen_height = $(window).height();
		h_point = h_point = ((screen_height / 2) + current_scrollTop) - va_hei;

		if (h_point >= item_offset_1_2 && h_point < item_offset_1_3){
			item1_2.addClass('active');
		}else if (h_point >= item_offset_1_3 && h_point < item_offset_1_4){
			item1_3.addClass('active');
		}else if (h_point >= item_offset_1_4 && h_point < item_offset_2_2){
			item1_4.addClass('active');
		}else if (h_point >= item_offset_2_2 && h_point < item_offset_2_3){
			item2_2.addClass('active');
		}else if (h_point >= item_offset_2_3 && h_point < item_offset_2_4){
			item2_3.addClass('active');
		}else if (h_point >= item_offset_2_4 && h_point < item_offset_3_2){
			item2_4.addClass('active');
		}else if (h_point >= item_offset_3_2 && h_point < item_offset_3_3){
			item3_2.addClass('active');
		}else if (h_point >= item_offset_3_3 && h_point < item_offset_3_4){
			item3_3.addClass('active');
		}else if (h_point >= item_offset_3_4 && h_point < item_offset_3_5){
			item3_4.addClass('active');
		}else if (h_point >= item_offset_3_5 && h_point < item_offset_4_2){
			item3_5.addClass('active');
		}else if (h_point >= item_offset_4_2 && h_point < item_offset_4_3){
			item4_2.addClass('active');
		}else if (h_point >= item_offset_4_3 && h_point < item_offset_4_4){
			item4_3.addClass('active');
		}else if (h_point >= item_offset_4_4 && h_point < item_offset_4_5){
			item4_4.addClass('active');
			item4_6.addClass('active');
		}else if (h_point >= item_offset_4_6 && h_point < item_offset_5_2){
			item4_5.addClass('active');
		}else if (h_point >= item_offset_5_2 && h_point < item_offset_5_3){
			item5_2.addClass('active');
		}else if (h_point >= item_offset_5_3 && h_point < item_offset_5_4){
			item5_3.addClass('active');
		}else if (h_point >= item_offset_5_4 && h_point < item_offset_5_5){
			item5_4.addClass('active');
		}else if (h_point >= item_offset_5_5 && h_point < item_offset_5_6){
			item5_5.addClass('active');
		}else if (h_point >= item_offset_5_6 && h_point < item_offset_5_7){
			item5_6.addClass('active');
		}else if (h_point >= item_offset_5_7){
			item5_7.addClass('active');
		}
	};

	$(window).scroll(function(){
		fn_move();
	});
};

$(document).ready(function(){
	fn_gnb();
	fn_main_books();

	var main_banner_slider = $('.main_banner .slider');
	main_banner_slider.cycle({
		fx : "scrollHorz",
		easing: "easeOutQuart",
		speed: 1000,
		timeout: 4000,
		swipe: true,
		autoHeight : 'container',
		pager : ".main_banner .slider_page",
		slides : "> a"
	});	

	$('.bxslider').bxSlider({
		mode: "vertical",
		auto: true,
		speed: 500,
		pause :2500 ,
		controls: false,
		pager: false,
	});

	fn_introduce();
});

/* s : 170223 */
$('.uselist .subject').on('click',function(){
	if($(this).hasClass('sbjOn')){
		$(this).removeClass('sbjOn');
		$(this).next('.conview').css({'display':'none'});
	}else{
		$('.uselist .subject').removeClass('sbjOn');
		$('.uselist .conview').css({'display':'none'});
		$(this).addClass('sbjOn');
		$(this).next('.conview').css({'display':'block'});
	}
});
/* e : 170223 */
/* s : 170620 */
$('.btn_opt').click(function(){
	if($(this).hasClass('on')){
		$(this).removeClass('on');
		$(this).next('.optchoice170620').slideUp();
		$('.optbox').css({'padding-top':'5px'});
		$('.optbox').css({'border-top':'1px solid #00b1eb'});
		$(this).css({'top':'-37px'});
		$(this).parent().find('.balloon').removeClass('on');
	}else{
		$(this).addClass('on');
		$(this).next('.optchoice170620').slideDown();
		$(this).css({'top':'-10px'});
		$('.optbox').css({'padding-top':'0'});
		$('.optbox').css({'border-top':'1px solid #e70303'});
	}
});
/* e : 170620 */
$('.op_question').click(function(){
	$(this).parent().find('.balloon').addClass('on');
});
$('.ball_close').click(function(){
	$(this).parent('.balloon').removeClass('on');
});

/* s : 170620 */
$('.gift_choice02 .border').on('click',function(){
	$('.gift_choice02 .border').removeClass('on');
	$(this).addClass('on')
	if($(this).hasClass('on')){
	}else{
		$('.gift_choice02 .border').removeClass('on');
	}
});

function autoHypenPhone(str){
	str = str.replace(/[^0-9]/g, '');
	var tmp = '';
	if( str.length < 4){
		return str;
	}else if(str.length < 7){
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3);
		return tmp;
	}else if(str.length < 11){
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3, 3);
		tmp += '-';
		tmp += str.substr(6);
		return tmp;
	}else{              
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3, 4);
		tmp += '-';
		tmp += str.substr(7);
		return tmp;
	}
	return str;
}

/* s : 20180411 추가한 스크립트와 충돌나서 주석처리함 (리얼페이지에서 확인했을때 사용안하는것같았음) */
// var cellPhone = document.getElementById('cellPhone');
// 	cellPhone.onkeyup = function(event){
// 	event = event || window.event;
// 	var _val = this.value.trim();
// 	this.value = autoHypenPhone(_val) ;
// }/* e : 20180411 추가한 스크립트와 충돌나서 주석처리함 (리얼페이지에서 확인했을때 사용안하는것같았음) */
/* e : 170620 */

/* s : 20180411 추가 */
/* 무료 체험 간편 신청하기 */
function MainAppliOpen() {
	$('.layer_application').addClass('on');
	$('.application_area').slideDown();
	setTimeout(function () {
		$('.btn_application_close').show();
	},400);
}

function MainAppliClose() {
	$('.layer_application').removeClass('on');
	$('.application_area').slideUp();
	$('.btn_application_close').hide();
}

// 1.5초 후 열기
setTimeout(function(){
	MainAppliOpen();
}, 500);

// 열리고 1.5초후 닫기
setTimeout(function(){
	MainAppliClose();
},2000);

// 무료체험 열림 버튼
$('.btn_application_open').click(function () {
	MainAppliOpen();
});

// 무료체험 닫기 버튼
$('.btn_application_close').click(function(){
	MainAppliClose();
});
/* e : 20180411 추가 */