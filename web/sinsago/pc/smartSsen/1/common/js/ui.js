(function (d) {
    d.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function (f, e) {
        d.fx.step[e] = function (g) {
            if (!g.colorInit) {
                g.start = c(g.elem, e);
                g.end = b(g.end);
                g.colorInit = true
            }
            g.elem.style[e] = "rgb(" + [Math.max(Math.min(parseInt((g.pos * (g.end[0] - g.start[0])) + g.start[0]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[1] - g.start[1])) + g.start[1]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[2] - g.start[2])) + g.start[2]), 255), 0)].join(",") + ")"
        }
    });

    function b(f) {
        var e;
        if (f && f.constructor == Array && f.length == 3) {
            return f
        }
        if (e = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)) {
            return [parseInt(e[1]), parseInt(e[2]), parseInt(e[3])]
        }
        if (e = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)) {
            return [parseFloat(e[1]) * 2.55, parseFloat(e[2]) * 2.55, parseFloat(e[3]) * 2.55]
        }
        if (e = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)) {
            return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
        }
        if (e = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)) {
            return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
        }
        if (e = /rgba\(0, 0, 0, 0\)/.exec(f)) {
            return a.transparent
        }
        return a[d.trim(f).toLowerCase()]
    }
    function c(g, e) {
        var f;
        do {
            f = d.css(g, e);
            if (f != "" && f != "transparent" || d.nodeName(g, "body")) {
                break
            }
            e = "backgroundColor"
        } while (g = g.parentNode);
        return b(f)
    }
    var a = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    }
})(jQuery);

UI = {
	load: function(){
		$(document).ready(function(){
			UI.fn_gnb();
			UI.fn_family();
			UI.fn_quick();
			UI.tab();
			UI.tab02();
			UI.tab03();
			UI.tab04();
			UI.faqlist();
			UI.modal();
		});

		$(window).load(function(){
			
		});
	},

	fn_gnb : function (){
		var obj = $('#header');
		var flag = true;
		if ($('#main_container').length > 0){return;}
		var s_movement = function (){
			if ($(window).scrollTop() >= 355){
				if (!flag){return;}
				obj.addClass('static');
				$("#open_sticker").hide();
				obj.stop().animate({'top':'0'},500);
				flag = false;
			}else {
				if (flag){return;}
				//if (!flag){ alert();}

				obj.stop().animate({'top':'-125px'},50,function (){
					//obj.css({'top':'s'});
					obj.attr('style','');
					obj.removeClass('static');
					$("#open_sticker").show();
					flag = true;
				});
			}
		};
		$(window).scroll(function(){
			s_movement();
		});
	},

	fn_family : function (){
		var obj = $('.family_site');
		var btn = obj.find('.btn_family');
		var flag = true;

		btn.bind('click',function(){
			if (flag){
				obj.addClass('open');
				flag = false ;
			}else {
				obj.removeClass('open');
				flag = true ;
			}
		});
	},

	fn_quick : function (){
		var obj = $('#quick');
		var s_movement = function (){
			var sTop = $(window).scrollTop();
			if (sTop >= 355){
				obj.stop().animate({'top': (sTop + 145) },1000,'easeOutExpo');
			}else {
				obj.stop().animate({'top':413},1000,'easeOutExpo');
			}
		};
		$(window).scroll(function(){
			s_movement();
		});
	},

	tab : function (){
		$('.tab a').click(function(i){this.i=i}).click(function(){
			var idx = $(this).index();
			$(this).parent().parent().find('.hiddenarea').removeClass('on');
			$(this).parent().parent().find('.tab a').removeClass('on');
			$(this).addClass('on');
			$(this).parent().parent().find('.hiddenarea:eq('+idx+')').addClass('on');
			//return false;
		});
	},

	tab02 : function (){
		$('.tab02 a').click(function(i){this.i=i}).click(function(){
			var idx = $(this).index();
			$(this).parent().parent().find('.hiddenarea').removeClass('on');
			$(this).parent().parent().find('.tab02 a').removeClass('on');
			$(this).addClass('on');
			$(this).parent().parent().find('.hiddenarea:eq('+idx+')').addClass('on');
			return false;
		});
	},

	tab03 : function (){
		$('.tab03 a').click(function(i){this.i=i}).click(function(){
			var idx = $(this).index();
			$(this).parent().parent().find('.hiddenarea03').removeClass('on');
			$(this).parent().parent().find('.tab03 a').removeClass('on');
			$(this).addClass('on');
			$(this).parent().parent().find('.hiddenarea03:eq('+idx+')').addClass('on');
			return false;
		});
	},
	/* s : 170928 */
	tab04 : function (){
		$('.re_t a').click(function(i){this.i=i}).click(function(){
			var idx = $(this).index();
			$(this).parent().parent().find('.hiddenbox').removeClass('on');
			$(this).parent().parent().find('.re_t a').removeClass('on');
			$(this).addClass('on');
			$(this).parent().parent().find('.hiddenbox:eq('+idx+')').addClass('on');
			return false;
		});
	},
	/* e : 170928 */
	faqlist : function (){
		$('.faqlist dt').on('click',function(){
			if($(this).parent().hasClass('on')){
				$('.faqlist dl').removeClass('on');
			}else{
				$('.faqlist dl').removeClass('on');
				$(this).parent().addClass('on')
			}
		});
	},
	
	modal : function (){
		var modalpop = $('.modalpop');
		var modalpopWidth = $('.modalpop').width();
		var modalpopHeight = $('.modalpop').height();
		if(modalpop.hasClass('on')){
			$('body').addClass('ovh');
			$('.modalpop').css('margin-left',-modalpopWidth/2+'px');
			$('.modalpop').css('margin-top',-modalpopHeight/2+'px');
		}else{
			$('body').removeClass('ovh');

		}
		
		function modalHide(){
			modalpop.removeClass('on');
			$('body').removeClass('ovh');
			$('.trplayer').remove();
		}
	}
}

UI.load();

/* main */
/* s : 180403 수정 */
var fn_main_active = function (){
	var btn_obj = $('.noti_pop_layer .btn_section > ul').children();
	var bg_obj = $('.noti_pop_layer .inner_book_box');
/* e : 180403 수정 */
	var moveArray = new Array();
		moveArray[0] = new Array();
		moveArray[1] = new Array();
		moveArray[2] = new Array();
		moveArray[3] = new Array();
		moveArray[4] = new Array();
		moveArray[5] = new Array();
	var flag = 0;

	var main_banner_slider = $('#main_container .banner_sec2 .slider');
	main_banner_slider.cycle({
		fx : "scrollHorz",
		easing: "easeOutQuart",
		speed: 1000,
		timeout: 4000,
		swipe: true,
		autoHeight : 'container',
		pager : "#main_container .banner_sec2 .slider_page",
		slides : "> a",
		log : false
	});

	var seen_review_slider = $('.visual6 .banner');
	seen_review_slider.cycle({
		fx : "fade",
		easing: "easeOutQuart",
		speed: 1000,
		timeout: 2000,
		swipe: true,
		autoHeight : 'container',
		slides : "> li",
		log : false
	});

	var seen_product_slider = $('.simple_product170620 .img_box');
	seen_product_slider.cycle({
		fx : "scrollHorz",
		easing: "easeOutQuart",
		speed: 1000,
		timeout: 4000,
		swipe: true,
		autoHeight : 'container',
		slides : "> img",
		log : false,
		maxZ : 1
	});



	btn_obj.each(function(i){this.num = (i + 1);});
	btn_obj.bind('click',function(){
		if (flag == this.num) { return; }
		/* s : 180403 수정 */
		if (flag == 0) { $('.noti_pop_layer .inner_book_box').animate({ 'height': 710 }, 500); }
		/* e : 180403 수정 */
		moveArray[flag][1]();
		btn_obj.eq(flag - 1).removeClass('on');
		btn_obj.eq(this.num - 1).addClass('on');
		flag = this.num;
	});

	$('#header .logo').bind('click',function(){
		if (flag == 0){ return;	}
		bg_obj.animate({ 'backgroundColor': '#f9f9fa' }, 700);
		/* s : 180403 수정 */
		$('.noti_pop_layer .inner_book_box').animate({ 'height': 638 }, 1200);
		/* e : 180403 수정 */
		moveArray[flag][1]();
		moveArray[0][0]();
		btn_obj.removeClass('on');
		flag = 0;
	});

	/* s : 180403 수정 */
	var base_item_box =  $('.noti_pop_layer .conts_base');
	var base_item1 =  $('.noti_pop_layer .base_item1');
	var base_item2 =  $('.noti_pop_layer .base_item2');
	var base_item3 =  $('.noti_pop_layer .base_item3');
	var base_item3_4 =  $('.noti_pop_layer .base_item3_4');
	var base_item4 =  $('.noti_pop_layer .base_item4');
	var base_arrow = $('.noti_pop_layer .arrow');
	/* e : 180403 수정 */
	
	moveArray[0][0] = function (){
		base_item2.css({'display':'block'});
		base_item3.css({'display':'block'});
		base_item1.stop().delay(300).animate({'opacity':1},1200);
		base_item3.stop().delay(800).animate({'opacity':1,'left':838},700);
		base_item2.stop().delay(1200).animate({'opacity':1,'left':187},700);
		base_item3_4.stop().delay(1100).animate({'opacity':1},700);
		base_item4.stop().animate({'opacity':0},700);

		btn_obj.each(function(ii){
			$(this).stop().delay( (400 + (100*ii)) ).animate({'left':0,'opacity':1},1300,'easeOutExpo');
		});

		base_arrow.stop().delay(1200).animate({'opacity':1},700);
	};

	moveArray[0][1] = function (){
		base_item1.stop().animate({'opacity':0},1200,function (){
			moveArray[flag][0]();
		});
		base_item2.stop().animate({'opacity':0,'left':100},700);
		base_item3.stop().animate({'opacity':0,'left':950},700);
		base_item3_4.stop().animate({'opacity':0},700,function (){
			base_item2.css({'display':'none'});
			base_item3.css({'display':'none'});
		});
		base_item4.stop().animate({'opacity':1},700);
	};

	/* s : 180403 수정 */
	var conts_book1 =  $('.noti_pop_layer .conts_book1');
	var book_item1_1_1 =  $('.noti_pop_layer .book_item1_1_1');
	var book_item1_1_2 =  $('.noti_pop_layer .book_item1_1_2');
	var book_item1_2_1 =  $('.noti_pop_layer .book_item1_2_1');
	var book_item1_2_2 =  $('.noti_pop_layer .book_item1_2_2');
	var book_item1_3_1 =  $('.noti_pop_layer .book_item1_3_1');
	var book_item1_3_2 = $('.noti_pop_layer .book_item1_3_2');
	/* e : 180403 수정 */

	moveArray[1][0] = function (){
		bg_obj.animate({'backgroundColor':'#fce6b2'},1200);
		conts_book1.stop().animate({'top':0},1200,'easeOutExpo');
	};
	moveArray[1][1] = function (){
		conts_book1.stop().animate({'top':737},500,'easeInExpo',function (){
			moveArray[flag][0]();
		});
	};

	/* s : 180403 수정 */
	var conts_book2 = $('.noti_pop_layer .conts_book2');
	moveArray[2][0] = function (){
		bg_obj.animate({'backgroundColor':'#edf3b2'},1200);
		conts_book2.stop().animate({'top':0},1200,'easeOutExpo');
	};
	moveArray[2][1] = function (){
		conts_book2.stop().animate({'top':737},500,'easeInExpo',function (){
			moveArray[flag][0]();
		});
	};

	var conts_book3 = $('.noti_pop_layer .conts_book3');
	moveArray[3][0] = function (){
		bg_obj.animate({'backgroundColor':'#d7eddd'},1200);
		conts_book3.stop().animate({'top':0},1200,'easeOutExpo');
	};
	moveArray[3][1] = function (){
		conts_book3.stop().animate({'top':737},500,'easeInExpo',function (){
			moveArray[flag][0]();
		});
	};

	var conts_book4 =  $('.noti_pop_layer .conts_book4');
	moveArray[4][0] = function (){
		bg_obj.animate({'backgroundColor':'#fef1b2'},1200);
		conts_book4.stop().animate({'top':0},1200,'easeOutExpo');
	};
	moveArray[4][1] = function (){
		conts_book4.stop().animate({'top':737},500,'easeInExpo',function (){
			moveArray[flag][0]();
		});
	};

	var conts_book5 =  $('.noti_pop_layer .conts_book5');
	moveArray[5][0] = function (){
		bg_obj.animate({'backgroundColor':'#d3edfa'},1200);
		conts_book5.stop().animate({'top':0},1200,'easeOutExpo');
	};
	moveArray[5][1] = function (){
		conts_book5.stop().animate({'top':737},500,'easeInExpo',function (){
			moveArray[flag][0]();
		});
	};
	moveArray[0][0]();
	/* e : 180403 수정 */
};

/* introduce */
var fn_Intro = function (){
	var obj = $('.introduce_wrap');
	var current_scrollTop = $(window).scrollTop();
	var screen_height = $(window).height();
	var va_hei = 100;
	var h_point = ((screen_height / 2) + current_scrollTop) + va_hei;
	var lastScrollTop = 0;
	var obj_map_ankle = obj.find('.intro_map  img');

	var flagArray = new Array();
	flagArray[0] = true;
	flagArray[1] = true;
	flagArray[2] = true;
	flagArray[3] = true;
	flagArray[4] = true;
	flagArray[5] = true;
	flagArray[6] = true;
	flagArray[7] = true;
	flagArray[8] = true;
	flagArray[9] = true;
	flagArray[10] = true;
	flagArray[11] = true;
	flagArray[12] = true;
	flagArray[13] = true;
	flagArray[14] = true;
	flagArray[15] = true;
	flagArray[16] = true;
	flagArray[17] = true;
	flagArray[18] = true;
	flagArray[19] = true;
	flagArray[20] = true;
	flagArray[21] = true;
	flagArray[22] = true;
	flagArray[23] = true;
	flagArray[24] = true;
	flagArray[25] = true;
	flagArray[26] = true;
	flagArray[27] = true;						

	var sec1_play = function (){
		var item1_1_1 = obj.find('.item1_1_1');
		var item1_1_2 = obj.find('.item1_1_2');
		var item1_1_3 = obj.find('.item1_1_3');
		var item1_2 = obj.find('.item1_2');
		var item1_3 = obj.find('.item1_3');
		item1_1_2.css({'top':'-50px'});
		item1_1_3.css({'top':'-50px'});
		item1_2.css({'left':'840px'});
		item1_3.css({'left':'597px'});

		obj.find('.bus1').addClass('on');

		item1_1_2.stop().delay(100).animate({'opacity':1,'top':0},500);
		item1_1_3.stop().delay(400).animate({'opacity':1,'top':0},500);
		item1_2.stop().delay(700).animate({'opacity':1,'left':690},1000,'easeOutExpo');
		item1_3.stop().delay(700).animate({'opacity':1,'left':747},1000,'easeOutExpo');
		item1_1_1.stop().delay(1200).animate({'opacity':1},700);
	};

	var sec2_play = function (){
		var item2_1 = obj.find('.item2_1');
		var item2_4 = obj.find('.item2_4');
		var item2_5 = obj.find('.item2_5');
		var item2_6 = obj.find('.item2_6');

		obj.find('.bus2').addClass('on');

		item2_4.css({'bottom':80});
		item2_5.css({'bottom':80});
		item2_6.css({'left':200});

		item2_1.stop().animate({'opacity':1},200);
		item2_4.stop().delay(400).animate({'opacity':1,'bottom':0},1000,'easeOutBounce');
		item2_5.stop().delay(600).animate({'opacity':1,'bottom':0},1000,'easeOutBounce');

		item2_6.stop().delay(200).animate({'opacity':1,'left':485},1500,'easeOutExpo');
	};

	var sec3_1_play = function (){
		var item3_1 = obj.find('.item3_1');
		var item3_1_txt = item3_1.find('.txt');

		item3_1.css({'left':570});
		item3_1_txt.css({'left':-10});
		item3_1.stop().animate({'opacity':1,'left':720},1000,'easeOutExpo');
		item3_1_txt.stop().delay(300).animate({'opacity':1,'left':-160},1000,'easeOutExpo');
	};

	var sec3_2_play = function (){
		var item3_2 = obj.find('.item3_2');
		var item3_2_txt = item3_2.find('.txt');
		var item3_3 = obj.find('.item3_3');
		
		item3_2.css({'left':375});
		item3_3.css({'left':909});
		item3_2_txt.css({'left':-13});
		item3_2.stop().animate({'opacity':1,'left':200},1000,'easeOutExpo');
		item3_2_txt.stop().delay(400).animate({'opacity':1,'left':137},1000,'easeOutExpo');
		item3_3.stop().delay(700).animate({'opacity':1,'left':749},1000,'easeOutExpo');
	};

	var sec3_4_play = function (){
		var item3_4 = obj.find('.item3_4');
		var item3_4_txt = item3_4.find('.txt');
		
		item3_4.css({'top':1190});
		item3_4_txt.css({'top':-290});
		item3_4.stop().animate({'opacity':1,'top':1100},1100,'easeOutExpo');
		item3_4_txt.stop().delay(300).animate({'opacity':1,'top':-140},1300,'easeOutExpo');
	};

	var sec3_5_play = function (){
		var item3_5 = obj.find('.item3_5');
		var item3_5_txt = item3_5.find('.txt');

		obj.find('.bus3').addClass('on');
		
		item3_5.css({'left':300});
		item3_5_txt.css({'left':-66});
		item3_5.stop().animate({'opacity':1,'left':450},1000,'easeOutExpo');
		item3_5_txt.stop().delay(300).animate({'opacity':1,'left':-216},1300,'easeOutExpo');
	};

	var sec4_play = function (){
		var item4_1 = obj.find('.item4_1');
		var item4_2 = obj.find('.item4_2');
		var item4_3 = obj.find('.item4_3');
		var item4_4 = obj.find('.item4_4');

		obj.find('.bus4').addClass('on');
		
		item4_2.css({'left':950});
		item4_3.css({'left':623});
		item4_4.css({'left':798});

		item4_1.stop().animate({'opacity':1},700)
			item4_2.stop().delay(500).animate({'opacity':1,'left':750},1000,'easeOutExpo');
			item4_3.stop().delay(300).animate({'opacity':1,'left':423},1000,'easeOutExpo');
			item4_4.stop().delay(100).animate({'opacity':1,'left':598},1000,'easeOutExpo');
	};

	var sec5_1_play = function (){
		var item5_1 = obj.find('.item5_1');
		var item5_1_txt = item5_1.find('.txt');
		
		item5_1.css({'left':-60});
		item5_1_txt.css({'right':-156});
		item5_1.stop().animate({'opacity':1,'left':90},1000,'easeOutExpo');
		item5_1_txt.stop().delay(300).animate({'opacity':1,'right':-306},1000,'easeOutExpo');
	};

	var sec5_2_play = function (){
		var item5_2 = obj.find('.item5_2');
		var item5_2_txt = item5_2.find('.txt');
		
		item5_2.css({'left':618});
		item5_2_txt.css({'left':-63});
		item5_2.stop().animate({'opacity':1,'left':468},1000,'easeOutExpo');
		item5_2_txt.stop().delay(300).animate({'opacity':1,'left':-213},1000,'easeOutExpo');
	};

	var sec5_3_play = function (){
		var item5_3 = obj.find('.item5_3');
		var item5_3_txt = item5_3.find('.txt');							
		
		item5_3.css({'top':973});
		item5_3_txt.css({'top':-130});
		item5_3.stop().animate({'opacity':1,'top':1123},1000,'easeOutExpo');
		item5_3_txt.stop().delay(300).animate({'opacity':1,'top':-80},1000,'easeOutExpo');
	};
	var sec5_4_play = function (){
		var item5_4 = obj.find('.item5_4');
		var item5_5 = obj.find('.item5_5');
		var item5_6 = obj.find('.item5_6');

		item5_4.css({'top':269});
		item5_5.css({'top':410});
		item5_6.css({'top':615});

		item5_4.stop().animate({'opacity':1,'top':419},1300,'easeOutExpo');
		item5_5.stop().delay(300).animate({'opacity':1,'top':560},1000,'easeOutExpo');
		item5_6.stop().delay(600).animate({'opacity':1,'top':765},1000,'easeOutExpo');
	};

	var sec6_play = function (){
		var item6_1 = obj.find('.item6_1');
		var item6_2 = obj.find('.item6_2');
		var item6_3 = obj.find('.item6_3');

		obj.find('.bus5').addClass('on');
		
		item6_3.css({'left':1217});

		item6_1.stop().animate({'opacity':1},700);
		item6_2.stop().delay(200).animate({'opacity':1},700);
		item6_3.stop().delay(500).animate({'opacity':1,'left':1067},1000,'easeOutExpo');
	};


	var sec7_1_play = function (){
		var item7_1 = obj.find('.item7_1');
		var item7_1_txt = item7_1.find('.txt');
		
		item7_1.css({'left':422});
		item7_1_txt.css({'left':-127});
		item7_1.stop().animate({'opacity':1,'left':272},1000,'easeOutExpo');
		item7_1_txt.stop().delay(300).animate({'opacity':1,'left':-277},1000,'easeOutExpo');
	};

	var sec7_2_play = function (){
		var item7_2 = obj.find('.item7_2');
		var item7_2_txt = item7_2.find('.txt');
		
		item7_2.css({'left':40});
		item7_2_txt.css({'left':168});
		item7_2.stop().animate({'opacity':1,'left':190},1000,'easeOutExpo');
		item7_2_txt.stop().delay(300).animate({'opacity':1,'left':318},1000,'easeOutExpo');
	};

	var sec7_3_play = function (){
		var item7_3 = obj.find('.item7_3');
		var item7_3_txt = item7_3.find('.txt');
		var item7_6 = obj.find('.item7_6');
		
		item7_3.css({'left':166});
		item7_3_txt.css({'left':498});

		item7_3.stop().animate({'opacity':1,'left':16},1000,'easeOutExpo');
		item7_3_txt.stop().delay(300).animate({'opacity':1,'left':348},1000,'easeOutExpo');
		item7_6.stop().delay(350).animate({'left':-989},1000,'easeOutExpo');

	};

	var sec7_4_play = function (){
		var item7_4 = obj.find('.item7_4');
		var item7_4_txt = item7_4.find('.txt');
		var item7_7 = obj.find('.item7_7');

		obj.find('.bus6').addClass('on');
		
		item7_4.css({'left':120});
		item7_4_txt.css({'left':70});
		item7_4.stop().animate({'opacity':1,'left':270},1000,'easeOutExpo');
		item7_4_txt.stop().delay(300).animate({'opacity':1,'left':220},1000,'easeOutExpo');
		item7_7.stop().delay(350).animate({'left':558},1000,'easeOutExpo');
	};

	var sec8_play = function (){
		var item8_1 = obj.find('.item8_1');
		var item8_2 = obj.find('.item8_2');
		var item8_3 = obj.find('.item8_3');
		var item8_4 = obj.find('.item8_4');
		var item8_5 = obj.find('.item8_5');
		var item8_6 = obj.find('.item8_6');
		var item8_7 = obj.find('.item8_7');

		obj.find('.bus7').addClass('on');
		
		item8_2.css({'left':100});

		item8_1.stop().animate({'opacity':1},700);
		item8_2.stop().delay(100).animate({'opacity':1,'left':340},1300,'easeOutExpo');
		item8_3.stop().delay(300).animate({'opacity':1},600);
		item8_4.stop().delay(500).animate({'opacity':1},600);
		item8_5.stop().delay(800).animate({'opacity':1},600);
		item8_6.stop().delay(1000).animate({'opacity':1},600);
		item8_7.stop().delay(1200).animate({'opacity':1},600);
	};


	var sec9_1_play = function (){
		var item9_1 = obj.find('.item9_1');
		var item9_1_txt = item9_1.find('.txt');
		
		item9_1.css({'left':568});
		item9_1_txt.css({'left':-100});
		item9_1.stop().animate({'opacity':1,'left':418},1300,'easeOutExpo');
		item9_1_txt.stop().delay(300).animate({'opacity':1,'left':-250},1000,'easeOutExpo');
	};

	var sec9_2_play = function (){
		var item9_2 = obj.find('.item9_2');
		var item9_2_txt = item9_2.find('.txt');
		var item9_5 = obj.find('.item9_5');
		
		item9_2.css({'left':30});
		item9_2_txt.css({'left':328});
		item9_5.css({'left':842});

		item9_2.stop().animate({'opacity':1,'left':180},1300,'easeOutExpo');
		item9_2_txt.stop().delay(300).animate({'opacity':1,'left':478},1000,'easeOutExpo');
		item9_5.stop().delay(500).animate({'opacity':1,'left':692},1000,'easeOutExpo');
	};

	var sec9_3_play = function (){
		var item9_3 = obj.find('.item9_3');
		var item9_3_txt = item9_3.find('.txt');
		
		item9_3.css({'left':486});
		item9_3_txt.css({'left':-324});

		item9_3.stop().animate({'opacity':1,'left':376},1000,'easeOutExpo');
		item9_3_txt.stop().delay(300).animate({'opacity':1,'left':-174},1000,'easeOutExpo');							

	};

	var sec9_4_play = function (){
		var item9_4 = obj.find('.item9_4');
		var item9_4_txt = item9_4.find('.txt');
		var item9_6 = obj.find('.item9_6');

		obj.find('.bus8').addClass('on');
		
		item9_6.css({'left':-635});
		item9_4.css({'left':528});
		item9_4_txt.css({'left':-182});

		item9_6.stop().animate({'opacity':1,'left':-485},1000,'easeOutExpo');
		item9_4.stop().delay(300).animate({'opacity':1,'left':678},1000,'easeOutExpo');
		item9_4_txt.stop().delay(500).animate({'opacity':1,'left':-332},1000,'easeOutExpo');
	};

	var sec10_play = function (){
		var item10_1 = obj.find('.item10_1');
		var item10_2 = obj.find('.item10_2');
		var item10_3 = obj.find('.item10_3');

		obj.find('.bus9').addClass('on');
		
		item10_2.css({'left':1001});
		item10_3.css({'left':1458});

		item10_1.stop().animate({'opacity':1},700)
		item10_2.stop().animate({'opacity':1,'left':501},1000,'easeOutExpo');
		item10_3.stop().delay(300).animate({'opacity':1,'left':1110},1000,'easeOutExpo');
	};


	var sec11_1_play = function (){
		var item11_1 = obj.find('.item11_1');
		var item11_1_txt = item11_1.find('.txt');
		
		item11_1.css({'left':250});
		item11_1_txt.css({'left':100});
		item11_1.stop().animate({'opacity':1,'left':100},1000,'easeOutExpo');
		item11_1_txt.stop().delay(300).animate({'opacity':1,'left':-50},1000,'easeOutExpo');
	};

	var sec11_2_play = function (){
		var item11_2 = obj.find('.item11_2');
		var item11_2_txt = item11_2.find('.txt');
		var item11_8 = obj.find('.item11_8');
		
		item11_2.css({'left':320});
		item11_2_txt.css({'left':16});
		item11_8.css({'left':-1607});


		item11_2.stop().delay(400).animate({'opacity':1,'left':470},1000,'easeOutExpo');
		item11_2_txt.stop().delay(800).animate({'opacity':1,'left':166},1000,'easeOutExpo');
		item11_8.stop().animate({'opacity':1,'left':-807},1000,'easeOutExpo');
	};

	var sec11_3_play = function (){
		var item11_3 = obj.find('.item11_3');
		var item11_3_txt = item11_3.find('.txt');
		
		item11_3.css({'left':198});
		item11_3_txt.css({'left':621});
		item11_3.stop().animate({'opacity':1,'left':48},1000,'easeOutExpo');
		item11_3_txt.stop().delay(300).animate({'opacity':1,'left':471},1000,'easeOutExpo');
	};

	var sec11_4_play = function (){
		var item11_4 = obj.find('.item11_4');
		var item11_4_txt = item11_4.find('.txt');
		var item11_9 = obj.find('.item11_9');
		
		item11_4.css({'left':530});
		item11_4_txt.css({'left':126});
		item11_9.css({'left':1200});
		item11_4.stop().animate({'opacity':1,'left':380},1000,'easeOutExpo');
		item11_4_txt.stop().delay(300).animate({'opacity':1,'left':-270},1000,'easeOutExpo');
		item11_9.stop().delay(800).animate({'opacity':1,'left':743},1000,'easeOutExpo');
	};

	var sec11_5_play = function (){
		var item11_5 = obj.find('.item11_5');
		var item11_5_txt = item11_5.find('.txt');

		item11_5.css({'left':479});
		item11_5_txt.css({'left':42});
		item11_5.stop().animate({'opacity':1,'left':329},1000,'easeOutExpo');
		item11_5_txt.stop().delay(300).animate({'opacity':1,'left':202},1000,'easeOutExpo');
		
	};

	var sec11_6_play = function (){
		var item11_6 = obj.find('.item11_6');
		var item11_6_txt = item11_6.find('.txt');
		
		item11_6.css({'left':370});
		item11_6_txt.css({'left':-112});
		item11_6.stop().animate({'opacity':1,'left':520},1300,'easeOutExpo');
		item11_6_txt.stop().delay(300).animate({'opacity':1,'left':-262},1000,'easeOutExpo');

		var item11_10_1 = obj.find('.item11_10_1');
		var item11_10_2 = obj.find('.item11_10_2');
		var item11_10_3 = obj.find('.item11_10_3');
		var item11_10_4 = obj.find('.item11_10_4');

		item11_10_1.css({'top':2075});
		item11_10_2.css({'top':2413});
		item11_10_3.css({'top':2465});
		item11_10_4.css({'top':2600});

		item11_10_1.stop().delay(800).animate({'opacity':1,'top':2173},1000,'easeOutExpo');<!-- 20180319 ���� -->
		item11_10_2.stop().delay(1000).animate({'opacity':1,'top':2513},1000,'easeOutExpo');
		item11_10_3.stop().delay(1200).animate({'opacity':1,'top':2565},1000,'easeOutExpo');
		item11_10_4.stop().delay(1400).animate({'opacity':1,'top':2700},1000,'easeOutExpo');
		item11_10_4.stop().delay(1400).animate({'opacity':1,'top':2705},1000,'easeOutExpo');<!-- 20180319 ���� -->
	};

	var sec11_7_play = function (){
		var item11_7 = obj.find('.item11_7');
		var item11_7_txt = item11_7.find('.txt');
		var item11_10 = obj.find('.item11_10');
		
		item11_7.css({'left':74});
		item11_7_txt.css({'left':63});
		item11_10.css({'left':-1336});

		item11_7.stop().animate({'opacity':1,'left':224},1000,'easeOutExpo');
		item11_7_txt.stop().delay(300).animate({'opacity':1,'left':430},1000,'easeOutExpo');
		item11_10.stop().animate({'opacity':1,'left':-527},1000,'easeOutExpo');
	};

	$(window).load(function(){
		setTimeout(function(){
			sec1_play();
		},300);
		fn_intrumap();
	});


	$(window).scroll(function(){
		current_scrollTop = $(window).scrollTop();
		screen_height = $(window).height();
		h_point = h_point = ((screen_height / 2) + current_scrollTop) + va_hei;

		if (h_point >= 0 && h_point < 1350){
			obj_map_ankle.css({'left':65,'top':-22});								
		}else if (h_point >= 1350 && h_point < 1896){
			obj_map_ankle.css({'left':30,'top':-18});
			if (flagArray[0]){
				sec2_play();
				flagArray[0] = false;
			}
		}else if (h_point >= 1976 && h_point < 2370){
			obj_map_ankle.css({'left':27,'top':-17});
			if (flagArray[1]){
				sec3_1_play();
				flagArray[1] = false;
			}
		}else if (h_point >= 2370 && h_point < 2800){
			obj_map_ankle.css({'left':27,'top':-15});
			if (flagArray[2]){
				sec3_2_play();
				flagArray[2] = false;
			}
		}else if (h_point >= 2800 && h_point < 3324){
			obj_map_ankle.css({'left':27,'top':-13});
			if (flagArray[3]){
				sec3_4_play();
				flagArray[3] = false;
			}
		}else if (h_point >= 3324 && h_point < 3876){
			obj_map_ankle.css({'left':27,'top':-10});
			if (flagArray[4]){
				sec3_5_play();
				flagArray[4] = false;
			}
		}else if (h_point >= 4032 && h_point < 4623){
			obj_map_ankle.css({'left':60,'top':-10});
			if (flagArray[5]){
				sec4_play();
				flagArray[5] = false;
			}
		}else if (h_point >= 4699 && h_point < 5130){
			obj_map_ankle.css({'left':62,'top':-9});
			if (flagArray[6]){
				sec5_1_play();
				flagArray[6] = false;
			}
		}else if (h_point >= 5130 && h_point < 5654){
			obj_map_ankle.css({'left':62,'top':-8});
			if (flagArray[7]){
				sec5_2_play();
				sec5_4_play();
				flagArray[7] = false;
			}
		}else if (h_point >= 5654 && h_point < 6200){
			obj_map_ankle.css({'left':62,'top':-7});
			if (flagArray[8]){
				sec5_3_play();
				flagArray[8] = false;
			}
		}else if (h_point >= 6294 && h_point < 7043){
			obj_map_ankle.css({'left':62,'top':-6});
			if (flagArray[9]){
				sec6_play();
				flagArray[9] = false;
			}
		}else if (h_point >= 7100 && h_point < 7433){
			obj_map_ankle.css({'left':62,'top':-5});
			if (flagArray[10]){
				sec7_1_play();
				flagArray[10] = false;
			}
		}else if (h_point >= 7433 && h_point < 8236){
			obj_map_ankle.css({'left':62,'top':-4});
			if (flagArray[11]){
				sec7_2_play();
				flagArray[11] = false;
			}
		}else if (h_point >= 8236 && h_point < 8700){
			obj_map_ankle.css({'left':62,'top':-3});
			if (flagArray[12]){
				sec7_3_play();
				flagArray[12] = false;
			}
		}else if (h_point >= 8775 && h_point < 9314){
			obj_map_ankle.css({'left':62,'top':1});
			if (flagArray[13]){
				sec7_4_play();
				flagArray[13] = false;
			}
		}else if (h_point >= 9377 && h_point < 9984){
			obj_map_ankle.css({'left':24,'top':2});
			if (flagArray[14]){
				sec8_play();
				flagArray[14] = false;
			}
		}else if (h_point >= 10036 && h_point < 10515){
			obj_map_ankle.css({'left':23,'top':2});
			if (flagArray[15]){
				sec9_1_play();
				flagArray[15] = false;
			}
		}else if (h_point >= 10515 && h_point < 11149){
			obj_map_ankle.css({'left':22,'top':6});
			if (flagArray[16]){
				sec9_2_play();
				flagArray[16] = false;
			}
		}else if (h_point >= 11149 && h_point < 11723){
			obj_map_ankle.css({'left':22,'top':10});
			if (flagArray[17]){
				sec9_3_play();
				flagArray[17] = false;
			}
		}else if (h_point >= 11723 && h_point < 12370){
			obj_map_ankle.css({'left':22,'top':15});
			if (flagArray[18]){
				sec9_4_play();
				flagArray[18] = false;
			}
		}else if (h_point >= 12475 && h_point < 13085){
			obj_map_ankle.css({'left':64,'top':16});
			if (flagArray[19]){
				sec10_play();
				flagArray[19] = false;
			}
		}else if (h_point >= 13184 && h_point < 13647){
			obj_map_ankle.css({'left':66,'top':18});
			if (flagArray[20]){
				sec11_1_play();
				flagArray[20] = false;
			}
		}else if (h_point >= 13647 && h_point < 14181){
			obj_map_ankle.css({'left':68,'top':22});
			if (flagArray[21]){
				sec11_2_play();
				flagArray[21] = false;
			}
		}else if (h_point >= 14181 && h_point < 14791){
			obj_map_ankle.css({'left':70,'top':26});
			if (flagArray[22]){
				sec11_3_play();
				flagArray[22] = false;
			}
		}else if (h_point >= 14791 && h_point < 15209){
			obj_map_ankle.css({'left':70,'top':30});
			if (flagArray[23]){
				sec11_4_play();
				flagArray[23] = false;
			}
		}else if (h_point >= 15209 && h_point < 15603){
			obj_map_ankle.css({'left':72,'top':33});
			if (flagArray[24]){
				sec11_5_play();
				flagArray[24] = false;
			}
		}else if (h_point >= 15603 && h_point < 16071){
			obj_map_ankle.css({'left':72,'top':36});
			if (flagArray[25]){
				sec11_6_play();
				flagArray[25] = false;
			}
		}else if (h_point >= 16071 && h_point < 16642){
			obj_map_ankle.css({'left':72,'top':38});
			if (flagArray[26]){
				sec11_7_play();
				flagArray[26] = false;
			}
		}

	});

	var fn_intrumap = function (){
		var obj_map = obj.find('.intro_map');
		var move_flag = true;
		var s_movement = function (){
			var sTop = $(window).scrollTop();
			if (sTop >= 355){
				obj_map.addClass('fixed');
				/*
				if (move_flag){
					obj_map.stop().animate({'top': (sTop - 300) },1000,'easeOutExpo');
					move_flag = false;
				}else {
					obj_map.stop().css({'top': (sTop - 300) },1000,'easeOutExpo');
					move_flag = false;
				}*/
			}else {
				obj_map.removeClass('fixed');
				/*
				obj_map.stop().animate({'top':0},1000,'easeOutExpo');
				move_flag = true;*/
			}
		};
		s_movement();
		$(window).scroll(function(){
			s_movement();
		});
	}

	$(window).resize(function(){
		current_scrollTop = $(window).scrollTop();
		screen_height = $(window).height();
		h_point = h_point = ((screen_height / 2) + current_scrollTop) + va_hei;
	});
};




/* s : 171130 */
var fn_studyorgan = function (){
	var obj = $('.study_organ_wrap .sor_sec1');
	var item1 = obj.find('.item1');
	var item2 = obj.find('.item2');
	var item3 = obj.find('.item3');
	var item3_img = item3.find('img');
	var item4 = obj.find('.item4');
	var item5 = obj.find('.item5');

	item1.css({'top':'-15px'});
	item2.css({'top':'42px'});
	item5.css({'top':'110px'});

	item3_img.css({'margin-left':'-250px'});

	item1.stop().delay(300).animate({'opacity':'1','top':35},500);
	item2.stop().delay(600).animate({'opacity':'1','top':92},500);
	item5.stop().delay(900).animate({'opacity':'1','top':160},500);
	item3.stop().delay(1200).animate({'opacity':'1'},1500,'easeOutExpo');
	item3_img.stop().delay(1500).animate({'marginLeft':0},1500,'easeOutExpo');
	item4.stop().delay(2300).animate({'opacity':'1'},500);
};
/* e : 171130 */

var fn_studysystem = function (){
	var obj = $('.study_system_wrap .ss_sec1');
	var item1 = obj.find('.item1');
	var item2 = obj.find('.item2');

	item1.css({'top':'-50px'});
	item2.css({'top':'-50px'});

	item1.stop().delay(300).animate({'opacity':'1','top':0},500);
	item2.stop().delay(900).animate({'opacity':'1','top':0},500);
};

$(document).ready(function(){
	fn_Intro();
	/* s : 170620 */
	$('.procholist li').on('click',function(){
		$('.procholist li').removeClass('on');
		$(this).addClass('on')
		if($(this).hasClass('on')){
		}else{
			$('.procholist li').removeClass('on');
		}
	});
	/* e : 170620 */
	$("label .img").click(function(){
		var name = $(this).parent().attr('for');
		$("input:radio[id="+name+"]").trigger('click');
		chkGift();
	});
});	

$(window).load(function(){
	fn_studyorgan();
	fn_studysystem();
	fn_main_active();
});



/* s : 170323 �߰� */
var fn_tab_act = function (target){
	var obj = $(target);
	var child = obj.children();
	child.bind('click',function(){
		child.removeClass('on');
		$(this).addClass('on');
	});
};
/* e : 170323 �߰� */

/* s : 171027 */
$(document).ready(function(){
	$('.list_selbox ul li').unbind()
	$('.list_selbox .selected').unbind()
	$('.list_selbox ul li').bind("click",function(){
		$(this).parent().find('li').removeClass('on')
		$(this).addClass('on');
		$(this).parent().parent().find('a.selected span').text($(this).text());
		$(this).parent().parent().removeClass('on');
		$('.list_selbox').css({'height':'auto'})
		return false;
	});
	$('.list_selbox .selected').bind('click',function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on')
			$('.list_selbox').css({'height':'auto'})
			
		}else{
			$(this).parent().parent().find('div').removeClass('on');
			$(this).parent().addClass('on')
		}
		return false
	});

	$('.list_selbox li .txt').on('click',function(){
		var idx = $(this).parent().parent().parent().parent().index();
		$('.in_txt').children('td:eq('+idx+')').text($(this).text());
	});
	$('.list_selbox li .no').on('click',function(){
		var idx = $(this).parent().parent().parent().parent().index();
		$('.in_txt').children('td:eq('+idx+')').text('');
	});
});	
/* e : 171027 */

/* s : 171130 */
// $(document).ready(function(){
// 	$('.bxslider_top').bxSlider({
// 		mode:'fade',
// 		auto: true,
// 		speed: 600,
// 		controls: false,
// 	});
// });	
/* e : 171130 */

/* ���̾� �˾� */
$(function(){
	$('.pop_wrap').css({
		top : ($(window).scrollTop() + ( $(window).height() - $('.pop_wrap').height())/2) + 'px',
		left : ($(window).scrollLeft() + ( $(window).width() - $('.pop_wrap').width())/2 + 100) + 'px'
	});
	
	$('.btn_popclose').on('click',function(){
		$('.pop_wrap').fadeOut(300);
	});
	
	$('.bg_character').animate({'top' : '0'}, 1400).animate({'top' : '-80px'}, 1200).animate({ 'top': '0'}, 1200, 'easeOutBounce');
});

/* s : 180403 추가 */
$(document).ready(function () {
	// 윙바 슬라이드
	$('.floating_slider').slick({
		focusOnSelect: true,
		dots: true,
		arrows: false,
		autoplay: true,
		lazyLoaded: 'ondemand',
		slidesToShow: 1,
   		slidesToScroll: 1,
	});

	// 윙바 메뉴 열기 버튼
	$('.floating_menu .btn_open, .floating_menu .btn_open_text').click(function(){
		$('.floating_menu').addClass('active');
   });

   // 윙바 메뉴 닫기 버튼
   $('.floating_menu .btn_close').click(function(){
	   $('.floating_menu').removeClass('active');
   });

   //  윙바 따라다니는 스크립트
	function floatingQuickMotion(floatingTarget,floatingTop) {
		var floatPosition = parseInt(floatingTarget.css('top'));
		$(window).scroll(function () { 
			newPosition = $(window).scrollTop() + floatPosition - 120;
			if ($(window).scrollTop() > 100) {
				floatingTarget.stop().animate({
					'top': newPosition
				}, 300);
			} else { 
				floatingTarget.stop().animate({
					'top': floatingTop
				}, 300);
			}
		});
	}
	floatingQuickMotion($('.floating_menu .title_fixed'),227);
	floatingQuickMotion($('.floating_menu .open_area .fixed_area'),57);

   $('.floating_menu .input_address').focus(function () { 
	   $('.popup_detail_address').fadeIn();
   });
   $('.popup_detail_address .btn_floating_submit').click(function () { 
	   $('.popup_detail_address').fadeOut();
   });
 });
/* e : 180403 추가 */