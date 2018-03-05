function invest_now() {

	if(plus.storage.getItem('load') == '1') {
		var xmid = plus.storage.getItem('cid');
		plus.storage.setItem('xmid', xmid);
		mui.post(weburl + 'project/tenderDetail', {
			nid: xmid,
			user_id: user_id
		}, function(data) {
			if(data) {
				new Vue({
					el: "#content",
					data: {
						apr: data.apr,
						name: data.name,
						nid: data.nid,
						wait: data.wait,
						balance: data.balance,
						coupon: data.coupon,
						red: data.red,
						account: data.account,
						period: data.period_day,
						type: data.type
					}
				})
				mui(".tzcz").on("tap", ".ye_bnt", function() {

					var sykt = parseInt($(".sykt").text());
					var kyye = parseInt($(".kyye").text());
					if(sykt < kyye) {
						var tzje = sykt;
					} else {
						var tzje = kyye;
					}
					if(tzje != $(".tzje").val()) {
						if($("#coupon_users_id").val()) {
							$(".hbselect").hide()
							$("#coupon_users_id").val("")
							mui.toast("请重新选择优惠券")
						}
					}
					$(".tzje").val(tzje);
					//预计收益等于投资金额乘以利率乘以期限
					var rat = $("input:hidden[name='lilvlilv']").val();
					var tzje = $('#tzje').val();
					var qx = parseInt($(".cal_qx").val());
					var sx = $("input:hidden[name='touzitype']").val();
					if(sx == 'month') {
						var money = tzje * rat * qx / 1200;
					} else if(sx == 'day') {
						var money = tzje * rat * qx / 36500;
					}
					money = money.toFixed(2);
					$('.yujishouyi_yuan').text(money);
					
				})

				mui(".cont_pad").on("tap", ".ljcz", function() {
					och("page/recharge.html", "充值", 1);
				})
				mui(".yhj_bnt").on("tap", "li", function() {
					$(".top_nav li").removeClass("top_select");
					$(".top_nav li").eq($(this).index()).addClass("top_select");
					$(".li_se").hide().eq($(this).index()).show();
				})
				$(".tzje").bind('input propertychange', function() {
					if($("#coupon_users_id").val()) {
						$(".hbselect").hide()
						$("#coupon_users_id").val("")
						mui.toast("请重新选择优惠券")
					}
				})

			} else {
				console.log("获取项目接口数据失败")
			}
			$("#loading").hide();
				//预计收益等于投资金额乘以利率乘以期限
			$('body').on('input', '#tzje', function() {
				var rat = $("input:hidden[name='lilvlilv']").val();
				var tzje = $('#tzje').val();
				var qx = parseInt($(".cal_qx").val());
				var sx = $("input:hidden[name='touzitype']").val();
				if(sx == 'month') {
					var money = tzje * rat * qx / 1200;
				} else if(sx == 'day') {
					var money = tzje * rat * qx / 36500;
				}
				money = money.toFixed(2);
				$('.yujishouyi_yuan').text(money);
			
			})
		})

		mui.post(weburl + 'project/getCouponList', {
			type: 0,
			user_id: user_id
		}, function(data) {

			if(data.code != 0) {
				new Vue({
					el: "#yhq_hb",
					data: {
						lists: data
					}
				})
			} else {
				$("#yhq_hb").hide();
			}
		})
		mui.post(weburl + 'project/getCouponList', {
			type: 1,
			user_id: user_id
		}, function(data) {
			if(data.code != 0) {
				new Vue({
					el: "#yhq_jxq",
					data: {
						lists: data
					}
				})
			} else {
				$("#yhq_jxq").hide()
			}
		})

	} else {
		och("page/load_zc.html", "登录/注册", 1);
	}

	mui(".xmbox").on("tap", "li", function() {

		var hid = $(this).attr("hid");
		var mind = parseInt($(this).attr("mind"));
		var maxd = parseInt($(this).attr("maxd"));
		if(!maxd) {
			maxd = 10000000;
		}
		var dayd = parseInt($(this).attr("dayd"));
		var mone = $("#bdje").val();
		var time = $("#timed").val();
		var tzje = parseInt($(".tzje").val());
		var kyye = $(".kyye").text();
		var sykt = parseInt($(".sykt").text());
		if(!tzje) {
			alert("请输入投资金额")
		} else if(tzje > kyye) {
			alert("余额不足，请充值");
		} else if(tzje > sykt) {
			alert("输入金额不能大于可投金额")
		} else if(tzje >= mind && tzje <= maxd && time >= dayd) {
			var hid_b = $("#coupon_users_id").val()
			if(hid_b != hid) {
				$(".hbselect").hide()
				$(this).find(".hbselect").show()
				$("#coupon_users_id").val(hid)
				alert("优惠券选择成功")
			} else {
				$(".hbselect").hide()
				$("#coupon_users_id").val("")
				mui.toast("优惠券已取消")
			}

		} else {
			//		alert(tzje+'+'+mind+'+'+maxd+'+'+dayd+'+'+time)
			mui.closePopups()
			mui.toast("此优惠券不符合使用规则", {
				duration: 'short',
				type: 'div'
			})
		}

	})

	mui(".top_nav").on("tap", "li", function() {
		$(".top_nav li").removeClass("top_select");
		$(this).addClass("top_select");
		$(".li_se").hide().eq($(this).index()).show();
	})

	mui("body").on("tap", ".och_index_xm", function() {
		account('index_xm.html', '项目');
	})

	mui("body").on("tap", ".invest_bnt", function() {

		var tzje = $(".tzje").val();
		var kyye = parseInt($(".kyye").text());

		var sykt = parseInt($(".sykt").text());
		var coupon_users_id = $("#coupon_users_id").val();

		if(!tzje || tzje == 0) {
			alert("请输入投资金额");
		} else if(tzje > kyye) {
			var btnArray = ['取消', '去充值'];
			mui.confirm("余额不足，去充值", "", btnArray, function(e) {
				if(e.index == 1) {
					och('page/recharge.html', '充值', 1);
				}
			});
		} else if(tzje % 100 != 0) {
			alert("投资金额应为100的倍数")
		} else if(tzje > sykt) {
			alert("输入金额不能大于可投金额")
		} else if(tzje > 0) {
			var borrow_nid = $("#borrow_nid").val();
			var coupon_users_id = $("#coupon_users_id").val()
			if(!coupon_users_id) {
				var coupon_users_id = "";
			}
//			var paypwd = $("#paypwd").val();

//			if(!paypwd) {
//				alert("请输入交易密码");
//			} else {
				$(".cz_true").removeClass("invest_bnt");
				$(".cz_true").text("投资中...");
				mui.post(weburl + 'project/addTender', {
					user_id: user_id,
					borrow_nid: borrow_nid,
					coupon_users_id: coupon_users_id,
					account: tzje}, function(data) {

					if(data.code == '1') {
						var xmid = plus.storage.getItem("xmid")

						$(".mui-off-canvas-backdrop").hide();
						$("#pullrefresh").hide();
						$("#offCanvasSide").hide();
						$("#tz_success").show()

						new Vue({
							el: "#tz_success",
							data: {
								tender_id: data.data.tender_id,
								name: data.data.name,
								nid: data.data.nid,
								apr: data.data.apr,
								period: data.data.period,
								money: data.data.money,
								interest: data.data.interest,
								coupon_award: data.data.coupon_award,
								coupon_name: data.data.coupon_name
							}
						})

					} else {
						alert(data.msg);
						$(".cz_true").addClass("invest_bnt");
						$(".cz_true").text("立即投资");
					}
				})

			//}//
		}

	})

}