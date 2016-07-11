
(function(){
	
	var login        = document.getElementById("login"),
	    screen       = document.getElementById("screen"),
		login_open   = document.querySelector(".login"),
		login_close  = login.querySelector("h2 img"),
		login_btn    = login.querySelectorAll("button"),
		confirmBtn   = login_btn[0],
		cancelBtn    = login_btn[1];
	
	
	//点击登录，弹出登录框并遮罩锁屏
	login_open.onclick=function(){
		open_login();
	}

	//点击screen关闭登录框并解锁
	screen.onclick=function(){
		close_login();
	}
	//点击确定、取消按钮，关闭登陆框并解锁
	confirmBtn.onclick=function(){
		close_login();
	}
	cancelBtn.onclick=function(){
		close_login();
	}
	//点击关闭按钮
	login_close.onclick=function(){
		close_login();
	}
	
	
	//登录框的拖拽效果
	drag(login);
	
	//通过移动登录框的右、下边框，改变其大小
	
	
	
	
	//拖拽功能函数
	function drag(node){
		addHandler(node,"mousedown",function(e){
			
			var diffX=e.clientX-this.offsetLeft;
		    var diffY=e.clientY-this.offsetTop;
			
			if(e.target.tagName=="H2"){  //鼠标点下的目标元素是h2时才可以拖动
            	addHandler(document,"mousemove",move);
          	    addHandler(document,"mouseup",up);
            }
            			
            
			var _this=this;  
			
			//-----------mousemove事件执行的函数-----------//
            function move(e){
				var left=e.clientX-diffX;
				var top=e.clientY-diffY;
				if(left<0){//浏览器视口的左边缘
					left=0;
				} else if(left>getViewport().width-_this.offsetWidth){//浏览器视口的右边缘
					left=getViewport().width-_this.offsetWidth;
				}
				if(top<0){//浏览器视口的上边缘
					top=0;
				}else if(top>getViewport().height-_this.offsetHeight){//浏览器视口的下边缘
					top=getViewport().height-_this.offsetHeight;
				}
				_this.style.left=left+"px";
				_this.style.top=top+"px"; //只根据左上角移动，因为点一下oDiv的CSS效果马上改变
			}

             //-----------mouseup事件执行的函数-----------//
	        function up(){
	        	removeHandler(document,"mousemove",move);
		        removeHandler(document,"mouseup",up);
	        }
			
		});
	}
	
	//登录框弹出时的处理函数
	function open_login(){
		login.style.display="block";
		center(login,600,300);
		
		screen.style.display="block";//遮罩效果
		screen.style.height=getViewport().height+ scroll().top+"px";
		
		//页面滚动时，login始终保持居中
		window.onresize=function(){
			center(login,600,300);
			screen.style.height=getViewport().height+ scroll().top+"px";
		}
		window.onscroll=function(){
			center(login,600,300);
			screen.style.height=getViewport().height+ scroll().top+"px";
		}		
	}
	
	//设置元素在页面视口中间显示
	function center(node,width,height){
		var top=(getViewport().height - height)/2 + scroll().top;
		var left=(getViewport().width - width)/2 + scroll().left;
		node.style.top  = top + "px";
		node.style.left = left + "px";
	}
	
	//关闭登录框时的处理函数
	function close_login(){
		login.style.display="none";
		screen.style.display="none";
	}
	

	//跨浏览器获取滚动条
	function scroll(){
		var scrollTop=document.documentElement.scrollTop|| document.body.scrollTop,
		    scrollLeft=document.documentElement.scrollLeft|| document.body.scrollLeft,
			top,
			left;
		return{
			top  : scrollTop,
			left : scrollLeft
		}
	}
	
	
	//跨浏览器获取页面视口大小
	function getViewport(){
        
		//主流浏览器
		var pageWidth=window.innerWidth,
		    pageHeight=window.innerHeight,
			width,
			height;
			
	    if(typeof pageWidth != "number"){
			//针对低版本IE----IE8及以下
			if(document.compatMode=="CSS1Compat"){//标准模式下
				pageWidth=document.documentElement.clientWidth;
				pageHeight=document.documentElement.clientHeight;
			}else{//混杂模式下
				pageWidth=document.body.clientWidth;
				pageHight=document.body.clientHeight;
			}
		}
        return {
			width  : pageWidth,
			height : pageHeight
		}		
	}
	
	
	//------事件绑定浏览器兼容性处理--------//
	function addHandler(element, type, handler) {
		if(element.addEventListener) {
			addHandler = function(element, type, handler) {
				element.addEventListener(type, handler, false);
			};
		} else if (element.attachEvent) {
			addHandler = function(element, type, handler) {
				element.attachEvent("on"+type, handler);
			};
		} else {
			addHandler = function(element, type, handler) {
				element["on"+type] = handler;
			};
		}
		return addHandler(element, type, handler);
	};
	
	//--------跨浏览器删除事件----------//
	function removeHandler(element,type,fn){
		if(typeof element.removeEventListener!="undefined"){
			element.removeEventListener(type,fn,false);
		}/*else if(typeof element.detachEvent!="undefined"){
			element.detachEvent("on"+type,fn);*/
		else{//用传统方式模拟
			if(element.events){
				for (var i in element.events[type]){
					if(element.events[type][i]==fn){
						delete element.events[type][i];
					}
				}
			}   
		}	
	}
	
	
})();
