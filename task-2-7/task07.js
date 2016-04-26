	
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
		 for (var i=0; i<arr.length;i++){
			 wrap.innerHTML += "<p class='c'>"+arr[i]+"</p>";
		 }
	 }
	 
	 /**
	 *将输入文本域的值验证、分割后存入数组array
	 */
	 function getData(value){
		 var array=[];
		 //数据验证：
		 var data=value.trim();
		 var reg=/[^0-9a-zA-Z\u4e00-\u9fa5]/;//非数字、非中英文的都是分隔符
		 array=data.split(reg);
		 if(array.length != 0){
			 return array;
		 }else{
			 alert("输入为空")
		 }
	 }
	 
	/**
	*点击左入或右入按钮的处理逻辑
	*/
	//点击左侧入,将数据插入到数组 Arr 的起始位置
	var leftIn=document.getElementsByClassName('left-in')[0];
    leftIn.onclick=function(){
		 var value=document.getElementsByName('input-data')[0].value;
		 //对value进行验证并分割
		 array=getData(value);
		 //将分割后的数组存入Arr
		 for(var i=array.length-1;i>=0;i--){
			 Arr.unshift(array[i]); 
		 }
		  //渲染队列
		 fifo(Arr);
	}

	//点击右侧入,将数据追加到数组 Arr 后面
    var rightIn=document.getElementsByClassName('right-in')[0];
	rightIn.onclick=function(){
		 var value=document.getElementsByName('input-data')[0].value;
		 //对value进行验证并分割
		 array=getData(value);
		 //将分割后的数组存入Arr
		for(var i=0;i<array.length;i++){
			 Arr.push(array[i]); 
		 }
		  //渲染队列
		 fifo(Arr);
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
	wrapFifo.addEventListener("click", function(e) {
		if (e.target && e.target.nodeName === "P") {
			var index=Arr.indexOf(e.target.innerHTML);
			Arr.splice(index, 1);//删除index位置开始的1个元素
			//渲染队列
			fifo(Arr);
		}
	})
    
	
	/**
	*点击查询按钮实现模糊匹配
	*/
	var query=document.getElementById('query');
	query.onclick=function(){
		var value=document.getElementsByName('query-data')[0].value.trim();
		if(value!=""){
			for(var i=0;i<Arr.length;i++){
			   //匹配前，先将上次效果还原
			   var cSpan=document.getElementsByClassName("c")[i];
			   cSpan.innerHTML=Arr[i];
			   var index=Arr[i].search(value);//遍历匹配项
			   if(index != -1) { //存在匹配项时，改变样式  
				   var inner=cSpan.innerHTML.replace(value,"<span style=background:red>"+value+"</span>");
			       cSpan.innerHTML=inner;
			   }
		    }
		}
	}

	
})();


	
