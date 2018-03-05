//提现 获取信息
function cash_de() {
	if(!user_id || plus.storage.getItem('load') != '1') {
		och("page/load_zc.html", "登录/注册", 1);
		$(".nothb").show();
	} else if(smrz != '1') {
		$(".notha").show();
	} else {
		mui.post(weburl + 'withdraw/info', {
			user_id: user_id
		}, function(data) {
			$(".yhbg").attr("src", data.img);
			$("#bank_name").text(data.bank_name);
			$("#bank_code").text(data.bank_code);
			$("#use_money").text(data.balance_cash);
			$("#free_num").text(data.free_num);
			$("#balance_frost").text(data.frost_can);
			$("#withdraw_ratio").val(data.ratio);
			$("#jzh_open").val(data.jzh_open);
			$("#cash").show();
			$("#loading").hide();
		})
	}

	$("body").on('tap', '.wenhao',
		function() {
			mui.post(weburl + 'articles/getDetail', {
				id: 70
			}, function(data) {
				var data=data;
				if($("#hhhh").is(':hidden')) {
					$("#hhhh").css({
						"display": "block"
					}).html(data.contents);
				} 
			})

		}
		

	);
	$("body").on('tap',function(){
			$("#hhhh").css({
						"display": "none"
			});
		})
}

function num(obj) {
	obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
	obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字
	obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
	obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
}

//手续费计算
$("#rc_money").bind('input propertychange', function() {

	var val = $(this).val();

	//计算手续费
	var free_num = parseFloat($('#free_num').html());
	var bcash = parseFloat($('#use_money').html());
	var bfrost = parseFloat($('#balance_frost').html());
	var total = bcash + bfrost;
	if(val > total) {
		val = total;
	}
	fee = 0.00;
	if(val > 0) {
		fee = cal_fee(val, bcash, free_num);
	}
	$('#withdraw_fee').text(fee);
})
//手续费计算方法
function cal_fee(money, bcash, num) {
	if(money > bcash) {
		var ratio = $("#withdraw_ratio").val();
		fee = Math.round((money - bcash) * ratio / 10);
		fee = fee / 100;
		if(num > 0) {
			final_fee = fee < 2 ? 2 : fee;
		} else {
			final_fee = (bcash > 0 ? 2 : 0) + (fee < 2 ? 2 : fee);
		}
	} else {
		if(num > 0) {
			final_fee = 0;
		} else {
			final_fee = 2;
		}
	}
	return final_fee;
}
//提现操作

mui("body").on("tap", ".tx_close", function() {
	$(".jymm_box").hide();
})

mui("body").on("tap", ".cz_bnt", function() {
	var money = $("#rc_money").val();
	var money = money.replace(/[^\d.]/g, "");
	var mon1 = $("#use_money").text()
	var mon2 = $("#balance_frost").text();
	var mon_all = parseFloat(mon1) + parseFloat(mon2);
	if(!money) {
		alert("请输入提现金额")
	} else if(money > mon_all) {
		alert("余额不足")
	} else {
		var jzh_open = $('#jzh_open').val();
		if(jzh_open == 1) {
			$(".cz_bnt").attr('disabled', true).text("提现中...");
			mui.post(weburl + 'withdraw/addWithdraw', {
				user_id: user_id,
				money: money
			}, function(data) {
				if(data.code == 2) {
					$("#form2").attr('action', data.url);
					$("#form2").html(data.msg);
					$("#form2").submit();
				} else {
					alert(data.msg);
					$(".cz_bnt").attr('disabled', false).text("申请提现");
				}
			})
		} else {
			$(".jymm h3 span").text(money);
			$(".jymm_box").show();
			$('#paypwd').focus();
		}
	}
})

mui("body").on("tap", ".tx_bnt", function() {
	var money = $("#rc_money").val();
	var money = money.replace(/[^\d.]/g, "");
	var paypwd = $("#paypwd").val();
	if(!money) {
		alert("请输入提现金额")
	} else if(!paypwd) {
		alert("请输入交易密码")
	} else {

		$(".tx_true").removeClass("tx_bnt");
		$(".tx_true").text("提现中...");

		mui.post(weburl + 'withdraw/addWithdraw', {
			user_id: user_id,
			money: money,
			paypwd: paypwd
		}, function(data) {
			if(data.code == '1') {
				cash_clear()
				cash_de();
				$(".jymm_box").hide();
				$(".tx_true").addClass("tx_bnt");
				$(".tx_true").text("确认");
				och("page/tx_result.html", "结果详情", money);
			} else if(data.code == 2) { 
				$("#form2").attr('action', data.url);
				$("#form2").html(data.msg);
				$("#form2").submit();
			} else {
				alert(data.msg);
				$(".tx_true").addClass("tx_bnt");
				$(".tx_true").text("确认");
			}

		})
	}

})

function cash_clear() {
	$("#rc_money").val("");
	$("#paypwd").val("");
}