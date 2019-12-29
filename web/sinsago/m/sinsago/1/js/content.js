// IOS 뷰포트 확대방지 스크립트 [16.12.17 기준으로 업그레이드 된듯]
document.documentElement.addEventListener('touchstart', function (event) { 
	if (event.touches.length > 1) { 
	   event.preventDefault(); 
	}
 }, false);
 
 /* 전체보기 메뉴 */
 $(function(){
	$('.lst_totalmenu .depth_link').on('click',function(){
		if($(this).parent().parent().hasClass('on')){	
			$(this).parent().next().hide().parent().removeClass('on');
		}else{
		  $('.lst_totalmenu > li').removeClass('on').find('ul').hide();
		  $(this).parent().next().show().parent().addClass('on');
	   }
	});
	
	$('.btn_menu').on('click',function(){
	   $('body').css({'overflow':'hidden','position':'fixed'});
	   $('.group_totalmenu').animate({'left':'0'},300);
	   $('.bg_deemed').fadeIn();
	});
 
	
	$('.btn_lftmenu_close').on('click',function(){
	   $('body').css({'overflow':'','position':''});   
	   $('.group_totalmenu').animate({'left':'-100%'},300);
	   $('.bg_deemed').fadeOut();
	});
 });
 
 /* 맨위로 가기 */
 $(function(){
	$(window).scroll(function (){
		/*
		var head = $(".header_top").height(),
			footer = $("footer").height(),
			contentsHeight = $("#container").height(),
			winscrolltop = $(window).scrollTop(),
			winscrollbtm = head + footer + contentsHeight - $(window).height();
		if(winscrolltop > winscrollbtm - 10){
			$('.loc_top').css('bottom','197px');
		}else{
			$('.loc_top').css('bottom','16px');
		}
		*/
		
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
});

/* 헤더 셀렉트 */
$(function(){
	$(".slctbox select").change(function () {
		var changeTxt = $(this).find("option:selected").text();
		$(this).parent().find(".txt").text(changeTxt);
	 });
	$(".slctbox select").focus(function () {
		$(this).parent().addClass("focus");
	});
	$(".slctbox select").blur(function () {
		$(this).parent().removeClass("focus");
	});
});


$(function(){
	$(".list_select>li select,.box_select select").change(function () {
		var changeTxt = $(this).find("option:selected").text();
		$(this).parent().find(".text").text(changeTxt);
	 });
	 
	$(".list_select>li select,.box_select select").focus(function () {
		$(this).parent().addClass("focus");
	});
	$(".list_select>li select,.box_select select").blur(function () {
		$(this).parent().removeClass("focus");
	});
	
});

/* 도서리스트 탭메뉴 */
$(function(){
	$('.list_select>li select').bind('click',function(){
		$(this).parent().addClass('on').siblings().removeClass('on');
		$(this).prev().prev().children().addClass('on').parents('li').siblings().children().children().removeClass('on');
	});
});

/* 신사고 멘토 셀렉트 메뉴 */
$(function () {
	$('.box_select select').bind('click keyup', function () {
		$(this).parent('.box_select').toggleClass('on');
	});
});

/* 풋터 유저메뉴 버튼개수 가변 */
$(function(){
	if($('.lst_usermenu li').length == 3){
		$('.lst_usermenu').css('width','214px');
	}
});

/* 아코디언 */
$(function(){
	$('.lst_accordion > li > a').on('click',function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
		}else{
			$('.lst_totalmenu > li').removeClass('on');
			$(this).parent().addClass('on');
		}
	});
});

/* 세로 가운데 정렬(오토 높이 계산) */
$(function(){
	$('.logo_lecture').css('margin-top', '-' + $('.logo_lecture img').height()/2 + 'px');
});

/* 별점 */
$(function(){
	$('.lst_leaf>li>a').bind('click',function(){
		$(this).parents('.lst_leaf').children().children('a').removeClass('on');
		$(this).addClass('on').parent().prevAll('li').children().addClass('on');
	});
});


/* tab 롤링 고정 */
$(function(){
	$(window).scroll(function(){
		var head = $('.header_top').height(),
			contentHeight = $('.tab_scroll_view').height(),
			winscrolltop = $(window).scrollTop(),
			wincontent = head + contentHeight;
		if(winscrolltop > wincontent){
			$('.lst_tab').css({'position':'fixed','top':'0'});
			$('.tab_view').css('margin-top','40px');
		}else{
			$('.lst_tab').css({'position':'','top':''});
			$('.tab_view').css('margin-top','');
		}
	});
});

 $(function(){
	$(window).scroll(function (){
		/*
		var head = $(".header_top").height(),
			footer = $("footer").height(),
			contentsHeight = $("#container").height(),
			winscrolltop = $(window).scrollTop(),
			winscrollbtm = head + footer + contentsHeight - $(window).height();
		if(winscrolltop > winscrollbtm - 10){
			$('.loc_top').css('bottom','197px');
		}else{
			$('.loc_top').css('bottom','16px');
		}
		*/
		
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
});

/* 반품배송 탭 */

/* 가입안내 */
$(function(){
	$('.lst_loc_return>li').addClass('off');
	$('.lst_loc_return>li>a').bind('click keyup',function(){
		var idx = $(this).parent().index();
		
		if($(this).parent().hasClass('off')){
			$('.lst_loc_return>li').addClass('off').removeClass('on');
			$('.lst_return_view').children().hide();
			
			$(this).parent().removeClass('off').addClass('on');
			$(this).parents('.lst_loc_return').next('.lst_return_view').children('li:eq('+idx+')').show();
		}else{
		}
	});


	$('.lst_insurance_info>li a').bind('click keyup',function(){
		$(this).addClass('on').children().next().addClass('on').parent().parent().siblings().children().removeClass('on').children().next().removeClass('on');
	});	
});

$(function(){
	$('.news_banner').css('margin-top','-' + $('.news_banner').height()/2 + 'px');
});

/* file */
$(function(){
	var uploadFile = $('.filebox .uploadBtn');
	uploadFile.on('change', function(){
		if(window.FileReader){
			var filename = $(this)[0].files[0].name;
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}
		$(this).siblings('.file_name').val(filename);
	});
	
	 $('input[placeholder], textarea[placeholder]').placeholder();
});

/* 댓글위치 이동 */
$(function(){
	var moveComment = $('#comment').offset();
	$('.move_comment').click(function(){
		$('html,body').animate({scrollTop : moveComment.top},400);
	});

});

/* tab */
$(function(){
	$('.lst_tab a').click(function () {
		$('.lst_tab a').removeClass('on');
		$(this).addClass('on');
		$('.tab_view').hide()
		var tabView = $(this).attr('href');
		$(tabView).show();
		return false;
	});
});

/* 상담신청 */
$(function(){
	$('.lst_box_type.v2>li a').on('click',function(){
		$(this).parent().addClass('on').siblings().removeClass('on');
	});
});

