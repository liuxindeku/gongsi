

function tender(){
	mui.post( weburl+'project/getIndex',{}, function(data) {	
		var vuea=new Vue({
			el:"#tender",
			data:{
				kts:data.list,
				yts:data.list_full
			}
			
		})
		$(".jdt_l").each(function() {
			var jwid = $(this).width();
			var jlv = $(this).attr("tag");
			var jwd = jwid * jlv / 100;
			$(this).find(".jdt_c").animate({"width": jwd}, 500);
		}) 
		$("#loading").hide(); 
	})
}
tender();

 
 //投标倒计时
setInterval(function() {
	$(".sylist_left_djs").each(function() {
		var starttime = $(this).attr("rag");
		if(starttime){  
		starttime = new Date(Date.parse(starttime.replace(/-/g, "/")));
		var nowtime = new Date();
		var time = starttime - nowtime;
		if(time>0){
			var day = parseInt(time / 1000 / 60 / 60 / 24);
			var hour = parseInt(time / 1000 / 60 / 60 % 24) + day * 24;
			var minute = parseInt(time / 1000 / 60 % 60);
			var seconds = parseInt(time / 1000 % 60);
			$(this).text(hour + "小时" + minute + "分钟" + seconds + "秒");
		}else{
			$(this).text("");
		}
		}
	})
}, 1000);  
	
	

mui("body").on("tap",".tender_li",function(){
	var bu=$(this).attr("rag");
	och('page/tender_detail.html','项目详情',bu);
})










