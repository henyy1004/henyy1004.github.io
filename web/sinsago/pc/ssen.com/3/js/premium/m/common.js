$(document).ready(function(){ 
   body.init();
}); 
var body ={
    "init":function(){
         $('.con3').height($('.con3 img').first().height());  
        $("#buy_prem").click(this.buy);
        $("#login").click(this.login);
        tabInfo.init(); 
        step1.init();
        step2.init();
        payinfo.init();
        discount.init();
        quickmenu.init(); 
    },
    "buy" : function(){
        var step1_chk = $("input:checkbox[name='step1_chk']:checked");
	    var step1_chk_len = $("input:checkbox[name='step1_chk']:checked").length;			
	    var step2_order_val = $("input:radio[name='period']:checked").val();
	    var step2_chk_len = $("input:radio[name='period']:checked").length; 
		
		//1+1 이벤트
		//if($(step2.select).val() == "12" && $(step1.select).length == 1)
		//	alert("하나사면 하나 더! 얼리썸머 이벤트 진행중! 학년을 한 개 더 선택하세요 ^^");
		if(step1_chk_len > 0 && step1_chk_len < 3 && step2_chk_len > 0)
	    {
		    var order_course = "";  
		    $(step1.select).each(function (idx){ 
				    order_course += $(this).attr("course"+step2_order_val) + ",";					
		    }); 
		    order_course = order_course.substring(0, order_course.length-1);  
		    location.href = "/order/prem_payment.aspx?ch=" + $("#ch_val").val() + "&course_cds=" + order_course;
	    }
	    else
		    alert("선택된 상품을 다시 한 번 확인해주시기 바랍니다.");			
    },
    "login" : function(){ 
        showLoginLayer();
    },
}
var tabInfo = {
   "self" : ".prtab",
   "init" : function(){ 
        $(tabInfo.self).find('a').click(function(i){this.i=i}).click(function(){ 
	      var idx = $(this).index();
	      $(this).parent().parent().find('.hiddenarea').removeClass('on');
	      $(this).parent().parent().find('.prtab a').removeClass('on');
	      $(this).addClass('on');
	      $(this).parent().parent().find('.hiddenarea:eq('+idx+')').addClass('on');
	      return false;
      });  
       $(tabInfo.self).find('a').mouseover(function(i){this.i=i}).mouseover(function(){ 
          var idx = $(this).index();
          $('.pr_tab' + (idx+1)).click();
      });  
      $('#con2').mouseover(function(){
         tabInfo.stop();
      });
      $('#con2').mouseout(function(){
         tabInfo.start();
      });
      tabInfo.start();
   },   
   "start" : function(){
         tabInfo.tabVar = setInterval(function(){ 
                    var i = 1;
                    $('.prtab a').each(function(){  
                          if($(this).hasClass('on'))
                          {   
                               var idx;
                               if(i == 3)
                               {
                                  idx = 1;
                               }
                               else
                               {
                                  idx = i+1;
                               } 
                               $('.pr_tab' + idx).click();
                               return; 
                          }
                          i++;
                    });

              }, 3000);
   
   },
   "stop" : function(){
         clearInterval(tabInfo.tabVar);
   }, 
   "tabVar" : null,
  
}
 
var step1 = {
    "self" : '.step1', 
    "init" : function(){ 
        $('.chkbox label span').unbind('click').bind('click',function(){    
           if($(this).parent().hasClass('on'))
           {
		       $(this).parent().removeClass('on');
               $(this).find("input").prop('checked',false);
	       }
           else
           {
		       $(this).parent().addClass('on');
               $(this).find("input").prop('checked',true);
	       }  
           if($(step1.select).length == 0)
           {   
               step2.init();
               payinfo.init();
               discount.init(); 
           }
           else if($(step1.select).length > 2)
           { 
               alert("최대 2개까지 선택 가능하십니다.");
               $(this).parent().removeClass('on');
               $(this).find("input").prop('checked',false); 
           } 
           else
           {    
                $(step2.defaultText).hide();
                $(step2.rdoButtons).show(); 
                payinfo.set();
                discount.set();
           }

			//1+1 이벤트
			//if($(step2.select).val() == "12" && $(step1.select).length == 1)
			//	alert("하나사면 하나 더! 얼리썸머 이벤트 진행중! 학년을 한 개 더 선택하세요 ^^");			
        }); 
    }, 
    "select": "input:checkbox[name='step1_chk']:checked",
}

var step2 = {
    "self" : '.step2',
    "init" : function(){     
        $(this.defaultText).show();
        $(this.rdoButtons).hide();
        $(this.radio).each(function(){ 
            $(this).prop('checked',false);
             $(this).unbind('click').bind('click',function(){
	           $('.rdobox label').removeClass('on');
	           $(this).parent().parent().addClass('on'); 
               payinfo.set();
               discount.set();
             }); 
        });
        $('.rdobox label').removeClass('on');

		//1+1 이벤트
		//$('#rdoButtons label span input').bind('click',function(){ 
		//	if($(step2.select).val() == "12" && $(step1.select).length == 1)
		//		alert("하나사면 하나 더! 얼리썸머 이벤트 진행중! 학년을 한 개 더 선택하세요 ^^");
		//});
		
    },
    "rdoButtons" : "#rdoButtons",
    "radio" : "input:radio[name='period']",
    "select" : "input:radio[name='period']:checked",
    "defaultText" : "#defaultText",
}

var payinfo = {
    "self" : '.payinfo', 
    "init" : function(){
       $(this.self).html(this.text2); 
    },
    "set" : function(){ 
        $(this.self).html( this.format(this.text1,$(step1.select).length,$(step2.select).val() == null ? 0 : $(step2.select).val()));
    },
    "text1" :"<font>총 </font><em>{0}개</em><font>의 프리미엄클래스, </font><em>{1}개월</em><font>이 선택되었습니다.</font>", 
    "text2" :"선택된 상품이 없습니다.", 
    "format" : function () {
          var s = arguments[0];
          for (var i = 0; i < arguments.length - 1; i++) {       
              var reg = new RegExp("\\{" + i + "\\}", "gm");             
              s = s.replace(reg, arguments[i + 1]);
          }
          return s;
    },
}
var discount = {
    "self" : '.discount',
    "init" : function(){
        $(this.all_price).html(this.format(this.text1,0));
        $(this.discount_price).html(this.format(this.text1,0));
        $(this.total_price).html(this.format(this.text1,0,0,0)); 
    }, 
    "text1" :"{0}원", 
    "text2" :"{0}원 → <strong>{1}원({2}%할인)</strong>",  
    "all_price" : "#all_price",
    "discount_price" : "#discount_price",
    "total_price" : "#total_price",
    "set" : function(){   
               if($(step2.select).val() > 0)
               {
                   var price = eval('$(step1.select).attr("price'+ $(step2.select).val() + '")') * $(step1.select).length;  
                   var discount =  $(step1.select).length == 2 ? price - $("#price" + $(step2.select).val() ).val() : 0; 
                   var org_price =  $(step1.select).length == 2 ? $("#price" + $(step2.select).val() ).val() : eval('$(step1.select).attr("price'+ $(step2.select).val() + '")'); 
                   var disper = $("#sale_per" + $(step2.select).val() ).val();
                   var cal_price =  $(step1.select).length == 2 ? $("#price" + $(step2.select).val() ).val() : eval('$(step1.select).attr("price'+ $(step2.select).val() + '")');
                   var total_price = Math.floor(cal_price * ((100- disper)/100) * 0.001) * 1000; 
                   $(this.all_price).html(this.format(this.text1,this.addComma(price)));
                   $(this.discount_price).html("-" + this.format(this.text1,this.addComma(discount))); 
                   $(this.total_price).html(this.format(this.text2,this.addComma(org_price),this.addComma(total_price),disper)); 
               }
               else
               {
                    this.init();
               }
    },
    "format" : function () {
          var s = arguments[0];
          for (var i = 0; i < arguments.length - 1; i++) {       
              var reg = new RegExp("\\{" + i + "\\}", "gm");             
              s = s.replace(reg, arguments[i + 1]);
          }
          return s;
    },
    "addComma" : function(val) 
	{
         return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
	},
}

var quickmenu = {
    "self" : ".quickmenu",
    "init": function(){
        $('#top').unbind('click').bind('click',function(){
		    $('html, body').animate({scrollTop:0}); return false;
	    });  
	    $(window).scroll(function(){
		    quickmenu.movement();
	    });
    },
    "movement" : function (){
        var obj = $(quickmenu.self);
		var sTop = $(window).scrollTop();
		if (sTop >= 100 && sTop <= 2600){
			obj.stop().animate({'top': (sTop - 50) },1000,'easeOutExpo');
		} 
        else if(sTop > 2600){
            obj.stop().animate({'top': 2600 },1000,'easeOutExpo');
        }
        else {
			obj.stop().animate({'top':170},1000,'easeOutExpo');
		}
	},
}  

		
 

