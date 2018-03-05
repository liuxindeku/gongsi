function set_buspwd() {
	mui("body").on("tap", ".yzm_ture", function() {
		if(!(/^1\d{10}$/.test(username))) {
			alert("手机号码有误，请重填");
			return false;
		} else {
			$(".usn").val(username);
			mui.post(weburl + 'reg/getCode', {
				phone: username,
				type: auth
			}, function(data) {
				if(data.code == "1") {
					alert(data.msg);
					//60s后重新获取验证码
					var wait = 60;
					var timeID = setInterval(function() {
						$('.yzm_true').html("等待" + wait + "秒 ");
						$('.yzm_true').addClass("yzm_no");
						wait = wait - 1;
						if(wait == -1) {
							clearInterval(timeID);
							$('.yzm_true').html(" 免费获取 ");
							$('.yzm_true').removeClass("yzm_no");
						}
					}, 1000);
				} else {
					alert(data.msg);
				}
			})
		}
	})

	mui("body").on("tap", ".cz_true", function() {
		var pwd = $("#pwd").val();
		var cpwd = $("#cpwd").val();
		var code = $("#code").val();
		mui.post(weburl + 'account/paypwd', {
			user_id: user_id,
			pwd: pwd,
			cpwd: cpwd,
			code: code
		}, function(data) {
			if(data.code == '1') {
				$(".cgzh_go").show();
			} else {
				alert(data.msg);
			}
		})
	})

	$(".yzm").attr("src", weburl + "imgcode");
	mui("body").on("tap", ".yzm", function() {
		$(".yzm").attr("src", weburl + "imgcode");
	})

}