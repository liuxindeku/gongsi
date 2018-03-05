mui.plusReady(function() {
	plusReady();
	mui.post(weburl + 'articles/getDetail', {
		id: 71
	}, function(data) {
		var data = data;
		$("#loading").hide();
		$("#xesm").show();
		$(".xiane").html(data.contents);
	})
})