mui("body").on('tap','.cz_bnt',function(){
	$("input").blur();
		var phone=$("#phone").val().trim();
		var pwd=$("#pwd").val();
		if(!(/^1\d{10}$/.test(phone))){     	
		    alert("手机号码有误，请重填");  
		    return false; 
		}else if(pwd==""){
			alert("请输入密码");
		}else{
			$(".cz_true").removeClass("cz_bnt");
			$(".cz_true").text("登录中...");
			load_out();
		    mui.post( weburl+'login/login',{phone:phone,pwd:pwd}, function(data){
				if(data.code=="1"){
					//本地存储一定要字符串
					
					var user_id=data.user_id.toString();
					
					mui.post(weburl + 'discovery/getIndex', {user_id:user_id}, function(data1) {
						if(data) {
							if(data1.auth_status=='1'){
								
								plus.storage.setItem('smrz', '1');
								
							}
						}
						
						//用户id
					plus.storage.setItem('user_id', user_id);
					//用户名
					plus.storage.setItem('username',phone);
					//密码   
					plus.storage.setItem('password',pwd);
					//登录状态
					plus.storage.setItem('load', "1");
					
					mui.toast('登陆成功',{ duration:'1000', type:'div'});
					
					account("index_local.html","我的账户")
					})
					
				}else{
					$(".cz_true").addClass("cz_bnt");
					$(".cz_true").text("登录");
					mui.toast(data.msg);
				}	
			}, 'json');
		}
	})








