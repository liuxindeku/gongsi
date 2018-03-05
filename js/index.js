var preate = {}; //缓存页面
var initone = 0;
var currenweb = null;
var oldweb = null;
var _openw=false;
var ismain=0;

/////////////////

function showpage(mypage) {
	if(oldweb)oldweb.hide();
	mypage.show(); 
}
//id,url,是否cache ,是否本地
function openw(cid, curl,cache,remote) {
//	console.log(cid+'__'+curl); 
	if (_openw) {
		return;
	} //多次点击
	_openw=true;
	if(remote){
	 	curl = weburl +  curl;	
	}
//	console.log(cid);
	
		
	
//	console.log(curl);
	oldweb=currenweb;
	currenweb = preate[cid];
//	console.log(currenweb)
	
	if (currenweb) {
		showpage(currenweb);
		_openw = false;
	} else { 
		//console.log('************');
		currenweb = plus.webview.create(curl, cid, mainstyle, {starturl: curl});
		plus.webview.currentWebview().append(currenweb);
		preate[cid] = currenweb;
		_openw = false;
		//加载开始
		currenweb.addEventListener('loading', function() { //叶面加载完成后才显示
			currenweb.setStyle({mask: "rgba(0,0,0,0.1)"});
			setTimeout('currenweb.setStyle({mask: "none"});',5000);
		}, false);
		//加载完成
		currenweb.addEventListener('loaded', function() { //叶面加载完成后才显示
			currenweb.setStyle({mask: "none"});
			if(!cache)showpage(currenweb);
		}, false);
	}
}

function openGuide(){
				//读取本地存储，检查是否为首次启动
				var showGuide = plus.storage.getItem("lauchFlag"); 
				//仅支持竖屏显示
				plus.screen.lockOrientation("portrait-primary");
			
				if(showGuide && showGuide==mVer) {
					//有值，说明已经显示过了，无需显示；
					//关闭splash页面；
					plus.navigator.setFullscreen(false);
					 account("index_index.html","金刚金服");  
				} else {
					
					//显示启动导航
					mui.openWindow({
						id: 'guide',
						url: 'guide.html',
						styles: {
							popGesture: "none"
						},
						show: {
							aniShow: 'none'
						},
						waiting: {
							autoShow: false
						}
					});
				}
	}

	function setTitle(title){
		$("#title").html(title);
	}
	// 底部menu点击事件
	function aclick(obj,url,title,remote){
			
			$("#home").removeClass("current");
			$("#list").removeClass("current");
			$("#account").removeClass("current");
			
			$("#more").removeClass("current");
			$(obj).addClass("current");//menu所有的都去除current样式 再重新给点击的加上current 样式
			setTitle(title);//赋值title
			cpage=$(obj).attr('id');//赋值点击项的id
			openw(cpage,url,false,remote);//调用openw传值点击项的id 和 路径
	}
	 
	function autologn(){
		 var loginpage= plus.webview.getWebviewById('loginpage');
		 if(!loginpage){
		 	plus.webview.create('loginpost.html','loginpage');
		 	loginpage.setStyle({"height":"100px"});
			loginpage.show();
		 }else{
		 	loginpage.loadURL('loginpost.html');
		 }

	}