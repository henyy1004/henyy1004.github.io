UI = {
	Load: function(){
		//UI.Chk_event();
		UI.Slide1();
		UI.Slide2();
	},

	Slide1: function(){
		var area		= $('#why_prem'),
			imgs_wrap	= area.find('.imgs'),
			img			= imgs_wrap.children(),
			img_size	= img.width(),
			max			= img.length,
			img_flag	= 0,
			img_boolean = true,
			navi		= area.find('.navi'),
			set_interval = null;
		for(i=0;i<max;i++){navi.prepend('<a href="#self"></a>');}
		var nav			= navi.children();
		nav.each(function(i){this.num = i});

		//Default
		nav.eq(0).addClass('on');

		function nav_ac(nav_num){
			nav.removeClass('on');
			nav.eq(nav_num).addClass('on');
		};

		var Next = function(next_flag){
			if (!img_boolean){return;}
			img_boolean = false;

			img.eq(img_flag).css({'display':'block','left':img_size});
			img.eq(next_flag).css({'display':'block','left':img_size*2});
			nav_ac(next_flag);

			imgs_wrap.stop().animate({'left':-(img_size * 2)}, 500, 'easeOutExpo', function(){
				imgs_wrap.css({'left':-img_size});
				img.eq(img_flag).css({'display':'none'});
				img.eq(next_flag).css({'left':img_size});
				img_flag = next_flag;
				img_boolean = true;
			});
		}

		var Prev = function(prev_flag){
			if (!img_boolean){return;}
			img_boolean = false;

			img.eq(img_flag).css({'display':'block','left':img_size});
			img.eq(prev_flag).css({'display':'block','left':0});
			nav_ac(prev_flag);

			imgs_wrap.stop().animate({'left':0}, 500, 'easeOutExpo', function(){
				imgs_wrap.css({'left':-img_size});
				img.eq(img_flag).css({'display':'none'});
				img.eq(prev_flag).css({'left':img_size});
				img_flag = prev_flag;
				img_boolean = true;
			});
		}

		var Start = function(){
			set_interval = setInterval(function(){
				if(img_flag < max - 1){
					Next(img_flag + 1);
				}else{
					Next(0);
				}
			}, 4000);//5초 자동롤링
		}

		var Stop = function(){
			clearInterval(set_interval);
		}

		//Auto Start
		if(max > 1)
			Start();
		else
			Stop();

		//MouseHover
		area.mouseover(function(){Stop();});
		area.mouseleave(function(){
			if(max > 1)
				Start();
		});

		//ArrowButton AC
		
		//Navigation AC
		nav.mouseover(function(){
			if(this.num == img_flag){return;}
			else if(this.num > img_flag){Next(this.num);}
			else{Prev(this.num);}
		});
	},

	Slide2: function(){
		var area		= $('#wow_prem'),
			imgs_wrap	= area.find('.imgs'),
			img			= imgs_wrap.children(),
			img_size	= img.width(),
			max			= img.length,
			img_flag	= 0,
			img_boolean = true,
			navi		= area.find('.navi'),
			set_interval = null;
		for(i=0;i<max;i++){navi.prepend('<a href="#self"></a>');}
		var nav			= navi.children();
		nav.each(function(i){this.num = i});

		//Default
		nav.eq(0).addClass('on');

		function nav_ac(nav_num){
			nav.removeClass('on');
			nav.eq(nav_num).addClass('on');
		};

		var Next = function(next_flag){
			if (!img_boolean){return;}
			img_boolean = false;

			img.eq(img_flag).css({'display':'block','left':img_size});
			img.eq(next_flag).css({'display':'block','left':img_size*2});
			nav_ac(next_flag);

			imgs_wrap.stop().animate({'left':-(img_size * 2)}, 500, 'easeOutExpo', function(){
				imgs_wrap.css({'left':-img_size});
				img.eq(img_flag).css({'display':'none'});
				img.eq(next_flag).css({'left':img_size});
				img_flag = next_flag;
				img_boolean = true;
			});
		}

		var Prev = function(prev_flag){
			if (!img_boolean){return;}
			img_boolean = false;

			img.eq(img_flag).css({'display':'block','left':img_size});
			img.eq(prev_flag).css({'display':'block','left':0});
			nav_ac(prev_flag);

			imgs_wrap.stop().animate({'left':0}, 500, 'easeOutExpo', function(){
				imgs_wrap.css({'left':-img_size});
				img.eq(img_flag).css({'display':'none'});
				img.eq(prev_flag).css({'left':img_size});
				img_flag = prev_flag;
				img_boolean = true;
			});
		}

		var Start = function(){
			set_interval = setInterval(function(){
				if(img_flag < max - 1){
					Next(img_flag + 1);
				}else{
					Next(0);
				}
			}, 4000);//5초 자동롤링
		}

		var Stop = function(){
			clearInterval(set_interval);
		}

		//Auto Start
		if(max > 1)
			Start();
		else
			Stop();

		//MouseHover
		area.mouseover(function(){Stop();});
		area.mouseleave(function(){
			if(max > 1)
				Start();
		});

		//ArrowButton AC
		
		//Navigation AC
		nav.mouseover(function(){
			if(this.num == img_flag){return;}
			else if(this.num > img_flag){Next(this.num);}
			else{Prev(this.num);}
		});
	}
}

$(document).ready(function(){
	UI.Load();
});