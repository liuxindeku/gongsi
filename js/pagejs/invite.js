mui.plusReady(function() {
	plusReady();
	if(!user_id ||plus.storage.getItem('load')!='1' ){
		och("page/load_zc.html","登录/注册",1);
	} else {
//		mui.toast("2");
		mui.post(weburl + 'account/getInviteCode', {
			user_id: user_id
		}, function(data) {
			if(data.code == '1') {
				$(".yqm h2").text(data.msg);
				$(".yq").val(data.msg);
				//				$(".inv_fz").attr("data-clipboard-text",data.msg)
				$("#loading").hide();
				$(".banlik_box").show();

				var vue = new Vue({
					el: '#forVue',
					data: {
						msg: data.msg
					}
				})
				var jgu = $(".txyqm h5").text()
				var jgurl = weburl + "reg?inviter=" + jgu;
				$(".invite_box textarea").val(jgurl);
				$("#yqr_l0j").val(jgurl);
				
				$('#qrcode').qrcode({
				    render: "canvas", //也可以替换为table
				    width: 120,
				    height: 120,
				    text: jgurl
				});

				window._bd_share_config = {
					common: {
						bdText: '注册送888红包',
						bdDesc: '注册送888红包',
						bdUrl: jgurl,
						bdPic: 'http://umu-admin.oss-cn-hangzhou.aliyuncs.com/logo/jgjflogo.png'
					},
					share: [{
						"bdSize": 28
					}],
					slide: [{
						bdImg: 0,
						bdPos: "right",
						bdTop: 100
					}],
					image: [{
						viewType: 'list',
						viewPos: 'top',
						viewColor: 'black',
						viewSize: '16',
						viewList: ['tsina', 'weixin', 'sqq']
					}],
					selectShare: [{
						"bdselectMiniList": ['tsina', 'weixin', 'sqq']
					}]
				}
				with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = '/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
			} else {
				var vue1 = new Vue({
					el: '#forVue',
					data: {
						msg: 0
					}
				})
				$(".yqm h2").text("加载中...");
				$(".yqm h2").addClass("och_login");
				$("#loading").hide();
				$(".banlik_box").show();
			}
		})

		mui.post(weburl + 'account/getInviteDada', {
			user_id: user_id
		}, function(data) {
			if(data.code == '1') {
				msg = data.msg;
//				lists = data.msg.list;
				var vueb = new Vue({
					el: '#forVue2',
					data: {
						user_count: msg.user_count,
						tender_counts: msg.tender_count,
						awards: msg.award
					}
				})
				var vued = new Vue({
					el: '#forVued',
					data: {
						items: data.msg.list
					}
				})
			}else{
				$(".hist_tab").hide();
				var vueb = new Vue({
					el: '#forVue2',
					data: {
						user_count: 0,
						tender_counts: 0,
						awards:0
					}
				})
				
				
			}
		})
		
		mui.post(weburl + 'account/getInviteDada', {
			user_id: user_id
		}, function(data) {
			if(data.code == '1') {
				msg = data.msg;
//				lists = data.msg.list;
				var vueb = new Vue({
					el: '#forVue2',
					data: {
						user_count: msg.user_count,
						tender_counts: msg.tender_count,
						awards: msg.award
					}
				})
				var vued = new Vue({
					el: '#Vued',
					data: {
						items: data.msg.list
					}
				})
			}
		})
	}
})