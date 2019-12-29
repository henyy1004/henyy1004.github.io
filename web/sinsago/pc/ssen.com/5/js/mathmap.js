/**
* 이미지명 ON,OFF
* 작성일 : 2013.06.18
* 작성자 : 장호연
*
* 사용법 :
* 1. 기본형: 파일명 형식이 _off, _on 형식 경우
*    $("img").imgOn();
*    $("img").imgOff();
*
* 2. 그외: 예) 파일명 형식이 .png, _on.png 인 경우
*    $("img").imgOn({
*        pattern_off: ".png",
*        pattern_on: "_on.png",
*    });
*    $("img").imgOff({
*        pattern_off: "_on.png",
*        pattern_on: "_off.png",
*    });
*/
(function(){$.fn.imgOn=function(a){var b={pattern_off:"_off.",pattern_on:"_on.",imgSrc:this.attr("src")},a=$.extend(b,a||{});b.imgSrc=b.imgSrc.replace(b.pattern_off,b.pattern_on);this.attr("src",b.imgSrc);return this};$.fn.imgOff=function(a){var b={pattern_off:"_off.",pattern_on:"_on.",imgSrc:this.attr("src")},a=$.extend(b,a||{});b.imgSrc=b.imgSrc.replace(b.pattern_on,b.pattern_off);this.attr("src",b.imgSrc);return this}})();


$(function(){

	var allWrap = $('div.mathmap_box');
	var stepTotal = allWrap.find('div.mathamap_step');
	var stepPrev = stepTotal.find('a.prev');
	var stepNext = stepTotal.find('a.next');
	var stepRoll = stepTotal.find('div.step_box');
	var stepItem = stepRoll.find('div.step');
	var stepContens = allWrap.find('div.mathmap_contens');
	var stepWidth = stepRoll.width();
	var speed = 700;
	var grade = "";
	var goal = "";

	stepNext.find('img').imgOn();

	stepRoll.find('li').one('click', function(event){
		event.preventDefault();
		$(this).find('img').imgOn();
	}).on('click', function(event){
		event.preventDefault();

		var _step = $(this).parents('div.step').index();
		stepItem.removeClass('on');

		$(this).parents('div.step').find('li').each(function(){
			$(this).find('img').imgOff();
		});
		$(this).find('img').imgOn();

		if(_step == 0){
				grade = $(this).attr("code");
				stepItem.eq(1).addClass('on');
				nextSlide();
			}else {			
				goal = $(this).attr("code");
				stepItem.eq(1).addClass('on');

				call("call_mathmap.aspx?ch=" + $(this).attr("ch") + "&goal=" + goal + "&grade="+ grade,"mathmap_area");
			}
	});
	
	stepRoll.find('.step2 li').one('click', function(event){
		event.preventDefault();
		$(".mathmap_nodata").hide();
		stepContens.show();
	});

	function nextSlide(){
		if(grade== "" || grade == null){
			alert("나의 학년을 선택해주세요.");
			return;
		}

		stepRoll.find('div.inner').stop(true).animate({ left : -stepWidth }, speed);
		stepNext.removeAttr('href').find('img').imgOff();
		stepPrev.attr('href','#').find('img').imgOn();
	}

	function prevSlide(){
		stepRoll.find('div.inner').stop(true).animate({ left : 0 }, speed);
		stepPrev.removeAttr('href').find('img').imgOff();
		stepNext.attr('href','#').find('img').imgOn();
	}

	stepPrev.on('click', function(event){
		event.preventDefault();
		prevSlide();
	});

	stepNext.on('click', function(event){
		event.preventDefault();
		nextSlide();
	});
	

	//메인 배너에서 direct로 검색 하는 로직
	var chk_grade = false;
	var chk_goal = false;
	var chk_ch;

	$("#step1 ul li").each(function() {			
		if($(this).attr("direct") == "Y")
		{
			chk_grade = true;
			grade = $(this).attr("code");
			$(this).find("img").imgOn();
		}
		else
			$(this).find("img").imgOff();
	});
	
	$("#step2 ul li").each(function() {			
		if($(this).attr("direct") == "Y")
		{
			chk_goal = true;
			chk_ch = $(this).attr("ch");
			goal = $(this).attr("code");			
			$(this).find("img").imgOn();
		}
		else
			$(this).find("img").imgOff();
	});
	
	if(chk_grade && chk_goal)
	{
		stepRoll.find('div.inner').css("left", -stepWidth);
		stepNext.removeAttr('href').find('img').imgOff();
		stepPrev.attr('href','#').find('img').imgOn();
			
		$(".mathmap_nodata").hide();
		stepContens.show();

		call("call_mathmap.aspx?ch=" + chk_ch + "&goal=" + goal + "&grade=" + grade, "mathmap_area");
	}
})
