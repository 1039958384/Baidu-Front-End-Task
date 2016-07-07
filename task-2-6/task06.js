
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
	var timer = null; //定时

	
	//冒泡排序
	function bubbleSort(){
		snapshots = []; //二维数组:存放每一步排序得到的数组	
		for (var i = 0; i < Arr.length; i++) {
			for (var j = 0; j < Arr.length - 1 - i; j++) {
				if (Arr[j] > Arr[j + 1]) {
						var tmp = Arr[j];
						Arr[j] = Arr[j + 1];
						Arr[j + 1] = tmp;
	                    //snapshots.push(JSON.parse(JSON.stringify(Arr))); //--浅拷贝
						snapshots.push(Arr.slice());//--浅拷贝
						
						//数组对象的克隆问题：直接复制Arr,Arr改变，拷贝的值也会改变(此时为对象的深拷贝)
						
						//借助JSON转化便不再跟着变了(实现的是对象的浅拷贝---数组的浅拷贝还可以用slice实现)。
						
						//snapshots.push(Arr);//--深拷贝：可以排序，但没有延迟效果,记录不下每次的改变
				}//--这里可以借助数组的map方法实现吗？？？？(每一项执行一个函数)
			}
        }
	}
	
	//选择排序
	function selectSort(){
		snapshots = [];
		var length = Arr.length;
		var indexMin;
		for(var i=0;i<length;i++){
			indexMin = i;  //存放目前的最小值索引
			for(j=i+1;j<length;j++){//该循环是找i+1到length位置上的最小值
				if(Arr[j] < Arr[indexMin]){
					indexMin = j;
				}
			}
			if(indexMin != i){
				var tmp = Arr[indexMin];
				Arr[indexMin] = Arr[i];
				Arr[i] = tmp;
			    snapshots.push(Arr.slice());
			}
		}
	}
	
	//插入排序
	function insertSort(){
		snapshots = [];
		var length = Arr.length;
		var j;
		for(var i=1; i<length; i++){
			j = i;
			while(j>0 && Arr[j-1] > Arr[j]){

				var tmp = Arr[j];
				Arr[j] = Arr[j-1];
				Arr[j-1] = tmp;	
				j--;
				snapshots.push(Arr.slice());
			}
		}
	}
	
	//归并排序
	function mergeSort(array){
		var length = array.length;
		if(length == 1){
			return array;
		}
		var mid = Math.floor(length/2);
		var left = array.slice(0,mid);
		var right = array.slice(mid+1,length);

		merge(mergeSort(left),mergeSort(right));

		function merge(left,right){
			var result = [];
            var il = 0;
            var ir = 0;

            while(il < left.length && ir < right.length){
            	if(left[il] < right[ir]){
            		result.push(left[il++]);
            	}else{
                    result.push(right[ir++])
            	}
            }

            while(il < left.length){
                result.push(left[il++]);
            }
            while(ir < right.length){
            	result.push(right[ir++]);
            }
            return result;
		}
		
	}

	//快速排序
	function quickSort(array, left, right){ 
		var length = array.length;
		var index;
		if(array.length > 1){//划分

            index = partition(array, left, right);

            if(left < index-1){
            	quickSort(array, left, index-1);
            }

            if(right > index){
            	quickSort(array, index, right);
            }
		}

		function partition(array, left, right){
			var mid = array[Math.floor((left+right)/2)];
			var i=left, j=right;

			while(i <= j){

				while (array[i] < mid){
					i++;
				}
				while (array[j] > mid){
					j--;
				}

				if(i <= j){
					var tmp = array[i];
					array[i] = array[j];
					array[j] = tmp;
	                
	                snapshots.push(array.slice());

					i++;
					j--;
				}
			}

			return i ;
		}
	}

	
	
	
	//点击不同按钮,呈现不同排序算法
	var sortBtns = document.getElementsByClassName('sort'),
	    bubbleSortBtn = sortBtns[0],
		selectSortBtn = sortBtns[1],
		insertSortBtn = sortBtns[2],
        quickSortBtn  = sortBtns[3];
	
	bubbleSortBtn.onclick = function() {
		if (Arr.length == 0) return alert("队列为空");
		bubbleSort();
		timer = setInterval(paint, 100); //定时绘制
    }
	
	selectSortBtn.onclick = function() {
		if (Arr.length == 0) return alert("队列为空");
		selectSort();
		timer = setInterval(paint, 100); //定时绘制
    }
	
	insertSortBtn.onclick = function() {
		if (Arr.length == 0) return alert("队列为空");
		insertSort();
		timer = setInterval(paint, 100); //定时绘制
    }

    quickSortBtn.onclick = function() {
		if (Arr.length == 0) return alert("队列为空");

		snapshots=[];
		quickSort(Arr, 0, Arr.length-1);

		timer = setInterval(paint, 100); //定时绘制
    }
	
	
	//bug修复:定时器执行的时候将button全部禁用(避免干扰排序过程)
	
	function paint() {
		for(var i=0;i<sortBtns.length;i++){//禁用全部button
			sortBtns[i].disabled = true;
			sortBtns[i].style.backgroundColor = "#ccc";
		}
		var snapshot = snapshots.shift() || [];//每次执行时，将snapshots的第一个数组取出进行渲染
		//alert(snapshot)         //snapshots.shift() 返回取出的元素     
		if (snapshot.length !== 0) {
			fifo(snapshot);
		} else {
			for(var i=0;i<sortBtns.length;i++){//禁用全部button
				sortBtns[i].disabled = false;
				sortBtns[i].style.backgroundColor = "#00f";
		    }
			clearInterval(timer); //绘制结束
			return;
		}
	}

	
})();

