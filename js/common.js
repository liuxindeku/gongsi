var weburl="http://app.51jingang.com/";
//var weburl="http://123.206.134.83/";


var weburl="http://m.51jingang.com/";

//var weburl="http://m.51jingang.net/";
var mVer='1.4.0';    //静态处理 

var as = 'slide-in-right',
    ts ='slide-in-top',
    ds = 'slide-in-bottom',
	at = 250; 
	ap = 500;// 默认动画时间
var mainstyle = {
	top: '43px',
	bottom: '55px',
	bounce: 'vertical',//窗口遇到边框是否有反弹效果
	scrollIndicator: 'none',
	scalable: false
};
var allstyle = {
	bounce: 'none',
	scrollIndicator: 'vertical',//窗口是否显示滚动条
	scalable: false,//窗口是否可缩放
	popGesture: 'close' //侧滑返回关闭Webview窗
};
//--------------------------------------------------------------------------
//取消浏览器的所有事件，使得active的样式在手机上正常生效
document.addEventListener('touchstart',function(){
    return false;
},true);
// 禁止选择
document.oncontextmenu=function(){
	return false;
};

var homepage;
var mypage;
var newpage;
var newding = false;
//

function plusReady(){
	mypage = plus.webview.currentWebview();//获取当前窗口的WebviewObject对象
	plus.navigator.setStatusBarStyle( "UIStatusBarStyleDefault" );	
//	console.log("初始化页面:" + document.location.href);
	if (window.initweb) {
//		console.log("找到初始化函数:" + document.location.href);
		initweb();
	}
	//获取登录状态、密码、账号/u
//	 load=plus.storage.getItem('load');
	 pword=plus.storage.getItem('password');
	 smrz=plus.storage.getItem('smrz');
	 username=plus.storage.getItem('username'); 
	 user_id=plus.storage.getItem('user_id'); 
	
} 

//验证登录




if(window.plus){
	plusReady();
}else{
	document.addEventListener('plusready',plusReady,false);
}

//验证本地的账号密码是否还有效
function  loadorno(){
	if(user_id){
			    mui.post( weburl+'login/login',{phone:username,pwd:pword}, function(data) {
					if(data.code=="1"){
						if(user_id==data.user_id.toString()){
							return false;
						}else{
							plus.storage.setItem('user_id',data.user_id.toString());	
						}
						//保存用户名、密码
						plus.storage.setItem('load','1');
					}else{
						load_out();
					}	
				}, 'json');
	}else{
		load_out();
	}
}

function load_out(){
	plus.storage.removeItem('user_id');
	plus.storage.removeItem('username');
	plus.storage.removeItem('password');
	plus.storage.removeItem('smrz');
	plus.storage.setItem('load','0');
}


// 刷新页面
function onRefresh() {
	//console.log("刷新页面:" + mypage.getURL());mypage.endPullToRefresh();
	setTimeout("mypage.setStyle({mask: 'none'});", 3000);
	mypage.reload();
}

//打开子窗口 open sub webview （服务器）
function osw(curl, title, reflush,rebackurl) {
	if (newding == true) return;
	newding = true;
	
	newpage = plus.webview.create("_www/sub.html", null, allstyle, {
		curl: curl,
		title: title
	});//创建新窗口
	//加载完成
	newpage.addEventListener('loaded', function() { //页面加载完成后才显示
		//mypage.endPullToRefresh();
		newpage.show(as, at);

	}, false);
	if (reflush == true) {//如果reflush为1 有rebackurl值 就返回这个路径  没有的话 就刷新页面
		newpage.addEventListener('close', function() { //页面加载完成后才显示
			if(rebackurl){
				mypage.loadURL(rebackurl);
			}else{
				mypage.reload();
			}
		}, false);
	}
	setTimeout("newding=false;", 1500); 
} 


//打开子窗口 open sub webview （APP本地）
function och(curl, title ,cid, hide_top){
	if (newding == true) return;
	newding = true;
	if(cid){
		plus.storage.setItem('cid',cid);
	}
	
	newpage = plus.webview.create("_www/sub_local.html", null, allstyle, {
		curl: curl,
		title: title,
		hide_top: hide_top
	});//创建新窗口
	//加载完成
	newpage.addEventListener('loaded', function() { //页面加载完成后才显示
		//mypage.endPullToRefresh();
		newpage.show(as, at);
	}, false);
	
	setTimeout("newding=false;", 1500);
} 
//返回四个主页面： curl页面地址
function account(curl,title){
	if (newding == true) return;
	newding = true;
	
	
	newpage = plus.webview.create("_www/"+curl, null, allstyle, {
		
		title: title
	});//创建新窗口
	//加载完成
	newpage.addEventListener('loaded', function() { //页面加载完成后才显示
		//mypage.endPullToRefresh();
		newpage.show(as, at);
	}, false);
	
	setTimeout("newding=false;", 1500);
} 



function initPull() {
	//mypage.endPullToRefresh();
	mypage.setPullToRefresh({
		support: true,
		height: "50px",
		range: "200px",
		contentdown: {
			caption: "下拉可以刷新"
		},
		contentover: {
			caption: "释放立即刷新"
		},
		contentrefresh: {
			caption: "正在刷新..."
		}
	}, onRefresh);
}
function exeHomejs(js) {
	plus.webview.getLaunchWebview().evalJS(js);//获取应用首页WebviewObject窗口对象
}

function exeSubjs(js) {
	var subweb = mypage.parent();
	if (subweb) subweb.evalJS(js);
}

function muiPost(url,j,sfn){
	curl = weburl + url;
	mui.ajax(curl,{
	        data:j,
	        type:'post',
	        dataType:'text',
	        contentType:'application/x-www-form-urlencoded; charset=GBK', 
	        timeout:3000,
	        success:sfn,
	        error:function(xhr,type,errorThrown){
//	        console.log("a:"+type);
	    }
	});  
}
function jqPost(url,j,sfn){
	curl = weburl + url;
	jQuery.ajax({ 
             type: "post",
             data:j,
             async: false, //默认值: true,所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
             url:curl, 
             contentType:'application/x-www-form-urlencoded; charset=UTF-8',//发送信息至服务器时内容编码类型。
             dataType: "text", //在一个 jsonp 请求中重写回调函数的名字,这个值用来替代在 "callback=?" 这种 GET 或 POST 请求中 URL 参数里的 "callback" 部分.
             success:sfn, 
             error: function(){ 
                 //alert('fail'); 
             } 
        });
}
 
function req(name){
	var url = location.search; 
 	var theRequest = new Object();
   	if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
      }
   	}
   return theRequest[name];

}

function create(url){
	curl = weburl + url;
	var w = plus.webview.create(url);
	//plus .setJsFile("_www/js/common.js");
	plus.webview.show( w ,'slide-in-bottom', 500); // 显示窗口
}
function closeme(){
	var ws=plus.webview.currentWebview();
	plus.webview.close(ws);
}

    function loadCacheImg(){
       
        $("[cachesrc]").each(function() {
           var url= $(this).attr("cachesrc");
          // alert(url);
           downloadCImg(weburl+url,$(this));
        });
    }
    
    function loadrjs(js,fn){
    	 console.log('loadrjs ='+js);   
    	var script = document.createElement("script");
    	if(fn){
			script.onload = function(){
	            fn();
	        };
        }
    	script.src = weburl+js;
    	document.getElementsByTagName("head")[0].appendChild(script);
    }
    
    function loadljs(js){
    	mypage.appendJsFile("_www/"+js);
    }
    
	//定义登录状态
	
	
	
	//关闭弹窗
	mui("body").on("tap",".winclose",function(){
		$(".winbox").fadeOut();
		history.go(0)
	})
 

	//消息框变成H5样式
	function alert(message){ 
		mui.alert(message,"","","",'div')
	}
	
	//nothing
	function noth(){
		$(".nothing").show();
	}
	
	//
	mui("body").on("tap",".zxkf",function(){
		$("#YSF-BTN-HOLDER").click();
	})
    mui("body").on("tap","noinp",function(){
		$("input").blur();
	})
	

	
	function getData(url, param,handle) {
	mui.post(weburl + url, {
				param
			}, function(data) {
				if(data) {
					handle(data);
					
				} else {
					alert(data.msg);
				}
			})
}
	
	
	
	
	
	
	
