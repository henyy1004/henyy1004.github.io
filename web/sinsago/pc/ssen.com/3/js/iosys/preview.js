var IosPreview = {
    OBJECT : null,
    INFO : {downloadurl:"", testdata:"", quizdata:""}
};

/* 문제 + 정답 */
IosPreview.open = function () {
    var quizset = IosPreview.INFO.testdata + IosPreview.INFO.quizdata;
    var attr = "1" + IosUtil.CHAR(4) + "8" + IosUtil.CHAR(4);
    var rtn = IosPreview.OBJECT.IOSOpenQuizSet(quizset, false, attr);
    if (rtn < 0) {
        alert(IosPreview.OBJECT.IOSGetErrMsg());
        return;
    }
};

/* 문제 + 해설 */
IosPreview.open2 = function () {
    var quizset = IosPreview.INFO.testdata + IosPreview.INFO.quizdata;
    var attr = "1" + IosUtil.CHAR(4) + "4" + IosUtil.CHAR(4);
    var rtn = IosPreview.OBJECT.IOSOpenQuizSet(quizset, false, attr);
    if (rtn < 0) {
        alert(IosPreview.OBJECT.IOSGetErrMsg());
        return;
    }
};

/* 정답 + 해설 */
IosPreview.open3 = function () {
    var quizset = IosPreview.INFO.testdata + IosPreview.INFO.quizdata;
    var attr = "4" + IosUtil.CHAR(4) + "8" + IosUtil.CHAR(4);
    var rtn = IosPreview.OBJECT.IOSOpenQuizSet(quizset, false, attr);
    if (rtn < 0) {
        alert(IosPreview.OBJECT.IOSGetErrMsg());
        return;
    }
};

/* 문제 + 정답 */
IosPreview.open4 = function () {
    var quizset = IosPreview.INFO.testdata + IosPreview.INFO.quizdata;
    var attr = "1" + IosUtil.CHAR(4) + "8" + IosUtil.CHAR(4);
    var rtn = IosPreview.OBJECT.IOSOpenQuizSet(quizset, false, attr);
    if (rtn < 0) {
        alert(IosPreview.OBJECT.IOSGetErrMsg());
        return;
    }
};

/* 문제만 */
IosPreview.viewQuiz = function(){
    var attr = "1"+IosUtil.CHAR(4);
    var rtn = IosPreview.OBJECT.IOSReloadQuiz4Attr(attr);
    if(rtn < 0){
        alert(IosPreview.OBJECT.IOSGetErrMsg());
        return;
    }
};

/* 정답만 */
IosPreview.viewAnswer = function () {
    var attr = "8" + IosUtil.CHAR(4);
    var rtn = IosPreview.OBJECT.IOSReloadQuiz4Attr(attr);
    if (rtn < 0) {
        alert(IosPreview.OBJECT.IOSGetErrMsg());
        return;
    }
};

/* 해설만 */
IosPreview.viewSolution = function () {
    var attr = "4" + IosUtil.CHAR(4);
    var rtn = IosPreview.OBJECT.IOSReloadQuiz4Attr(attr);
    if (rtn < 0) {
        alert(IosPreview.OBJECT.IOSGetErrMsg());
        return;
    }
};

// [Event] Flash 로딩 완료 이벤트
function IOEventTeamsTestQuizPreView4Fx(){
	IosLogger.console("IOEventTeamsTestQuizPreView4Fx()", "Call");
    IosPreview.OBJECT = document.getElementById("TeamsTestFx");
    IosPreview.OBJECT.IOSSetParamValue("DOWNLOADURL", IosPreview.INFO.downloadurl);
    IosPreview.OBJECT.IOSSetParamValue("DISPMODEPROGRESSDLG", "1");
    IosPreview.OBJECT.IOSSetParamValue("DISPMODEQUIZNO", "1");    //문항번호 1:표시, 0: 표시안함
    IosPreview.OBJECT.IOSSetParamValue("DISPMODEHORZ", "0");      //보기 1:가로, 0: 세로
    IosPreview.OBJECT.IOSSetParamValue("ISCHECKUSERDAP", "0");

    //alert("생성완료");
    IosPreview.open();
}

// [Event] 높이를 조절한다.
function IOEventLoadCompletedQuiz(){
    IosLogger.console("IOEventLoadCompletedQuiz()", "Call");
    // PreivewFx 높이를 조정한다.
	if(IosPreview.OBJECT.IOSGetQuizHeight() > 400){
		IosPreview.OBJECT.height = IosPreview.OBJECT.IOSGetQuizHeight();
	}
};

// [Event] 오류 이벤트 
function IOEventTeamsTestQuizPreviewError(_ncode, _msg){
    IosLogger.console("IOEventTeamsTestQuizPreviewError()", "Call");
    if(_ncode<0){ alert(_msg); return; }
};