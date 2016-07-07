#JavaScript处理字符串,实现文本的模糊匹配

[Demo]( http://1039958384.github.io/IFE/task-2-7)

## 任务描述
* 基于 task-2-5 进行升级
* 将新元素输入框从input改为textarea
* 允许一次批量输入多个内容，格式可以为数字、中文、英文等，可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为不同内容的间隔
* 增加一个查询文本输入框，和一个查询按钮，当点击查询时，将查询词在各个元素内容中做模糊匹配，将匹配到的内容进行特殊标识，如文字颜色等。举例，内容中有abcd，查询词为ab或bc，则该内容需要标识

## 任务实现
* 使用正则表达式分割输入的字符串, 得到每次输入的字符串数组 array<br>

>    reg=/[^0-9a-zA-Z\u4e00-\u9fa5]/;//非数字、非中英文的都是分隔符<br>
>		  array=value.split(reg); 

 
* 把每次输入得到的数组 array 放入队列 Arr 中<br>

* 遍历数组 Arr ,使用字符串数组的 search()方法对 Arr 中的每一项按照关键词 value 进行模糊匹配<br>

>  var index = Arr[i].search(value); //遍历匹配项<br>
> 	if(index != -1) { //存在匹配项时，改变样式 <br> 
>  <pre><code> var reg = new RegExp(value,"g"); //使用构造函数的方式可以根据字符串变量声明正则表达式 <br>
> 	      var inner=cSpan.innerHTML.replace(reg,"<span style=background:red>"+value+"</span>");<br>
> 		     //cSpan.innerHTML.replace(value,"<span style=background:red>"+value+"</span>"); :只能匹配到第一个<br>
> 	  	    cSpan.innerHTML=inner;</pre></code>
>		}

## 任务总结
详见[我的博客](http://blog.csdn.net/ll_xiaohanqing_91/article/details/51045920)
