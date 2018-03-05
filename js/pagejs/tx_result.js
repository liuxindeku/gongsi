function cash_de() {
	var money= plus.storage.getItem('cid');
	$(".result h3 span").text(money)
	if(!user_id ||plus.storage.getItem('load')!='1' ){
		och("page/load_zc.html","登录/注册",1);
		$(".nothb").show();
	}else if(smrz!='1'){
		$(".notha").show();		
	}else{
		mui.post(weburl + 'withdraw/info', {
			user_id: user_id
		}, function(data){
			$(".yhbg").attr("src",data.img);
			$(".result h2 span").text(data.bank_name);
			$(".result h2 i").text(data.bank_code);
		
			$(".tx_result").show();
			$("#loading").hide();
		})
	}
}
