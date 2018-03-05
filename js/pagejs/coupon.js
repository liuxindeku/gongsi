//可使用红包

function looka(){
	mui.post(weburl + 'coupon/getList', {user_id:user_id,type:0,status:'1'}, function(data) {
		if(data.code=='0'){
			$(".notha").show();
		}else{
			new Vue({
				el:"#look_a",
				data:{
					lists:data
				}
			})
		}
	})
}
//可使用加息券
function lookb(){
	mui.post(weburl + 'coupon/getList', {user_id:user_id,type:1,status:'1'}, function(data) {
		if(data.code=='0'){
			$(".nothb").show();
		}else{
			new Vue({
				el:"#look_b",
				data:{
					lists:data
				}
			})
		}
	})
	
}

function over(){
//使用中红包
	var notha=0;
	var nothb=0;
	mui.post(weburl + 'coupon/getList', {user_id:user_id,type:0,status:'2'}, function(data) {
		if(data.code=='0'){
		
		}else{
			var lista=data;
			new Vue({
				el:"#look_a",
				data:{
					lista:lista
				}
			})
			$(".notha").hide();
		}
	})
//已使用红包	
	mui.post(weburl + 'coupon/getList', {user_id:user_id,type:0,status:'3'}, function(data) {
		if(data.code=='0'){
			
		}else{
			listb=data;
			new Vue({
				el:"#look_b",
				data:{
					listb:listb
				}
			})
			$(".notha").hide();
		}
	})

//已过期红包

	mui.post(weburl + 'coupon/getList', {user_id:user_id,type:0,status:'0'}, function(data) {
		if(data.code=='0'){
		
		}else{
			listc=data;
			new Vue({
				el:"#look_c",
				
				data:{
					listc:listc
				}
			})
			$(".notha").hide();
		}
	})
	

	
	
	
//使用中 加息券
	mui.post(weburl + 'coupon/getList', {user_id:user_id,type:1,status:'2'}, function(data) {
		if(data.code=='0'){
			
		}else{
			itema=data;
			var overlb=new Vue({
				el:"#look_d",
				data:{
					itema:itema
				}
			}) 
			$(".nothb").hide();
		}
	})

//已使用加息券

	mui.post(weburl + 'coupon/getList', {user_id:user_id,type:1,status:'3'}, function(data) {
		if(data.code=='0'){
			
		}else{
			
			itemb=data;
			var overlb=new Vue({
				el:"#look_e",
				data:{
					itemb:itemb
				}
			}) 
			$(".nothb").hide();
		}
	})

//已过期加息券

	mui.post(weburl + 'coupon/getList', {user_id:user_id,type:1,status:'0'}, function(data) {
		if(data.code=='0'){
		
		}else{
			
			itemc=data;
			var overlb=new Vue({
				el:"#look_f",
				data:{
					itemc:itemc
				}
			}) 
			$(".nothb").hide();
		}
	})
	
	
	
	
}
