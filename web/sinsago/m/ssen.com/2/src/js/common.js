$(document).ready(function () { 
	// 전체메뉴 이벤트 배너 슬라이더
	var swiper2 = new Swiper('.category_event_banner .swiper-container', {
		pagination: {
			el: '.swiper-pagination',
		},
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		}
	});

	openTotalCategory();
	goTop();
	selectActiveEffect();
	allEventList();
	accordionMenu();
	tabEvent();
	tabEvent2();
});

// 전체메뉴열기
var openTotalCategory = function () { 
	$('.btn_total_category').click(function () {
		$('.total_category').toggleClass('open');
		if($('.total_category').hasClass('open')) { 
			$('body').addClass('scroll_hidden');
		} else{ 
			$('body').removeClass('scroll_hidden');
		}
	});
	
	$('.btn_close_category').click(function () { 
		$('.total_category').removeClass('open');
		$('body').removeClass('scroll_hidden');
	});
};

// 탑버튼
var goTop = function () { 
	$(window).scroll(function (){
		if($(this).scrollTop() > 55) {
			$('.loc_top').fadeIn();
		}else{
			$('.loc_top').fadeOut();
		}
	});
	
	$('.btn_top').click(function (){
		$('body,html').animate({scrollTop:0}, 400);
		return false;
	});
}

// 셀렉트박스 옵션선택시 효과
var selectActiveEffect = function () { 
	$('.select_type2').change(function () {
		$(this).addClass('on');
	});
}

// 이벤트 배너 전체보기
var allEventList = function () {
	$('.loc_banner_page').click(function(){
		$('#container_banner_all').removeClass('hide');
		$('body').addClass('scroll_hidden');
	});

	$('.btn_spot_close').click(function(){
		$('#container_banner_all').addClass('hide');
		$('body').removeClass('scroll_hidden');
	});
}
 
//아코디언메뉴
var accordionMenu = function () { 
	$('.btn_accordion>button').click(function () { 
		$(this).parent().toggleClass('on')
	})
}

//탭
var tabEvent = function () {
	$('[class*=list_tab_typ]>li>a').click(function () { 
		var indexTab = $(this).parent().index();
		var contentArray = $(this).parent().parent().siblings('.tab_content').toArray();
		
		$(this).parent().addClass('on').siblings().removeClass('on');
		$(contentArray[indexTab]).addClass('on').siblings('.tab_content').removeClass('on');
	});
}

//탭2

var tabEvent2 = function () { 
	$('.btn_tab').click(function(){
		var targetTab=$(this).parents('.tab_wrap').find('.btn_tab');
		var targetContent=$(this).parents('.tab_wrap').find('.tab_content');
		var tabIndex =targetTab.index($(this));
		var tabContentArray=targetContent.toArray();
	

		$(this).addClass('on');
		targetTab.not($(this)).removeClass('on');
		$(tabContentArray[tabIndex]).addClass('on');
		targetContent.not($(tabContentArray[tabIndex])).removeClass('on')
	});
}
