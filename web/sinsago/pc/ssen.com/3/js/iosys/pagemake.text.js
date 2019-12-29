var IosText = {
	TESTINFO : {},
    QUIZINFO : new Array()
};
/**
 * 초기화
 */
IosText.init = function(){
	IosLogger.console("IosText.init()", "Call");
	var _totassignpoints = 0;
	var _assignpoints = Number($(this).find("input[name=assignpoints]").val());
	var _quizcode = $(this).find("input[name=quizcode]").val();
	var _obj = $(this);
	$.each(IosText.QUIZINFO, function(){ 
		if(_quizcode == this.quizcode){
			var level = 0;
			switch(this.hard2){
    			case "05" : level = 3; break;
    			case "15" : level = 2; break;
    			case "25" : level = 1; break;
    			default : level = 0; break;
			}
			$(_obj).find("div.level a").each(function(idx){if(idx<level){$(this).addClass("press");}});
		} 
	});
	$("input[name=assignpoints]").each(function(){ 
		if(parent.IosPageMake.TESTINFO.autoassign == "1"){
			$(this).addClass("ioshide");
			$(this).parent().find("span").text(this.value);
		}else{
			$(this).removeClass("ioshide");
			$(this).parent().find("span").text("");
		}
		_totassignpoints += Number(this.value); 
	});
	if(!isNaN(_assignpoints)){
		//IosLogger.debug(_quizcode, _assignpoints);
		try{ parent.IosPageMake.setBejum(_quizcode, _assignpoints); }catch(e){}
	}
	$("#totassignpoints").val(_totassignpoints);
};
/**
 * 배점 수정
 */ 
IosText.editAssignpoints = function(){
	IosLogger.console("IosText.editAssignpoints()", "Call");
	var totassignpoints = 0;
	var quizcode = $(this).parent().find("input[name=quizcode]").val();
	var assignpoints = Number(this.value);
	if(isNaN(assignpoints)){ this.value = 0; assignpoints = 0; }
    $("input[name=assignpoints]").each(function(){ totassignpoints += Number(this.value); });
    $("#totassignpoints").val(totassignpoints);
    try{ parent.IosPageMake.setBejum(quizcode, assignpoints); }catch(e){alert(e);}
};
/**
 * 배점옵션(자동/수동)
 */ 
IosText.autoAssign = function(){
	IosLogger.console("IosText.autoAssign()", "Call", this.value);
	parent.IosPageMake.TESTINFO.autoassign = this.value;
	if(this.value == "1"){
		parent.IosPageMake.sync();
		//$("input[name=assignpoints]").each(function(){ $(this).addClass("ioshide"); $(this).parent().find("span").text(this.value);  });
	}else{
		$("input[name=assignpoints]").each(function(){ $(this).removeClass("ioshide"); $(this).parent().find("span").text("");});
	}
};

/**
 * 문항선택
 */
IosText.selectQuiz = function(){
	IosLogger.console("IosText.selectQuiz()", "Call");
	var _quizcode = $(this).parent("tr").find("input[name=quizcode]").val();
	
	$(this).parents("tbody").find("tr").removeClass("on");
	$(this).parents("tbody").find("td").removeClass("on");
	
	$(this).parent().addClass("on");
	$(this).parent().find("td").addClass("on");
	// 미리보기에서 해당문항 선택
	try{ parent.IosPageMake.showQuiz(_quizcode); }catch(e){}
};

/**
 * 문항 다중선택
 */
IosText.selectMultiQuiz = function(){
	IosLogger.console("IosText.selectMultiQuiz()", "Call");
	var _quizcode = $(this).find("input[name=quizcode]").val();
	if($(this).hasClass("on")){
		$(this).parent().removeClass("on");
		$(this).parent().find("td").removeClass("on");
	}else{
		$(this).parent().addClass("on");
		$(this).parent().find("td").addClass("on");
	}
}


/**
 * 문항추가 :: 분류별 문항검색
 */
IosText.addClass = function(){
	IosLogger.console("IosText.addClass()", "Call");
	var form = document.getElementById("fmTextList");
    document.getElementById("method").value = "search";
    form.target = "_self";
    form.action = "./text_add_class.jsp";
    form.submit();
};
/**
 * 문항추가 :: 동일 유형 문항 검색
 */
IosText.addSame = function() {
	IosLogger.console("IosText.addSame()", "Call");
	var _classa = "";
    var _quizcode = parent.IosPageMake.getQuizCode();
    var q = "";
	$("div.brd_lst tbody tr").each(function(){
		if($(this).hasClass("on")){
			if(q.length > 0){q += ","}
			q +=$(this).find("input[name=quizcode]").val();
		}
	});
	if(q == ""){
		alert("동일 단원문항 검색기준 문항을 선택하세요.");
		return;
	}
	if(q.length > 32){
		alert("동일 단원문항 검색기준 문항 한개만 선택해주세요.");
		return;
	}
    
    $.each(IosText.QUIZINFO, function(){ if(this.quizcode == q){_classa=this.classa} });
    $("#method").val("search");
    $("#classa").val(_classa);
    $("#quizcode").val(_quizcode);
    $("#fmTextList").attr("target", "_self");
    $("#fmTextList").attr("action", "./text_add_same.jsp");
    $("#fmTextList").submit();
};
/**
 * 문항추가 :: 내문항보관함 검색
 */
IosText.addBasket = function(){
	IosLogger.console("IosText.addBasket()", "Call");
	var form = document.getElementById("fmTextList");
    document.getElementById("method").value = "search";
    form.target = "_self";
    form.action = "./text_add_myquiz.jsp";
    form.submit();
};
/**
 * 문항추가 :: 내가만든  시험지문항검색
 */
IosText.addTest = function(){
	IosLogger.console("IosText.addTest()", "Call");
	var form = document.getElementById("fmTextList");
    document.getElementById("method").value = "search";
    form.target = "_self";
    form.action = "./text_add_test.jsp";
    form.submit();
};
/**
 * 선택 문항삭제
 */
IosText.removeQuiz = function(){
	IosLogger.console("IosText.removeQuiz()", "Call");
	var q = "";
	$("div.brd_lst tbody tr").each(function(){
		if($(this).hasClass("on")){
			if(q.length > 0){q += ","}
			q +=$(this).find("input[name=quizcode]").val();
		}
	});
	if(q == ""){
		alert("삭제할 문항을 선택해주세요.");
		return;
	}
	parent.IosPageMake.removeQuiz(q);
};
/**
 * 선택 문항교체
 */
IosText.changeQuiz = function(){
	IosLogger.console("IosText.changeQuiz()", "Call");
	var q = "";
	$("div.brd_lst tbody tr").each(function(){
		if($(this).hasClass("on")){
			if(q.length > 0){q += ","}
			q +=$(this).find("input[name=quizcode]").val();
		}
	});
	if(q == ""){
		alert("교체할 문항을 선택해주세요.");
		return;
	}
	if(q.length > 32){
		alert("교체할 문항 한개만 선택해주세요.");
		return;
	}
	
	parent.IosPageMake.changeQuiz(q);
};

var IosTextAddSame = {};
/**
 * 비슷한 문항검색
 */
IosTextAddSame.search = function(){
	IosLogger.console("IosTextAddSame.search()", "Call");
	$("input[name=method]").val("searchList");
    $.ajax({
        async: true,
        type: "POST",
        url : "./text_add_same_list.jsp",
        data : $("#fmTextList").serialize(),
        dataType : "html",
        success:function(data, textStatus){
        	$("#divPaging").html(data);
        },
        error:function(data, textStatus, errCode){
            alert("ERROR : " + errCode);
        }
    });
};

var IosTextAddMyQuiz = {};
/**
 * 내문항보관함 검색
 */
IosTextAddMyQuiz.search = function(){
	IosLogger.console("IosTextAddMyQuiz.search()", "Call");
	$("input[name=method]").val("searchList");
    $.ajax({
        async: true,
        type: "POST",
        url : "./text_add_myquiz_list.jsp",
        data : $("#fmTextList").serialize(),
        dataType : "html",
        success:function(data, textStatus){
            $("#divPaging").html(data);
        },
        error:function(data, textStatus, errCode){
            alert("ERROR : " + errCode);
        }
    });
};

var IosTextAddTest = {};
/**
 *  시험지 검색
 */
IosTextAddTest.search = function(_testcode){
	IosLogger.console("IosTextAddTest.search()", "Call");
	$("input[name=method]").val("searchList");
	$("input[name=testcode]").val(_testcode);
    $.ajax({
        async: true,
        type: "POST",
        url : "./text_add_test_list.jsp",
        data : $("#fmTextList").serialize(),
        dataType : "html",
        success:function(data, textStatus){
            $("div.paginate").html(data);
        },
        error:function(data, textStatus, errCode){
            alert("ERROR : " + errCode);
        }
    });
};


var IosTextChange = {};
IosTextChange.search = function(){
	IosLogger.console("IosTextChange.search()", "Call");
	$("input[name=method]").val("searchList");
    $.ajax({
        async: true,
        type: "POST",
        url : "./text_change_list.jsp",
        data : $("#fmTextList").serialize(),
        dataType : "html",
        success:function(data, textStatus){
            $("#divPaging").html(data);
        },
        error:function(data, textStatus, errCode){
            alert("ERROR : " + errCode);
        }
    });
};

