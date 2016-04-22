(function(){
	/* 数据格式演示
	var aqiSourceData = {
	  "北京": {
		"2016-01-01": 10,
		"2016-01-02": 10,
		"2016-01-03": 10,
		"2016-01-04": 10
	  }
	};
	*/

	// 以下两个函数用于随机模拟生成测试数据
	function getDateStr(dat) {
	  var y = dat.getFullYear();
	  var m = dat.getMonth() + 1;
	  m = m < 10 ? '0' + m : m;
	  var d = dat.getDate();
	  d = d < 10 ? '0' + d : d;
	  return y + '-' + m + '-' + d;
	}
	function randomBuildData(seed) {
	  var returnData = {};
	  var dat = new Date("2016-01-01");
	  var datStr = ''
	  for (var i = 1; i < 92; i++) {
		datStr = getDateStr(dat);
		returnData[datStr] = Math.ceil(Math.random() * seed);
		dat.setDate(dat.getDate() + 1);
	  }
	  return returnData;
	}

	var aqiSourceData = {
	  "北京": randomBuildData(500),
	  "上海": randomBuildData(300),
	  "广州": randomBuildData(200),
	  "深圳": randomBuildData(100),
	  "成都": randomBuildData(300),
	  "西安": randomBuildData(500),
	  "福州": randomBuildData(100),
	  "厦门": randomBuildData(100),
	  "沈阳": randomBuildData(500)
	};

	
	// 用于渲染图表的数据
	var chartData = {};

	// 记录当前页面的表单选项
	var pageState = {
	  nowSelectCity: '北京',
	  nowGraTime: "day"
	}
    
	
	/**
	 * 渲染图表
	 */
	function renderChart() {
        var data=chartData[pageState.nowGraTime][pageState.nowSelectCity];//存储的数据格式有问题？
		var parentDiv=document.getElementById('aqi-chart-wrap');
		parentDiv.innerHTML='';
		parentDiv.innerHTML='<span>'+ pageState.nowSelectCity +'市，01-03月空气质量报告</span>';
		var leftDay=7;
		var leftWeek=40;
		var leftMonth=150;
		for(var prop in data){
			//画柱状图
			var childDiv=document.createElement('div');
			childDiv.style.bottom=0;
			childDiv.style.height=data[prop];
			//改变柱状图的颜色
			if(data[prop]>=300) childDiv.style.backgroundColor='#333';
			else if(data[prop]>=200 && data[prop]<300) childDiv.style.backgroundColor='#f0f';
			else if(data[prop]>=100 && data[prop]<200) childDiv.style.backgroundColor='blue';
			else childDiv.style.backgroundColor='green';
			//给柱状图添加title属性
			childDiv.setAttribute('title',prop+':'+Math.floor(data[prop]));
			parentDiv.appendChild(childDiv);
			//根据粒度确定柱状图的宽度和间距(这里间距=宽度)
			if(pageState.nowGraTime=='day'){
				childDiv.style.width=7;//自定义柱状图的宽度  
				childDiv.style.left=leftDay;
				leftDay=leftDay+14; //自定义柱状图的间距
				parentDiv.style.width=leftDay;//根据数据的数量给父元素设置宽度
			}else if(pageState.nowGraTime=='week'){
				childDiv.style.width=40;
				childDiv.style.left=leftWeek;
				leftWeek=leftWeek+80;
				parentDiv.style.width=leftWeek;
			}else{
				childDiv.style.width=150;
				childDiv.style.left=leftMonth;
				leftMonth=leftMonth+300;
				parentDiv.style.width=leftMonth;
			}
		}
	}

	/**
	 * 日、周、月的radio事件点击时的处理函数
	 */
	function graTimeChange(_this) {
	  // 确定是否选项发生了变化 
      var time=_this.value;
	  if(time != pageState.nowGraTime){
	    // 设置对应数据
		pageState.nowGraTime=time;
		// 调用图表渲染函数
		renderChart();
	  }  
	}

	/**
	 * select发生变化时的处理函数
	 */
	function citySelectChange(_this) {
	  // 确定是否选项发生了变化 
      var city = _this.value;
	  if(city != pageState.nowSelectCity){
		// 设置对应数据
		pageState.nowSelectCity=city;
	    // 调用图表渲染函数
        renderChart();		
	  }
	}

	/**
	 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
	 */
	function initGraTimeForm() {
       var radios=document.getElementsByName('gra-time');
	   for(var i=0;i<radios.length;i++){
		   radios[i].onclick=function(){
			   graTimeChange(this);
		   }
	   }
	}

	/**
	 * 初始化城市Select下拉选择框中的选项
	 */
	function initCitySelector() {
	  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	  var select=document.getElementById('city-select');
	  for(var propName in aqiSourceData){
		  select.innerHTML += '<option>'+ propName +'</option>';
	  }
	  // 给select设置事件，当选项发生变化时调用函数citySelectChange
	  select.onchange=function(){
		  citySelectChange(this);
	  }
	}

	/**
	 * 初始化图表需要的数据格式
	 */
	function initAqiChartData() {
	  // 将原始的源数据处理成图表需要的数据格式
	  var week={};
	  var month = {};
	  for(var p1 in aqiSourceData){ 
		  var data=aqiSourceData[p1];
		  //周求和与累加
		  var weekCount=0;
		  var weekDataSum=0;
		  var weekKey=0;
		  var singleWeek={};//遍历计算前清零，不清零每个城市得到的数据就一样了,为什么？？
		  //月求和与累加
		  var monthCount=0;
		  var monthDataSum=0;
		  var monthKey=0;
		  var singleMonth = {};
		  var monthArr = Object.getOwnPropertyNames(data);//返回一个由data对象的所有自身属性的属性名组成的数组
		  var tempMonth=monthArr[0].slice(5,7);
		  //数据遍历
		  for(var p2 in data){
			//得到周数据  
            weekDataSum += data[p2];
			weekCount++;
			if(weekCount %7 == 0){
				weekKey=p2.substring(0,4)+'年'+'第'+weekCount/7+'周';
				singleWeek[weekKey]=weekDataSum/7;
				weekDataSum=0;
			}
			//得到月数据
			if(tempMonth != p2.substring(5,7)){
				monthKey= p2.substring(0,4)+'年'+tempMonth+'月';
				singleMonth[monthKey]=monthDataSum/monthCount;
				monthDataSum=data[p2];
				monthCount=1;
			    tempMonth=p2.substring(5,7);
			}else{
                monthDataSum += data[p2];
			    monthCount++;
			}//---到此只能统计到两个月的值
            if(tempMonth == monthArr[monthArr.length-1].slice(5,7)){//统计最后一个月的值
			   monthKey= p2.substring(0,4)+'年'+tempMonth+'月';
			   singleMonth[monthKey]=monthDataSum/monthCount;
			}		
		  }
		week[p1]=singleWeek; 
		month[p1]=singleMonth;
	  }
	  // 处理好的数据存到 chartData 中
	  chartData['day']=aqiSourceData;
	  chartData['week']=week; //每个城市得到的数据相同
	  chartData['month']=month;//每个城市得到的数据相同
	  renderChart();//默认显示北京每天的柱状图
	}

	/**
	 * 初始化函数
	 */
	function init() {
	  initGraTimeForm()
	  initCitySelector();
	  initAqiChartData(); 
	}

	init();
    
	
})();
