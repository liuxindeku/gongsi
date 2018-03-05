mui.plusReady(function() {
	plusReady();
	mui.post(weburl + 'account/resetJzh', {
		user_id: user_id
	}, function(data) {
		if(data.code == 1) {
			$("#form2").attr('action', data.url);
			$("#form2").html(data.msg);
			$("#form2").submit();
		} else {
			mui.alert(data.msg, '', function() {
				closeme();
			});
		}
	})
})