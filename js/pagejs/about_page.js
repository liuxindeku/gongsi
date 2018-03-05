function about_page() {

	mui.post(weburl + 'discovery/getIndex', {
		user_id: user_id
	}, function(data) {
		if(data) {
			if(data.auth_status == 1) {
				plus.storage.setItem('smrz', '1');
			}
			
			new Vue({
				el: "#about_page",
				data: {
					phone: data.phone,
					auth_status: data.auth_status,
					bank_name: data.bank_name,
					total: data.total,
					noread: data.noread,
					phone_hide: data.phone_hide,
					last_number: data.last_number,
					paypwd: data.paypwd,
					avatar: data.avatar
				}
			})
		}
		$("#loading").hide();
	})
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

}