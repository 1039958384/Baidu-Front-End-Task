	
(function(){
	//用递归的方法遍历树
   var treeWalker = new TreeWalker(),
        btns       = document.querySelectorAll("button"),
        preBtn     = btns[0],
        inBtn      = btns[1],
        postBtn    = btns[2],
        root       = document.querySelector(".layer0");

    addHandler(preBtn, "click", function() {
        treeWalker.preOrder(root);
        treeWalker.animation();
    });
    addHandler(inBtn, "click", function() {
        treeWalker.inOrder(root);
        treeWalker.animation();
    });
    addHandler(postBtn, "click", function() {
        treeWalker.postOrder(root);
        treeWalker.animation();
    });


	/* 遍历一颗树 */
	function TreeWalker() {
		this.stack = []; 
		this.isWalking = false;//遍历过程中，将该变量设置为true
	};

	/* 前序遍历 ：根-左-右，将遍历的结果存在stack数组中*/
	TreeWalker.prototype.preOrder =  function(node) {
		this.stack.push(node);           
		if(node.firstElementChild) {//先判断子元素节点是否存在
			this.preOrder(node.firstElementChild);
		}
		if(node.lastElementChild) {
			this.preOrder(node.lastElementChild);
		}
	};

	/* 中序遍历  ：左-根-右，将遍历的结果存在stack数组中*/
	TreeWalker.prototype.inOrder = function(node) {
		if(node.firstElementChild) {
			this.inOrder(node.firstElementChild);
		}
		this.stack.push(node);
		if(node.lastElementChild) {
			this.inOrder(node.lastElementChild);
		}
	};

	/* 后序遍历  ：左-右-根，将遍历的结果存在stack数组中*/
	TreeWalker.prototype.postOrder = function(node) {
		if(node.firstElementChild) {
			this.postOrder(node.firstElementChild);
		}
		if(node.lastElementChild) {
			this.postOrder(node.lastElementChild);
		}
		this.stack.push(node);
	};

	
	/* 动画方法 ：动画之前先清空stack中遍历到节点元素，供下次存储新的遍历结果*/
	TreeWalker.prototype.animation = function() {
		var stack   = this.stack,   //将全局的stack赋给该函数内部变量后，清空，保证下次遍历重新存放DOM节点
			speeder = document.querySelector("#speeder"),
			iter    = 0,//迭代次数
			timer;

		this.stack = [];
		if(!TreeWalker.isWalking) {  //没有其它遍历时，才开始本次遍历
			TreeWalker.isWalking = true; //正在遍历的标志变量
			stack[iter].style.backgroundColor = "#F125C2";  
			timer = setInterval(function() {
				if(iter == stack.length-1) {
					stack[iter].style.backgroundColor = "#FFF";                           
					TreeWalker.isWalking = false;   //alert(this)//输出window,即指向全局作用域，setInterval在全局作用域中执行
					clearInterval(timer);           //迭代结束，清空定时器
					
				} else {
					++iter;
					stack[iter-1].style.backgroundColor = "#FFF";
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
