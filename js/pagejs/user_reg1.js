function user_reg1() {
	mui("body").on("tap", ".yzm_true", function() {
		var username = $(".username").val();
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

			mui.post(weburl + 'reg/getCode', {
				phone: username,valicode: valicode
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

	mui("body").on("tap", ".reg_next", function() {
		if($(".zcxy").attr("checked") != "checked") {
			alert("请同意注册协议");
		} else if($(".username").val() != $(".usn").val() || $(".username").val() == "") {
			alert("手机号码错误");
		} else {
			var usn = $(".usn").val();
			var check = $(".check").val();
			mui.post(weburl + 'reg/reg', {
				phone: usn,
				code: check,
//				channel_code: 25
			}, function(data) {
				if(data.code == "1") {
					var user_id = data.user_id;
					//				$(".user_id").val(user_id);
					och("page/user_reg2.html", "注册", user_id);
				} else {
					alert(data.msg);
				}
			})
		}
	})
}
//测试
 
//$(".reg_next").click(function(){
//	$(".user_id").val("112")
//	var user_id=$(".user_id").val()
//	och("page/user_reg2.html","注册",user_id)
//})