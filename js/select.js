$(document).ready(function(){
	$(".li_se").hide().eq(0).show();
	mui(".top_nav").on("tap","li",function(){
		var in_num=$(this).index();
		$(".top_nav li").removeClass("top_select");
		$(this).addClass("top_select");
		$(".li_se").hide().eq(in_num).show();
	})
})
