# 用JavaScript 处理字符串

[Demo](http://1039958384.github.io/IFE/task-2-8/)

## 任务描述
* 基于任务20，将任务20的代码进行抽象、封装，然后在此基础上实现如图中的两个需求：Tag输入和兴趣爱好输入
* 如示例图上方，实现一个tag输入框
* 要求遇到用户输入空格，逗号，回车时，都自动把当前输入的内容作为一个tag放在输入框下面。
* Tag不能有重复的，遇到重复输入的Tag，自动忽视。
* 每个Tag请做trim处理
* 最多允许10个Tag，多于10个时，按照录入的先后顺序，把最前面的删掉
* 当鼠标悬停在tag上时，tag前增加删除二字，点击tag可删除
* 如示例图下方，实现一个兴趣爱好输入的功能
* 通过一个Textarea进行兴趣爱好的输入，可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为间隔。
* 当点击“确认兴趣爱好”的按钮时，将textarea中的输入按照你设定的间隔符，拆解成一个个的爱好，显示在textarea下方
* 爱好不能重复，所以在下方呈现前，需要做一个去重
* 每个爱好内容需要做trim处理
* 最多允许10个兴趣爱好，多于10个时，按照录入的先后顺序，把最前面的删掉

## 数组去重问题总结
本任务中的数组去重比较简单：每次往数组中添加元素时，先判断数组中是否已经存在(indexOf)与该元素相同的元素，存在时便不再添加,否则将改元素添加到数组中。<br>

对于给定数组的去重问题：
1. 如果数组中存在function，直接判断是否相等是不行的，可以toString()一下，再进行比较。
2. 如果碰到Object，就继续做循环。
3. 如果数组中会出现null 或者 undefine，判断相等时，使用强等于(===)。

* 测试用例：<br>

>  arr = ["1",3,"1",1,4,5,1,"2",5,1,{"name":"li","age":20},2,4,3,{"name":"li","age":20},""];<br>

### 方法一：借助于临时数组与indexOf , 算法复杂度为:O(n^2)
<pre><code> `
function unique1(arr){
var temp = [];
for(var i=0; i<arr.length; i++){
		if(temp.indexOf(arr[i]) == -1){
			temp.push(arr[i]);
		}
}
return temp;
} `
</pre></code>

* 测试结果：<br>

>  unique1(arr) ： ["1", 3, 1, 4, 5, "2", Object { name="li",  age=20}, 2, Object { name="li",  age=20}, ""]<br>

* bug 无法区分对象

### 方法二 ： 用JavaScript中的Object对象来当作哈希表，可以去重完全由 Number 基本类型组成的数组
<pre><code> `
function unique2(arr){
	var temp=[];
	var hash={};
    for(var i=0; i<arr.length;i++){
		if(!hash[arr[i]]){
			hash[arr[i]]=true;
			temp.push(arr[i]);
		}
	}
    return temp;	
}
 `
</pre></code>

* 测试结果：<br>

>  unique2(arr) ： ["1", 3, 4, 5, "2", Object { name="li",  age=20}, ""]<br>

* bug : 无法区分： 1 和 "1"
* 修改

<pre><code> `
function unique2(arr){
	var temp=[];
	var hash={};
    for(var i=0; i<arr.length;i++){
  	        var item = arr[i];
		var key = typeof(item)+item;
		if(!hash[key]){
			hash[key]=true;
			temp.push(arr[i]);
		}
	}
    return temp;	
}
 `
</pre></code>

* 测试结果：<br>

>  unique2(arr) ： ["1", 3, 1, 4, 5, "2", Object { name="li",  age=20}, 2, ""]<br>
