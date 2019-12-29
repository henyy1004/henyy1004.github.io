UI = {
	Load: function(){
		UI.Common();
	//	UI.Rolling();
		//UI.Flicking();
		UI.Accordion();
		UI.Accordion2();
		UI.Tabmenu();		
		UI.Popup();
		UI.LayerPopup();
	},
	
	Common: function(){
		var category_area = $('.main_category_area'),
			select_btn = category_area.children('a'),
			select_list_area = category_area.find('.main_category');
			select_list = category_area.find('.main_category').find('a');
			
		select_btn.click(function(){
			select_list_area.toggleClass('on');
		});

		select_list.click(function(){
			var txt = $(this).text();
			
			select_btn.text(txt);
			select_list_area.removeClass('on');
		});

		var lnb_aco = $('#lnb_menu'),
			lnb_menu = lnb_aco.find('.lnb_list').children('li').children('a');
			
			$('.top_menu').click(function(){
				$('html').addClass('scroll_hidden');
				lnb_aco.addClass('open');
			});
			
			lnb_aco.find('.btn_close').click(function(){
				$('html').removeClass('scroll_hidden');
				lnb_aco.removeClass('open');
			});
			
			lnb_menu.click(function(){
				$(this).next().toggleClass('open');
				if ($(this).next().hasClass('open')){
					$(this).parent().addClass('open');
				}else{
					$(this).parent().removeClass('open');
				}
			});
	},
	
	Rolling: function(){
		var ground = $('.notice_list'),
			imgs_wrap = ground.find('.txt'),
			imgs = imgs_wrap.children(),
			size = imgs.height()-13;
			

		//default
		imgs_wrap.css('top',-size);
		imgs_wrap.children('li:last').prependTo(imgs_wrap);

		var next = function(){
			imgs_wrap.stop().animate({'top':-(size*2)}, 300, 'easeInExpo', function(){
				$(this).children('li:first').appendTo(this);
				$(this).css({'top':-size});
			});
		}

		var start = function(){
			set_interval = setInterval(function(){
				next();
			}, 5000);//5초 자동롤링
		}

		start();
	},
	
/*	Flicking: function(){
		var ground = $('#flicking_area'),
			flicking = ground.find('.flicking'),
			flicking1 = ground.find('.flicking.type1'),
			flicking2 = ground.find('.flicking.type2');
		
		$('.btn_flicking').click(function(){
			flicking2.css({'display':'block'})
			flicking.stop().animate({left : '-50%'}, 500 );
			flicking1.css({'display':'none'})
		});
		
		$('.btn_flicking.type2').click(function(){
			flicking1.css({'display':'block'})
			flicking.stop().animate({left : '0'}, 500 );
			flicking2.css({'display':'none'})
		});
			
	}, */
	
	Accordion: function(){
		var ground = $('.course_list'),
			list_btn = ground.children('li').children('a');
			
		list_btn.click(function(){
			$(this).parent().siblings().removeClass('open');
			$(this).parent().toggleClass('open');
		});

		var ground = $('.accordion'),
			list_btn = ground.find('.aco_btn');

		list_btn.click(function(){
			if(!$(this).parent().hasClass('open')){
				//$(this).parent().siblings().removeClass('open');
				$(this).parent().addClass('open');
				//$('.accordion li a.aco_btn .btn_txt').html('펼쳐보기');	
				$(this).children('.btn_txt').html('접기');	
			}else{
				//$(this).parent().siblings().removeClass('open');
				$(this).parent().removeClass('open');
				$(this).children('.btn_txt').html('펼쳐보기');	
			}
		});
	},
	
	Accordion2: function(){
		var ground = $('.course_list'),
			list_btn = ground.children('li').children('a');
			
		$('.aco_btn2').click(function(){
			if(!$(this).parent().parent().hasClass('open')){
				$(this).parent().parent().siblings().removeClass('open');
				$(this).parent().parent().addClass('open');
			}else{
				$(this).parent().parent().siblings().removeClass('open');
				$(this).parent().parent().removeClass('open');
			}
		});
	},

	Tabmenu: function(){
		$('.tab_menu li').each(function(i){this.num = i});
		$('.tab_menu li').click(function(){
			$(this).siblings().removeClass('on');
			$(this).addClass('on');
			$('.class_exp_cont').children('.part').removeClass('on');
			$('.class_exp_cont').children('.part').eq(this.num).addClass('on');
		});

	},
	
	Popup: function(){
		var popup_area = $('#popup')
		$('.pop_open').click(function(){
			popup_area.addClass('open');
		});

		popup_area.find('.close').click(function(){
			popup_area.removeClass('open');
		});
	},

	LayerPopup : function(){
		 if (GetCookie("Promotion_POPUP") != "done") {
				$('#popup_wrap2').removeClass("hidden");
				$('#popup_wrap2').show();
		}
	}
}

$(document).ready(function(){	
	UI.Load();
	$('.bxslider').bxSlider();

	var select = $("select.select_st1");
	select.change(function(){
		var select_name = $(this).children("option:selected").text();
		$(this).siblings("label").text(select_name);
	});
	
});


/*로그인*/
function goLogin(ch) {
    if(confirm('로그인이 필요한 서비스입니다. \r\n로그인 페이지로 이동하시겠습니까?'))
	    location.href = "/member/login.aspx?ch=" + ch;	
}

/*TOP 랜딩*/
function goLink(val){
	var url = location.href;	
	location.href = "/main/main.aspx?ch="+val;
}

/*카트*/
function fnCart(ccd,ch){

	if(isLogin){
		$.get("/order/cart.aspx?course_cd="+ccd, function(data){
			if(data == "OK"){
				if(confirm("장바구니에 담았습니다. 장바구니 목록으로\n이동하시겠습니까?")){
					location.href="/order/cart_list.aspx?ch="+ch;
					return;
				}
				return;
			}else if(data == "Fail1"){
				alert("해당 강좌정보를 알수 없습니다. ");
				return;
			}else if(data == "Fail2"){
				alert("현재 수강중인 강좌입니다.");
				return;		
			}else if(data == "Fail3"){
				alert("이미 장바구니에 담은 상품입니다.");
				return;
			}
		});	
	}else{	
		goLogin(ch);
	}
}

/*레이어 팝업 닫ㄱㅣ*/
function popupClose(mode){
	if(mode == "1"){
		var days="";
		if (document.getElementById("chk_day").checked) {
			days=3600 * 24 * 365;
		} else {        
			days=3600 * 24;
		}	

		SetCookie('Promotion_POPUP', 'done', days, '/');
	}

    $('#popup_wrap2').hide();
    $('.wrap').find('a').toggleClass('no-highlight')	;
}

