mui.plusReady(function() {
if(plus.os.name=='iOS'){
	mui.init({
		pullRefresh: { 
			container: '#pullrefresh',
			down: {		
				callback: pulldownRefresh
			}
		}
	});
	function pulldownRefresh() {
		setTimeout(function() {		
			location.reload();
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		}, 300);
	}
}else{
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			down: {
				style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
			    color:'#fe4a33', //可选，默认“#2BD009” 下拉刷新控件颜色
			    height:'50px',//可选,默认50px.下拉刷新控件的高度,
			    range:'100px', //可选 默认100px,控件可下拉拖拽的范围
			    offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
			    auto: false,//可选,默认false.首次加载自动上拉刷新一次
				callback: pulldownRefresh
			}
		}
	});
	function pulldownRefresh() {
		setTimeout(function() {
			location.reload();
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		}, 300);
	}
}


})








//所有点击事件
mui("body").on("tap", ".och_about_us", function() {
	och('page/about_us.html', '关于我们', 1);
})
mui("body").on("tap", ".och_cash", function() {
	och('page/cash.html', '提现', 1);
})
mui("body").on("tap", ".och_certification", function() {
	och('page/certification.html', '实名认证', 1);
})
mui("body").on("tap", ".och_change_buspwd", function() {
	och('page/change_buspwd.html', '重置交易密码', 1);
})
mui("body").on("tap", ".och_coupon_look", function() {
	och('page/coupon_look.html', '红包与加息券', 1);
})
mui("body").on("tap", ".och_coupon_over", function() {
	och('page/coupon_over.html', '红包与加息券', 1);
})
mui("body").on("tap", ".och_custom", function() {
	och('page/custom.html', '客服与反馈', 1);
})
mui("body").on("tap", ".och_find_buspwd1", function() {
	och('page/find_buspwd1.html', '重置交易密码', 1);
})
mui("body").on("tap", ".och_find_logpwd1", function() {
	och('page/find_logpwd1.html', '重置登录密码', 1);
})
mui("body").on("tap", ".och_help_detail", function() {
	och('page/help_detail.html', '帮助中心', 1);
})
mui("body").on("tap", ".och_help_list", function() {
	och('page/help_list.html', '帮助中心', 1);
})
mui("body").on("tap", ".och_hist_busin", function() {
	och('page/hist_busin.html', '交易记录', 1);
})
mui("body").on("tap", ".och_hist_cash", function() {
	och('page/hist_cash.html', '提现记录', 1);
})
mui("body").on("tap", ".och_hist_invest", function() {
	och('page/hist_invest.html', '投资记录', 1);
})
mui("body").on("tap", ".och_hist_recharge", function() {
	och('page/hist_recharge.html', '充值记录', 1);
})
mui("body").on("tap", ".och_invest_now", function() {
	och('page/invest_now.html', '立即投资', 1);
})
mui("body").on("tap", ".och_invite_list", function() {
	och('page/invite_list.html', '立即投资', 1);
})
mui("body").on("tap", ".och_invite", function() {
	och('page/invite.html', '邀请好友', 1);
})
mui("body").on("tap", ".och_know_us", function() {
	och('page/know_us.html', '关于我们', 1);
})
mui("body").on("tap", ".och_load_zc", function() {
	och('page/load_zc.html', '登录/注册', 1);
})
mui("body").on("tap", ".och_login", function() {
	och('page/login.html', '登录', 1);
})
mui("body").on("tap", ".och_my_invest", function() {
	och('page/my_invest.html', '我的投资', 1);
})
mui("body").on("tap", ".och_my_news", function() {
	och('page/my_news.html', '我的消息', 1);
})
mui("body").on("tap", ".och_notice_list", function() {
	och('page/notice_list.html', '公告动态', 1);
})
mui("body").on("tap", ".och_notice_detail", function() {
	och('page/notice_detail.html', '公告动态', 1);
})
mui("body").on("tap", ".och_person_infor", function() {
	och('page/person_infor.html', '个人信息', 1);
})
mui("body").on("tap", ".och_recharge", function() {
	och('page/recharge.html', '充值', 1);
})
mui("body").on("tap", ".och_safety", function() {
	och('page/safety.html', '安全保障', 1);
})
mui("body").on("tap", ".och_set_buspwd", function() {
	och('page/set_buspwd.html', '设置交易密码', 1);
})
mui("body").on("tap", ".och_tender_detail", function() {
	var bu = $(this).attr("rag")
	och('page/tender_detail.html', '项目详情', bu)
})
mui("body").on("tap", ".och_tender_intro", function() {
	var bu = $(this).attr("rag")
	och('page/tender_intro.html', '项目介绍', bu)
})
mui("body").on("tap", ".och_fxjss", function() {

	och('page/fxjss.html', '风险揭示书', 1)
})
mui("body").on("tap", ".och_user_reg1", function() {
	och('page/user_reg1.html', '注册', 1);
})
mui("body").on("tap", ".och_zc_protocol", function() {
	och('page/zc_protocol.html', '注册协议', 1);
})
mui("body").on("tap", ".och_index_local", function() {
	account('index_local.html', '我的账户');
})
mui("body").on("tap", ".och_index_xm", function() {
	account('index_xm.html', '项目');
})
mui("body").on("tap", ".dh_kf", function() {
	location.href = "tel:400-101-2770"
})
mui("body").on("tap", ".och_activity", function() {
	och('page/activity.html', '活动入口',1);
})
mui("body").on("tap", ".och_new", function() {
	och('page/new.html', '活动入口',1);
})
mui("body").on("tap", ".och_adress", function() {
	och('page/adress.html', '收货地址',1);
})
mui("body").on("tap", ".och_active3", function() {
	och('page/active3.html', '助力活动',1);
})
mui("body").on("tap", ".och_tender", function() {
	och('tender.html', '理财超市',1);
})
mui("body").on("tap", ".och_limit", function() {
	och('page/limit.html', '限额说明',1);
})
mui("body").on("tap", ".och_ljjb", function() {
	och('page/unbundling.html', '立即解绑',1);
})