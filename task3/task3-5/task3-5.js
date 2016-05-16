(function(){
	
	var getDate      = document.getElementsByName("getDate")[0],
		calendar     = document.getElementById("calendar"),
		echo         = document.querySelector(".echo"),
	
	    prevMonthBtn = document.querySelector(".left"),
	    nextMonthBtn = document.querySelector(".right"),
	
        table        = document.getElementById("tb"),
	    th           = ["日","一","二","三","四","五","六"],
	    tb           =[];//存储表格数据
		
	
	getDate.value="";
	//点击文本框实现日历面板显示和隐藏的切换
	addHandler(getDate,"click",function(){
		if(calendar.style.display == "block"){
			calendar.style.display="none";
		}else{
			calendar.style.display="block";
		}
	});
	
	//设定日期接口
	//默认情况下日历显示当前日期
	var date = new Date;
	var year = date.getFullYear(); //得到当前年份
	var month = date.getMonth()+1; //得到当前月份
	
	//获取日期接口
	var selMonth=month;   //存储当前日历中选中的月
	var selYear=year;     //存储当前日历中选中的年份
	var selDay;         //存储当前日历中选择的天
	
	//产生设定日期对应的日历	
	getEcho();
	tbodyData(selYear,selMonth);
	genTable();
	
	//点击左右三角，切换到上一月或下一月
	addHandler(prevMonthBtn,"click",prevDay);
	addHandler(nextMonthBtn,"click",nextDay);
    
	//在文本框中显示用户选择的日期
	function getSelDate(){
		if(parseInt(selMonth)<=9){
			if(parseInt(selDay)<=9){
				getDate.value="0"+selMonth +"/0"+selDay+"/"+selYear;
			}else{
				getDate.value="0"+selMonth +"/"+selDay+"/"+selYear;
			}
		}else{
		   getDate.value= selMonth +"/"+selDay+"/"+selYear;
		}
		callback();
	}
	
	//用户选择完日期后的回调函数
	function callback(){
		//alert("执行回调函数")
	}
	
	//点击左三角的处理函数
	function prevDay(){
		if(selMonth == 1){
			selMonth = 12;
			selYear = selYear-1;
		}else{
			selMonth = selMonth-1;
			selYear = selYear;
		}
		//更新日历
		getEcho();
		tbodyData(selYear,selMonth);
		//根据tb的值重新渲染日历表格
		table.removeChild(document.getElementsByTagName("thead")[0]);
		table.removeChild(document.getElementsByTagName("tbody")[0]);
        genTable();
	}
	
	//点击右三角的处理函数
	function nextDay(){
		if(parseInt(selMonth) == 12){
			selMonth = 1;
			selYear = parseInt(selYear)+1;
		}else{
			selMonth = parseInt(selMonth)+1;
			selYear = selYear;
		}
		//更新日历
		getEcho();
		tbodyData(selYear,selMonth);
		//根据tb的值重新渲染日历表格
		table.removeChild(document.getElementsByTagName("thead")[0]);
		table.removeChild(document.getElementsByTagName("tbody")[0]);
        genTable();
	}
	
	//产生日历表格tb数据
	function tbodyData(year,month){	
		var selDate = new Date(year,month);
	   //得到该月的天数
		var days = selDate.getUTCDate();
	   //得到该月的1号是星期几
	    //Date对象的getDay()方法,返回日期是星期几:0-6
		var week = new Date(year,month-1,1).getDay();
		
	   //得到表格的初始化数据
		//声明二维数组的方式
		for(var i=0;i<6;i++){
			tb[i]=[];
		}
		
		//得到数组的第一行
		tb[0][week]=1;
		var preDays = new Date(year,month-1).getUTCDate();
		for(var i=0;i<7;i++){
			if (i<week){//不可选日期
				//tb[0][i]=preDays-week+1+i;
                tb[0][i]="";				
			}else if(i>week){
				tb[0][i]=tb[0][i-1]+1;
			}
		}
		//得到后面的数据
	    for (var i=1;i<6;i++){
			for (var j=0; j<7; j++){
				if(j==0){
					tb[i][j]= tb[i-1][6]+1;
				}else{
					tb[i][j]= tb[i][j-1]+1;
				}
                if(tb[i][j] >= days){//不可选日期
					//tb[i][j] = tb[i][j]-days;
					return;
				}								
			}
		}
	}
	
	//根据表格数据动态产生日历表格
	function genTable(){
		createThead();//创建表头
	    createTbody();//创建表格主体
		
		function createThead(){
			var thead = document.createElement("thead");
		    var tr = document.createElement("tr");
			
			for (var i=0; i<th.length; i++){
				var td = document.createElement("td");
				var tdText = document.createTextNode(th[i]);
				td.appendChild(tdText);
				tr.appendChild(td);
			}
			thead.appendChild(tr);
			table.appendChild(thead);
		}
		
		function createTbody(){
			var current_td=[];//存储本月的td元素
			
			var tbody = document.createElement("tbody");
		    for(var i=0; i<tb.length; i++){
				//创建tr
				var tr = document.createElement("tr");
				for(var j=0; j<tb[i].length; j++){
					//创建td
					var td = document.createElement("td");
					var tdText = document.createTextNode(tb[i][j]);
					td.appendChild(tdText);
	
					if(i==0 && tb[i][j]==""){ 
					    td.style.color="#fff"; 
					}else if(i>3 && tb[i][j]<20){ 
					    td.style.color="#fff"; 
					}else{//将本月的td添加临时数组
						current_td.push(td);						
					}
					tr.appendChild(td);
				}
				tbody.appendChild(tr);
			}
			
			//给本月日期添加点击事件的处理函数
			for(var i=0;i<current_td.length;i++){
				addHandler(current_td[i],"mouseover",function(){
					this.style.backgroundColor="#c9c";
					this.style.color="#fff";
				});
				addHandler(current_td[i],"mouseout",function(){
					clearColor();
				});
				
				addHandler(current_td[i],"click",function(){
					selDay = this.innerHTML;
					calendar.style.display="none";
					getSelDate();
				});
			}
			function clearColor(){
				current_td.forEach(function(element){
					element.style.backgroundColor="#fff";
					element.style.color="#636";
				});
			}
			table.appendChild(tbody);
		}
	}
	
	//获取当前年月
	function getEcho(){
		if(parseInt(selMonth)<=9){
			echo.innerHTML=selYear+"年0" + selMonth +"月";
		}else{
		   echo.innerHTML=selYear+"年" + selMonth +"月";
		}
	}
	
	//事件绑定浏览器兼容性处理
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
