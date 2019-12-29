$(function(){
	$('img[usemap]').rwdImageMaps();
});

$(function(){
	$('input[placeholder], textarea[placeholder]').placeholder();
});


$(function(){
	$('.lst_process_inner>li>a').click(function(){
		$(this).addClass('on');
		$(this).parent().siblings().children().removeClass('on');
	});
});


$(function () {
	// 팝업 오픈시 body 고정 스크립트
	if ($('.layer_wrap').hasClass('show')) {
		$('body').addClass('fixed');
	}

	// 팝업 클로즈시 스크립트
	$('.btn_pop_close').click(function () { 
		$('.layer_wrap').removeClass('show');
		$('body').removeClass('fixed');
	});
});