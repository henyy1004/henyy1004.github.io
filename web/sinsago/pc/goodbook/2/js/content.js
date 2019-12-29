// TOP 버튼 설정
$(window).load(function() {
	var footerPosition = $("#footer").offset().top,
		footerHeight = $("#footer").innerHeight(),
		footerTop = footerPosition - footerHeight * 2;

	$(window).scroll(function() {
		var winScroll = $(window).scrollTop();

		if (winScroll > 144) {
			$(".go_top").css("opacity", "1");
			if (winScroll >= footerTop) {
				$(".go_top").css({
					position: "absolute",
					bottom: footerHeight - 80
				});
			} else {
				$(".go_top").css({
					position: "fixed",
					bottom: "20px"
				});
			}
		} else {
			$(".go_top").css("opacity", "0");
		}
	});
});

// POPUP
$(function() {
	$(".btn_book_preview").on("click", function() {
		var self = $(this),
			dataModal = self.data("modal"),
			dataScreen = self.data("screen"),
			obj = $(dataModal + "," + dataScreen);

		obj.show();
		$("body").addClass("no_scroll");
	});

	$(".btn_close").on("click", function() {
		var self = $(this),
			dataClose = self.data("close"),
			dataScreen = self.data("screen"),
			obj = $(dataClose + "," + dataScreen);

		obj.hide();
		$("body").removeClass("no_scroll");
	});

	// Top버튼 클릭
	$(".go_top").click(function(e) {
		e.preventDefault();
		$("body,html").animate({ scrollTop: 0 }, 1000);
	});
});

// url추가
function AddUrl() {
	var urlwrap = $(".url_list"),
		urllength = 1,
		urlnode =
			'<li><label class="box_share_url" for="pop_share_url' + (urllength + 1) + '"><span class="blind">스크랩 URL을 입력해주세요.</span><input type="text" class="basic_input"  id="pop_share_url' + (urllength + 1) +'"placeholder="스크랩 URL을 입력해주세요."></label></li>';

	$(".btn_url_submit").on("click", function() {
		if (urllength == 2) {
			return;
		} else {
			urlwrap.append(urlnode);
			urllength++;
		}
	});
}

// 모션
function shine() {
	setTimeout(function() {
		$(".visual2").addClass("on");
	}, 1700);
}

$(document).ready(function() {
	shine();
	AddUrl();
});
