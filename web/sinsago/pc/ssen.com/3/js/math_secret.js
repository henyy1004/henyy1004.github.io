$(function(){
	$(".math_movie h5 em a").each(function(idx){
	$(this).click(function(){
		$(".math_movie h5 em a").each(function(idx){
			$(this).removeClass("on","").addClass("","on");;
			$(".math_movieRollin").eq(idx).hide();
		});
		$(this).removeClass("","on").addClass("on","");
		$(".math_movieRollin").eq(idx).show();
			return false;
		});
	});
});
//best
$(function(){
	$(".besttapin a").each(function(idx){
	$(this).click(function(){
		$(".besttapin a").each(function(idx){
			$(this).find("img").attr("src",$(this).find("img").attr("src").replace("_on.gif",".gif"));
			$(".besttapcon").eq(idx).hide();
		});
		$(this).find("img").attr("src",$(this).find("img").attr("src").replace(".gif","_on.gif"));
		$(".besttapcon").eq(idx).show();
			return false;
		});
	});
});
//list
/*
$(function(){
	$(".math_detailtap a").each(function(idx){
	$(this).click(function(){
		$(".math_detailtap a").each(function(idx){
			$(this).find("img").attr("src",$(this).find("img").attr("src").replace("_on.gif","_off.gif"));
			$(".math_detailcon").eq(idx).hide();
		});
		$(this).find("img").attr("src",$(this).find("img").attr("src").replace("_off.gif","_on.gif"));
		$(".math_detailcon").eq(idx).show();
			return false;
		});
	});
});
*/

(function($) {
    $(function() {
        /*
        Carousel initialization
        */
        $('.jcarousel')
            .jcarousel({
                // Options go here
            });

        /*
         Prev control initialization
         */
        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                // Options go here
                target: '-=1'
            });

        /*
         Next control initialization
         */
        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                // Options go here
                target: '+=1'
            });

        /*
         Pagination initialization
         */
        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .jcarouselPagination({
                // Options go here
            });
    });
})(jQuery);
