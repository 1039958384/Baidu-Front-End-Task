(function(){
	
	var monthSel     = document.getElementsByName("month")[0],
	    yearSel      = document.getElementsByName("year")[0],
		getDate      = document.getElementsByName("getDate")[0],
	
	    prevMonthBtn = document.querySelector(".left"),
	    nextMonthBtn = document.querySelector(".right"),
	
        table        = document.getElementById("tb"),
	    th           = ["日","一","二","三","四","五","六"],
	    tb           =[];//存储表格数据
		
	
//-----------------------配置信息---------------------------//
	
	//设定日期接口----默认情况下日历显示当前日期
	var date = new Date;
	var year = date.getFullYear(); //得到当前年份
	var month = date.getMonth()+1; //得到当前月份
	var day = date.getDate();
	
	//获取日期接口
	var selMonth=month; //存储当前日历中选择的天
	var selYear=year;   //存储当前日历中选中的月
	var selDay= day;   //存储当前日历中选中的年份
	getSelDate();//选中的日期在输入框中显示
	
	//配置可选日期的上下限
	var firstYear = 2049;
	var lastYear = 1949;
	
	
	
//-------------------------主程序---------------------------//
	//根据设定日期产生日历面板
	genMonth(month);
	genYear(year);
	tbodyData(year,month);
	genTable();
	
	//用户改变年月时，动态更新日历表格
	addHandler(monthSel,"change",selectDay);
	addHandler(yearSel,"change",selectDay);
	
	//点击左右三角，切换到上一月或下一月
	addHandler(prevMonthBtn,"click",prevDay);
	addHandler(nextMonthBtn,"click",nextDay);

	
	
//-------------------------功能函数---------------------------//
	//用户改变年月时的处理函数
	function selectDay(){
		var month = monthSel.value;
		var year = yearSel.value;
		
		//显示选中的日期
		selMonth=month;
		selYear=year;
		getSelDate();
		
		//更新日历
		tbodyData(year,month);
		//根据tb的值重新渲染日历表格
		table.removeChild(document.getElementsByTagName("thead")[0]);
		table.removeChild(document.getElementsByTagName("tbody")[0]);
        genTable();
		
	}
	
	//点击左三角的处理函数
	function prevDay(){
		var prevMonth,
		    prevYear;
		if(monthSel.value == 1){
			prevMonth = 12;
			prevYear = yearSel.value-1;
		}else{
			prevMonth = monthSel.value-1;
			prevYear = yearSel.value;
		}
		
		//显示选中的日期
		selMonth=prevMonth;
		selYear=prevYear;
		getSelDate();
		
		//更新日历
		genMonth(prevMonth);
	    genYear(prevYear);
		tbodyData(prevYear,prevMonth);
		//根据tb的值重新渲染日历表格
		table.removeChild(document.getElementsByTagName("thead")[0]);
		table.removeChild(document.getElementsByTagName("tbody")[0]);
        genTable();
	}
	
	//点击右三角的处理函数
	function nextDay(){
		var nextMonth,
		    nextYear;
		if(parseInt(monthSel.value) == 12){
			nextMonth = 1;
			nextYear = parseInt(yearSel.value)+1;
		}else{
			nextMonth = parseInt(monthSel.value)+1;
			nextYear = yearSel.value;
		}
		
		//显示选中的日期
		selMonth=nextMonth;
		selYear=nextYear;
		getSelDate();

		//更新日历
		genMonth(nextMonth);
	    genYear(nextYear);
		tbodyData(nextYear,nextMonth);
		//根据tb的值重新渲染日历表格
		table.removeChild(document.getElementsByTagName("thead")[0]);
		table.removeChild(document.getElementsByTagName("tbody")[0]);
        genTable();
	}
	
	//产生月菜单
	function genMonth(month){
		monthSel.innerHTML="";
		var html="";
		for (var i=1;i<13;i++){
			if(i == month){
				html+= "<option selected='selected'>"+ i +"</option>";
			}else{
				html+= "<option>"+ i +"</option>";
			}	
		}
		monthSel.innerHTML=html;
	}
	//产生年菜单
	function genYear(year){
		yearSel.innerHTML="";
		var html="";
		for (var i=firstYear;i>lastYear;i--){
			if(i == year){
				html+= "<option selected='selected'>"+ i +"</option>";
			}else{
				html+= "<option>"+ i +"</option>";
			}
		}
		yearSel.innerHTML=html;
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
		var preDays = new Date(year,month-1).getUTCDate();
		
		//得到数组的第一行
		if(week == 0){
			for(var i=0;i<7;i++){
				tb[0][i]= preDays-6+i;
			}
		}else{
			tb[0][week]=1;
			for(var i=0;i<7;i++){
				if (i<week){//上月日期
					tb[0][i]=preDays-week+1+i;				
				}else if(i>week){
					tb[0][i]=tb[0][i-1]+1;
				}
			}
		}
		
		//得到后面的数据
	    for (var i=1;i<6;i++){
			for (var j=0; j<7; j++){
				if(week==0) tb[1][0]=1;
				else tb[1][0]=tb[0][6]+1;
				
				if(j==0 && i!=1){
					tb[i][j]= tb[i-1][6]+1;
				}else{
					tb[i][j]= tb[i][j-1]+1;
				}

                if(tb[i][j] > days){//下月日期
					tb[i][j] = tb[i][j]-days;
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
			var preMonth_td=[];//存储上月的td元素
			var nextMonth_td=[];//存储下月的td元素
			
			var tbody = document.createElement("tbody");
		    for(var i=0; i<tb.length; i++){
				//创建tr
				var tr = document.createElement("tr");
				for(var j=0; j<tb[i].length; j++){
					//创建td
					var td = document.createElement("td");
					var tdText = document.createTextNode(tb[i][j]);
					td.appendChild(tdText);
	
					if(i==0 && tb[i][j]>7){ //将上月的td添加临时数组
					    td.style.color="#999";
                        preMonth_td.push(td);						
					}else if(i>3 && tb[i][j]<20){ //将下月的td添加临时数组
					    td.style.color="#999";
                        nextMonth_td.push(td);						
					}else{//将本月的td添加临时数组
					    if(tb[i][j]==selDay){
							td.style.backgroundColor="#c9c";
					        td.style.color="#fff";
						}
						current_td.push(td);						
					}
					tr.appendChild(td);
				}
				tbody.appendChild(tr);
			}
			
			//给本月日期添加点击事件的处理函数
			for(var i=0;i<current_td.length;i++){
				addHandler(current_td[i],"click",function(){
					clearColor(current_td);
					selDay = this.innerHTML;
					getSelDate();
					this.style.backgroundColor="#c9c";
					this.style.color="#fff";
				});
			}
			
			//给上月日期添加点击事件的处理函数
			for(var i=0;i<preMonth_td.length;i++){
				addHandler(preMonth_td[i],"click",function(){
					selDay = this.innerHTML;
					
					prevDay();
					
					getSelDate();
					this.style.backgroundColor="#c9c";
					this.style.color="#fff";
				});
			}
			//给下月日期添加点击事件的处理函数
			for(var i=0;i<nextMonth_td.length;i++){
				addHandler(nextMonth_td[i],"click",function(){
					selDay = this.innerHTML;
					
					nextDay();
					
					getSelDate();
					this.style.backgroundColor="#c9c";
					this.style.color="#fff";
				});
			}
			
			function clearColor(arr){
				arr.forEach(function(element){
					element.style.backgroundColor="#fff";
					element.style.color="#636";
				});
			}
			table.appendChild(tbody);
		}
	}
	
	//获取选中的日期并在页面上显示
	function getSelDate(){
		if(parseInt(selMonth)<=9){
			if(parseInt(selDay)<=9){
				getDate.value=selYear+"年0" + selMonth +"月0"+selDay+"日";
			}else{
				getDate.value=selYear+"年0" + selMonth +"月"+selDay+"日";
			}
		}else{
		   getDate.value=selYear+"年" + selMonth +"月"+selDay+"日";
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
