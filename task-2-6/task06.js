
(function(){
	/**
	* 用于储存数据的数组
	*/
	 var Arr=[];
	 
	 /**
	 *根据数组 Arr 渲染队列效果
	 */
	 function fifo(arr){
		 var wrap=document.getElementById('wrap-fifo');
		 wrap.innerHTML='';
		 var left=0;
		 for (var i=0; i<arr.length;i++){
			 wrap.innerHTML += "<span style='height:"+ arr[i]+";left:"+ left +";'>"+arr[i]+"</span>";
			 left=left+18;
		 }
	 }
	 
	/**
	*点击左入或右入按钮的处理逻辑
	*/
	//点击左侧入,将数据插入到数组 Arr 的起始位置
	var leftIn=document.getElementsByClassName('left-in')[0];
    leftIn.onclick=function(){
		 var value=document.getElementsByName('input-data')[0].value.trim();
		 var reg=/^\d{2,3}$/;
		 var flag=reg.test(value);//如果flag为true，说明输入的是数字，否则输入不合法
		 if(flag){
			 if(Arr.length >= 60) alert('队列已满');
			 else if(value > 100) alert('输入必须为10-100的数字');
			 else{
				 //Arr.unshift(value);//value是字符串，需要转化
				 Arr.unshift(parseInt(value))
				//渲染队列
				 fifo(Arr);
			 }	 
		 }else{
			 alert('输入必须为10-100的数字')
		 }
	}

	//点击右侧入,将数据追加到数组 Arr 后面
    var rightIn=document.getElementsByClassName('right-in')[0];
	rightIn.onclick=function(){
		 var value=document.getElementsByName('input-data')[0].value.trim();
		 var reg=/^\d{2,3}$/;
		 var flag=reg.test(value);//如果flag为true，说明输入的是数字，否则输入不合法
		 if(flag){
			 if(Arr.length >= 60) alert('队列已满');
			 else if(value > 100) alert('输入必须为10-100的数字');
			 else{
				 Arr.push(parseInt(value));
				//渲染队列
				 fifo(Arr);
			 }	 
		 }else{
			 alert('输入必须为10-100的数字')
		 }
	}

	/**
	*点击左出或右出按钮的处理逻辑
	*/
	//点击左侧出,将数组 Arr 的第一个元素删除
    var leftOut=document.getElementsByClassName('left-out')[0];
    leftOut.onclick=function(){
		 Arr.shift();
		//渲染队列
		 fifo(Arr);
	}

	//点击右侧出,将数组 Arr 的最后一个元素删除
    var rightOut=document.getElementsByClassName('right-out')[0];
    rightOut.onclick=function(){
		 Arr.pop();
		//渲染队列
		 fifo(Arr);
	}
	
	
	/**
	*点击队列中元素的处理逻辑
	*/
	//给所有div添加onclick事件，当事件触发时，在数组中删除该div
	var wrapFifo=document.getElementById('wrap-fifo');
	wrapFifo.onclick = function(e){
		if (e.target && e.target.nodeName === "SPAN") {
			var elems =  document.getElementsByTagName("span");
			for(var i=0;i<elems.length;i++){
				(function(i){
					elems[i].onclick = function(){
						Arr.splice(i, 1);//删除i位置开始的1个元素;
						//渲染队列
			            fifo(Arr);
					}
				})(i);
			}
		}
	}
    
	
	/**
	*实现数组排序，利用定时函数渲染队列排序的每一步操作
	*/
	//先对数组进行冒泡排序
	var sortBtn=document.getElementById('sort');
	
	var snapshots = []; //快照集合
	var timer = null; //定时

	
	
	function bubbleSort(){
		snapshots = [];
		for (var i = 0; i < Arr.length - 1; i++) {
			for (var j = 0; j < Arr.length - 1 - i; j++) {
				if (Arr[j] > Arr[j + 1]) {
						var tmp = Arr[j];
						Arr[j] = Arr[j + 1];
						Arr[j + 1] = tmp;
						//setTimeout(fifo,2000);
						
	                                        //snapshots.push(JSON.parse(JSON.stringify(Arr))); //--浅拷贝
						snapshots.push(Arr.slice());//--浅拷贝
						
						//数组对象的克隆问题：直接复制Arr,Arr改变，拷贝的值也会改变(此时为对象的深拷贝)
						
						//借助JSON转化便不再跟着变了(实现的是对象的浅拷贝---数组的浅拷贝还可以用slice实现)。
						
						//snapshots.push(Arr);//--深拷贝：可以排序，但没有延迟效果,记录不下每次的改变
				}
			}
        }
	}
	
	sortBtn.onclick = function() {
		 if (Arr.length == 0) return alert("队列为空");
		 bubbleSort();
		 timer = setInterval(paint, 100); //定时绘制
		 function paint() {
			 var snapshot = snapshots.shift() || [];//每次执行时，将snapshots的第一个数组取出进行渲染
			 //alert(snapshot)         //snapshots.shift() 返回取出的元素     
			 if (snapshot.length !== 0) {
				fifo(snapshot);
			 } else {
				 clearInterval(timer); //绘制结束
				 return;
			 }
		 }
    }

	
  
	
})();

