
//获取注册者的uid
function user_reg2(){
	var cid=plus.storage.getItem('cid');
	$(".user_id").val(cid);
	//验证是否注册成功，成功则显示下一页面
	mui.post(weburl+'reg/secondCheck',{user_id:cid},function(data){
		if(data.code=="1"){
			$(".sign_reg2").show();
		}else{
			alert(data.msg);
		}
	})
	
	//注册
	mui("body").on("tap",".cz_true",function(){
		var user_id=$(".user_id").val();
		var pwd1=$(".pwd1").val();
		var pwd2=$(".pwd2").val();
		var tjr=$(".tjr").val();
		if(!pwd1){
			 alert("请设置登录密码");
		}else if(pwd1.length<6){
			alert("密码长度过短");
		}else if(pwd1!=pwd2){
			alert("两次输入密码不一致");
		}else{
			mui.post(weburl+'reg/secondProcess',{user_id:user_id,pwd:pwd1,cpwd:pwd2,inviter:tjr},function(data){
				if(data.code=="1"){
					alert("注册成功，前往登录");
					och("page/login.html","登录");
				}else{
					alert(data.msg)
				}
			})
		}
		
	})
}














		