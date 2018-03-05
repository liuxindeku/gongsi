//文章列表
function list(){
	mui.post( weburl+'articles/getList',{type_id:11}, function(data) {
		new Vue({
			el:"#list",
			data:{
				lists:data	
			}
		}) 
	})
}

//文章详情 
function detail(){
	artid=plus.storage.getItem('cid');
	
	mui.post( weburl+'articles/getDetail',{id:artid}, function(data) {
		if(data){
			new Vue({
				el:"#art_detail",
				data:{
					publish:data.publish,
					name:data.name,
					contents:data.contents
				} 
			})
			
		}
	})
}


//点击跳转
mui("body").on("tap",".c_list",function(){
	var skurl = $(this).attr("skurl");
	var skid = $(this).attr("skid");
	var skname = $(this).attr("skname");
	och(skurl,skname,skid);
})


//消息中心

function news(){
	mui.post( weburl+'discovery/getMessage',{user_id:user_id,page:1,epage:20}, function(data){
		if(data){
			new Vue({
				el:"#news",
				data:{
					lists:data
				}
			})
		}else{
		    $(".noth").show()
		}
		$("#loading").hide();
	})	
	
}




























