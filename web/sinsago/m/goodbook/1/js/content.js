$(function(){
	$('img[usemap]').rwdImageMaps();
});

// 팝업
$(function(){
	$('.md-trigger').on('click',function(){
		$('html,body').css({'overflow':'hidden'});
	});
	$('.btn_close').on('click',function(){
		$('html,body').css({'overflow':'auto'});
	});
});


$(function () {
	// top버튼 스크립트
	$(window).scroll(function () {
		var contentsHeight = $("#wrap").height(),
		winscrolltop = $(window).scrollTop(),
		winscrollbtm = contentsHeight - $(window).height();
		if (winscrolltop > winscrollbtm - 100) {
			$('#top').css('bottom','113px');
		} else {
			$('#top').css('bottom','30px');
		}

		if (winscrolltop > 200) {
			$('#top').fadeIn();
		} else {
			$('#top').fadeOut();
		}
	});

	$('#top').click(function () {
		$('html, body').animate({ scrollTop: 0});
	});

	$('.btn_video').click(function(){
		$(this).addClass('hide').siblings('.video_frame').removeClass('hide').play();
	});
});


// 공부카드 문제 버튼
$(function(){
	$('.btn_option').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		if ($(this).hasClass('answer')) {
			var srcReplace = $(this).parent().siblings().find('img').attr('src').replace('question', 'answer');
			$(this).parent().siblings().find('img').attr('src', srcReplace);
		}
	});
});

