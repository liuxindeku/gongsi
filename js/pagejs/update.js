function appupdate(){
	var wgtVer=null;
	var wgtVer=plus.runtime.version;
	if(plus.os.name=='iOS'){
		var system='2';
	}else{
		var system='1';
	}
	mui.post(weburl+'version/getVersion',{system:system,status:0},function(data){
		if(data){
			var newV=data.msg.version;
			var gxc=data.msg.info;
			var gxbb=data.msg.title;
			newVer = newV.replace(".","");
			wgtVer = wgtVer.replace(".","");
			if(wgtVer&&newVer&&(wgtVer<newVer)){
	            $(".gxb_cont h1 span").html(newV);
	            $(".gxb_cont pre").html(gxc);
	            $(".gxb").show();  
	            $(".gx_box").show(); 
	            $(".gxbb").html(gxbb);
	        }else{
				return false;
	        }
		}else{
			return false;
		}
	})
}
//
//



