
(function(){
	/**
	* 用于储存数据的数组
	*/
	 var Arr=[];
	 
	 /**
	 *根据数组 Arr 渲染队列效果
	 */
	 function fifo(){
		 var wrap=document.getElementById('wrap-fifo');
		 wrap.innerHTML='';
		 for (var i=0; i<Arr.length;i++){
			 wrap.innerHTML += '<span>'+ Arr[i]+'</span>';
		 }
	 }
	 
	/**
	*点击左入或右入按钮的处理逻辑
	*/
	//点击左侧入,将数据插入到数组 Arr 的起始位置
	var leftIn=document.getElementsByClassName('left-in')[0];
    leftIn.onclick=function(){
		 var value=document.getElementsByName('input-data')[0].value.trim();
		 var reg=/^\d+$/;
		 var flag=reg.test(value);//如果flag为true，说明输入的是数字，否则输入不合法
		 if(flag){
			 Arr.unshift(value);
			//渲染队列
			 fifo();
		 }else{
			 alert('输入必须为数字')
		 }
	}

	//点击右侧入,将数据追加到数组 Arr 后面
    var rightIn=document.getElementsByClassName('right-in')[0];
	rightIn.onclick=function(){
		 var value=document.getElementsByName('input-data')[0].value.trim();
		 var reg=/^\d+$/;
		 var flag=reg.test(value);//如果flag为true，说明输入的是数字，否则输入不合法
		 if(flag){
			 Arr.push(value);
			//渲染队列
			 fifo();
		 }else{
			 alert('输入必须为数字')
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
		 fifo();
	}

	//点击右侧出,将数组 Arr 的最后一个元素删除
    var rightOut=document.getElementsByClassName('right-out')[0];
    rightOut.onclick=function(){
		 Arr.pop();
		//渲染队列
		 fifo();
	}
	
	
	/**
	*点击队列中元素的处理逻辑
	*/
	//给所有div添加onclick事件，当事件触发时，在数组中删除该div
	var wrapFifo=document.getElementById('wrap-fifo');
	wrapFifo.addEventListener("click", function(e) {
		if (e.target && e.target.nodeName === "SPAN") {
			var index=Arr.indexOf(e.target.innerHTML);
			Arr.splice(index, 1);//删除index位置开始的1个元素
			//渲染队列
			fifo();
		}
	})
    
    
	
})();

