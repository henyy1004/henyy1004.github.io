function footerTab(btn,depth) {
	$(btn).click(function(){ 
		var $this = $(this)
				$index = $this.index();

		$this.addClass('on').siblings().removeClass('on');
		$(depth).eq($index).removeClass('hide').siblings().addClass('hide');
	});
}

$(function () {
	$('input[placeholder], textarea[placeholder]').placeholder();
	$('.evt_main_banner').click(function (e) { 
		e.preventdefault;
		var $data = $(this).data('moonsang');
		var $footerTop = $($data).offset().top -76;
		
			$('body,html').animate({ scrollTop: $footerTop }, "slow");
	});
	// 학년 탭메뉴
	footerTab('.evt_fluid > div', '.evt_tabList_area > ul');
	$('.evt_fluid > div').click(function () {
		$('.evt_detail_book > div').eq($(this).index()).removeClass('hide').siblings().addClass('hide');
	});

	// 학년별 상세 탭메뉴
	footerTab('.list_evt_book > li');
	$('.list_evt_book > li').click(function () {
		var childCont = $(this).parent().index();
		$('.evt_detail_book > div').eq(childCont).find('> div').eq($(this).index()).removeClass('hide').siblings().addClass('hide');
	});

	$('.evt_list_type > li > a').click(function (e) {
		e.preventdefault;
		var $this = $(this);
		var $attId = $this.data('scroll');
		var $moveArea = $($attId).offset().top - 50;
		
		console.log($moveArea);
		
	$('body,html').animate({ scrollTop: $moveArea }, "slow");
	});

	titleRotate();
});

// 타이틀 회전
function titleRotate() {
	var increment = 0;
	var carousel = $('.text_main_title_wrap');

	increment++;
	carousel.css({
		
		'-webkit-transform': 'rotateX(' + (increment * -180) + 'deg)',
		'transform': 'rotateX(' + (increment * -180) + 'deg)'
	});

	if (increment > 2) {
		increment
	}

	carousel.attr('data-state', (increment % 2) + 1);

	setInterval(function () {
		increment++;
		carousel.css({
			
			'-webkit-transform': 'rotateX(' + (increment * -180) + 'deg)',
			'transform': 'rotateX(' + (increment * -180) + 'deg)'
		});

		if (increment > 2) {
			increment
		}

		carousel.attr('data-state', (increment % 2) + 1);
	}, 2500);
}