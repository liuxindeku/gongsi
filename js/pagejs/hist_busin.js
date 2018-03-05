function hit_busin(){
	var epage=20
		mui.post( weburl+'account/getTradeLog',{user_id:user_id,type:'',page:1,epage:epage}, function(data) {
			if(data){
				new Vue({
					el:"#hist_busin_all",
					data:{
						lists:data 
					}
				})
			}else{
				$(".noth_a").show()
			}
		})
		
		mui.post( weburl+'account/getTradeLog',{user_id:user_id,type:'2',page:1,epage:epage}, function(data) {
			if(data){
				new Vue({
					el:"#hist_busin_tx",
					data:{
						lists:data 
					}
				})
			}else{
				$(".noth_b").show()
			}
		})
		
		mui.post( weburl+'account/getTradeLog',{user_id:user_id,type:'1',page:1,epage:epage}, function(data) {
			if(data){
				new Vue({
					el:"#hist_busin_cz",
					data:{
						lists:data 
					}
				})
			}else{
				$(".noth_c").show()
			}
		})
		mui.post( weburl+'account/getTradeLog',{user_id:user_id,type:'4',page:1,epage:epage}, function(data) {
			if(data){
				new Vue({
					el:"#hist_busin_qt",
					data:{
						lists:data 
					}
				})
			}else{
				$(".noth_d").show();
			}
		})
}

$(document).ready(function(){
	$(".li_se").hide().eq(0).show();
	mui(".top_nav").on("tap","li",function(){
		var in_num=$(this).index();
		$(".top_nav li").removeClass("top_select");
		$(this).addClass("top_select");
		$(".li_se").hide().eq(in_num).show();
		$(".nub").val(in_num)
	})
})




//下拉刷新+上拉加载
mui.plusReady(function() {
				plusReady();
				
				
				if(!user_id ||plus.storage.getItem('load')!='1' ){
						och("page/load_zc.html","登录/注册",1);
				}else{
					hit_busin();
				}
				
				
			
			if(plus.os.name=='iOS'){
				mui.init({
				pullRefresh: {
					container: '#pullrefresh',
					down: {
					
						callback: pulldownRefresh
					},
					up: {
						contentrefresh: '正在加载...',
						callback: pullupRefresh
					}
				}
			});
			
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
						},
						up: {
							contentrefresh: '正在加载...',
							callback: pullupRefresh
						}
					}
				});
			}
			
			/*
			 * 下拉刷新具体业务实现
			 */
			function pulldownRefresh() {
				setTimeout(function() {
					location.reload()
					mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
				}, 300);
			}
		
			/*
			 * 上拉加载具体业务实现
			 */
			
			var nub1=1;
			var nub2=1;
			var nub3=1;
			var nub4=1;
			var epage=20;
			function pullupRefresh() {
				if($(".nub").val()==0){
					typex=''
					nub1=nub1 + 1;
					nubx=nub1;
					cla="#hist_busin_all ul"
				}else if($(".nub").val()==1){
					typex=2;
					nub2=nub2 + 1;
					nubx=nub2;
					cla="#hist_busin_tx ul"
				}else if($(".nub").val()==2){
					typex=1;
					nub3=nub3 + 1;
					nubx=nub3;
					cla="#hist_busin_cz ul"
				}else if($(".nub").val()==3){
					typex=4;
					nub4=nub4 + 1;
					nubx=nub4;
					cla="#hist_busin_qt ul"
				}
				
				
					mui.post(weburl+'account/getTradeLog',{user_id:user_id,type:typex,page:nubx,epage:epage}, function(data){
						if(data){
							var html=""
							$.each(data, function(idx,itm) {
								html+="<li class='cztx_hist'><div class='cztx_left'><h2>"+itm.time+"</h2></div><div class='cztx_right'><div class='wof mtk8'><h1>"+itm.type+"</h1><h2 class='jg_color'>"+itm.money+"元</h2></div></div></li>"
								
							});
							$(cla).append(html)
							mui('#pullrefresh').pullRefresh().endPullupToRefresh();
						}else{
							mui.toast("没有更多数据")
							mui('#pullrefresh').pullRefresh().endPullupToRefresh();
						}
					})
				setTimeout(function() {}, 300);
			}
		})	