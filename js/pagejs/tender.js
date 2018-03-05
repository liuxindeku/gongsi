function tender() {

	mui.post(weburl + 'project/getIndex', {}, function(data) {
		vuea = new Vue({
			el: "#tender",
			data: {
				kts: data.list,
				yts: data.list_full,
				src: "img/down.png",
				src1: "img/down.png",
				src2: "img/down.png"
			},

			updated: function() {
				for(var i = 0; i < vuea.kts.length; i++) {
					var myChart = i;
					myChart = echarts.init(document.querySelectorAll(".main")[i]);
					option = {
						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},

						series: [{
							name: '饼图二',
							type: 'pie',
							radius: ['60%', '70%'],
							label: {
								normal: {
									position: 'center'
								}
							},
							data: [{
								value: vuea.kts[i].scale,
								name: '占有率',
								label: {
									normal: {
										formatter: '{d} %',
										textStyle: {
											fontSize: 16,
											color: '#fff'
										}
									}
								}
							}, {
								value: 100 - vuea.kts[i].scale,
								name: '占位',
								label: {
									normal: {
										formatter: '\n立即投资',
										textStyle: {
											color: '#fff',
											fontSize: 12,
										}
									}
								},
								tooltip: {
									show: false
								},
								itemStyle: {
									normal: {
										color: '#fdd4d0'
									},
									emphasis: {
										color: '#fdd4d0'
									}
								},
								hoverAnimation: false
							}]
						}]
					};

					myChart.setOption(option);

				}
			}
		})

		for(var i = 0; i < vuea.kts.length; i++) {
			var myChart = i;
			myChart = echarts.init(document.querySelectorAll(".main")[i]);
			option = {
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},

				series: [{
					name: '饼图二',
					type: 'pie',
					radius: ['60%', '70%'],
					label: {
						normal: {
							position: 'center'
						}
					},
					data: [{
						value: vuea.kts[i].scale,
						name: '占有率',
						label: {
							normal: {
								formatter: '{d} %',
								textStyle: {
									fontSize: 16,
									color: '#fff'
								}
							}
						}
					}, {
						value: 100 - vuea.kts[i].scale,
						name: '占位',
						label: {
							normal: {
								formatter: '\n立即投资',
								textStyle: {
									color: '#fff',
									fontSize: 12,
								}
							}
						},
						tooltip: {
							show: false
						},
						itemStyle: {
							normal: {
								color: '#fdd4d0'
							},
							emphasis: {
								color: '#fdd4d0'
							}
						},
						hoverAnimation: false
					}]
				}]
			};

			myChart.setOption(option);

		}
		var xlis = document.querySelectorAll(".xli");
		var ylis = document.querySelectorAll(".yli");
		var on = true;
		document.getElementById("span1").addEventListener("tap", function() {
			if($(".liy").is(":visible")) {
				$(".liy").hide(500);
				on = true
			}
			if(on == true) {
				$(".lix").show(500);
				vuea.src = "img/up.png";
				on = false
			} else {
				$(".lix").hide(500);
				vuea.src = "img/down.png";
				on = true
			}
		})
		document.getElementById("span2").addEventListener("tap", function() {
			if($(".lix").is(":visible")) {
				$(".lix").hide(500);
				on = true
			}
			if(on == true) {
				$(".liy").show(500);
				vuea.src1 = "img/up.png";
				on = false
			} else {
				$(".liy").hide(500);
				vuea.src1 = "img/down.png";
				on = true
			}
		})
		mui("body").on("tap", ".xli", function() {
			vuea.src = "img/down.png";
			$(".lix").hide(500);
			on = true;
			for(var i = 0; i < xlis.length; i++) {
				xlis[i].style.color = "#555"
			}
			this.style.color = "#ff6158";
			document.getElementById("i1").innerText = this.innerText;
			document.getElementById("i1").style.color = "#ff6158";
			var interest_range = '';
			if(this.innerText == "10%以下") {
				interest_range = 1
			} else if(this.innerText == "10%-15%") {
				interest_range = 2
			} else {
				interest_range = 3
			}
			var day_range = '';
			if($('#i2').html() == "0 - 29天") {
				day_range = 1
			} else if($('#i2').html() == "30-59天") {
				day_range = 2
			} else if($('#i2').html() == "≥ 60天") {
				day_range = 3
			}
			mui.post(weburl + 'project/getIndex', {
				interest_range: interest_range,
				day_range: day_range
			}, function(data) {
				vuea.kts = data.list;

			})

		});
		mui("body").on("tap", ".yli", function() {
			vuea.src1 = "img/down.png";
			$(".liy").hide(500);
			on = true;
			for(var i = 0; i < ylis.length; i++) {
				ylis[i].style.color = "#555"
			}
			this.style.color = "#ff6158"
			document.getElementById("i2").innerText = this.innerText;
			document.getElementById("i2").style.color = "#ff6158";
			var day_range = '';
			if(this.innerText == "0 - 29天") {
				day_range = 1
			} else if(this.innerText == "30-59天") {
				day_range = 2
			} else {
				day_range = 3
			}
			var interest_range = '';
			if($('#i1').html() == "10%以下") {
				interest_range = 1
			} else if($('#i1').html() == "10%-15%") {
				interest_range = 2
			} else if($('#i1').html() == "15%以上") {
				interest_range = 3
			}
			mui.post(weburl + 'project/getIndex', {
				interest_range: interest_range,
				day_range: day_range
			}, function(data) {
				vuea.kts = data.list;
			})
		});

		$(".jdt_l").each(function() {
			var jwid = $(this).width();
			var jlv = $(this).attr("tag");
			var jwd = jwid * jlv / 100;
			$(this).find(".jdt_c").animate({
				"width": jwd
			}, 500);
		})
		$("#loading").hide();


	});

	mui.post(weburl + 'project/getFilter', {}, function(data) {
		var vuen = new Vue({
			el: "#full",
			data:{
				fullbs: data
			}
			
		})
		//收益中和已还款
		var manbiao = document.querySelectorAll(".full_miambiao");
		var ison = true;
		mui("body").on("tap", "#yimanbiao", function() {
			if(ison == true) {
				$(".full").show();
				vuen.src2 = "img/up.png";
				ison = false
			} else {
				$(".full").hide();
				vuen.src2 = "img/down.png";
				ison = true 
			}
		})

		mui("body").on("tap", ".full_miambiao", function() {
			var val = $(this).attr('value'); 
//			vuen.src2 = "img/down.png";
			$(".full").hide();
			ison = true;
			for(var i = 0; i < manbiao.length; i++) {
				manbiao[i].style.color = "#555"
			}
//			this.style.color = "#ff6158";
			document.getElementById("yimanbiao").innerText = this.innerText;
			document.getElementById("yimanbiao").style.color = "#ff6158";

			mui.post(weburl + 'project/getIndex', {
				filter_id: val
			}, function(data) {
				vuea.yts=data.list_full 
			})

		});
	});

	mui.post(weburl + 'project/getTopTender', {}, function(data) {
		var vuet = new Vue({
			el: "#topte",
			data: {
				toptender: data.data,
			}
		})
	});
}
tender();

//投标倒计时
setInterval(function() {
	$(".sylist_left_djs").each(function() {
		var starttime = $(this).attr("rag");
		if(starttime) {
			starttime = new Date(Date.parse(starttime.replace(/-/g, "/")));
			var nowtime = new Date();
			var time = starttime - nowtime;
			if(time > 0) {
				var day = parseInt(time / 1000 / 60 / 60 / 24);
				var hour = parseInt(time / 1000 / 60 / 60 % 24) + day * 24;
				var minute = parseInt(time / 1000 / 60 % 60);
				var seconds = parseInt(time / 1000 % 60);
				$(this).text(hour + "小时" + minute + "分钟" + seconds + "秒");
			} else {
				$(this).text("");
			}
		}
	})
}, 1000);

mui("body").on("tap", ".tender_li", function() {
	var bu = $(this).attr("rag");
	och('page/tender_detail.html', '项目详情', bu);
})