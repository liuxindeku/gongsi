//加密标志：ENCTP    版本号：VERSION     商户代码：MCHNTCD   订单信息：FN
//测试地址：http://www-1.fuiou.com:18670/mobile_pay/h5pay/payAction.pay
//生产地址：https://mpay.fuiou.com:16128/h5pay/payAction.pay

mui.plusReady(function() {
	plusReady();

	if(!user_id || plus.storage.getItem('load') != '1') {
		och("page/load_zc.html", "登录/注册", 1);
		$(".nothb").show();
	} else if(smrz != '1') {
		$(".notha").show();
		$("#loading").hide();
	} else {
		function rech_detail() {
			//获取充值信息
			mui.post(weburl + "charge/getInfo", {
				user_id: user_id
			}, function(data) {
				if(data.code == "0") {
					alert(data.msg);
				} else {
					$(".yhbg").attr("src", data.img);
					new Vue({
						el: "#rechbox",
						data: {
							name: data.name,
							last: data.last,
							img: data.img,
							leng: data.list.length,
							lists: data.list
						}
					})
					$(".zfchice li").eq(0).find("input").attr("checked", "checked");
				}
				$("#loading").hide();
			})
		}

		rech_detail();

		mui("body").on("tap", ".radio", function() {
			var radv = $(this).find(".zf").val()
			if(radv == '48') {
				$(".wjmm").show()
			} else {
				$(".wjmm").hide()
			}
		})

		

		mui("body").on("tap", ".cz_bnt", function() {
			var pid = $(".zfchice li input:checked").val();
			if(pid == '45') {
				var money = $(".bank_tx_je").val()
				if(money % 1 != 0) {
					alert("充值金额不能为小数")
				} else {
					$(".cz_true").removeClass("cz_bnt");
					$(".cz_true").text("充值中...");
					mui.post(weburl + "charge/getCharge", {
						pid: pid,
						user_id: user_id,
						money: money
					}, function(data) {
						if(data.code == 0) {
							alert(data.msg)
						} else if(data.code == 1) {
							var fm = data.msg;
							$("#fm").val(fm)
							$("#form1").submit();
						} else if(data.code == 2) {
							$("#form2").attr('action', data.url);
							$("#form2").html(data.msg);
							$("#form2").submit();
						}
					})
				}
			} else if(pid == '48') {
				
				var business_no=$("#bflsh").val()
				var code=$(".code").val()
				if(!code){
					alert("请输入手机验证码")
				}else{
					$(".cz_true").removeClass("cz_bnt");
					$(".cz_true").text("充值中...");
					mui.post(weburl + "charge/baofuConfirmCharge", {
						code:code,
						user_id: user_id,
						business_no: business_no
					}, function(data) {
						alert(data.msg);
						$(".bank_tx_je").attr("disabled",false);
						
						
						$(".cz_true").addClass("cz_bnt");
						$(".cz_true").text("确认充值");
					})
				}
			}

		})


	}

	var rech = setInterval(function() {

		clearInterval(rech)
	}, 2000);
	//宝付验证码
	mui("body").on("tap",".yzm_bf",function(){
				var money = $(".bank_tx_je").val();
				if(money<10){
					alert("充值金额不得小于10元")
				}else if(money % 1 != 0) {
					alert("充值金额不能为小数");
				} else {		
					
					mui.post(weburl + 'charge/baofuGetcode', {
						user_id:user_id,
						money:money
					}, function(data) { 
						
						if(data.code == "1") {
							$("#bflsh").val(data.business_no);
							$(".bank_tx_je").attr("disabled","true")
							alert(data.msg)
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





})