function tender_detail(){
	var xmid=plus.storage.getItem('cid');
	plus.storage.setItem('xmid',xmid);

	mui.post(weburl + 'project/getDetail', {nid:xmid}, function(data) {
		$(".intp").html(data.detail)
		if(data){
			
			new Vue({
				el:"#content",
				data:{
					img:data.status_img,
					apr:data.apr,
					apr_base:data.apr_base,
					apr_extra:data.apr_extra,
					period:data.period,
					min:data.min,
					wait:data.wait,
					scale:data.scale,
					account:data.account, 
					name:data.name,
					nid:data.nid,
					style_title:data.style_title,
					tender_people:data.tender_people,
					status:data.status,
					repay_wait:data.repay_wait,
					begin_time:data.begin_time,
					xmid:xmid,
					status_name:data.status_name,
					tender_count:data.tender_count,
					//detail:data.detail.replace(/\n\t/g,"<br />")
				}
			})
			$('#tubiao').html(data.status_img);
			//进度条
			var winw=$(".xmye").width();
			var sell=$(".xm_blbox p span").text();
			var sel=parseInt(sell)/100*winw
			if(sel==0){
				$(".xm_blbox").hide()
			}else if(sel<=70&&sel>0){
				$(".xm_blbox p").css("text-align","left");
				$(".xm_blbox").css("width",70);
				$(".xm_bl").css("width",sel);
			}else{
				$(".xm_blbox").animate({"width":sel},1000)
			}
		}else{
			alert(data.msg);
		}
		$("#loading").hide();
	})



setInterval(function() {
	$(".sylist_left_djs").each(function() {
		var starttime = $(this).attr("rag");
		if(starttime){  
		starttime = new Date(Date.parse(starttime.replace(/-/g, "/")));
		var nowtime = new Date();
		var time = starttime - nowtime;
		if(time>0){
			var day = parseInt(time / 1000 / 60 / 60 / 24);
			var hour = parseInt(time / 1000 / 60 / 60 % 24) + day * 24;
			var minute = parseInt(time / 1000 / 60 % 60);
			var seconds = parseInt(time / 1000 % 60);
			$(this).text(hour + "小时" + minute + "分钟" + seconds + "秒");
		}else{
			$(this).text("立即投资"); 
			$(this).addClass("gobnt")
		}
		}
	})
}, 1000);



mui("body").on("tap",".gobnt",function(){
	var hd=$(this).attr("hrd");
	function rinitweb() {
		if(plus.storage.getItem('load')=='1'){
			och("page/invest_now.html","立即投资",hd);			
		}else{
			och("page/load_zc.html","登录/注册",1);
		}
	}
	rinitweb();
})



	
mui("body").on("tap",".calcbnt",function(){
	
	var sx=$(".calc").attr("bi");
	if(sx=='y'){
		$(".cal_qx").attr("placeholder",'请输入投资期限(月)')
	}else if(sx=='t'){
		$(".cal_qx").attr("placeholder",'请输入投资期限(天)')
	}
		$(".calc_box").show();
		
		
})
	
	

if(!user_id ||plus.storage.getItem('load')!='1' ){
	$(".zcs").hide()
}



}

mui("body").on("tap",".calc_c",function(){
		$(".calc_box").hide()
	})
	
	mui("body").on("tap",".calc_j",function(){
		var rat=$("#zlilv").val();
	
		var qx=parseInt($(".cal_qx").val());
		var je=$(".cal_je").val();
		var sx=$(".calc").attr("bi");
		if(sx=='y'){
			var money=je*rat*qx/1200;
		}else if(sx=='t'){
			var money=je*rat*qx/36500;
		}
		money=money.toFixed(2);
		$(".calc").find("h2 span").text(money)
	})

