$(function(){
	
	$('.siteOver').hide();
	$('#footer .site').on('click',function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$('.site img').attr('src', $(this).find('img').attr('src').replace('_on','_off'));
			$('.siteOver').css({'display':'none'});
		}else{
			$(this).addClass('on');
			$('.site img').attr('src', $(this).find('img').attr('src').replace('_off','_on'));
			$('.siteOver').css({'display':'block'});
		}
		return false;
	});

	$('.lecture .bookList .thumb a').on('mouseover',function(){
		var path = $(this).find('img').attr('src');
		var url = $(this).attr('href');
		$(this).parent().parent().parent().parent().parent().find('div').removeClass('on');
		$(this).parent().parent().addClass('on');
		$(this).parent().parent().parent().parent().parent().addClass('divPrt')
		$(this).parent().parent().parent().parent().parent().parent().find('.bookView .thumb img').attr({src: path});
		$(this).parent().parent().parent().parent().parent().parent().find('.bookView .thumb a').attr({href: url});
		return false;
	});

	bxslider();
});


function bxslider(){
	var mySlider2 = $('.lecture .slider').bxSlider({		
		auto: true,
		controls:false,
		autoHover:true,
		pager: true,
		responsive:false,
		touchEnabled:false,
		pagerCustom:'#pager',
		mode:'fade',
		pause: 4000,
		speed:100
	});	

	$('#pager a').on('mouseenter',function(){
		  var idx = $(this).attr('data-slide-index');		  
		  mySlider2.goToSlide(idx);
	});	

	var roll = 0;
	var bookInfo;
	
	bookInfo = setInterval(function(){
		roll++;
		if(roll > 1) {roll = 0;}
		mySlider2.goToSlide(roll);
	}, 3000);

	$('.lecture .slider').mouseenter(function(){
		clearInterval(bookInfo);
	}).mouseleave(function() {
		roll = mySlider2.getCurrentSlide();
		bookInfo = setInterval(function(){
			roll++;
			if(roll > 1) {roll = 0;}
			mySlider2.goToSlide(roll);
		}, 3000);
	});
}


cnt = 0;
rollTm = 800;
sldTm = 3000;
sld = $('.slideWrap');
obWr = $('.objWrap');
obCr = $('.objWrap').children();
objLt = $('.objWrap').children().length-1;
objTt = $('.objWrap').children().length;
nav = $('.nav');
navCr = $('.nav span');
navTt = navCr.length;
rollAt = setInterval(actNext,sldTm);

obj1 = 0;
obj2 = 0;
nav1 = 0;
nav2 = 0;
navP1 = 0;
navP2 = 0;
hCs = 0;

$(sld).hover(function(){
	clearInterval(rollAt);
	cnt = 1;
},function(){
	rollAt = setInterval(actNext,sldTm);
});

o=1;
$(obCr).each(function(){
	$(this).addClass('act' + o);
	o++;
});
n=1;
$(navCr).each(function(){
	$(this).addClass('act' + n);
	n ++;
});

navSet();
txtAt();
function prev(){if(!$(obCr).eq(obj1).is(':animated')){actPrev();}}
function next(){if(!$(obCr).eq(obj1).is(':animated')){actNext();}}
function txtAt(){$('.sldChk').html('<b>' + (obj1+1) + '</b>/' + objTt)}
function navSet(){
	if(navTt>3){	for(var i=0; i<2; i++){$(navCr).clone(true,true).removeClass('on').appendTo(nav)}}
	sp = $('.nav span');
	for(var i = 0; i < sp.length; i+=3){sp.slice(i, i+3).wrapAll('<p></p>')}
	$('.nav p').eq(0).addClass('on');
	navTt = sp.length-1;
}

function actPrev(){
	obj1--;
	nav1--;
	if(obj1 == -1){obj1 = objLt; obj2 = 0}
	if(nav1 == -1){nav1 = navTt; nav2 = 0}
	$(obCr).eq(obj1).css('z-index','3');
	$(obCr).eq(obj1).fadeIn(rollTm, function(){
		$(obCr).removeClass('on');
		$(obCr).eq(obj1).addClass('on').removeAttr('style');
	});
	naCkP();
}

function actNext(){
	if(obj1 == objLt){obj1 = -1; obj2 = 0}
	if(nav1 == navTt){nav1 = -1; nav2 = 0}
	$(obCr).eq(obj1 + 1).css('z-index','3');
	$(obCr).eq(obj1+1).fadeIn(rollTm, function(){
		$(obCr).eq(obj1).addClass('on').removeAttr('style')
		$(obCr).eq(obj1-1).removeClass('on')
	});
	obj1++;
	nav1++;
	naCkN();
}

function napN(){
	navP = $('.nav p');
	if(navP1 == objLt){navP1 = -1; navP2 = 0}
	$(navP).eq(navP1 + 1).css('z-index','3');
	$(navP).eq(navP1+1).fadeIn(rollTm, function(){
		$(navP).eq(navP1).addClass('on').removeAttr('style')
		$(navP).eq(navP1-1).removeAttr('style').removeClass('on')
	});
	navP1++;
}

function napP(){
	navP1--;
	navP = $('.nav p');
	if(navP1 == -1){navP1 = objLt; navP2 = 0}
	$(navP).eq(navP1).css('z-index','3');
	$(navP).eq(navP1).fadeIn(rollTm, function(){
		$(navP).eq(navP1).addClass('on').removeAttr('style');
		$(this).siblings().find('span').removeClass('on');
		$(this).siblings().removeAttr('style').removeClass('on');
	});
}

function rIdx(){
	$(obWr).children('.'+hCs).css('z-index','3').fadeIn(rollTm, function(){
		$(this).addClass('on').removeAttr('style').siblings().removeClass('on');
	});
	obj1 = obj2;
	nav1 = nav2;
	txtAt();
}

function naCkP(){
	$('.nav span').removeClass('on').eq(nav1).addClass('on');
	$('.nav p span.on:last-child').each(function(){
		var ths = $(this);
		napP();
	});
	txtAt();
}

function naCkN(){
	$('.nav span').removeClass('on').eq(nav1).addClass('on');
	$('.nav p span.on:first-child').each(function(){
		var ths = $(this);
		napN();
	});
	txtAt();
}

var navCr = $('.nav span');
function navChk(){
	nav1 = $('.nav span').index($('.nav span.on')[0]);
	a = nav1+1;
	b = objTt;
	if(a<=b){c=0}
	else if(a<=(b*2)){c=b}
	else if(a<=(b*3)){c=b*2}
	obj2= Math.abs((a- c)-1);
	obj1 = obj2;
	txtAt();
}

$(navCr).each(function(i){
	$(this).on('mouseover',function(){
		if(i == nav1){return} nav2 = i;
		hCs = $(this).attr('class');
		$(navCr).removeClass('on');
		$(this).addClass('on');
		navChk();
		rIdx();
		return hCs;
	});
});

