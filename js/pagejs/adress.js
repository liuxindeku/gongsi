function adress(){
	mui.post( weburl+'user/getAddress',{user_id:user_id}, function(data){
		if(data.code=='0'){
			alert(data.msg)
		}else{
			var cont=data[0];
			if(!cont){
				
				$(".bnt1").hide();
				$(".bnt2").show();
				$("#change_adr input").attr("readonly",false);
				$("#change_adr").show()
			}else{
				$("#change_adr input").css("color","#999");
				$(".bnt2").hide();
				$(".bnt1").show();
				$("#change_adr input").attr("readonly",true);
				$("#name").val(cont.name);
				$("#phone").val(cont.phone);
				$("#adress").val(cont.address);
				$("#code").val(cont.postcode);
				$("#aid").val(cont.id);
				$("#change_adr").show()
			}
				
		}
		
	})
	
	
	mui("body").on("tap",".bnt_chane",function(){
		$("#change_adr input").css("color","#59698A");
		$(".bnt1").hide();
		$(".bnt2").show();
		$("#change_adr input").attr("readonly",false);
	})
	
	
	mui("body").on("tap",".bnt_true",function(){
		var name=$("#name").val();
		var phone=$("#phone").val();
		var adress=$("#adress").val();
		var code=$("#code").val();
		var aid=$("#aid").val();
		if(!name){
			alert("收货人姓名不得为空")
		}else if(!(/^1[34578]\d{9}$/.test(phone))){
			alert("收货人电话格式错误");
		}else if(!adress){
			alert("收货地址不得为空");
		}else if(!code){
			alert("邮编不得为空");
		}else{
			//adress和address、、、
			$(".cad_bnt").removeClass("bnt_true");
			$(".cad_bnt").text("确认...")
			mui.post( weburl+'user/updateAddress',{user_id:user_id,name:name,phone:phone,address:adress,postcode:code,id:aid}, function(data){
			 	if(data){
			 		$(".cad_bnt").text("确认")
			 		mui.alert(data.msg,"","",function(){
			 			location.reload();
			 		},"div")
			 		
			 		
			 	}
			})
			
		}
		
		
	})
}
