mui.plusReady(function() {
	user_id=plus.storage.getItem('user_id'); 
	
	mui.post(weburl + 'index/index', {}, function(data) {
		if(data){
			var new_bor = data.new;
			var vuea =	new Vue({
			el: '#new',
			data: { 
					borrow_nid:new_bor.borrow_nid,
					borrow_account_wait:new_bor.borrow_account_wait,
					borrow_apr: new_bor.borrow_apr, 
					tender_account_min:new_bor.tender_account_min,
					borrow_period_name:new_bor.borrow_period_name,
					begin_time:new_bor.begin_time,
					status_name:new_bor.status_name
				}
			})
			$("#loading").hide();
			$(".banlik_box").show();
			
		}
	})
})	











