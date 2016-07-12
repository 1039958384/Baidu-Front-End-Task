# UI组件之冻结行列表格
[Demo](http://1039958384.github.io/IFE/task3/task3-3/)

## 任务目的
* 练习综合运用HTML、CSS、JavaScript实现局部功能;
* 练习对于代码的抽象与封装;
* 为第四阶段的RIA任务做准备。

## 任务描述
* 实现一个支持首行冻结的表格组件;
* 当页面向下滚动，使得第一行已经在屏幕外时，则第一行则变成始终固定在屏幕最上方;
* 当整个表格都滚动出屏幕时，固定的第一行也消失。

## 任务实现说明
借助于 scroll 事件 以及 css 中的定位实现该功能：

当触发 scroll 事件时，判断 浏览器视口的上边沿 与 表格的上、下边沿的相对位置
> * 当浏览器视口上边沿 还未接触到表格上边沿 时, 表头的 position 为默认值 static；
> * 当浏览器视口的上边沿在表格的上、下边沿之间时 将表头的 position 设为 fixed (固定定位),top值设置为0;
> * 当表格离开浏览器视口时，将表头的 position 设为 absolute (绝对定位)，top值仍然为 0 , 此时表格在视口中消失 ;

```JavaScript
addHandler(window,"scroll",function(){
			var scrollTop = document.documentElement.scrollTop|| document.body.scrollTop;
			if(scrollTop < table.offsetTop){//视口还未接触到表格上边沿
				thead.style.position="static";
			}else if(scrollTop >= table.offsetTop && scrollTop <= table.offsetTop + table.offsetHeight){
				thead.style.position="fixed";    //(视口上边沿在表格的上、下边沿之间时 )
				thead.style.top=0;
				thead.style.left=table.offsetLeft;
			}else {//表格离开视口
				thead.style.position = 'absolute';//为了让表格不回退---
				                        //重新设置为static时表格会回退，表头会来回闪
			}
	})
```
		
