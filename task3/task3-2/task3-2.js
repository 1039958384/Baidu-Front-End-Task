
(function(){
	
	var table = document.getElementById("tb");

	/*表格样式及表格数据的初始化对象*/
	var init = {
		border: "2px solid #ccc",  //表格单元格样式
		tdWidth: "150px",
		tdHeight: "50px",
		fontSize: "18px",
		lineHeight: "50px",
		
		thTrBackground: "#333", //表头样式
		thTdColor: "#fff",
		thTdFontWeight: "bold",
		
		rowNum: "5",   
		colNum: "5",
		thTrContent : ["姓名","语文","数学","英语","总分"],//表头数据
		tbTrContent : [
		                ["小明",80,90,70,240], //表格主体每行的数据
						["小红",60,90,90,240],
						["小亮",70,100,60,230],
						["小文",90,80,80,250]
		              ]
	};

	createThead();//创建表头
	createTbody();//创建表格主体
	
	function createThead(){
		var thead = document.createElement("thead");
		var tr = document.createElement("tr");
		tr.style.background = init.thTrBackground;
		
		//添加数据
		for (var i=0; i<init.colNum; i++){
			var td = document.createElement("td");
			
			addTdStyle(td);//td的通用样式
			//表头td的特殊样式
			td.style.fontWeight = init.thTdFontWeight;
			td.style.color = init.thTdColor;
			
			var tdText = document.createTextNode(init.thTrContent[i]);
			td.appendChild(tdText);
			
			//给指定的表头中的td添加排序功能
			td.style.position = "relative";
		    td.style.top = "0px";
		    td.style.left = "0px";
			if(i>=1){//给后四个td添加排序按钮
				addupTria(td);
				addlowTria(td);
			}
			
			tr.appendChild(td);
		}
		thead.appendChild(tr);
		table.appendChild(thead);
	}
	
	function createTbody(){
		var tbody = document.createElement("tbody");
		for(var i=0; i<init.rowNum-1; i++){//创建tr
			var tr = document.createElement("tr");
			for(var j=0; j<init.colNum; j++){//创建td
				var td = document.createElement("td");
			    addTdStyle(td);//给td设置样式
				var tdText = document.createTextNode(init.tbTrContent[i][j]);
				td.appendChild(tdText);
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);
	}
	
	//给所有td设置统一样式
	function addTdStyle(td){
		td.style.width = init.tdWidth;
		td.style.height = init.tdHeight;
		td.style.fontSize = init.fontSize;
		td.style.lineHeight = init.lineHeight;
		td.style.border = init.border;
	}
	
	//设置上三角样式
    function addupTria(td){
		var span = document.createElement("span");
		
		addTria(span,true);//从小到大排序
		
		span.style.top="10px";
		span.style.borderBottom="12px solid #fff";
		
		td.appendChild(span);
	}
	
	//设置下三角样式
	function addlowTria(td){
		var span = document.createElement("span");
		
		addTria(span,false);//从大到小排序
		
		span.style.bottom="10px";
		span.style.borderTop="12px solid #fff";
		
		td.appendChild(span);
	}
	
	//给td添加三角的基础样式和排序功能
	function addTria(span,flag){
		span.style.position="absolute";
		span.style.right="30px";
		span.style.display="inline-block";
		span.style.width="0px";
		span.style.height="0px";
		span.style.borderLeft="6px solid transparent";
		span.style.borderRight="6px solid transparent";
		span.style.cursor="pointer";
		
		//点击上下三角实现：该列数据排序
		addHandler(span,"click",function(){
			//获取该列索引
			var index = init.thTrContent.indexOf(this.parentNode.innerText);//得到点击列数的索引值
			//------------需要考虑的问题---innerText的兼容性
			//获取该列数据
			var temp=[];
			for(var i=0;i<init.rowNum-1;i++){
				temp.push(init.tbTrContent[i][index]);
			}
	
			//根据temp中的值，对init.tbTrContent的行进行排序
			if(flag){//flag=true时从小到大排序
				init.tbTrContent.sort(function(x,y){return x[index]-y[index];});
			}else{//否则相反
				init.tbTrContent.sort(function(x,y){return y[index]-x[index];});
			}	
			//javascript二维数组按照指定字段排序
			//init.tbTrContent.sort(function(x,y){return x[index]-y[index];});
			//这种排序方法对二维数组整体根据index维进行了排序
			
			//根据拍完序的init.tbTrContent重新渲染tbody
			table.removeChild(this.parentNode.parentNode.parentNode.nextSibling);//移除"tbody"
			createTbody();
		});
	}
	
	
	//------事件绑定浏览器兼容性处理--------//
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
