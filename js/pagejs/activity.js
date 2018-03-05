
//mui.plusReady(function() {
//	plusReady();
//	mui.post(weburl + 'index/getBanner', {typename:"app"}, function(data) {
//		if(data.code=='1'){
//			
//		}
//	})	
//})

	mui.plusReady(function() {
	plusReady();
	if(!user_id ||plus.storage.getItem('load')!='1' ){
		
		och("page/load_zc.html","登录/注册",1);
	} else {
		mui.post( weburl+'articles/getList',{type_id:56}, function(data) {
			new Vue({
				el:"#about_pages",
				data:{
					lists:data	
				}
			})
			$("#loading").hide(); 
		})
	}
	if(plus.storage.getItem('load') == '1') {
		
	} else {
		$(".newsboxa").hide()
		$(".newsboxb").show()
	}
	mui("body").on("tap", ".lo_out", function() {
		load_out();
		mui.toast('账号退出', {
			duration: '1000',
			type: 'div'
		});
		account("index_local.html", "我的账户")
	})
	
	
	mui("body").on("tap",".my_news_bnt",function(){
		mui.post(weburl+'message/updateStatus',{user_id:user_id},function(data){
			if(data.code==1){
				console.log(data.msg)
				$(".my_news_bnt h4 span").text("0")
			}else{
				console.log(data.msg)
			}
		})
		
	})
	
})
mui("body").on("tap", ".index_list", function() {
	var bu = $(this).attr("rag");
	och('page/new.html', '活动详情', bu);
})

