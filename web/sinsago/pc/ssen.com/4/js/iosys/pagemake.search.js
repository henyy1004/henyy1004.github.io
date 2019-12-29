var IosSearch = {
		TAB:{"tab1":true,"tab2":true,"tab3":true},
		HARD2INFO : new Array(),
		CUSTTYPEINFO : new Array()
};
IosSearch.init = function(){
	IosLogger.console("IosSearch.init()", "Start");
	IosSearch.HARD2INFO = IosUtil.toObject($("textarea[name=hard2Info]").val());
	IosSearch.CUSTTYPEINFO = IosUtil.toObject($("textarea[name=custtypeInfo]").val());
	
	IosSearch.searchDetailEtc();
	
	IosLogger.debug("IosSearch.init()", "HARD2INFO", toJSON(IosSearch.HARD2INFO));
	IosLogger.debug("IosSearch.init()", "CUSTTYPEINFO", toJSON(IosSearch.CUSTTYPEINFO));
};

/**
 * 검색/문항수체크 
 */
IosSearch.search = function(_flag){
	IosPageMake.TESTINFO.class1 = $("select[name=class1]").val();
	IosPageMake.TESTINFO.class2 = $("select[name=class2]").val();
	IosPageMake.TESTINFO.class3 = $("select[name=class3]").val();
	IosPageMake.TESTINFO.class4 = $("select[name=class4]").val();
	IosPageMake.TESTINFO.class5 = $("select[name=class5]").val();
	IosPageMake.TESTINFO.class6 = $("select[name=class6]").val();
	
	var myform = document.searchForm;
    var category = tree2.getAllSubItems('0');
    if(category == ""){
    	alert("단원을 선택해주세요.");
    	return;
    }
    if(Number($("input[name=quizcnt]").val()) > 50){
    	alert("최대 검색문항수는 50문항을 넘을수 없습니다.");
    	return;
    }
    $("span[id=category]").html("");
    $("form[name=searchForm] input[name=category]").remove();
    $(category.split(',')).each(function(){
    	var _input   = document.createElement("input");
        _input.type   = "hidden";
        _input.name   = "category";
        _input.value  = this;
        document.getElementById("category").appendChild(_input);
    });
    $("textarea[name=hard2Info]").val(toJSON(IosSearch.HARD2INFO));
    $("textarea[name=custtypeInfo]").val(toJSON(IosSearch.CUSTTYPEINFO));

    $.ajax({
        async: false,
        type: "POST",
        url : "./search_proc.jsp",
        data : $("form[name=searchForm]").serialize(),
        dataType : "json",
        success:function(data, textStatus){
        	if(data == null || data == ""){
        		alert("검색된 문항이 없습니다.\n다른 단원을 선택해주세요.");
        	}else{
	        	if(_flag){
	        		fnSearchFormApply(data);
	        	}else{
	        		var quizCnt = 0;
	        		$.each(data, function(){
	        			if(this.ioskind != "20"){quizCnt++;}
	        		});
	        		if(confirm("총"+quizCnt+"문항이 검색되었습니다.\n검색결과를 조회하시겠습니까?")){
	                    fnSearchFormApply(data);
	        		}
	        	}
        	}
        },
        error:function(data, textStatus, errCode){
            alert("ERROR : " + errCode);
        }
    });
};

/**
 * 탭선택
 */
IosSearch.tabs = function(){
    IosLogger.console("IosSearch.tabs()", "Start");
    var _tabIdx = $(this).index();
    if(_tabIdx == -1){ _tabIdx = 0 }
    $("ul.tab_top li").removeClass("on");
    if(_tabIdx == 0){
    	IosLogger.debug(_tabIdx, IosSearch.TAB.tab1);
    	$("input[name=tabName]").val("HARD2");
    	$("ul.tab_top li:eq(0)").addClass("on");
        $("#tab0").removeClass("ioshide"); $("#tab1").addClass("ioshide"); $("#tab2").addClass("ioshide");
        if(IosSearch.TAB.tab1 == true){
        	IosSearch.searchDetailHard2();
	        IosSearch.TAB.tab1 = false;
        }
    }else if(_tabIdx == 1){
    	IosLogger.debug(_tabIdx, IosSearch.TAB.tab2);
    	$("input[name=tabName]").val("CUSTTYPE");
    	$("ul.tab_top li:eq(1)").addClass("on");
        $("#tab0").addClass("ioshide"); $("#tab1").removeClass("ioshide"); $("#tab2").addClass("ioshide");
        if(IosSearch.TAB.tab2 == true){
        	IosSearch.searchDetailCustType();
	        IosSearch.TAB.tab2 = false;
        }
    }else if(_tabIdx == 2){
    	IosLogger.debug(_tabIdx, IosSearch.TAB.tab3);
    	$("input[name=tabName]").val("ETC");
    	$("ul.tab_top li:eq(2)").addClass("on");
        $("#tab0").addClass("ioshide"); $("#tab1").addClass("ioshide"); $("#tab2").removeClass("ioshide");
    }
};

/**
 * 상세검색 - 난이도
 */
IosSearch.searchDetailHard2 =function(){
	var slider1 = new dhtmlxSlider("slider1", {
        skin : "dhx_skyblue",
        min : 0,
        max : 100,
        step : 1,
        size : 280,
        value : 0,
        vertical : false
    });
    slider1.setImagePath(context+"/css/dhtmlx/slider/imgs/");
    slider1.init();
    slider1.attachEvent("onChange", function(_pos, _slider){
    	$(IosSearch.HARD2INFO).each(function(index, obj){ if(obj.key == "05"){obj.value = _slider.getValue();} });
    	chart1.parse(IosSearch.HARD2INFO,"json");
    });
    $(IosSearch.HARD2INFO).each(function(index, obj){ if(obj.key == "05"){slider1.setValue(obj.value)} });
    
    var slider2 = new dhtmlxSlider("slider2", {
    	skin : "dhx_skyblue",
        min : 0,
        max : 100,
        step : 1,
        size : 280,
        value : 0,
        vertical : false
    });
    slider2.setImagePath(context+"/css/dhtmlx/slider/imgs/");
    slider2.init();
    slider2.attachEvent("onChange", function(_pos, _slider){
    	$(IosSearch.HARD2INFO).each(function(index, obj){ if(obj.key == "15"){obj.value = _slider.getValue();} });
    	chart1.parse(IosSearch.HARD2INFO,"json");
    });
    $(IosSearch.HARD2INFO).each(function(index, obj){ if(obj.key == "15"){slider2.setValue(obj.value)} });
    
    var slider3 = new dhtmlxSlider("slider3", {
    	skin : "dhx_skyblue",
    	min : 0,
    	max : 100,
    	step : 1,
    	size : 280,
    	value : 0,
    	vertical : false
    });
    slider3.setImagePath(context+"/css/dhtmlx/slider/imgs/");
    slider3.init();
    slider3.attachEvent("onChange", function(_pos, _slider){
    	$(IosSearch.HARD2INFO).each(function(index, obj){ if(obj.key == "25"){obj.value = _slider.getValue();} });
    	chart1.parse(IosSearch.HARD2INFO,"json");
    });
    $(IosSearch.HARD2INFO).each(function(index, obj){ if(obj.key == "25"){slider3.setValue(obj.value)} });
       
    var chart1 =  new dhtmlXChart({
    	view:"pie",
    	container:"chart1",
    	value:"#value#",
    	color:"#color#",
    	labelOffset:-5,
    	label: function(_obj) {
    		var sum = chart1.sum("#value#");
    		var text = Math.round(parseFloat(_obj.value) / sum * 100) + "%";
    		return "<div class='label' style='border:1px solid " + _obj.color + "'>" + text + "</div>";
    	},
    	legend: { width: 135, align: "right", valign: "middle", template: "난이도 : #label#" },
    	shadow:0
    });
    chart1.parse(IosSearch.HARD2INFO,"json");
};
/**
 * 상세검색 - 문항유형
 */
IosSearch.searchDetailCustType =function(){
	var CUSTTYPEINFO = new Array();
	$(IosSearch.CUSTTYPEINFO).each(function(index, obj){ 
		if(obj.use == "1"){
			CUSTTYPEINFO.push(obj);
			if(obj.key == "41"){$("div.qst_level_set").find("li.low").removeClass("ioshide");}
		} 
	});
		
	var slider4 = new dhtmlxSlider("slider4", {
        skin : "dhx_skyblue",
        min : 0,
        max : 100,
        step : 1,
        size : 280,
        value : 0,
        vertical : false
    });
	slider4.setImagePath(context+"/css/dhtmlx/slider/imgs/");
	slider4.init();
	slider4.attachEvent("onChange", function(_pos, _slider){
    	IosLogger.info(_pos);
    	$(CUSTTYPEINFO).each(function(index, obj){ if(obj.key == "11"){obj.value = _slider.getValue();} });
    	chart2.parse(CUSTTYPEINFO,"json");
    });
    $(CUSTTYPEINFO).each(function(index, obj){ if(obj.key == "11"){slider4.setValue(obj.value)} });
    
    var slider5 = new dhtmlxSlider("slider5", {
    	skin : "dhx_skyblue",
        min : 0,
        max : 100,
        step : 1,
        size : 280,
        value : 0,
        vertical : false
    });
    slider5.setImagePath(context+"/css/dhtmlx/slider/imgs/");
    slider5.init();
    slider5.attachEvent("onChange", function(_pos, _slider){
    	$(CUSTTYPEINFO).each(function(index, obj){ if(obj.key == "31"){obj.value = _slider.getValue();} });
    	chart2.parse(CUSTTYPEINFO,"json");
    });
    $(CUSTTYPEINFO).each(function(index, obj){ if(obj.key == "31"){slider5.setValue(obj.value)} });
    
    var slider6 = new dhtmlxSlider("slider6", {
    	skin : "dhx_skyblue",
    	min : 0,
    	max : 100,
    	step : 1,
    	size : 280,
    	value : 0,
    	vertical : false
    });
    slider6.setImagePath(context+"/css/dhtmlx/slider/imgs/");
    slider6.init();
    slider6.attachEvent("onChange", function(_pos, _slider){
    	$(CUSTTYPEINFO).each(function(index, obj){ if(obj.key == "41"){obj.value = _slider.getValue();} });
    	chart2.parse(CUSTTYPEINFO,"json");
    });
    $(CUSTTYPEINFO).each(function(index, obj){ if(obj.key == "41"){slider6.setValue(obj.value)} });
       
    var chart2 =  new dhtmlXChart({
    	view:"pie",
    	container:"chart2",
    	value:"#value#",
    	color:"#color#",
    	labelOffset:-5,
    	label: function(_obj) {
    		var sum = chart2.sum("#value#");
    		var text = Math.round(parseFloat(_obj.value) / sum * 100) + "%";
    		return "<div class='label' style='border:1px solid " + _obj.color + "'>" + text + "</div>";
    	},
    	legend: { width: 135, align: "right", valign: "middle", template: "문항유형 : #label#" },
    	shadow:0
    });
    chart2.parse(CUSTTYPEINFO,"json");
};
/**
 * 상세검색 - 기타
 */
IosSearch.searchDetailEtc =function(){
	var param = {};
    param.method = "searchElements";
    // param.classa = $("select[name=class4]").val();
    param.classa = fnClassA($("select[name=class4]").val());
    $.ajax({
        async: true,
        type: "POST",
        url : "./search_elements.jsp",
        data : param,
        dataType : "html",
        success:function(data, textStatus){
            $("#tab2").html(data);
        },
        error:function(data, textStatus, errCode){
            alert("ERROR : " + errCode);
        }
    });
}
