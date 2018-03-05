function histbus(){
	mui.post(weburl + 'withdraw/log', {user_id:user_id}, function(data) {
		if(data){
			new Vue({
				el:"#hstbus",
				data:{
					cashs:data
				}
			})
		}
	})
}








