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
	// �˾� ���½� body ���� ��ũ��Ʈ
	if ($('.layer_wrap').hasClass('show')) {
		$('body').addClass('fixed');
	}

	// �˾� Ŭ����� ��ũ��Ʈ
	$('.btn_pop_close').click(function () { 
		$('.layer_wrap').removeClass('show');
		$('body').removeClass('fixed');
	});
});