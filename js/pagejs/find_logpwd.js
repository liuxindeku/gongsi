function pho() {
	if(username) {
		phone = username;
		$("#phone").val(phone);
	}
}

mui("body").on("tap", ".yzm_true", function() {
	var username = $("#phone").val();
	var valicode = $('input[name="pic"]').val();
	if(valicode == '') {
		mui.toast('请输入图片验证码！');
		return false;
	}
	if(!(/^1\d{10}$/.test(username))) {
		alert("手机号码有误，请重填");
		return false;
	} else {
		$(".usn").val(username);
		mui.post(weburl + 'phone/getCode', {
			phone: username,
			type: 'find',
			valicode: valicode
		}, function(data) {
			if(data.code == "1") {
				mui.alert(data.msg);
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
				mui.alert(data.msg);
			}
		})
	}
})
//下一步//重置登录密码1
mui("body").on("tap", ".find_logpwd_next", function() {
	var phone = $("#phone").val();
	var code = $(".code").val();
	mui.post(weburl + 'account/step1', {
		phone: phone,
		code: code,
		type: 'find'
	}, function(data) {
		if(data.code == "1") {
			plus.storage.setItem('tk', data.tk);
			plus.storage.setItem('find_code', code);
			plus.storage.setItem('find_phone', phone);
			och("page/find_logpwd2.html", "登录密码", 1);
		} else {
			alert(data.msg);
		}
	})
})

//重置登录密码2
mui("body").on("tap", ".find_logpwd2", function() {

	var code = plus.storage.getItem('find_code');
	var phone = plus.storage.getItem('find_phone');
	var tk = plus.storage.getItem('tk');
	if(!code) {
		alert("验证码已过期");
	} else {
		var pwd1 = $(".pwd1").val();
		var pwd2 = $(".pwd2").val();
		if(!pwd1) {
			alert("请输入新密码");
		} else if(pwd1 === pwd2) {
			var pwd = pwd1;
			mui.post(weburl + 'account/resetPwd', {
				phone: phone,
				pwd: pwd,
				code: code,
				type: 'find',
				tk: tk
			}, function(data) {
				if(data.code == '1') {
					mui.toast("登录密码修改成功");
					load_out();
					account("index_local.html", "我的账户");
				} else {
					alert(data.msg);
				}
			})

		} else {
			alert("两次输入的密码不一致")
		}
	}

})

//重置交易密码
mui("body").on("tap", ".find_buspwd_next", function() {

	var phone = $("#phone").val();
	var code = $(".code").val();
	mui.post(weburl + 'account/step1', {
		phone: phone,
		code: code,
		type: 'find'
	}, function(data) {
		if(data.code == "1") {
			plus.storage.setItem('tk', data.tk);
			plus.storage.setItem('find_code', code)
			plus.storage.setItem('find_phone', phone);

			och("page/find_buspwd2.html", "交易密码", 1);
		} else {
			alert(data.msg);
		}
	})
})

mui("body").on("tap", ".find_buspwd2", function() {
	var code = plus.storage.getItem('find_code');
	var phone = plus.storage.getItem('find_phone');
	var tk = plus.storage.getItem('tk');
	if(!code) {
		alert("验证码已过期");
	} else {
		var pwd1 = $(".pwd1").val();
		var pwd2 = $(".pwd2").val();
		if(!pwd1) {
			alert("请输入新密码");
		} else if(pwd1 === pwd2) {
			var pwd = pwd1;
			mui.post(weburl + 'account/resetPaypwd', {
				phone: phone,
				pwd: pwd,
				code: code,
				type: 'find',
				tk: tk
			}, function(data) {
				if(data.code == '1') {
					mui.toast("交易密码修改成功");
					account("index_local.html", "我的账户");
				} else {
					alert(data.msg);
				}
			})
		} else {

			alert("两次输入的密码不一致")
		}
	}
})