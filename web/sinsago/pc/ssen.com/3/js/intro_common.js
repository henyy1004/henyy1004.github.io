$('#wrap').addClass('active');
setTimeout(function(){ bxslider() }, 1850);
function bxslider(){
	var mySlider = $('.mainSlider .slider').bxSlider({
		auto: true,
		pager: true,
		controls: false,
		touchEnabled:false,
		pagerCustom:'.pager',
		pause: 3000,
		speed:500
	});
}

atcBtn = $('.bookArea .tabMenu a');
$(atcBtn).on('click',function(){
	idx = $(this).index();
	$('#popBook').addClass('on')
	$('#popBook .bg').fadeIn(500, function(){
		$('.bookWrap').stop().animate({top:'0', opacity:'1'}, 1000, 'easeOutQuint', function(){
			$('.bookWrap .bookView:eq('+idx+') .viewInner').addClass('active');
		});
	});
	$('#popBook .bookView').eq(idx).addClass('on');
	$('#popBook .tabMenu a').on('click',function(){
		$('.bookView').removeClass('on');
		return false;
	});
	$('#popBook .tab1').on('click',function(){
		$('.page1').addClass('on');
		$('.page1 .viewInner').addClass('active');
	});
	$('#popBook .tab2').on('click',function(){
		$('.page2').addClass('on');
		$('.page2 .viewInner').addClass('active');
	});
	$('#popBook .tab3').on('click',function(){
		$('.page3').addClass('on');
		$('.page3 .viewInner').addClass('active');
	});
	$('#popBook .btnClose').on('click',function(){
		$('.bookWrap').stop().animate({top:'900px', opacity:'0'}, 800, 'easeOutQuint', function(){
			$('#popBook .bg').fadeOut(300, function(){
				$('#popBook').removeClass('on');
				$('.bookView').removeClass('on');
				$('.viewInner').removeClass('active');
				$('.bookWrap').removeAttr('style');
			});
		});
	});
	return false;
});
