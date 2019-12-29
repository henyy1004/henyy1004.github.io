$(document).ready(function(){
	btnTop();
	quick();

	function tabonoff(o) {
		var index = $('.pretabarea .prtab li').index(o);
			$('.hiddenarea').removeClass('on');
			$(o).siblings().removeClass('on');
			$(o).addClass('on');
			//$(o).parent().next('.hiddenwrap').children().slideUp('fast').eq(index).slideDown('fast');
			$(o).parent().next().find('.hiddenarea:eq('+index+')').addClass('on');
	}
	(function(a){
		a.fn.tabonoff_auto=function(p){
			var s_t_i=p&&p.scroller_time_interval?p.scroller_time_interval:"3000"; //롤링타임 수정가능
			var dom=a(this); 
			var s_length=dom.length; 
			var timer; 
			var current = 0; begin(); play();
			function begin(){
				dom.mouseover(function(){current = dom.index($(this)); play(); stop()});
				dom.parent().parent().hover(function(){stop();},function(){timer = setTimeout(play,s_t_i);});
			}
			function stop(){clearTimeout(timer);}
			function play(){
				clearTimeout(timer); tabonoff(dom[current]);
				if(current >= s_length-1){current = 0;} else{current ++;}
				timer = setTimeout(play,s_t_i);
			}
		}
	})(jQuery);
	$(".pretabarea li").tabonoff_auto();
});

function btnTop(){
	$('#top').click(function(){
		$('html, body').animate({scrollTop:0}); return false
	});
}


/* quick */
function quick(){
	var obj = $('.quickmenu');
	var s_movement = function (){
		var sTop = $(window).scrollTop();
		if (sTop >= 100 && sTop <= 2600) {
		    obj.stop().animate({ 'top': (sTop + 50) }, 1000, 'easeOutExpo');
		}
		else if (sTop > 2600) {
		    obj.stop().animate({ 'top': 2600 }, 1000, 'easeOutExpo');
		}
		else {
		    obj.stop().animate({ 'top': 170 }, 1000, 'easeOutExpo');
		}
	};
	$(window).scroll(function(){
		s_movement();
	});
}


