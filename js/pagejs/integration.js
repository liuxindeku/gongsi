mui.plusReady(function() {
	plusReady();

	if(user_id) {
		mui.post(weburl + 'account/getJfLog', {
			user_id: user_id
		}, function(data) {
			vue = new Vue({
				el: '#jf',
				data: {
					items: data.data,
					total: data.total
				}

			})

		})

		$('.jf_cont').show();
		mui("body").on("tap", ".jf_nav", function(e) {
			var style = $(e.target).attr('stylea');
			mui.post(weburl + 'account/getProductList', {
				style: style
			}, function(data) {

				if(data.code == 1) {
					if(style == 1) {
						vuea = new Vue({
							el: '#duihuan',
							data: {
								items1: data.data
							}
						})
					} else {
						vuea = new Vue({
						el: '#duihuan',
						data: {
							items0: data.data
						}

					})
					}
					
				} else {
					
				}

			})
			var reg = $(this).attr("reg");
			if(reg == '0') {
				$('.jf_cont').show();
				$('#duihuan').hide();
				$('#duihuan_jiaxijuan').hide();

			} else if(reg == '1') {
				$('.jf_cont').hide();
				$('#duihuan').show();
				$('#duihuan_jiaxijuan').hide();
			} else if(reg == '2') {
				$('.jf_cont').hide();
				$('#duihuan').hide();
				$('#duihuan_jiaxijuan').show();
			}
			var in_num = $(this).index();
			$(".top_nav li").removeClass("top_select");
			$(this).addClass("top_select");
			$(".li_se").hide().eq(in_num).show();
		})

		mui("body").on("tap", ".confirmBtn", function() {
			var alljifen = vue.total;
			var xujiankoujf = parseFloat($(this).parents('.duihuan_right').find('h3 span').html());
			var num=parseInt($(this).parents('.duihuan_right').find('.jiajian').html());
			if(alljifen < (xujiankoujf * num)) {
				mui.alert("积分不足");
				return false;
			}
			
			var id=$(this).parents('li').attr('id');
			var btnArray = ['否', '是'];
			mui.confirm('确认兑换？', '', btnArray, function(e) {
				if(e.index == 1) {
					mui.post(weburl + 'account/exchange', {
						user_id: user_id,
						num: num,
						id: id
					}, function(data) {
						if(data.code==1) {
							mui.alert(data.msg);
							window.location.reload()
						} else {
							mui.alert(data.msg);
						}
	
					})
				}
			})
		})
		
		mui("body").on("tap", ".jian", function() {
			var num = $(this).parent().find('.jiajian').html();
			if(num <= 0) {
				mui.toast('兑换数量不能小于0')
			} else {
				num--;
				$(this).parent().find('.jiajian').html(num);
			}
		})
		mui("body").on("tap", ".jia", function() {
			var alljifen = vue.total;
			var xujiankoujf = $(this).parents('.duihuan_right').find('h3 span').html();
			var bigmount = Math.floor(alljifen / xujiankoujf);
			var num = $(this).parent().find('.jiajian').html();

			if(num >= bigmount) {
				mui.toast('兑换数量不能大于可兑换数量')
			} else {
				num++;
				$(this).parent().find('.jiajian').html(num);
			}
		})

	}
})