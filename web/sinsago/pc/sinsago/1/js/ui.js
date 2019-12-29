UI = {
	load: function(){
		$(document).ready(function(){
			UI.fn_gnb();
			UI.fn_history();
			UI.fn_img_view();
			UI.fn_scholarship();
			UI.fn_conts_changer('.tab_history','.history_conts');
			UI.fn_conts_changer('.tab_talented','.talented_conts');
			UI.fn_conts_changer('.tab_sinsago_person','.sinsago_person_conts');
			UI.fn_conts_changer('.tab_faq','.recruit_faq');
			//UI.fn_conts_changer('.tab_recruit','.recruit_conts');
			UI.fn_faq();

			var main_visual_slider = $('.main_visual .visual_list');
			main_visual_slider.cycle({
				fx : "fade",
				easing: "easeOutQuart",
				speed: 1500,
				timeout: 3500,
				swipe: true,
				autoHeight : 'container',
				pager : ".main_visual .slider_page",
				slides : "> li"
			});

			var main_banner_slider1 = $('.alert_center_wrap .news_box .slider');
			main_banner_slider1.cycle({
				fx : "scrollHorz",
				easing: "easeOutQuart",
				speed: 1000,
				timeout: 0,
				swipe: true,
				autoHeight : 'container',
				slides : "> a"
			});

			$('.alert_center_wrap .news_box .btn_prev').bind('click',function(){
				main_banner_slider1.cycle('prev');
			});
			$('.alert_center_wrap .news_box .btn_next').bind('click',function(){
				main_banner_slider1.cycle('next');
			});

			var main_banner_slider2 = $('.alert_center_wrap .person_box .slider');
			main_banner_slider2.cycle({
				fx : "scrollHorz",
				easing: "easeOutQuart",
				speed: 1000,
				timeout: 0,
				swipe: true,
				autoHeight : 'container',
				slides : "> a"
			});

			$('.alert_center_wrap .person_box .btn_prev').bind('click',function(){
				main_banner_slider2.cycle('prev');
			});
			$('.alert_center_wrap .person_box .btn_next').bind('click',function(){
				main_banner_slider2.cycle('next');
			});

			var main_banner_slider3 = $('.alert_center_wrap .recruit_box .slider');
			main_banner_slider3.cycle({
				fx : "scrollHorz",
				easing: "easeOutQuart",
				speed: 1000,
				timeout: 0,
				swipe: true,
				autoHeight : 'container',
				slides : "> a"
			});

			$('.alert_center_wrap .recruit_box .btn_prev').bind('click',function(){
				main_banner_slider3.cycle('prev');
			});
			$('.alert_center_wrap .recruit_box .btn_next').bind('click',function(){
				main_banner_slider3.cycle('next');
			});

			var ad_slider = $('.ad_list_wrap .ad_list_box .slider');
			ad_slider.cycle({
				fx : "scrollHorz",
				easing: "easeOutQuart",
				speed: 1000,
				timeout: 0,
				swipe: true,
				autoHeight : 'container',
				caption : '.ad_list_wrap .ad_counter',
				captionTemplate : '<strong>{{slideNum}}</strong> / {{slideCount}}',
				slides : "> .slider_group"
			});
			$('.ad_list_wrap .btn_prev').bind('click',function(){
				ad_slider.cycle('prev');
			});
			$('.ad_list_wrap .btn_next').bind('click',function(){
				ad_slider.cycle('next');
			});
			
			// s : 20180823
			// 셀렉트박스 토글
			$('.select_box_wrap .btn_open_option').click(function () { 
				$(this).parent().toggleClass('on');
			});

			//스크롤바 스크립트
			$('.scrollbar-inner').scrollbar();
			// e : 20180823
		});

		$(window).load(function(){

		});
	},

	fn_gnb : function (){
		var obj = $('.gnb').children();
		obj.bind('mouseover focusin',function(){
			var dp2_obj = $(this).find('.depth2');
			var dp2_height = dp2_obj.find('>ul').innerHeight();
			dp2_obj.stop().animate({'height':dp2_height},500,'easeOutExpo');
			$(this).addClass('on');
		});
		obj.bind('mouseleave focusout',function(){
			var dp2_obj = $(this).find('.depth2');
			var dp2_height = dp2_obj.find('>ul').innerHeight();
			dp2_obj.stop().animate({'height':0},200,'easeOutExpo');
			$(this).removeClass('on');
		});
	},
		
	sub_visual1 : function (){
		var obj = $('.sub_visual.cate1');
		var tit = obj.find('.tit');
		var item = obj.find('.item');

		if (obj.length <= 0){return;}

		setTimeout(function(){
			item.stop().animate({'opacity':1,'bottom':0},1500,'easeOutQuart');	
			tit.stop().delay(700).animate({'opacity':1},1000,'linear');
		},300);
	},

	sub_visual2 : function (){
		var obj = $('.sub_visual.cate2');
		var tit = obj.find('.tit');
		var item = obj.find('.item');

		if (obj.length <= 0){return;}

		setTimeout(function(){
			item.stop().animate({'opacity':1,'bottom':0},1500,'easeOutQuart');	
			tit.stop().delay(700).animate({'opacity':1},1000,'linear');
		},300);
	},

	fn_img_view : function (){
		var tit = $('.view_img_wrap .tit_box').children();
		var small_img = $('.view_img_wrap .img_list').children();
		var prev = $('.view_img_wrap .prev');
		var next = $('.view_img_wrap .next');
		var flag = 0;
		var max = small_img.length;

		var view_slider = $('.view_img_wrap .img_big_box .slider');
		view_slider.cycle({
			fx : "scrollHorz",
			easing: "easeOutQuart",
			speed: 800,
			timeout: 0,
			swipe: true,
			autoHeight : 'container',
			slides : "> img"
		});

		var movement = function (num){
			view_slider.cycle('goto', num);
			small_img.removeClass('on');
			small_img.eq(num).addClass('on');
			tit.removeClass('on');
			tit.eq(num).addClass('on');

			flag = num;
		};

		small_img.each(function(i){this.num = i});
		small_img.bind('click',function(){
			movement(this.num);
		});

		prev.bind('click',function(){
			if (flag > 0 ){
				movement(flag - 1);
			}else {
				movement( max - 1);
			}
		});

		next.bind('click',function(){
			if (flag < max - 1){
				movement(flag + 1);
			}else {
				movement(0);
			}
		});
	},

	fn_scholarship : function (){
		var obj = $('.scholarship_list');
		var obj_child = obj.children();
		var btns = obj.find('.list_tit');
		var flag = 0;

		var movement = function (num){		
			var open_obj = obj_child.eq(num);
			var open_box = open_obj.find('.table_box');
			var open_height = open_box.find('.table_inner').innerHeight();

			var close_obj = obj_child.eq(flag);
			var close_box = close_obj.find('.table_box');

			if (flag == num){
				close_box.stop().animate({'height':0},0,'easeOutExpo');
				obj_child.removeClass('on');
				flag = 1000;
				return;				
			}

			open_box.stop().animate({'height':open_height},0,'easeOutExpo');
			close_box.stop().animate({'height':0},0);
			$(window).scrollTop(open_obj.offset().top);

			obj_child.removeClass('on');
			open_obj.addClass('on');

			flag = num;
		};

		btns.each(function(i){this.num = i});
		btns.bind('click',function(){
			movement(this.num);
		});
	},
	/* e : 170314 */
	fn_history : function (){
		var obj_tab = $('.tab_history').children();
		var history_conts = $('.history_conts').children();

		obj_tab.each(function(i){this.num = i;});
		obj_tab.bind('click',function(){
			obj_tab.removeClass('on');
			obj_tab.eq(this.num).addClass('on');
			history_conts.removeClass('on');
			history_conts.eq(this.num).addClass('on');
		});
	},

	fn_conts_changer : function (tabs, conts){
		var obj_tab = $(tabs).children();
		var history_conts = $(conts).children();

		obj_tab.each(function(i){this.num = i;});
		obj_tab.bind('click',function(){			
			obj_tab.removeClass('on');
			obj_tab.eq(this.num).addClass('on');
			history_conts.removeClass('on');
			history_conts.eq(this.num).addClass('on');
		});
	},
	
	fn_faq : function (){
		var obj = $('.recruit_faq');
		obj.each(function(i){
			var obj_question = $(this).find('.question');
			var obj_answer = $(this).find('.answer');

			obj_question.each(function(i){this.num=i});
			obj_question.bind('click',function(){
				if (obj_question.eq(this.num).hasClass('on')){
					obj_question.removeClass('on');
					obj_answer.removeClass('on');
				}else {
					obj_question.removeClass('on');
					obj_answer.removeClass('on');
					obj_question.eq(this.num).addClass('on');
					obj_answer.eq(this.num).addClass('on');
				}
			});
		});
	}

}

var count = 0;
//레이어 오픈 
var layer_OPEN = function (obj_selector){
	var obj = $(obj_selector);
	obj.show();
	count ++; 
	if(count == "1"){						
		new daum.roughmap.Lander({
			"timestamp" : "1489460239340",
			"key" : "gika",
			"mapWidth" : "700",
			"mapHeight" : "336"
		}).render();			
	}
};

//레이어 클로즈
var layer_CLOSE = function (obj_selector){	
	var obj = $(obj_selector);	

	if(obj_selector == ".popup_main_event"){
		if($("#today_popup").is(':checked')){
			setCookie("popup", "true", 1);	
		}
	}
	obj.hide();
};

function fnPopup(URL,name) {
    var popupOption = 'directories=no, toolbar=no, location=no, menubar=no, status=no, scrollbars=no, resizable=no, left=400, top=200, width=440, height=550';
    window.open(URL, name, popupOption);
}

function setCookie(name, value, expiredays) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function GetCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	} else {
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
	if (end == -1) {
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}

function IsNumeric(sText)
{
   var ValidChars = "0123456789.";
   var IsNumber=true;
   var Char;
 
   for (i = 0; i < sText.length && IsNumber == true; i++) { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) {
         IsNumber = false;
      }
   }

   return IsNumber;
}

function OnlyNumber(el) {
	if(!IsNumeric(el.value)) {
		alert("숫자만 입력 가능합니다.");
		el.value = "";
		el.focus();
	}
}
		
UI.load();