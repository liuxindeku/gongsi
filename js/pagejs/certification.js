mui.plusReady(function() {
	plusReady();
	mui.post(weburl + 'imgcode', {}, function(data) {
		$('.yzm').attr('src', weburl + '/imgcode');

	})
	$('.yzm').click(function(){
	$(this).attr('src', weburl+'/imgcode?'+Math.random());
	})

	mui("body").on("tap", ".yzm_true", function() {
		var username = $("#phone").val();
		var valicode = $('input[name="pic"]').val();
		var realname = $("#realname").val();
		var card_id = $("#card_id").val();
		var account = $("#account").val();
		var phone = $("#phone").val();
		var code = $("#code").val();
		if(realname == "" || card_id == "" || account == "" || phone == "" || valicode == "") {
			alert("请输入完整数据！");
			return false;
		}
		if(!(/^1\d{10}$/.test(username))) {
			alert("手机号码有误，请重填");
			return false;
		} else {
			//		$(".usn").val(username);
			mui.post(weburl + 'phone/getCode', {
				phone: username,
				type: 'auth',
				user_id: user_id,
				valicode: valicode
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
							$('.yzm_true').html("免费获取 ");
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
		var realname = $("#realname").val();
		var card_id = $("#card_id").val();
		var account = $("#account").val();
		var phone = $("#phone").val();
		var code = $("#code").val();
		var valicode = $('input[name="pic"]').val();
		if(realname == "" || card_id == "" || account == "" || phone == "" || code == "" || valicode == "") {
			alert("请输入完整数据！");
			return false;
		}
		$(this).attr("disabled", true);
		mui.post(weburl + 'auth/auth', {
			user_id: user_id,
			realname: realname,
			card_id: card_id,
			account: account,
			phone: phone,
			code: code
		}, function(data) {
			if(data.code == "1") {
				mui.post(weburl + 'discovery/getIndex', {
					user_id: user_id
				}, function(data1) {
					if(data) {
						if(data1.auth_status == '1') {

							plus.storage.setItem('smrz', '1');

						}
					}
				})
				$(".cgzh_go").show();
			} else {
				alert(data.msg);

			}
			$('.cz_true').attr("disabled", false);
		})
	})

})