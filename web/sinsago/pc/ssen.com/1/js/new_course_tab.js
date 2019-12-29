		
	
	$(document).ready(function(){
		//≈« ºø∑∫
		var tab_area = $('.tab_wrap'),
			tab_btn = tab_area.find('.tab_btn li a'),
			tab_btn_length = tab_area.find('.tab_btn li').length,
			tab_contents = tab_area.find('.tab_contents').children();
		
		var list_tab_area = $('.list_tab_area'),
			list_tab_btn = list_tab_area.find('.list_tab_btn li a'),
			list_txt_info = list_tab_area.find('.txt_info'),
			list_tab_contents = list_tab_area.find('.list_tab_contents').children();
	
		tab_btn.each(function(i){this.num = i});
		list_tab_btn.each(function(i){this.num = i});


		tab_btn.click(function(){
			tab_btn.parent().removeClass('on');
			$(this).parent().addClass('on');
			tab_contents.removeClass('on');
			tab_contents.eq(this.num).addClass('on');
			
			var li_len = list_tab_btn.length / tab_btn_length;

			//«œ¿ß≈«
			list_tab_btn.parent().removeClass('on');		
			list_tab_btn.parent().eq(this.num * li_len).addClass('on');
			list_txt_info.removeClass('on');
			list_txt_info.eq(this.num * li_len).addClass('on');	
			list_tab_contents.removeClass('on');
			list_tab_contents.eq(this.num * li_len).addClass('on');		
		});
		
		list_tab_btn.click(function(){
			//category_tab
			list_tab_btn.parent().removeClass('on');
			$(this).parent().addClass('on');
			//category_txt_info
			list_txt_info.removeClass('on');
			list_txt_info.eq(this.num).addClass('on');	
			//category_course_list
			list_tab_contents.removeClass('on');			
			list_tab_contents.eq(this.num).addClass('on');			
		});
		
		if (tab_btn_length==4){
			tab_btn.parent().parent().addClass('length4');
		}else if (tab_btn_length==3){
			tab_btn.parent().parent().addClass('length3');
		}else if (tab_btn_length==2){
			tab_btn.parent().parent().addClass('length2');
		}else if (tab_btn_length==1){
			tab_btn.parent().parent().addClass('length1');
		}else{
			tab_btn.parent().parent().addClass('length4');
		}
	});