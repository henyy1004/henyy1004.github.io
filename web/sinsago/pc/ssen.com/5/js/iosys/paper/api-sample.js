var rootUrl = "http://ssenlc.sinsago.co.kr:9000/sinsago-api-server/product/";
var saveUrl = "http://ssenlc.sinsago.co.kr:9000/sinsago-api-server/commons/paper/save.elgx";

var target = "_fileDownFrm";

var result = "";

var iosysApi = (function () {

    var commsvc = {};

    commsvc.postCall = function (url, paramObj, target) {

        var target = target || "_self";
        var _tmpform = this.createForm("dataform", url, "post", target);
        var fromObj = paramObj;
        _tmpform = this.Obj2Input(_tmpform, fromObj);
        document.body.appendChild(_tmpform);
        _tmpform.submit();
        document.body.removeChild(_tmpform);
    };

    commsvc.createForm = function (name, action, method, target) {

        var form = document.createElement("form");
        form.name = name;
        form.action = action;
        form.method = method;
        form.target = target;

        return form;
    };

    commsvc.Obj2Input = function (form, obj) {

        for (var name in obj) {

            var item = name;
            var val = "";
            if (obj[name] instanceof Object) {
                val = JSON.stringify(obj[name]);
            } else {
                val = obj[name];
            }
            form = this.insertInput(form, item, val);
        }
        return form;
    };

    commsvc.insertInput = function (form, name, value) {

        var input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;

        form.insertBefore(input, null);

        return form;
    };

    commsvc.String2Object = function (str) {

        if (str != "" && str != undefined) {

            str = str.replace(/(^\s*)|(\s*$)/g, "");
            var chk = str.substring(0, 1);
            if (chk != "{" && chk != "[")
                str = "{" + str + "}";

            return eval("ReturnString2Object=" + str);

        } else {

            return null;
        }
    };


    /**
    * 시험지 셋저장 및 대조기 실행
    * 
    * 입력값
    * --------------------
    * cid 	: run(고정)
    * cname 	: new(고정)
    * title 	: 1(고정)
    * tlfcode 	: 로그인 아이디
    * 
    * 반환값
    * ---------------------
    * 코드참조
    **/
    commsvc.save = function (runurl, params, userid, target) {
        $.support.cors = true;

        $.ajax({
            async: false,
            type: "POST",
            contentType: 'application/json',
            url: saveUrl,
            data: JSON.stringify(params),
            dataType: "json",
            success: function (data, textStatus) {

                if (data.result == "success") {

                    // 시험지셋 등록 성공
                    //console.log(data);

                    /**
                    * 시험지 대조기 실행
                    * 
                    * method 	: run(고정)
                    * runtype 	: create(고정)
                    * userId 	: 로그인 아이디
                    * role 	: 1(고정)
                    * testcode	: 시험지셋 등록결과 testcode 값
                    * 
                    */
                    var paramObj = { "method": "run"
			    					, "runtype": "create"
			    					, "userId": userid
			    					, "role": "1"
			    					, "testcode": data.testInfo.testcode
                    };

                    commsvc.postCall(runurl, paramObj, target);

                } else {

                    // 시험지셋 등록중 오류 발생        		
                    alert(data.message)
                }
            },
            error: function (data, textStatus, errCode) {

                // 기타 시스템 오류 발생
                alert("ERROR : " + errCode);
            }
        });
    };

    commsvc.onlysave = function (runurl, params, userid, target) {
        $.support.cors = true;

        $.ajax({
            async: false,
            type: "POST",
            contentType: 'application/json',
            url: saveUrl,
            data: JSON.stringify(params),
            dataType: "json",
            success: function (data, textStatus) {

                if (data.result == "success") {

                    // 시험지셋 등록 성공
                    //console.log(data);

                    /**
                    * 시험지 대조기 실행
                    * 
                    * method 	: run(고정)
                    * runtype 	: create(고정)
                    * userId 	: 로그인 아이디
                    * role 	: 1(고정)
                    * testcode	: 시험지셋 등록결과 testcode 값
                    * 
                    */

                    result = data.testInfo.testcode;

                } else {

                    // 시험지셋 등록중 오류 발생        		
                    alert(data.message)
                }
            },
            error: function (data, textStatus, errCode) {

                // 기타 시스템 오류 발생
                alert("ERROR : " + errCode);
            }
        });
    };

    commsvc.view = function (runurl, target, testcode) {

        /**
        * 시험지 대조기 실행
        * 
        * method 	: run(고정)
        * runtype 	: create(고정)
        * userId 	: 로그인 아이디
        * role 	: 1(고정)
        * testcode	: 시험지셋 등록결과 testcode 값
        * 
        */

        var paramObj = { "method": "run"
						, "runtype": "create"
						, "userId": "user01"
						, "role": "1"
						, "testcode": testcode

        };

        commsvc.postCall(runurl, paramObj, target);
    };

    commsvc.view2 = function (runurl, target, testcode, infoSet) {

        var quiz = infoSet.split('$');

        var paramObj = { "method": "run"
						, "runtype": "create"
						, "userId": "user01"
						, "role": "1"
						, "testcode": testcode
                        , "textfield": [{ "name": "TLF_TITLE",      "value": "  " + quiz[0].toString() },
			    					        { "name": "TLF_DATE",   "value": quiz[1].toString() },
                                            { "name": "TLF_SCHOOL", "value": quiz[2].toString() },
                                            { "name": "TLF_NAME",   "value": quiz[3].toString() },
                                            { "name": "TLF_GRADE",  "value": quiz[4].toString() },
										    { "name": "TLF_TITLE2", "value": quiz[5].toString() },
                                            { "name": "TLF_TITLE3", "value": "  " + quiz[0].toString() }]
        };

        commsvc.postCall(runurl, paramObj, target);
    };

    return commsvc;

})();


/**
 * 팀스워드 실행
 * 
 * 입력값
 * --------------------
 * method 	: run(고정)
 * mode 	: new(고정)
 * cmsId 	: 1(고정)
 * userId 	: 로그인 아이디
 * userNm 	: 로그인 사용자명
 * jsonData : [](고정)
 * 
 * 반환값
 * ---------------------
 * 없음
 **/
var fnTeamsWord = function() {
	
	var userInfo = iosysApi.String2Object($("#userInfo").val());
	var url = rootUrl + "word.do";
	var params = {"method" : "run"
				, "mode":"new"
				, "cmsId":"1"
				, "userId" : userInfo.userId
				, "userNm" : userInfo.userNm
				, "jsonData":"[]"
			};
	
	iosysApi.postCall(url, params, target);
};

/**
 * 자동 인스톨 프로그램 다운로드
 * 
 * 입력값
 * --------------------
 * 없음
 * 
 * 반환값
 * ---------------------
 * 없음
 */
var fnTeamsLoader = function() {
	
	var url = rootUrl + "loaderDownload.do";
	var params = {};
	iosysApi.postCall(url, params, target);
};


/**
 * 시험지 셋저장 및 대조기 실행
 * 
 * 입력값
 * --------------------
 * 
 * 시험지정보
 * 		cid 	: run(고정 필수)
 * 		cname 	: new(고정 필수)
 * 		title 	: 1(고정 필수)
 * 		tlfcode : 템플릿 키값(옵션 TBL_QUIZ_TLF 테이블  TLFCODE컬럼값 참조)
 * 		testcode : 시험지코드(옵션 기존시험지 업데이트시 사용)
 * 문항정보 배열
 * 		custquizno 	: 키값(필수)
 * 		assignpoint : 배점(필수)
 * 
 * 반환값
 * ---------------------
 * 없음
 * 
 * 주의 : 
 *  1. 문항배열구성시 그룹문항은 지문을 포함해서 구성해야 됨.
 *  2. 문항셋 등록시 문항번호는 배열 순서에 따름.(지문제외)
 *  3. 템플릿 키값이 입력되지 않으면 시스템에 고정된 기본 템플릿으로 시험지 대조됨.
 *  4. 등록되지 않은 템플릿 키값 설정시 시험지 대조시 오류 발생함.
 **/

var fnSaveSet = function() {
	
	var url = rootUrl + "daejo.do";		
	var userInfo = iosysApi.String2Object($("#userInfo").val());
	
	var params = {};	
    params.testInfo = {'cid' : 'user01' , 'cname' : '사용자01', 'title' : '테스트시험지', 'tlfcode': ''} ;
    params.quizs = [ {'custquizno' : 'LMM11J07001006N04B1Y012S0', 'assignpoint' : '10'} ];
	
    var testcode = "0ADEE252A9864C3197B347FDC19724EB";

    iosysApi.onlysave(url, params, userInfo.userId, target);
};

var fnModiSet = function (_testcode, _quizSet, _count, _tpc) {

    var url = rootUrl + "daejo.do";

    var params = {};
    var testcode = _testcode;

    var quiz = _quizSet.split('?');

    /* 시험지 템플릿 적용 */
    var _tlfcode = "";
    if (_tpc.substring(0, 2) == "EC") /* 전국성취도평가 */
    {
        _tlfcode = "554108C360B847EABB129F021ED87D99";
    }
    else if (_tpc.substring(0, 2) == "ED") /* 진단평가 */
    {
        _tlfcode = "B82F71AE0FF246D8BC60339CFA42A8E5";
    }
    else if (_tpc.substring(0, 2) == "ES") /* 보충시험지 */
    {
        _tlfcode = "39B582A292074D1DB0D1D39F72BE8308";
    }
    else if (_tpc.substring(0, 1) == "C") /* 단원평가 */
    {
        _tlfcode = "9B2162BA8BF74D81BCA05EC1CB4CB5E5";
    }
    else if (_tpc.substring(0, 1) == "B") /* 월교재평가 */
    {
        _tlfcode = "3B6E031750A64AFFB4BBF4EEC84F5213";
    }

    /* 신규 등록 */
    if (testcode == "X" || testcode == "") {
        params.testInfo = { 'cid': 'user01', 'cname': '사용자01', 'title': '시험지', 'tlfcode': _tlfcode };

        params.quizs = new Array(_count);
        for (var i = 0; i < _count; i++) {
            if (quiz[i].toString() != '')
                params.quizs[i] = { 'custquizno': quiz[i].toString(), 'assignpoint': '5' };
        }

        iosysApi.onlysave(url, params, 'user01', target);

        //alert(result);
        getXmlData(_tpc, result);
    }
    /* 수정 등록 */
    else {
        params.testInfo = { 'cid': 'user01', 'cname': '사용자01', 'title': '시험지', 'testcode': testcode, 'tlfcode': _tlfcode };

        params.quizs = new Array(_count);
        for (var i = 0; i < _count; i++) {
            params.quizs[i] = { 'custquizno': quiz[i].toString(), 'assignpoint': '5' };
        }

        iosysApi.onlysave(url, params, 'user01', target);

        //alert(testcode);
        getXmlData(_tpc, testcode);
    }
};

/* 보충시험지 전용 */
var fnModiSetE = function (_testcode, _quizSet, _count, _tpc) {

    var url = rootUrl + "daejo.do";
    //var userInfo = iosysApi.String2Object($("#userInfo").val());

    var params = {};
    var testcode = _testcode;

    var quiz = _quizSet.split('?');

    /* 시험지 템플릿 적용 */
    var _tlfcode = "39B582A292074D1DB0D1D39F72BE8308"; /* 보충시험지 */

    /* 신규 등록 */
    if (testcode == "X" || testcode == "") {
        params.testInfo = { 'cid': 'user01', 'cname': '사용자01', 'title': '시험지', 'tlfcode': _tlfcode };

        params.quizs = new Array(_count);
        for (var i = 0; i < _count; i++) {
            if (quiz[i].toString() != '')
                params.quizs[i] = { 'custquizno': quiz[i].toString(), 'assignpoint': '5' };
        }

        iosysApi.onlysave(url, params, 'user01', target);

        //alert(result);
        getXmlDataTEAMS(_tpc, result);
    }
    /* 수정 등록 */
    else {
        params.testInfo = { 'cid': 'user01', 'cname': '사용자01', 'title': '시험지', 'testcode': testcode, 'tlfcode': _tlfcode };

        params.quizs = new Array(_count);
        for (var i = 0; i < _count; i++) {
            params.quizs[i] = { 'custquizno': quiz[i].toString(), 'assignpoint': '5' };
        }

        iosysApi.onlysave(url, params, 'user01', target);

        //alert(testcode);
        getXmlDataTEAMSmod(result);
    }
};

/* 보충시험지(페이지메이커) 전용 */
var fnModiSetP = function (_testcode, _quizSet, _count) {

    var url = rootUrl + "daejo.do";

    var params = {};
    var testcode = _testcode;

    var quiz = _quizSet.split(',');

    /* 시험지 템플릿 적용 */
    var _tlfcode = "39B582A292074D1DB0D1D39F72BE8308"; /* 보충시험지 */

    params.testInfo = { 'cid': 'user01', 'cname': '사용자01', 'title': '시험지', 'testcode': testcode, 'tlfcode': _tlfcode };

    params.quizs = new Array(_count);
    for (var i = 0; i < _count; i++) {
        params.quizs[i] = { 'custquizno': quiz[i].toString(), 'assignpoint': '5' };
    }

    iosysApi.onlysave(url, params, 'user01', target);

    //alert(testcode);
    getXmlDataTEAMS();
};

/* 오답문제 전용 */
var fnModiSetW = function (_testcode, _quizSet, _count, _id, _txt, _qType, _subUnit, _qfc) {

    var url = rootUrl + "daejo.do";

    var params = {};
    var testcode = _testcode;

    var quiz = _quizSet.split('?');

    /* 시험지 템플릿 적용 */
    var _tlfcode = "DE228D17B4D94BEA9D739D17C2FD248D"; /* 오답문제 */

    /* 신규 등록 */
    if (testcode == "X") {
        params.testInfo = { 'cid': 'user01', 'cname': '사용자01', 'title': '시험지', 'tlfcode': _tlfcode };

        params.quizs = new Array(_count);
        for (var i = 0; i < _count; i++) {
            if (quiz[i].toString() != '')
                params.quizs[i] = { 'custquizno': quiz[i].toString(), 'assignpoint': '5' };
        }

        iosysApi.onlysave(url, params, 'user01', target);

        getXmlDataW(_id, _txt, _qType, _subUnit, _qfc, result);
    }
};

/* 보충오답문제 전용 */
var fnModiSetSW = function (_testcode, _quizSet, _count, _id, _txt, _qType, _subUnit, _qfc) {

    var url = rootUrl + "daejo.do";

    var params = {};
    var testcode = _testcode;

    var quiz = _quizSet.split('?');

    /* 시험지 템플릿 적용 */
    var _tlfcode = "39B582A292074D1DB0D1D39F72BE8308"; /* 보충시험지 */

    /* 신규 등록 */
    if (testcode == "X") {
        params.testInfo = { 'cid': 'user01', 'cname': '사용자01', 'title': '시험지', 'tlfcode': _tlfcode };

        params.quizs = new Array(_count);
        for (var i = 0; i < _count; i++) {
            if (quiz[i].toString() != '')
                params.quizs[i] = { 'custquizno': quiz[i].toString(), 'assignpoint': '5' };
        }

        iosysApi.onlysave(url, params, 'user01', target);

        getXmlDataSW(_id, _txt, _qType, _subUnit, _qfc, result);
    }
};

/* 유사문제 전용 */
var fnModiSetS = function (_testcode, _quizSet, _count, _id, _txt, _qType, _subUnit, _qfc) {

    var url = rootUrl + "daejo.do";

    var params = {};
    var testcode = _testcode;

    var quiz = _quizSet.split('?');

    /* 시험지 템플릿 적용 */
    var _tlfcode = "C136A97DA3F543128F5F47783BD32983"; /* 유사문제 */

    /* 신규 등록 */
    if (testcode == "X") {
        params.testInfo = { 'cid': 'user01', 'cname': '사용자01', 'title': '시험지', 'tlfcode': _tlfcode };

        params.quizs = new Array(_count);
        for (var i = 0; i < _count; i++) {
            if (quiz[i].toString() != '')
                params.quizs[i] = { 'custquizno': quiz[i].toString(), 'assignpoint': '5' };
        }

        iosysApi.onlysave(url, params, 'user01', target);

        getXmlDataW(_id, _txt, _qType, _subUnit, _qfc, result);
    }
};

var fnViewSet = function (_testcode, _infoSet) {

    var url = rootUrl + "daejo.do";
    //var userInfo = iosysApi.String2Object($("#userInfo").val());

    var testcode = _testcode;
    //var testcode = "0ADEE252A9864C3197B347FDC19724EB";

    if (_testcode != "N") {
        //iosysApi.view(url,  target, testcode);
        iosysApi.view2(url, target, testcode, _infoSet);
    }

};

/* 모바일 뷰어 */
var fnTeamsViewMx = function (device, testcode) {
    var mobileAppScheme = "teamstest";
    var mobileAppPackage = "kr.co.iosys.TeamsTest.Phone";
    var appstoreUrl = "market://details?id=kr.co.iosys.TeamsTest.Phone&hl=ko";
    switch (device) {
        case "Mx-ap": // 안드로이드 폰
            mobileAppPackage = "kr.co.iosys.TeamsTest.Phone";
            appstoreUrl = "market://details?id=kr.co.iosys.TeamsTest.Phone&hl=ko";
            break;
        case "Mx-at": // 안드로이드 테블릿
            mobileAppPackage = "kr.co.iosys.TeamsTest.Tablet";
            appstoreUrl = "market://details?id=kr.co.iosys.TeamsTest.Tablet&hl=ko";
            break;
        case "Mx-ip": // IOS 폰
            mobileAppPackage = "kr.co.iosys.TeamsTest.Phone";
            appstoreUrl = "";
            break;
        case "Mx-it": // IOS 테블릿
            mobileAppPackage = "kr.co.iosys.TeamsTest.Tablet";
            appstoreUrl = "";
            break;
        default:
            mobileAppUrl = "";
            appstoreUrl = "";
            break;
    }
    if (mobileAppPackage == "") {
        alert("현재 지원하지 않는 OS입니다.\n\n안드로이드, IOS 사용자라면 다른 브라우저를 사용하십시요.");
        return;
    }
    var userId = "testid01";
    var actionGubun = "EXAM";
    var repeatno = 1;
    var mobileParamsMap = {
        siteId: "BP1511-SINSAGO"
							, actionCd: "TEST"
							, userId: userId
							, group1: "0"
							, group2: "0"
							, group3: "0"
							, repeatno: repeatno
							, contcode: testcode
							, actionGubun: "EXAM"
							, examtest: "TEST"
    };

    var mobileParamsMapStr = $.param(mobileParamsMap);
    var mobileAppUrl = mobileAppScheme + "://" + mobileAppPackage;
    var url = mobileAppUrl + "?" + mobileParamsMapStr;

    if ($("#____sorilink____").length == 0) {
        $("body").append("<iframe id='____sorilink____' style='width:1px;height:1px;display:none;'></iframe>");
        $("#____sorilink____").hide();
    }

    var openAt = new Date,
	uagentLow = navigator.userAgent.toLocaleLowerCase(),
	chrome25,
	kitkatWebview;

    setTimeout(function () {
        if (new Date - openAt < 3000) {
            if (uagentLow.search("android") > -1) {
                $("#____sorilink____").attr("src", appstoreUrl);
            } else if (uagentLow.search("iphone") > -1) {
                location.replace(appstoreUrl);
            }
        } else {
            window.close();
        }
    }, 1000);

    if (uagentLow.search("android") > -1) {
        chrome25 = uagentLow.search("chrome") > -1 && navigator.appVersion.match(/Chrome\/\d+.\d+/)[0].split("/")[1] > 25;
        kitkatWebview = uagentLow.indexOf("naver") != -1 || uagentLow.indexOf("daum") != -1;

        if (chrome25 && !kitkatWebview) {
            document.location.href = "intent://" + mobileAppPackage + "?" + mobileParamsMapStr + "#Intent;scheme=" + mobileAppScheme + ";package=" + mobileAppPackage + ";end";
        } else {
            $("#____sorilink____").attr("src", url);
        }
    } else if (uagentLow.search("iphone") > -1) {
        $("#____sorilink____").attr("src", url);
    }
    return;
}