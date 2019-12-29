$(function(){
	// 메뉴버튼 UI
	btnMenuEffect();
});

function btnMenuEffect (){
	$('.btn_toggle_menu').click(function () {
		$(this).toggleClass('active')
		$('#wrap').toggleClass('fixed_open');
	})
}
