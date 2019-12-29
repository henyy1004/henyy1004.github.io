$(function(){
	// os 구분
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	if (/android/i.test(userAgent)) {
		$('body').addClass('android');
	}
	
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		$('body').addClass('ios');
	}

	$('img[usemap]').rwdImageMaps();
	$('input[placeholder], textarea[placeholder]').placeholder();
});