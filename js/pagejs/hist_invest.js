

function hist_invest(){
	var xmid=plus.storage.getItem('xmid');
	mui.post(weburl + 'project/getTenderList', {nid:xmid}, function(data) {
		if(data){
			new Vue({
				el:"#hist_tz",
				data:{
					invs:data
				}
			})
		}
	})
}
