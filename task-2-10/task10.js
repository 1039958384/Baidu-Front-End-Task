	
(function(){
	//用递归的方法遍历树
   var treeWalker = new TreeWalker(),
        btns           = document.querySelectorAll("button"),
        DFIterBtn      = btns[0],
		BFIter         = btns[1],
        DFSearchBtn    = btns[2],
		BFSearchBtn    = btns[3],
		input          = document.querySelector("input"),
        root           = document.querySelector(".layer0");
		
    //给按钮分别添加点击事件
    addHandler(DFIterBtn, "click", function() {
		//清空上次查询遗留的颜色
		treeWalker.clearColor();
        treeWalker.DFSearch(root);
        treeWalker.animation();
    });
	
	addHandler(BFIter, "click", function() {
		//清空上次查询遗留的颜色
		treeWalker.clearColor();
        treeWalker.BFSearch(root);
        treeWalker.animation();
    });
	
    addHandler(DFSearchBtn, "click", function() {
		//清空上次查询遗留的颜色
		treeWalker.clearColor();
		var value=input.value.trim();
        treeWalker.DFSearch(root);
        treeWalker.animation(value);
    });
	
	addHandler(BFSearchBtn, "click", function() {
		//清空上次查询遗留的颜色
		treeWalker.clearColor();
		var value=input.value.trim();
        treeWalker.BFSearch(root);
        treeWalker.animation(value);
    }); 
	
    
	/* 遍历一颗树 */
	function TreeWalker() {
		this.stack = []; 
		this.isWalking = false;//遍历过程中，将该变量设置为true
	};

	
	/* 深度优先遍历 ：先遍历完最深一层，再逐层返回，将遍历的结果存在stack数组中*/
	TreeWalker.prototype.DFSearch =  function(node){
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
            this.stack.push(node);			
		}	
	};
	
	
    /* 广度优先遍历 ：先遍历完一层，再遍历更深一层，将遍历的结果存在stack数组中*/
	TreeWalker.prototype.BFSearch =  function(node){
		this.stack=[];
		this.stack.push(node);
		var temp=[];
	    while(node!=null){
			if(node.children.length!=0){
				for (var i=0;i<node.children.length;i++){
					temp.push(node.children[i]);
					this.stack.push(node.children[i]);
				}
				node=temp.shift();//先入先出，借助于数据结构：队列
			}else{
				node=temp.shift();
			}	
	    }		
	};

	
	/*清空上次查询遗留的颜色*/
	TreeWalker.prototype.clearColor=function(){
		this.stack.forEach(function(element){
            element.style.backgroundColor = "#fff";
		});	
	}
	
	
	/* 动画方法 ：动画之前先清空stack中遍历到节点元素，供下次存储新的遍历结果*/
	TreeWalker.prototype.animation = function(value) {
		var stack   = this.stack,   
			speeder = document.querySelector("#speeder"),
			iter    = 0,
			flag    = false,
			timer;
			
		if(!TreeWalker.isWalking) {  //没有其它遍历时，才开始本次遍历
			TreeWalker.isWalking = true;//正在遍历 
			stack[iter].style.backgroundColor = "#F125C2";  
			timer = setInterval(function() {	
				if(iter == stack.length-1) {
					if(value!=undefined){
						if(stack[iter].firstChild.nodeValue.trim()==value){
							stack[iter].style.backgroundColor = "#F125C2";
						}else if(!flag){
							stack[iter].style.backgroundColor = "#FFF";
							alert("未找到指定元素");
						}else{
							stack[iter].style.backgroundColor = "#FFF";
						}		
				    }else{
						stack[iter].style.backgroundColor = "#FFF";                        
					}
					TreeWalker.isWalking = false;   //alert(this)//输出window,即指向全局作用域
					clearInterval(timer);           //迭代结束，清空定时器	
				} else {
					++iter;
					if(value!=undefined && stack[iter-1].firstChild.nodeValue.trim()==value){
						stack[iter-1].style.backgroundColor = "#F125C2";
						flag=true;
					}else{
						stack[iter-1].style.backgroundColor = "#FFF";
					}
					stack[iter].style.backgroundColor = "#F125C2";
				}
				
			}, speeder.value);
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




	