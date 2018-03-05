//请求加载首页数据
function main() {
	getData('index/getBanner',{typename: "app"},function(data){
		if(data.code == '1') {
			var arr = data.data;
			var arr_le = arr.length;
			var arr_k = arr_le - 1;
			var html_v = "";
			//				console.log(arr[0].url)
			var html = "<div class='mui-slider-item mui-slider-item-duplicate' bid='" + arr[arr_k].id + "'><a href='#'><img src='" + arr[arr_k].pic + "'></a></div>";
			for(k = 0; k < arr_le; k++) {

				html += "<div class='mui-slider-item' bid='" + arr[k].id + "'><a href='#'><img src='" + arr[k].pic + "'></a></div>"
				html_v += "<div class='mui-indicator'></div>"
			}
			html += "<div class='mui-slider-item mui-slider-item-duplicate' bid='" + arr[0].id + "'><a href='#'><img src='" + arr[0].pic + "'></a></div>";
			$("#pic-scroll").html(html);
			$(".mui-slider-indicator").html(html_v);
			$(".mui-slider-indicator .mui-indicator").eq(0).addClass("mui-active");
			gallery = mui('.mui-slider');
			gallery.slider({
				interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
			});
		} else {
			$(".mui-slider").html("<div style='height: 200px;line-height: 200px;text-align: center;'>图片加载失败</div>");
		}
	});
//	var data=getData('index/getBanner',{typename: "app"});
	
	
//	mui.post(weburl + 'index/getBanner', {
//		typename: "app"
//	}, function(data) {
//		if(data.code == '1') {
//			var arr = data.data;
//			var arr_le = arr.length;
//			var arr_k = arr_le - 1;
//			var html_v = "";
//			//				console.log(arr[0].url)
//			var html = "<div class='mui-slider-item mui-slider-item-duplicate' bid='" + arr[arr_k].id + "'><a href='#'><img src='" + arr[arr_k].pic + "'></a></div>";
//			for(k = 0; k < arr_le; k++) {
//
//				html += "<div class='mui-slider-item' bid='" + arr[k].id + "'><a href='#'><img src='" + arr[k].pic + "'></a></div>"
//				html_v += "<div class='mui-indicator'></div>"
//			}
//			html += "<div class='mui-slider-item mui-slider-item-duplicate' bid='" + arr[0].id + "'><a href='#'><img src='" + arr[0].pic + "'></a></div>";
//			$("#pic-scroll").html(html);
//			$(".mui-slider-indicator").html(html_v);
//			$(".mui-slider-indicator .mui-indicator").eq(0).addClass("mui-active");
//			gallery = mui('.mui-slider');
//			gallery.slider({
//				interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
//			});
//		} else {
//			$(".mui-slider").html("<div style='height: 200px;line-height: 200px;text-align: center;'>图片加载失败</div>");
//		}
//
//	})
	mui.post(weburl + 'index/index', {}, function(data) {
		//		console.log(data);
		if(!data) {
			och("error.html", "网络错误", 1)
		} else {
			$('.index_new').show();
			//新手标
			new_bor = data.new;
			bor = data.list;
			if(new_bor) {
				var vuea = new Vue({
					el: '#newb',
					data: {
						borrow_nid: new_bor.borrow_nid,
						borrow_account_wait: new_bor.borrow_account_wait,
						borrow_apr: new_bor.borrow_apr,
						tender_account_min: new_bor.tender_account_min,
						borrow_period_name: new_bor.borrow_period_name,
						begin_time: new_bor.begin_time,
						status_name: new_bor.status_name,
						name: new_bor.name,
						account: new_bor.account,
						scale: new_bor.scale
					}
				})

				var myChart = echarts.init(document.querySelector(".main"));
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
							value: vuea.borrow_apr,
							name: '占有率',
							label: {
								normal: {
									formatter: '{d} %',
									textStyle: {
										fontSize: 28,
										color: '#fff'
									}
								}
							}
						}, {
							value: 100 - vuea.borrow_apr,
							name: '占位',
							label: {
								normal: {
									formatter: '\n年化收益',
									textStyle: {
										color: '#fff',
										fontSize: 20,
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

			//推荐标 
//			bor = bor.slice(0, 3);
			var vueb = new Vue({
				el: '#borrowsshow',
				data: {
					items: bor,
				}
			})
			for(var i = 0; i < vueb.items.length; i++) {
				var myChart1 = i;
				myChart1 = echarts.init(document.querySelectorAll(".main1")[i]);
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
							value: vueb.items[i].scale,
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
							value: 100 - vueb.items[i].scale,
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

				myChart1.setOption(option);

			}
		}
		$("#loading").hide();
		var value = new_bor.scale;
		var width = $(".progressbar_grey").width();
		//		mui.alert(width);
		var jinduValue = width * value / 100 + 'px';
		$(".progressbar_ora").css({
			width: jinduValue
		});
	}, 'json');

}

mui("#pic-scroll").on("tap", ".mui-slider-item", function() {
	var index = $(".mui-slider-item").index(this);
	var bid = $(".mui-slider-item").eq(index).attr('bid');
	//			mui.alert(bid);
	//			return false;
	och('page/lunbo.html', '', bid)
})
mui(".index_list").on("tap", "li", function() {
	var bu = $(this).attr("rag")
	och('page/tender_detail.html', '项目详情', bu)
})
mui("body").on("tap", ".mui-slider-item", function() {
	var hr = $(this).attr("her");
	var name = $(this).attr("name")
	if(hr && name) {
		if(hr == 'invite') {
			och('page/invite.html', '邀请好友', 1);
		} else if(hr == 'new') {
			och('page/new.html', '新手专享', 1);
		} else {
			och("page/banner_link.html", name, hr)
		}
	}
})

setInterval(function() {
	$(".tz_bnt").each(function() {
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
				$(this).text("立即投资");
			}
		}
	})
}, 1000);

mui("body").on("tap", ".och_integration", function() {
	och('page/integration.html', '我的积分', 1)
})
mui("body").on("tap", ".och_invite", function() {
	och('page/invite.html', '邀请好友', 1)
})