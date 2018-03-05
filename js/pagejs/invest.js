//我的投资
function my_invest(){
	if(!user_id ||plus.storage.getItem('load')!='1' ){
		och("page/load_zc.html","登录/注册",1);
	}else{
		function invest1(){
			mui.post( weburl+'invest/getListWait',{user_id:user_id}, function(data) {
				if(data){
					$("#invest_a").show();
					new Vue({
						el:"#invest_a",
						data:{
							total:data.total,
							account:data.account,
							interest:data.interest,
							lists:data.list
						}
					})
				}else{
					$(".noth_a").show();
				}
				mui(".hkje_u").on("tap","li",function(){
					var nid=$(this).attr("nid");
					och("page/tz_detail.html","投资详情",nid);
				})
				$("#loading").hide();
			})	
		}
		
		//已回款
		function invest2(){
			mui.post( weburl+'invest/getListDone',{user_id:user_id}, function(data) {
				if(data){
					
					new Vue({
						el:"#invest_b",
						data:{
							lists:data
						}
					})
				}else{
					$(".noth_b").show();
				}
				mui(".hkje_u").on("tap","li",function(){
					var nid=$(this).attr("nid");
					och("page/tz_detail.html","投资详情",nid);
				})
			})	
		}
	}
	invest1();
	invest2();
}

function tz_detail(){
	var nid=plus.storage.getItem('cid');
	
	mui.post( weburl+'invest/getTenderDetail',{user_id:user_id,id:nid}, function(data){
		if(data.code=='0'){
			alert(data.msg)
		}else{
			new Vue({ 
				el:"#detail",
				data:{
					name:data.name,
					nid:data.nid,
					account:data.account,
					interst:data.interst,
					tender_time:data.tender_time,
					end_time:data.end_time,
					style:data.style,
					apr:data.apr,
					apr_base:data.apr_base,
					apr_extra:data.apr_extra,
					coupon_name:data.coupon_name,
					money:data.money,
					interest:data.interest,
					leng:data.repay_list.length,
					lists:data.repay_list
				}
			})
		}
		$("#loading").hide();
	})
	
	
}


























