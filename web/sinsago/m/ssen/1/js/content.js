$(function () {
	// 이미지맵
	$('img[usemap]').rwdImageMaps();
});

// 팝업
$(function(){
	$('.md-trigger').on('click',function(){
		$('html,body').css({'height':'100%', 'position':'fixed'});
	});
	$('.btn_close').on('click',function(){
		$('html,body').css({'height':'auto' , 'position':'static'});
	});
});

// top버튼 스크립트
$(function () {
	$(window).scroll(function () {
		if($(this).scrollTop() > 55) {
			$('#top').fadeIn();
		}else{
			$('#top').fadeOut();
		}
	});

	$('#top').click(function () {
		$('html, body').animate({ scrollTop: 0});
	});
});

$(document).ready(function () {
	// 탭 스크립트
	$('.list_tab_nav>li>a').click(function () {
		var index = $(this).parent().index();
		var tabCont = document.getElementsByClassName('tab_content');

		$(this).parent().addClass('active').siblings().removeClass('active');
		$(tabCont[index]).addClass('active').siblings().removeClass('active');
	});

	// 내가 쓴 글 모아보기
	$('.btn_my_board').click(function () {
		var myBoardList = $('.my_write_board .list_photo_board>li');
		if (myBoardList.length < 1) {
			$('.my_write_board').removeClass('has_data').addClass('no_data');
			$('.list_photo_board_wrap.default').removeClass('hide');
		} else { 
			$('.my_write_board').removeClass('no_data').addClass('has_data');
			$('.list_photo_board_wrap.default').addClass('hide');
		}
	});
});

// 으쌰으쌰! 우리는 열공 중 팝업에 들어가는 이미지 슬라이드
var swiper = new Swiper('.board_slide_area .swiper-container', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	autoplay: {
		delay: 3500,
	},
	loop: true
});