
/*top*/
$('.top').click(function(){
	$('html, body').animate({scrollTop:0}); 
	return false;
});

/*tab*/
$('.tab a').click(function(i){this.i=i}).click(function(){ 
	var idx = $(this).index();
	$(this).parent().parent().find('.hiddenarea').removeClass('on');
	$(this).parent().parent().find('.tab a').removeClass('on');
	$(this).addClass('on');
	$(this).parent().parent().find('.hiddenarea:eq('+idx+')').addClass('on');
	return false;
});

/*list tab*/ 
$('.listtab a').bind("click", function(){
	var idx = $(this).index();
	$('.listtab a').removeClass('on');
	$('.listtab a:eq('+idx+')').addClass('on');
});


/*테이블 안에 tab*/
$('.btnbox a').click(function(i){this.i=i}).click(function(){ 
	var idx = $(this).index();
	$(this).parent().parent().parent().next().find('.hiddenarea').removeClass('on');
	$(this).parent().parent().parent().next().find('.hiddenarea:eq('+idx+')').addClass('on');

	if($(this).hasClass('on')){
		$(this).parent().parent().parent().next('.conview').removeClass('conOn')
		$(this).parent().parent().find('.btnbox a').removeClass('on');
	}else{
		$(this).parent().parent().find('.btnbox a').removeClass('on');
		$(this).parent().parent().parent().next('.conview').addClass('conOn')
		$(this).parent().parent().parent().next().children().children('hiddenarea:eq('+idx+')').addClass('on');
		$(this).addClass('on')
	}
	return false;
});


/* qnalist */
$('.reviewlist .subject').on('click',function(){
	if($(this).hasClass('sbjOn')){
		$(this).removeClass('sbjOn')
		$(this).next('.conview').removeClass('conOn')
	}else{
		$(this).addClass('sbjOn')
		$(this).next('.conview').addClass('conOn')
	}
});



/*order*/
$('.request label').click(function(){ 
	$('.clk_order').removeClass('on');
	$(this).find('.clk_order').addClass('on');
});
$('.date label').click(function(){ 
	$('.clk_order').removeClass('on');
	$(this).find('.clk_order').addClass('on');
});

/*pay*/
function pay01(){
	$('.payment').removeClass('on');
	$('#pay01').addClass('on');
}
function pay02(){
	$('.payment').removeClass('on');
	$('#pay02').addClass('on');
}
function pay03(){
	$('.payment').removeClass('on');
	$('#pay03').addClass('on');
}

/*modalview*/
function modalView(fileurl) {
	$('html').addClass('ovh');

	var layer = document.getElementById("coupon_div");
	
	layer.style.top = (Math.max(document.body.scrollTop, document.documentElement.scrollTop) + 50) + "px";
	layer.style.left = "350px";
		
	$('.modalwrap').show();
}

/*modalhide*/
function modalHide() {
	$('html').removeClass('ovh');	
	$('.modalwrap').hide();
}