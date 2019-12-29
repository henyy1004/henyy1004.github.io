
// TOP 버튼 설정
$(window).load(function () {
	var footerPosition = $('#footer').offset().top,
		footerHeight = $('#footer').innerHeight(),
		footerTop = footerPosition - footerHeight * 2;

	$(window).scroll(function () {
		var winScroll = $(window).scrollTop();

		if (winScroll > 144) {
			$('.go_top').css('opacity', '1');
			if (winScroll >= footerTop) {
				$('.go_top').css({
					'position': 'absolute',
					'bottom': footerHeight - 80
				});
			} else {
				$('.go_top').css({
					'position': 'fixed',
					'bottom': '20px'
				});
			}
		} else {
			$('.go_top').css('opacity', '0');
		}
	});

	// url입력창 버튼 스크립트
	btnUrlAddAction();
});

var count = 0;
$(function () {
	// Top버튼 클릭
	$('.go_top').click(function (e) {
		e.preventDefault();
		$('body,html').animate({ scrollTop: 0 }, 1000);
	});

	$('.btn_evt_join').click(function () {
		$(".dimmed").removeClass('hide');
		$('body').addClass('no_scroll');
	});


	// 팝업 닫기
	$('.close_pop').click(function () {
		$('.dimmed').addClass('hide');
		$('body').removeClass('no_scroll');
	});
});

function btnUrlAddAction() {
	var limitCount = 0;

	$('.btn_url_add').click(function () {
		if (limitCount < 2) {
			addUrlList();
			limitCount++;
		}
	});

	function addUrlList() {
		var urlList = $('.url_list');
		var urlListItem = '<li>' + $('.url_list>li').html() + '</li>';

		urlList.append(urlListItem);
	}
}

// bx slide
$('.bxslider').bxSlider({
	auto: true,
	mode: 'fade',
	pagerCustom: '.bx-pager'
});
