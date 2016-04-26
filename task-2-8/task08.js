	
(function(){
	/**
	* 用于储存Tag数据的数组
	*/
	 var Tag=[];

	/**
	* 用于储存兴趣爱好的数组
	*/
	var Hobby=[];
	
	
	/**
	*跨浏览器兼容的 事件处理函数
	*/
	function addEvent(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type]=handler;
		}
	}
	 
	/**
	* 数组去重、超过10个自动删除函数
	*/
	 function delSame(arr,val){
		 //先去重
         if(arr.indexOf(val)==-1) arr.push(val);
		 if(arr.length>10)	arr.shift();
		 return arr;
	 }
	 
	 /**
	 *根据数组渲染队列效果
	 */
	 function fifo(arr){
		 var wrapTag=document.getElementById('wrap-tag');
		 var wrapHobby=document.getElementById('wrap-hobby');
		 if(arr==Tag) var wrap=wrapTag;
		 if(arr==Hobby) var wrap=wrapHobby;
		 wrap.innerHTML='';
		 for (var i=0; i<arr.length;i++){
			 wrap.innerHTML += "<span>"+arr[i]+"</span>";
		 }
	 }
	 
	/**
	* Tag输入的处理逻辑
	*/
	function addTag(){
		 var input=document.getElementsByName('tag-data')[0];
		 
		 addEvent(input,"keyup",addDataHandler);
        //兼容IE6+及以上的回车键检测
		 addEvent(input,"keypress",addDataHandler);

        function addDataHandler(event){
			var event=event ? event : window.event; 
			var value=input.value.replace(/^\s+/,"");
			 //输入空格，逗号或回车时，自动将输入作为tag
			 var reg=/[\,\，\s]/;
			 var flag=reg.test(value);
			// alert(event.keyCode)
			 if(flag|event.keyCode==13){//问题----回车键不能兼容IE?????
				 //对输入的tag进行合法性验证
				 var val=value.replace(/[^0-9a-zA-Z\u4e00-\u9fa5]+/,"");
				 if(val!=""){
					 //数组去重、验证
					 Tag=delSame(Tag,val);			 
					 fifo(Tag);
				 }
				 input.value="";
			 }
		}		 
	}
	  
	/**
	*鼠标放到tag上显示点击删除
	*/
	function tagEvent(){
		var wrapTag=document.getElementById('wrap-tag');
		addEvent(wrapTag,"mouseover",function(e) {
			if (e.target && e.target.nodeName === "SPAN") {
				e.target.style.backgroundColor="red";
				var inner=e.target.innerHTML;
				e.target.innerHTML="点击删除"+inner;
				
				addEvent(wrapTag,"mouseout", function(e) {
					if (e.target && e.target.nodeName === "SPAN") {
						e.target.style.backgroundColor="#46a3ff";
						e.target.innerHTML=inner;
					}
				});
			}
		});
		
		addEvent(wrapTag,"click", function(e) {
			if (e.target && e.target.nodeName === "SPAN") {
				var index=Tag.indexOf(e.target.innerHTML.replace("点击删除",""));
				Tag.splice(index, 1);//删除index位置开始的1个元素
				//渲染队列
				fifo(Tag);
			}
		});
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
	*点击确认兴趣爱好按钮的处理逻辑
	*/
	function addHobby(){
		//点击确认按钮渲染hobby队列
		var confirm=document.getElementById('confirm-btn');
		addEvent(confirm,"click", click);
		
        function click(){
			var hobbyData=document.getElementsByName('hobby-data')[0];
			 var value=hobbyData.value;
			 //对value进行验证并分割
			 array=getData(value);
			 //将分割后的数组存入Hobby
			 for(var i=0;i<array.length;i++){
				 if(array[i]!=""){
					 Hobby=delSame(Hobby,array[i]);
				 } 
			 }
			 hobbyData.value="";
			 //渲染队列
			 fifo(Hobby);
		}		
	}
	
	
	function init(){
		addTag();
		tagEvent();
		addHobby();
	}
	

	init();
  
	
})();



	
