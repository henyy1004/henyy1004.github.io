
function scrollOffset()
{
	if($('#top_banner').is("div")){scrTy1()}
	else{scrTy2()}
}

function scrTy1()
{
	if($(window).scrollTop() > 197){
		$('body').addClass('fx');
	}else{
		$('body').removeClass('fx');
		$('#header').removeAttr('style');
	}
}

function scrTy2()
{
	if($(window).scrollTop() > 122){
		$('body').addClass('fx');
	}else{
		$('body').removeClass('fx');
		$('#header').removeAttr('style');
	}
}

$(function(){
	$(window).scroll(function(){
		scrollOffset();
		var posLeft = $(document).scrollLeft();
		$('.fx #header').css('margin-left',-posLeft);
	});
	
	//GNB 마우스 오버
	$('#gnb a img').on('mouseenter',function(){
		$(this).each(function(){var sSrc = $(this).attr('src').replace('_off.png', '_on.png');$(this).attr('src', sSrc)});
	});

	$('#gnb a img').on('mouseout',function(){
		$(this).each(function(){var sSrc = $(this).attr('src').replace('_on.png', '_off.png');$(this).attr('src', sSrc)});
	});

	$('#lnb ul ul').parent().parent().addClass('act');
	$('#lnb ul ul').parent().addClass('actLi');

	$('#lnb .act > li > a').on('click',function(){
		$('#lnb .act > li ul').hide();
		$('#lnb .act > li.on ul').show();

		if($(this).parent().hasClass('on')){			
			$(this).parent().removeClass('on');
			$(this).next().slideUp();			
		}
		else{
			$('#lnb .act > li ul').slideUp();
			$('#lnb .act > li').removeClass('on');
			$(this).parent().addClass('on');
			$(this).next().slideDown();			
		}
	});

	$('#lnb .tab a').click(function(i){this.i=i}).click(function(){
		var idx = $(this).index();
		$(this).parent().parent().find('.hiddenArea').removeClass('on');
		$(this).parent().parent().find('.tab a').removeClass('on');
		$(this).addClass('on');
		$(this).parent().parent().find('.hiddenArea:eq('+idx+')').addClass('on');
		return false;
	});
});
