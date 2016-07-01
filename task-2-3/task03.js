/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {

    var inputCity=document.getElementById('aqi-city-input');
	var inputValue=document.getElementById('aqi-value-input');
	var aqiList=document.getElementById('aqi-list');
	
	//btn.onclick=function(){
		var cityValue=trim(inputCity.value);
	    var valueValue=trim(inputValue.value);
		
		if(cityValue!='' && valueValue!=''){
			
			//对输入的城市名和空气质量进行验证(利用正则表达式)
			flagCity=cityValue.match(/^[\u4e00-\u9fa5]+|[a-zA-Z]+$/);//中文或英文字符
			flagValue=valueValue.match(/^\d{1,3}$/);
			
			//根据匹配结果处理
			if(flagCity && flagValue){
				//将合法数据添加到 aqiData 中
				//aqiData.cityValue = valueValue;//-----赋值出错-----//
				//cityValue本来是字符串，这样赋值就变成了变量
				aqiData[cityValue] = valueValue;//----正确赋值方式----//
				
			}else if(!flagCity){//输入不合法是提醒
				alert('城市名必须为中英文字符');
			}else{
				alert('空气质量指数必须为整数');
			}	
		}

	//}
	
	//对输入进行前后去空格及空字符处理trim
	function trim(str){//兼容低版本IE
	    return str.replace(/(^\s*)|(\s*$)/g,"");//将空格替换成什么都没有
	}
	
}

/**
 * 渲染aqi-table表格
 */

function renderAqiList() {
	var oTable=document.getElementById('aqi-table');

	if(!isEmptyObject(aqiData)){//如何判断aqiData是不是空对象

		//先清空之前的表格，再给表格动态添加aqiData对象中现有的数据
		oTable.innerHTML='';
			
		//创建表头
		var oTr=document.createElement('tr');
		
		var oTd1=document.createElement('td');
		oTd1.innerHTML='城市';
		oTr.appendChild(oTd1);
		
		var oTd2=document.createElement('td');
		oTd2.innerHTML='空气质量';
		oTr.appendChild(oTd2);
		
		var oTd3=document.createElement('td');
		oTd3.innerHTML='操作';
		oTr.appendChild(oTd3);
		
		oTable.appendChild(oTr);
   			
			
		//创建表格数据
		for (var propName in aqiData) {//propName: aqiData[propName]
			var oTrin=document.createElement('tr');
			
			var oTd1in=document.createElement('td');
			oTd1in.innerHTML =propName;
			oTrin.appendChild(oTd1in);
			
			var oTd2in=document.createElement('td');
			oTd2in.innerHTML = aqiData[propName];
			oTrin.appendChild(oTd2in);
			
			var oTd3in=document.createElement('td');
			oTd3in.innerHTML = '<button onclick="delBtnHandle(this)">删除</button>';
			oTrin.appendChild(oTd3in);
			
			oTable.appendChild(oTrin);

		}
	}else{

		oTable.innerHTML='';
	}

    //判断对象是否为空
	function isEmptyObject(obj) {
		for (var key in obj) {
		    return false;
		}
		    return true;
	}  
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(_this) {
  //找到点击button对应的城市名，然后删除aqiData对应的属性
   //alert('');//---由于renderAqiList()函数中oTable.innerHTML='',很快被执行到，因此弹窗没有效果
   
   var city=_this.parentNode.previousSibling.previousSibling.innerHTML;
   delete aqiData[city];

   renderAqiList();
}

function init() {
	
    var btn=document.getElementById('add-btn');
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  	btn.onclick=function(){
		 addBtnHandle();

        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	    //取得表格中的所有button
	  //   var obtns=document.getElementsByTagName('button');//----这里等页面加载完时，只有一个button，
	  //   var btnDels=[];                                  //----只有删除功能放在btn事件绑定函数中才能执行到
	  //   for(var i=1;i<obtns.length;i++){
	  //       btnDels[i-1]=obtns[i];
	  //   }

	     //给表格中的button添加事件
	 	 // for (var i=0;i<btnDels.length;i++){ //触发事件只能执行一次？？因为只有点击btn的时候才会执行到
		 //     btnDels[i].onclick=function(){    //不点击btn时，该段无法执行
	     //         delBtnHandle(this);//只能删除一行，删除不了表头？？
		 //     }
		 //   btnDels[i].setAttribute('onclick','delBtnHandle(this)');  //仍然只能删除一行 ？？？
	  //   }

	  /*
	  var oTable=document.getElementById('aqi-table');
	  oTable.onclick=function(e){
	       if(e.target.nodeName=='button') {
	           oTable.removeChild(e.target.parentNode.parentNode); 
	       }
	  }
	  */

	   
	}
  
}    

	
init();



	



