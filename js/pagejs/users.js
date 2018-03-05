

	
function rinitweb(){
	
	if(plus.storage.getItem('load')=='1'){
		
		$(".headbox_02").hide();
		$(".headbox_01").show();
		
		mui.post( weburl+'account/getIndex',{user_id:user_id}, function(data) {
			if(data.code == 1){
				new Vue({ 
					el:'#user',
					data:{
						username:data.username, 
						zcze:data.total,
						kyye:data.balance,
						dsje:data.wait,
						ljsy:data.profit,
						qd:data.sign,
						avatar:data.avatar
					} 
				})
			} else {
				load_out();
				account("index_local.html", "我的账户")
			}
			$("#loading").hide();
		})				
		
		
		if(plus.storage.getItem('smrz')!=1){
			$(".smrz_go").show();
		}
		
	}else{
		new Vue({ 
			el:'#user',
			data:{} 
		})
		$("#loading").hide();
		$(".user_box_a").hide()
		$(".user_box_b").show()
		
		$(".headbox_01").hide()
		$(".headbox_02").show()
//		och("page/load_zc.html","登录/注册",1);
	}
	
	
	
}


mui("body").on("tap",".signbox",function(){
	mui.post( weburl+'sign/sign',{user_id:user_id}, function(data) {
		if(data.status=="1"){
			$(".qdcg_go").show();
			$(".qdcg_go h2 span").text(data.jifen)
			$(".qdcg_go h3 span").text(data.balance)
		}
	})
})



mui("body").on("tap",".wclose",function(){
	$(".winbox").hide()
})

mui("body").on("tap","och_invite",function(){
	och('page/invite.html','邀请好友',1)
})
	mui("body").on("tap",".och_integration",function(){
	och('page/integration.html','我的积分',1)
})













