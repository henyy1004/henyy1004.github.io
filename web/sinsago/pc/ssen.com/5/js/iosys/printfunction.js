String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/gi, "");
}
String.prototype.ltrim = function(){
	return this.replace(/^\s+/, "");
}
String.prototype.rtrim = function(){
	return this.replace(/\s+$/, "");
}


// 플래시가 생성완료 되었을 때, 플래시 다운로드 완료.
function IOEventTeamsPrintPaper4Fx(){
	V_TESTOBJ = document.getElementById("TeamsTestFx"); // $("#TeamsTestFx");
	var srtn = fnSetTestUserInfo();					// 사용자정보 세팅
	var npAttr = "1"+char(4);
	
	// 시험지 타입별
	if(V_TESTGUBUN == "D"){
		//IOSOpenTestSet(_url:String, _isFile:Boolean, _strTemplate:String)	
		rtn = V_TESTOBJ.IOSOpenTestSet(V_QUIZSET, V_SETTYPE, V_TEMPLATEPATH)			
	}else{
		rtn = V_TESTOBJ.IOSOpenTest(V_TESTPATH, npAttr);	
	}
	
	if(rtn < 0){
		// 에러일 경우 에러 메세지를 리턴
		alert(V_TESTOBJ.IOSGetErrMsg());
		return;
	}
}
// 시험지 시험지셋 open 완료 이후 불려지는 메소드
function IOEventLoadCompletedTest(_nMode){
	// 템플릿 사용자정보 insert
	fnTestSetting();
}
// 에러가 발생했을때 불려 짐.
function IOEventTeamsTestError(_ncode, msg){		
	// alert("에러코드:"+_ncode+"\n메세지:"+msg);		
	alert("오류가 발생 하였습니다\n"+msg);
}
// 템플릿(tlf) 파일 로딩시 에러가 발생했을때 불려 짐.
function IOEventErrorTemplate(_ncode, msg){
	// alert("에러코드:"+_ncode+"\n메세지:"+msg);				
	alert("템플릿 파일 로딩중 오류가 발생 하였습니다.\n"+msg);
}
//title 정보 관련..
function fnTestSetting(){
	// 템플릿 사용자정보 insert
	V_TESTOBJ.IOSSetUserFieldData(V_USERFIELDDATA);
	if(V_ANSWERPATH != ""){
		V_TESTOBJ.IOSSetUserAnswerFile(V_ANSWERPATH);
	}
}
function fnSetTestUserInfo(){
	V_TESTOBJ.IOSSetParamValue("DOWNLOADURL", 		    V_DOWNLOADURL);		// DOWNLOADURL		-- 문항의 첨부파일을 받을 URL ( http:// 포함. )
	V_TESTOBJ.IOSSetParamValue("DISPMODEPROGRESSDLG", 	1);				    // 프로그래스 대화상자를 보여 줄것인지 여부.  :: default (true)
	V_TESTOBJ.IOSSetParamValue("DISPSHOWTOOLBAR", 		1);
	V_TESTOBJ.IOSSetParamValue("TESTCODE", 				V_TESTCODE);
	return true;
}