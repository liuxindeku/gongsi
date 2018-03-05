//帮助列表
function help_list(){
	mui.post(weburl + 'articles/getTypeList', {pid:2}, function(data) {
		new Vue({
			el:"#help_list",
			data:{
				helps:data
			}
		})
		mui(".help_list").on("tap","li",function(){
			var bu=$(this).attr('rid');
			var name=$(this).find("h2").text()
			och("page/help_detail.html",name,bu);
		})
//		$("#loading").hide();
	})


	if(plus.storage.getItem('load')=='1'){
		
	}else{
		$(".xgmma").hide()
		$(".xgmmb").show()
	}
}

//帮助详情
function help_detail(){
	var hid=plus.storage.getItem('cid');
	plus.storage.setItem('hid',hid);
	mui.post(weburl + 'articles/getList', {type_id:hid}, function(data) {
		new Vue({
			el:"#help_detail",
			data:{
				helps:data
			}
		})
		$(".help_list .help_cont").css("height",0);
		$(".help_list h2").removeClass("help_qa");
		$(".help_list").on("tap","li",function(){ 
			if($(this).height()>60){
				$(".help_list .help_cont").css("height",0);
				$(".help_list h2").removeClass("help_qa");
			}else{
				$(".help_list .help_cont").css("height",0);
				$(".help_list h2").removeClass("help_qa");
				$(this).find(".help_cont").css("height","auto");
				$(this).find("h2").addClass("help_qa");
			}
		})
	})
	
	
	
}



















