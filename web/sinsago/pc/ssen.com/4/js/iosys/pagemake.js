var IosPageMake = {
    OBJECT : null,
    SERVERINFO : {},
    USEINFO : {},
    TESTINFO : {},
    QUIZINFO : new Array(),
    TEMPLATEINFO : new Array(),
    TESTUSEDINFO : {}
};

// 
/**
 * 파라미터 셋팅
 */
IosPageMake.init = function() {
    IosLogger.console("IosPageMake.init()", "Call");
    IosPageMake.SERVERINFO = IosUtil.toObject(document.getElementById("serverInfo").value);
    IosPageMake.USEINFO = IosUtil.toObject(document.getElementById("useInfo").value);
    IosPageMake.TESTINFO = IosUtil.toObject(document.getElementById("testInfo").value);
    IosPageMake.QUIZINFO = IosUtil.toObject(document.getElementById("quizInfo").value);
    IosPageMake.TESTUSEDINFO = IosUtil.toObject(document.getElementById("testUsedInfo").value);
    if( IosPageMake.QUIZINFO.length <= 0 ){
        setTimeout("fnSearchFormOpen()", 1000);
    }
};
/**
 * 변수 로딩
 */  
IosPageMake.complete = function() {
    IosLogger.console("IosPageMake.complete()","Call");
    IosPageMake.OBJECT.IOSSetParamValue("DOWNLOADURL", IosPageMake.SERVERINFO.downloadurl);
    IosPageMake.OBJECT.IOSSetParamValue("UPLOADURL", IosPageMake.SERVERINFO.uploadurl);
    IosPageMake.OBJECT.IOSSetParamValue("DISPMODEPROGRESSDLG", 1);
    IosPageMake.OBJECT.IOSSetParamValue("DISPSHOWTOOLBAR", 0);
    IosPageMake.OBJECT.IOSSetParamValue("DISPSHOWBUTTON", 0);
    if(IosPageMake.TESTINFO.testpath != undefined && IosPageMake.TESTINFO.testpath != ""){
        // 시험지 오픈 
        IosPageMake.OBJECT.IOSOpenDocument(IosPageMake.SERVERINFO.testloadurl + "/" + IosPageMake.TESTINFO.testpath);
    }else{
        // 신규 시험지.
        IosPageMake.OBJECT.IOSNewDocument(IosPageMake.SERVERINFO.template, 0);
    }
};

/**
 * 왼쪽 로딩
 */
IosPageMake.sync = function(){
    IosLogger.console("IosPageMake.sync()", "Call");
    var _all = IosPageMake.getAllQuizCode();
    var _quizInfo = new Array();
    //IosLogger.debug("IosPageMake.sync()", _all);
    $.each(_all.split(","), function(){
        var _quizcode = this;
        $.each(IosPageMake.QUIZINFO, function(){
            if(this.quizcode == _quizcode){ _quizInfo.push(this); } 
        });
    });
    IosPageMake.QUIZINFO = _quizInfo;
    
    // 오른쪽 영역(문항 상세 내역)
    $("#method").val("get");
    $("#testInfo").val(toJSON(IosPageMake.TESTINFO));
    $("#quizInfo").val(toJSON(IosPageMake.QUIZINFO));
    $("#FrameForm").attr("target", "textArea");
    $("#FrameForm").attr("action", "./quizlist.html");
    $("#FrameForm").submit();
};

/**
 * 문항 추가
 */ 
IosPageMake.addQuiz = function(_quizObj, _target){
    IosLogger.console("IosPageMake.addQuiz()", "Call", toJSON(_quizObj), _target);

    $("#quizInfo").val(toJSON(_quizObj));
    var _quizInfo = IosUtil.toObject(document.getElementById("quizInfo").value);
    var _quizset = "";
    var _all = IosPageMake.getAllQuizCode();
    //IosLogger.debug("IosPageMake.addQuiz()", _all);
    var _q = new Array();
    $.each(IosPageMake.QUIZINFO, function(){ if(_all.indexOf(this.quizcode) > -1){ _q.push(this); } });
    // 추가할 문항메타정보 목록
    if(_quizInfo != undefined){ $.each(_quizInfo, function(){ if(_all.indexOf(this.quizcode) < 0){ _q.push(this); } }); }
    IosPageMake.QUIZINFO = _q;
    // 신규 추가문항 검색
    if(_quizInfo != undefined){ _target = IosPageMake.getQuizCode(); }
    // 신규 추가할 문항셋
    $.each(IosPageMake.QUIZINFO, function(){ if(_all.indexOf(this.quizcode) < 0){ _quizset += this.quizcode + IosUtil.CHAR(4) + this.quizpath + IosUtil.CHAR(5) ; } });
	
    try{
        //IosLogger.debug("IosPageMake.addQuiz()", _quizset, _target);
        IosPageMake.OBJECT.IOSAddQuiz(_quizset, _target, "", 1);
    }catch(e){
        IosLogger.error("문항추가시 오류가 발생하였습니다.\n" + e);
    }
};

/**
 * 문항 삭제
 */
IosPageMake.removeQuiz = function(_quizcode){
    IosLogger.console("IosPageMake.removeQuiz()", "Call", _quizcode);
    if(_quizcode ==  undefined){_quizcode = IosPageMake.getQuizCode();}
    if(_quizcode == null || _quizcode == ""){ alert("삭제할 문항을 선택하세요."); return ; }
    IosPageMake.OBJECT.IOSDeleteQuiz(_quizcode, 0);
};

/**
 * 문항교체(버튼)
 */
IosPageMake.changeQuiz = function(_quizcode){
    IosLogger.console("IosPageMake.replaceQuiz()", "Call");
    if(_quizcode ==  undefined){_quizcode = IosPageMake.getQuizCode();}
    if(_quizcode == ""){ alert("교체할 문항을 선택하세요."); return ;}
    var _param = {};
    _param.method = "search";
    _param.quizcode = _quizcode;
    _param.replaceyn = "Y";
    $.each(IosPageMake.QUIZINFO, function(){ if(this.quizcode == _param.quizcode){_param.classa=this.classa;} });
    document.getElementById("textArea").src = "./text_change.jsp?" + $.param(_param);
};

/**
 * 문항교체 (기능)
 */
IosPageMake.replaceQuiz = function(_quizObj, _target){
	IosLogger.console("IosPageMake.replaceQuiz()", "Call", toJSON(_quizObj), _target);
    $("#quizInfo").val(toJSON(_quizObj));
    var _quizInfo = IosUtil.toObject(document.getElementById("quizInfo").value);
    var _quizset = "";
    var _all = IosPageMake.getAllQuizCode();
    var _q = new Array();
    $.each(IosPageMake.QUIZINFO, function(){ if(_all.indexOf(this.quizcode) > -1){ _q.push(this); } });
    // 추가할 문항메타정보 목록
    if(_quizInfo != undefined){ $.each(_quizInfo, function(){ if(_all.indexOf(this.quizcode) < 0){ _q.push(this); } }); }
    IosPageMake.QUIZINFO = _q;
    // 신규 추가문항 검색
    if(_quizInfo != undefined){ _target = IosPageMake.getQuizCode(); }
    // 신규 추가할 문항셋
    $.each(IosPageMake.QUIZINFO, function(){ if(_all.indexOf(this.quizcode) < 0){ _quizset += this.quizcode + IosUtil.CHAR(4) + this.quizpath + IosUtil.CHAR(5) ; } });
    try{
        //IosLogger.debug("IosPageMake.replaceQuiz()", _target, _quizset);
        IosPageMake.OBJECT.IOSReplaceQuizList(_target, _quizset,  1);
    }catch(e){
    }
};

/**
 * 문항선택
 */
IosPageMake.showQuiz = function(_quizcode){
    IosLogger.console("IosPageMake.showQuiz()", "Call" , _quizcode);
    IosPageMake.OBJECT.IOSDoSelectQuizCode(_quizcode, 1, 0);
};

/**
 * 문항추천하기
 */
IosPageMake.goodQuiz = function(){
    IosLogger.console("IosPageMake.goodQuiz()", "Call");
    var _quizcode = IosPageMake.getQuizCode();
    var _userid = $("input[name=userid]").val();
    if(_quizcode ==  undefined || _quizcode == ""){ alert("추천할 문항을 선택하세요."); return ;}
    var param = {method:"add", quizcode:_quizcode, userid:_userid };
    $.ajax({
         async: false
        ,type: "post"
        ,url : "./quiz_good.jsp"
        ,data : param
        ,dataType : "json"
        ,success: function(success){
            if(success.result=="T"){ alert("추천되었습니다."); } 
            else if(success.result=="O"){ alert("이미 추천한 문항입니다."); } 
            else { alert("추천에 실패하였습니다."); }    
        }
        ,error : function(success){
            alert("추천에 실패하였습니다.");
        }
   });
};

/**
 * 문항초기화 (전체문항삭제)
 */
IosPageMake.clearQuiz = function(){
    IosLogger.console("IosPageMake.clearQuiz()", "Call");
    IosPageMake.OBJECT.IOSDoClearData(0);
};

/**
 * 확대
 */
IosPageMake.setZoomIn = function(){
    var _ratio = Number(IosPageMake.OBJECT.IOSGetZoomScale());
    IosLogger.console("IosPageMake.setZoomIn()", "Call", _ratio);
    if(_ratio < 300){
        IosPageMake.OBJECT.IOSSetZoomScale(_ratio + 10);
    }
};
/**
 * 축소
 */
IosPageMake.setZoomOut = function(){
    var _ratio = Number(IosPageMake.OBJECT.IOSGetZoomScale());
    IosLogger.console("IosPageMake.setZoomOut()", "Call", _ratio);
    if(_ratio > 30){
        IosPageMake.OBJECT.IOSSetZoomScale(_ratio - 10);
    }
};
/**
 * 단정렬 : 위로
 */
IosPageMake.setLayoutUp = function(){
    IosLogger.console("IosPageMake.setLayoutUp()", "Call");
    IosPageMake.OBJECT.IOSDoFrameArrangeQuiz(0);
};
/**
 * 단정렬 : 중앙
 */
IosPageMake.setLayoutCenter = function(){
    IosLogger.console("IosPageMake.setLayoutCenter()", "Call");
    IosPageMake.OBJECT.IOSDoFrameArrangeQuiz(1);
};
/**
 * 단정렬 : 아래로
 */
IosPageMake.setLayoutDown = function(){
    IosLogger.console("IosPageMake.setLayoutDown()", "Call");
    IosPageMake.OBJECT.IOSDoFrameArrangeQuiz(2);
};
/**
 * 문항 재정렬
 */
IosPageMake.setQuizReOrder = function(){
    IosLogger.console("IosPageMake.setQuizReOrder()", "Call");
    IosPageMake.OBJECT.IOSRebuilderTestLayout(0);
};

/**
 * 선택된 문항코드 리턴
 */
IosPageMake.getQuizCode = function(){
    IosLogger.console("IosPageMake.getQuizCode()", "Call");
    return IosPageMake.OBJECT.IOSGetLayoutData("",4);
};

/**
 * 전체 문항코드 리턴
 */
IosPageMake.getAllQuizCode = function(){
    IosLogger.console("IosPageMake.getAllQuizCode()", "Call");
    return IosPageMake.OBJECT.IOSGetLayoutData("",0);
};


/**
 * 문항 배점 추가
 */ 
IosPageMake.setBejum = function(_quizcode, _bejum){
    IosLogger.console("IosPageMake.setBejum()", "Call", _quizcode, _bejum);
    var _totassignpoints = 0;
    try{
        IosPageMake.OBJECT.IOSSetBejum(_quizcode, _bejum, 0);
        // 배점 업데이트
        $.each(IosPageMake.QUIZINFO, function(){
            if( this.assignpoints == undefined || isNaN(Number(this.assignpoints)) ){this.assignpoints = 0;}
            if(this.quizcode == _quizcode){ this.assignpoints = _bejum;}
            _totassignpoints += Number(this.assignpoints);
        });
        //IosLogger.debug("IosPageMake.setBejum()", _quizcode +" (" + _bejum + "/" + _totassignpoints + ")");
        IosPageMake.TESTINFO.totassignpoints = _totassignpoints;
    }catch(e){
        IosLogger.error("배점 업데이트시 오류가 발생하였습니다.\n" + e);
    }
};


/**
 * 템플릿 변경
 */
IosPageMake.setChangeMaster = function(_tlf){
    IosLogger.console("IosPageMake.setChangeMaster()", "Call", _tlf);
    IosPageMake.OBJECT.IOSChangeMaster(_tlf, 0);
};

/**
 * 시험지정보 지정 유효성체크
 */
IosPageMake.isValidation = function(){
	IosLogger.console("IosPageMake.isValidation()", "Call");
	if(IosPageMake.QUIZINFO == null || IosPageMake.QUIZINFO == ""){
        alert("문항을 선제 해주세요.");
        return false;
    }
    // 서술형 여부
    IosPageMake.TESTINFO.retouchyn = "0";
    $.each(IosPageMake.QUIZINFO, function(){if(this.iostype == "41" || this.iostype == "51" || this.iostype == "61"){IosPageMake.TESTINFO.retouchyn = "1";}});
    
    // 문항코드 정보
    var isCheckOrder = true;
    var isCheckAssignpoints = true;
    var noPointNum = "";
    var quizno = 0;
    var _all = IosPageMake.getAllQuizCode();
    $.each(_all.split(","), function(_idx, _quizcode){
    	IosLogger.debug(IosPageMake.QUIZINFO[_idx].quizcode);
        if(IosPageMake.QUIZINFO[_idx].quizcode != _quizcode){isCheckOrder = false;}
        if(IosPageMake.QUIZINFO[_idx].ioskind != "20" || IosPageMake.QUIZINFO[_idx].ioskind != "21"){quizno = quizno + 1;}
        if(IosPageMake.QUIZINFO[_idx].ioskind != "20" && (IosPageMake.QUIZINFO[_idx].assignpoints == "" || IosPageMake.QUIZINFO[_idx].assignpoints == 0)){
            isCheckAssignpoints = false;
            if(noPointNum.length > 0){noPointNum += ",";}
            noPointNum = noPointNum + quizno;
        }
    });
    
    if(IosPageMake.TESTINFO.quizcnt_minimum != "" && IosPageMake.TESTINFO.quizcnt_minimum != "0" && IosPageMake.TESTINFO.quizcnt_minimum > quizno){
        alert(IosPageMake.TESTINFO.quizcnt_minimum+"문항 이상으로 선제해주세요.");
        return false;
    }
    if(IosPageMake.TESTINFO.quizcnt_maximum != "" && IosPageMake.TESTINFO.quizcnt_maximum != "0" && IosPageMake.TESTINFO.quizcnt_maximum < quizno){
        alert(IosPageMake.TESTINFO.quizcnt_maximum+"문항 미만으로 선제해주세요.");
        return false;
    }
    
    if(isCheckOrder == false){
        alert("미리보기와 문항상세내역의 문항 순서 틀립니다. 문항정렬을 하세요.");
        return false;
    }
    if(isCheckAssignpoints == false){
        alert("["+ noPointNum + "]번 문항 배점을 입력하세요.");
        return false;
    }
    
    if(IosPageMake.TESTINFO.defassignpoints != IosPageMake.TESTINFO.totassignpoints){
        alert("현재 총 배점이 "+IosPageMake.TESTINFO.totassignpoints+"점입니다. \n배점을 수정해주세요. (만점:"+IosPageMake.TESTINFO.defassignpoints + "점)");
        return false;
    }  
    if(IosPageMake.TESTINFO.cid == ""){
        alert("출제자 아이디 정보가 없습니다. \n다시 로그인 해주세요. ");
        return false;
    }
    if(IosPageMake.TESTINFO.cname == ""){
        alert("출제자 이름 정보가 없습니다. \n다시 로그인 해주세요. ");
        return false;
    }
    return true;
}

/**
 * 시험지 업로드
 */ 
IosPageMake.uploadTest = function(){
    IosLogger.console("IosPageMake.uploadTest()", "Call");
    // 시험지 경로 생성
    if(IosPageMake.TESTINFO.testpath == undefined || IosPageMake.TESTINFO.testpath == ""){
        IosPageMake.TESTINFO.testpath = "testdata/"+IosPageMake.TESTINFO.testyy+"/"+IosPageMake.TESTINFO.testmm+"/"+IosPageMake.TESTINFO.testdd+"/"+IosPageMake.TESTINFO.testcode+".zip";
    }
    // 시험지 저장
    try{
        var rs = IosPageMake.OBJECT.IOSSaveDocument(IosPageMake.SERVERINFO.uploadurl, IosPageMake.TESTINFO.testpath);
        IosLogger.debug("IosPageMake.uploadTest()", IosPageMake.SERVERINFO.uploadurl);
        IosLogger.debug("IosPageMake.uploadTest()", IosPageMake.TESTINFO.testpath);
        IosLogger.debug("IosPageMake.uploadTest()", rs);
        if(rs < 0){
            alert("시험지 전송에 실패하였습니다. \n"+IosPageMake.OBJECT.IOSGetErrMsg());
        }
    }catch(e){
        alert("시험지 전송에 실패하였습니다. \n"+e);
    }
};
// EVENET
/**
 * PageMakerFx 가 로딩 완료가 되었을때 불려짐. ( 초기화....)
 */
function IOEventTeamsTestPageMake4Fx(){
    IosLogger.console("IosPageMake.IOEventTeamsTestPageMake4Fx()", "Call");
    IosPageMake.OBJECT = document.getElementById("IosPageMakeFx");
    IosPageMake.complete();
};

/**
 * 시험지 OPEN 완료 이벤트
 * @param _code
 */
function IOEventLoadCompletedTest(_code){
    IosLogger.console("IosPageMake.IOEventLoadCompletedTest()", "Call", _code);
    // 심벌경로가 있는경우 셋팅한다.
    if(IosPageMake.SERVERINFO.symbolpath != ""){
        IosPageMake.OBJECT.IOSChangeMasterSymbol("", IosPageMake.SERVERINFO.symbolpath);
    }
    // 시험지 복사일 경우 시험지코드 변경
    if($("input[name=method]").val() == "copy"){
        var _testcode = IosPageMake.OBJECT.IOSSetTestCode("");
        IosPageMake.TESTINFO.testcode = _testcode;
        IosPageMake.TESTINFO.testpath = "";
    }
    // 신규 시험지일 경우 호출 제외
    if($("input[name=method]").val() != "add"){
        IosPageMake.sync();
    }
}

/**
 * 시험지를 열었을 때 불러지는 이벤트
 * @param _code
 * @param _message
 */
function IOEventOpenDocument(_code, _message){
    IosLogger.console("IosPageMake.IOEventOpenDocument()", "Call", _code, _message);
};

/**
 * 새 시험지를 열었을 때 불러지는 이벤트
 * @param _code
 * @param _message
 */
function IOEventNewDocument(_code, _message){
    IosLogger.console("IosPageMake.IOEventNewDocument()", "Call", _code, _message);
    // 시험지코드 셋팅
    if(IosPageMake.TESTINFO.testcode == null || IosPageMake.TESTINFO.testcode == ""){
        IosPageMake.TESTINFO.testcode = IosPageMake.OBJECT.IOSGetLayoutData("", 3);
    }
    // 문항정보가 있는경우 미리추가함.
    if( IosPageMake.QUIZINFO.length > 0 ){
        IosPageMake.addQuiz(IosPageMake.QUIZINFO);
    }
};

/**
 * 시험지를 저장했을 때 불러지는 이벤트 (시험지 업로드 포함)
 * @param _code
 * @param _message
 */
function IOEventSaveDocument(_code, _message){
    IosLogger.console("IosPageMake.IOEventSaveDocumentt()", "Call", _code, _message);
    if(_code == 0){
        IosLogger.console("fnTestSubmit() : Call");
        IosLogger.debug("fnTestSubmit() : TESTINFO", toJSON(IosPageMake.TESTINFO));
        IosLogger.debug("fnTestSubmit() : QUIZINFO", toJSON(IosPageMake.QUIZINFO));
        $("input[name=method]").val("save");
        $("input[name=testgubun]").val(IosPageMake.TESTINFO.testgubun);
        $("textarea[name=testInfo]").val(toJSON(IosPageMake.TESTINFO));
        $("textarea[name=quizInfo]").val(toJSON(IosPageMake.QUIZINFO));
        $("textarea[name=testUsedInfo]").val(toJSON(IosPageMake.TESTUSEDINFO));
        $("#FrameForm").attr("target", "_self");
        $("#FrameForm").attr("action", "./test_save.jsp");
        $("#FrameForm").submit();
    }else{
        alert("시험지 저장에 실패하였습니다.");
    }
};

/**
 * 시험지 만들기에서 발생하는 에러 메시지
 * @param _code
 * @param _message
 */
function IOEventTeamsTestError(_code, _message){
    IosLogger.console("IosPageMake.IOEventTeamsTestError()", "Call", _code, _message);
    alert("오류가 발생 하였습니다\n"+msg + "["+_code+"]");
};

/**
 * 문항을 삭제나고 한 후 불러지는 이벤트
 * @param _code
 * @param _quizCodes
 */
function IOEventDeleteQuiz(_code, _message){
    IosLogger.console("IosPageMake.IOEventDeleteQuiz()", "Call", _code, _message);
    if(_code < 0){
        alert(_message);
    }else{
        IosPageMake.sync();
    }
};

/**
 * 문항을 추가했을 때 불러지는 이벤트
 * @param _code
 * @param _msg
 */
function IOEventInsertQuiz(_code, _message){
    IosLogger.console("IosPageMake.IOEventInsertQuiz()", "Call", _code, _message);
    if(_code < 0){
        alert(_message);
    }else{
        IosPageMake.sync();
    }
};

/**
 * 문항 이동시 불려짐.
 * @param _quizCode
 * @param _quizNo
 */
function IOEventMoveQuizAt(_quizCode, _quizNo){
    IosLogger.console("IosPageMake.IOEventMoveQuizAt()", "Call", _quizCode, _quizNo);
    IosPageMake.sync();
};

/**
 * 템플릿(tlf) 파일 불려 짐.
 * @param _code
 * @param _message
 */
function IOEventTemplate(_code, _message){
    IosLogger.console("IosPageMake.IOEventTemplate()", "Call", _code, _message);
    // 심벌경로가 있는경우 셋팅한다.
    if(IosPageMake.SERVERINFO.symbolpath != ""){
        IosPageMake.OBJECT.IOSChangeMasterSymbol("", IosPageMake.SERVERINFO.symbolpath);
    }
};

/**
 * 문항셋 파일 로딩시 에러가 발생했을때 불려 짐.
 * @param _code
 * @param _message
 */
function IOEventQuizSet(_code, _message){
    IosLogger.console("IosPageMake.IOEventQuizSet()", "Call", _code, _message);
    alert("문항 로딩시 오류가 발생하였습니다.\n["+_code+"] : "+_message);
};

/**
 * 문항이동 이벤트 (드레그 인 드롭) 
 * @param _code
 * @param _message
 */
function IOEventChangeQFrame(_code, _message){
    IosLogger.console("IosPageMake.IOEventChangeQFrame()", "Call", _code, _message);
    IosPageMake.sync();
};