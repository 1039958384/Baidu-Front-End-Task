(function(){
	
    var treeWalker = new TreeWalker(),
        btns           = document.querySelectorAll("button"),
        DFSearchBtn    = btns[0],
		BFSearchBtn    = btns[1],
		addBtn         = btns[2],
		deleteBtn      = btns[3],
		inputs         = document.querySelectorAll("input"),
		DFquery        = inputs[0],
		BFquery        = inputs[1],
		addInput       = inputs[2],
		select,                   //记录已经选择的节点
		treeArr        = [],      //储存树的元素,用来清空遗留颜色
        root           = document.querySelector(".root"),
		
		toggleBtn      = document.querySelector("span"),
		trees          = document.querySelectorAll("#entry div");
		
	
    addHandler(DFSearchBtn, "click", function() {
		select=null;
		//清空点击遗留的颜色
		clearColor(treeArr);
		//清空上次查询遗留的颜色
		clearColor(treeWalker.stack);
		var value=DFquery.value.trim();
		if(value==""){
			alert("输入不能为空，请重新输入");
		}else{
			treeWalker.DFSearch(root);
            treeWalker.animation(value);
		}
    });
	
	addHandler(BFSearchBtn, "click", function() {
		select=null;
		//清空点击遗留的颜色
		clearColor(treeArr);
		//清空上次查询遗留的颜色
		clearColor(treeWalker.stack);
		var value=BFquery.value.trim();
        if(value==""){
			alert("输入不能为空，请重新输入");
		}else{
			treeWalker.BFSearch(root);
            treeWalker.animation(value);
		}
    });
    
	
	
	//给树中所有节点添加点击事件   
	for (var i=0; i<trees.length; i++){
		treeArr.push(trees[i]);//将类数组对象转化为数组，后面清空遗留颜色使用
		
		addHandler(trees[i],"click",clickHandler);
		
		/*若采用匿名函数添加事件，必须用闭包
		(function(){
			treeArr[i].onclick=function(){}
		})(i);*/
	}
	
	
	//删除按钮的处理逻辑
	addHandler(deleteBtn, "click", function(){//无法传参,如何判断选中的是哪个DIV？只能借助全局变量了
	   if(select){
		   select.innerHTML="";
	       if(select.parentNode) select.parentNode.removeChild(select);
		   select=null;
		   //在数组treeArr中删除select
		   var pos=treeArr.indexOf(select);
		   treeArr.splice(pos,1);
	   }else{
		   alert("请选择要删除的类别")
	   }
	});
	
	//给选中项添加子元素
	addHandler(addBtn, "click", function(){
		if(select){
			var value=addInput.value.trim();
			if(value==""){
				alert("输入不能为空，请重新输入")
			}else{
				var div=document.createElement("div");
				var dtext=document.createTextNode(value);
				div.appendChild(dtext);
				div.style.backgroundColor="#fff";
				
				div.className="layer";
				div.style.display="block";

				treeArr.push(div);
				
				addHandler(div,"click",clickHandler);
				
				//添加折叠框		
				var span=document.createElement("span");
				span.innerHTML="+";
				div.appendChild(span);
				
				select.appendChild(div);
			}
		}else{
			alert("请选中一个父类");
		}		
	});
	
	//树的点击事件的处理函数
	function clickHandler(event){
		//清空上次点击遗留的颜色
		clearColor(treeArr);
		//取消冒泡事件
		var e=event||window.event;
		e.stopPropagation();
		e.cancelBubble=true;//IE
	    
		//点击到div时，改变颜色
		if(e.target.nodeName=="DIV"){
			this.style.backgroundColor="#ddd";
		    select=this;
		
        //点击到span时，实现树折叠和展开的切换		
		}else if(e.target.nodeName=="SPAN"){
            //折叠时实现展开功能
			if(e.target.innerHTML=="+"){
				e.target.innerHTML="-";
				var childArr=e.target.parentNode.children;
				for(var i=0;i<childArr.length;i++){
					if(childArr[i].nodeName=="DIV")
					    childArr[i].style.display="block";
				}
			//展开式实现折叠功能	
			}else if(e.target.innerHTML=="-"){
				e.target.innerHTML="+";
				var childArr=e.target.parentNode.children;
				for(var i=0;i<childArr.length;i++){
					if(childArr[i].nodeName=="DIV")
					    childArr[i].style.display="none";
				}
			}
		}
		
		
	}
	
	
	/* 遍历一颗树 */
	function TreeWalker() {
		this.stack = []; 
		this.isWalking = false;//遍历过程中，将该变量设置为true
	};
	

	/* 深度优先遍历 ：先遍历完最深一层，再逐层返回，将遍历的结果存在stack数组中*/
	TreeWalker.prototype.DFSearch =  function(node,value){
		this.stack=[];
		this.stack.push(node);
        var _root=node;	
        while(node!=null){
			if(node.firstElementChild){//先遍历最深的子节点
				node=node.firstElementChild;
			}else if(node.nextElementSibling){//再找未遍历过的最深节点的兄弟节点
				node=node.nextElementSibling;
			}else {
				node=node.parentNode;
				while(!node.nextElementSibling && node!=_root){
					node=node.parentNode;
				}
				if(node==_root) break;
				node=node.nextElementSibling;
			}
			
			if(node.nodeName=="SPAN"){//去掉用于折叠展开的span标签
				continue;   
			}else{
				this.stack.push(node);
			}			
		}	
	};
	
    /* 广度优先遍历 ：先遍历完一层，再遍历更深一层，将遍历的结果存在stack数组中*/
	TreeWalker.prototype.BFSearch =  function(node,value){
		this.stack=[];
		this.stack.push(node);
		var temp=[];
	    while(node!=null){
			if(node.children.length!=0){
				for (var i=0;i<node.children.length;i++){
					if(node.children[i].nodeName=="SPAN"){//去掉用于折叠展开的span标签
						continue;
					}else{
						temp.push(node.children[i]);
						this.stack.push(node.children[i]);
					}
				}
				node=temp.shift();//先入先出，借助于数据结构：队列
			}else{
				node=temp.shift();
			}	
	    }		
	};

	
	/*清空上次遗留的颜色*/
	function clearColor(arr){
		arr.forEach(function(element){
            element.style.backgroundColor = "#fff";
		});	
	}
	
	
	/* 动画方法 ：动画之前先清空stack中遍历到节点元素，供下次存储新的遍历结果*/
	TreeWalker.prototype.animation = function(value) {
		var stack   = this.stack,   
			iter    = 0,
			flag    = false,
			timer;
			
		if(!TreeWalker.isWalking) {  //没有其它遍历时，才开始本次遍历
			TreeWalker.isWalking = true;//正在遍历 
			
			stack[iter].style.backgroundColor = "#F125C2"; 
			
			if(stack[iter].firstElementChild.innerHTML.trim()=="+"){
				stack[iter].firstElementChild.innerHTML="-";//遍历时展开树
			}
			
			timer = setInterval(function() {	
				if(iter == stack.length-1) {
					stack[iter].style.display ="block";
                    if(value!=undefined){
						if(stack[iter].firstChild.nodeValue.trim()==value){
							stack[iter].style.backgroundColor = "#F125C2";
						}else if(!flag){
							stack[iter].style.backgroundColor = "#fff";
							alert("未找到指定元素");
						}else{
							stack[iter].style.backgroundColor = "#fff";
						}			
				    }else{
						stack[iter].style.backgroundColor = "#fff";                        
					}
					TreeWalker.isWalking = false;   //alert(this)//输出window,即指向全局作用域
					clearInterval(timer);           //迭代结束，清空定时器	
				} else {
					++iter;
					if(value!=undefined && stack[iter-1].firstChild.nodeValue.trim()==value){
						stack[iter-1].style.backgroundColor = "#F125C2";
						flag=true;
					}else{
						stack[iter-1].style.backgroundColor = "#fff";
					}
					if(stack[iter].firstElementChild.innerHTML.trim()=="+"){
						stack[iter].firstElementChild.innerHTML="-";//遍历时展开树
					}
					stack[iter].style.display ="block";
					stack[iter].style.backgroundColor = "#F125C2";
				}	
			}, 200);
		}
		
    }	


//-------------------------事件绑定浏览器兼容性处理---------------------------------//
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
	
	
})();
