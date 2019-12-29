$(document).ready(function (e) {
	// top버튼 스크립트
	$(window).scroll(function () {
		var contentsHeight = $("#wrap").height(),
			winscrolltop = $(window).scrollTop();
		
		if (winscrolltop > 200) {
			$('#top').fadeIn();
		} else {
			$('#top').fadeOut();
		}
	});

	$('#top').click(function () {
		$('html, body').animate({ scrollTop: 0});
	});

	// 팝업
	$('.btn_open_popup').click(function () {
		$('.layer_wrap').removeClass('hide');
		$('html,body').css({'overflow':'hidden'});
	});

	$('.btn_close').on('click',function(){
		$('html,body').css({ 'overflow': 'auto' });
		$('.layer_wrap').addClass('hide');
	});
});