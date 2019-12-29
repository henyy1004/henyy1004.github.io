function rollBannerLoad() {
		
		var	btnZone				=	document.getElementById			("event_btn");
		var aTag				=	btnZone.getElementsByTagName	("a");
		var myBtns				=	btnZone.getElementsByTagName("img");
		var bannerZone			=	document.getElementById			("event_banner");
		var myList				=	bannerZone.getElementsByTagName ("li");
		var theAtag				=	bannerZone.getElementsByTagName ("a");
		var bannerList			=	bannerZone.getElementsByTagName("li");
		/***버튼에 이미지에 마우스올렸을 때 자동배너정지***/
		for(var i=0; i<theAtag.length; i++){
			theAtag[i].onfocus		= theAtag[i].onmouseover = function () {
				clearTimeout(myAuto);
			}
			theAtag[i].onmouseout	=	theAtag.onblur = function() {
				myAuto			= setTimeout(autoBanner,3000);
			}

		}

		for(var i=0; i<aTag.length; i++){
		aTag[i].onmouseover		=
		aTag[i].onfocus			= function() {
			//1.배너이미지를 전부 숨긴다. 
			for(var k=0; k<myList.length; k++){
							myList[k].style.display = "none";
			}//in for
			//var num									= this.href.split("img/banner")[1].charAt(1)-1;
			//2. 해당하는 배너 이미지만 보인다. 
			var	num										= this.children[0].alt.charAt(2)-1;
			myList[num].style.display					= "block";
			aNum	= num;		//해당하는 인덱스 자동배너로 넘겨줌 왜? 순차적으로 넘어가게 3번에 오버했다가 놓으면 다음에 자동4번
			//3. 버튼전부 비활성화 
			for(var k=0; k<myBtns.length; k++){
							myBtns[k].src	= myBtns[k].src.replace("on.gif","off.gif");
			}
			//4. 해당배너버튼만 활성화 
			this.children[0].src		=	this.children[0].src.replace("off.gif","on.gif");
			//버튼에 마우스오버, 포커스 할 경우 자동배너 정지
			clearTimeout(myAuto);
			
		}//event function 
		// 버튼에 마우스 아웃할 경우 자동배너 다시 시작. 
		aTag[i].onmouseout = aTag[i].onblur =	function() {
											myAuto = setTimeout(autoBanner,3000);
		}		
		
	}//out for

		var aNum = 0;	//자동배너 
		function autoBanner(){
			aNum++;
			if(aNum >= aTag.length) aNum = 0; 
			aTag[aNum].onmouseover();		
			console.log(aNum);
			 myAuto	= setTimeout(autoBanner,3000);
		}//autoBanner
		var myAuto	= setTimeout(autoBanner,3000);
		
	}//rollBannerLoad

