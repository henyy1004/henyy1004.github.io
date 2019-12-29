$(function () {
	alert(11);
	$('input[placeholder], textarea[placeholder]').placeholder();
	
	$('.main_title_ani').each(function () { 
		var $this = $(this),
				$indexTime = $this.index();
		setTimeout(function () { 
			$this.addClass('on')
		}, $indexTime * 300);
	});
});

$(document).ready(function () { 
	alert(11);
});