/**
 * @since:2015-2-9
 * @author:u.ken.li@qq.com 
 * @
 */
// 核心
var K = {
	// 遮罩
	Mask : {
		cfg : {
			id		: ".kMask"												// 盒子
		},
		// show
		show : function(n) {
			var oMask = $(this.cfg.id);						// 遮罩层

			if(!oMask.length) {
				var bTran = n==0 ? "kMask tran" : "kMask";
				oMask = $('<div class="'+ bTran +'" />').appendTo($("body"));
				oMask
					.fadeIn()					
					.click( function(){						
						// Popup hide
						if ($(K.Popup.cfg.id).length>0) {
							K.Popup.hide();
						}
					});

				$(this.cfg.id +", "+ K.Dialog.cfg.id)
					.bind("touchmove", function(e){ 				
						e.stopPropagation();
						e.preventDefault();
					});
			}
		},
		// hide
		hide : function() {
			$(this.cfg.id).remove();
		}		
	},

	// 弹出
	Popup : {
		cfg : {
			id		: ".kPopup",											// 盒子
			box		: ".kPopupC",
			speed	: 200
		},
		// show
		show : function(sTitle, n) {
			var oPopup = $(this.cfg.id);
			if(!oPopup.length) {
				oPopup = $('<div class="kPopup" />').appendTo($("body"));
				oTitle = $('<div class="title" />').appendTo(oPopup);
				oTitle.html(sTitle);
				oClose = $('<a href="javascript:void(0)" class="close" />').prependTo(oPopup);
				oClose
					.html("x")
					.click(function(){
						K.Popup.hide();
					});
				
				$('<div class="kPopupC" />').appendTo(oPopup);

				if(n!=3) K.Mask.show(n==1?0:1);
			}
		},		
		// hide
		hide : function() {
			if ($(".keyboard").length>0){
				$(".content").css("margin-top", "auto");

				$(K.Pinpad.cfg.id).removeClass("txt_focus");
			}
			$(this.cfg.id).remove();
			K.Mask.hide();
		},
		forbidDrag : function() {
			var bOverflow = $(".PMList").height() > $(this.cfg.box).height();
			if(!bOverflow){
				$(this.cfg.id)
					.bind("touchmove", function(e){ 				
						e.stopPropagation();
						e.preventDefault();
					});
			}			
		}
	},
		
	// 泡泡
	Bubble : {
		cfg : {
			id		: ".kBubble",										// 盒子
			speed	: 2000
		},
		show : function(str, o){
			var oBubble = $(this.cfg.id);
			var sTitle = str;
			if(!oBubble.length) {

				oBubble = $('<div class="kBubble" />').appendTo($("body"));
				
				if (o) {
					oBubble
						.html(sTitle)
						.css({
							"position": "absolute",
							"top"			: $(o).offset().top
						})
						.fadeIn();
				}else{
					oBubble
					.html(sTitle)
					.fadeIn();
				}
				
			}

			K.Mask.show(0);
			setTimeout("K.Bubble.hide()", K.Bubble.cfg.speed);
		},
		hide : function(){
			$(this.cfg.id).fadeOut("slow", function(){
				$(this).remove();
				if ($(K.Dialog.cfg.id).length>0) {
					$(K.Mask.cfg.id).removeClass("tran");
				}else{
					K.Mask.hide();
				}				
			});
		}
	},
	
	// 对话框
	Dialog : {
		cfg : {
			id					: ".kDlg",											// 盒子
			box					: ".kDlgC",											
			hasTitle		: true,
			title				: "提示",
			btn					: ["确定"]
		},
		// show
		show : function(){
			var oDlg = $(this.cfg.id);
			var sTitle = this.cfg.title;

			if(!oDlg.length) {
				oDlg = $('<div class="kDlg" />').appendTo($("body"));
				if (this.cfg.hasTitle)	{
					oTitle = $('<div class="title" />').appendTo(oDlg);
					oTitle.html(sTitle);
				}
				$('<div class="kDlgC" />').appendTo(oDlg);
				$('<div class="kDlgBtn" />').appendTo(oDlg);
			}
			this.addBtn();
			K.Mask.show();			
			oDlg.show();
		},		
		// add btn
		addBtn : function(){
			var oBtn = $(".kDlgBtn");
			oBtn.empty();

			// 逆序排序
			$.each( this.cfg.btn, function(i, n){
				$('<a href="javascript:void(0)">'+n+'</a>').prependTo(oBtn);
			});

			if (this.cfg.btn.length>1){
				$(".kDlgBtn>a").width("46%");
			}
		},
		// hide
		hide : function(bHide){
			$(this.cfg.id).remove();
			if (bHide==undefined) K.Mask.hide();
		}
	},

	// 加载...
	Loading : {
		cfg : {
			id		: ".kLoading"
		},
		// show
		show : function(msg) {
			var oLoading = $(this.cfg.id);
			var sMsg = msg == undefined ? "请等待..." : msg;

			if(!oLoading.length) {
				oLoading = $('<div class="kLoading" />').appendTo($("body"));
				oLoading
					.html("<i></i>"+
								"<p>"+ sMsg +"</p>");				
			}else{
				oLoading.children("p").html(sMsg);
			}
		//	K.Mask.show(0);
		},
		// hide
		hide : function() {
			$(this.cfg.id).fadeOut(200, function(){	$(this).remove(); });
		//	K.Mask.hide();
		}
	},

	// 是否有底部
	hasFooter : function(){
		var o = $(".content");
		var oFooter = $("footer>a");
		if ($("footer,.footer").size()>0) o.addClass("cf");

		oFooter
			.bind("touchstart", function() { 				
				oFooter.removeClass("current");
				$(this).addClass("current");
			});
	},

	// 模拟 Radio
	kRadio : function(el) {
		if ($(".radio input").length){			
			$(".radio").removeClass("radio_checked");
			$(".radio input:checked").parent("label").addClass("radio_checked");
		}
		if (el) {
			var sName = $(el).children("input").attr("name");
			$(".radio input[name="+ sName +"]").attr("checked", false);
			$(el).children("input").attr("checked", true);
		}
	},
	
	// 模拟 Checkbox
	kCheckbox : function(el){
		var o = $(el).children("input");
		o.attr("checked", o.attr("checked") ? false : true);
		if($(".checkbox input").length){
			$(".checkbox").removeClass("checkbox_checked");
			$(".checkbox input:checked").parent("label").addClass("checkbox_checked");
		}
	},
	
	// 模拟 switch
	kSwitch : function(){
		// switch
		$(".switchOff, .switchOn")
			.live("click", function(){
				var el = $(this);
				// default
				el.attr("class", 
					el.attr("class")=="switchOff" 
					? "switchOn"
					:	"switchOff"
				);				
			});
		
		// switch abc
		$(".switchAbcOff, .switchAbcOn")
			.live("click", function(){
				var el = $(this);
				// abc
				el.attr("class", 
					el.attr("class")=="switchAbcOff" 
					? "switchAbcOn"
					:	"switchAbcOff"
				);			
			});
	},
	
	// 模拟 select
	kSelect : {
		// 设置默认
		def : function(el){
			// 
		},
		// 创建列表项
		show : function(el, ds){
			var el = $(el);
			var sTitle = el.attr("title");
			var nIndex = el.attr("data-val");

			K.Popup.show(sTitle);			
			
			var oPopup = $(K.Popup.cfg.id);
			var oPopupC = $(K.Popup.cfg.box);

			var aDs = ds;

			var oBox = $(aDs[0].src 
									? '<ul class="PMList image-text clearfix" />' 
									: '<ul class="PMList clearfix" />');

			$.each(aDs, function(i){				
				var bIsCurrent = nIndex == aDs[i].val ? ' class="current"' : '';
				
				if (aDs[i].src){
					$('<li data-val='+ aDs[i].val
							+ bIsCurrent 
							+'><img src="'+ aDs[i].src +'" />'
							+ aDs[i].text 
							+	'</li>')						
						.appendTo(oBox);
				}else{
					$('<li data-val='+ aDs[i].val
							+ bIsCurrent +'>'
							+ aDs[i].text 
							+'</li>')
						.appendTo(oBox);
				}
			});

			var oList = oBox.find("li");
			oList
				.bind("click", function(){	
					el.html($(this).html()).attr("data-val", $(this).attr("data-val"));
					el.removeClass("placeholder");
					oList.removeClass("current");
					$(this).addClass("focus");
					K.Popup.hide();
				})
				.bind("touchend", function(){					
					$(this).addClass("current");
					$(this).removeClass("focus");					
				});
			oPopupC.html(oBox);
			oPopup.slideDown(K.Popup.cfg.speed);
			
			K.Popup.forbidDrag();
			
		}		
	},

	// 初始化
	init : function(){

		// 输入focus
		$(".txt, .txt_m")
			.focus(function(){ if($(K.Dialog.cfg.id).size()<1){		$("header").addClass("K");		}	})
			.blur(function(){		$("header").removeClass("K");});
			
		// 模拟 Checkbox
		$(".checkbox:not('.disabled')")
		 .live("click", function(){			K.kCheckbox(this);	});
		// 模拟 Radio
		$(".radio")
		 .live("click", function(){			K.kRadio(this);		});

		this.kCheckbox();
		this.kRadio();
		this.kSwitch();									// Switch				
		this.hasFooter();								// 是否有底
	//	this.focus();
	//	this.Loading.show();
	}
};

$(document)
 .ready(function(){		K.init(); 	});
$(window)
	.resize(function(){	})
	.scroll(function(){	});