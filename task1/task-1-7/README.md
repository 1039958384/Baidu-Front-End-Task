#响应式网格(栅格化)布局

##任务要求：
使用 HTML 与 CSS 实现类似 BootStrap 的响应式 12 栏网格布局，根据屏幕宽度，元素占的栏数不同。

##任务描述
![效果图](http://7xrp04.com1.z0.glb.clouddn.com/task_1_8_1.png) 

##任务总结

###CSS3媒体查询，实现响应式页面
* @media 查询，可以针对不同的媒体类型定义不同的样式。
* @media 可以针对不同的屏幕尺寸设置不同的样式，特别是设置设计响应式的页面。
* 当重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

@media查询的使用语法

1. 针对不同的媒体，使用不同的样式

> `@media mediatype and|not|only (media feature) {
>     CSS-Code;
> }`

2. 也可以针对不同的媒体使用不同的样式表 :

> `<link rel="stylesheet" media="mediatype and|not|only (media feature)" href="mystylesheet.css">`

###CSS3 box-sizing属性
box-sizing属性可以为三个值之一： content-box（default）， border-box， padding-box。

* content-box: border和padding不计算入width之内

> 浏览器对盒模型的解释遵从 W3C 标准，改变一下 padding 或 border 的值，会导致 box 总尺寸发生变化，想要不影响页面的整体布局，就不得不重新计算 box 的 width值

* padding-box: padding计算入width内

> 改变padding值不会导致 box 总尺寸发生变化，但增加border会加大box总尺寸

* border-box: border和padding计算入width之内

> 浏览器对盒模型的解释与 IE6 相同，它的好处：无论如何改动 border 与 padding 的值，都不会导致 box 总尺寸发生变化，也就不会打乱页面整体布局。

试用这个新属性，Firefox 请使用 -moz-box-sizing，Safari / WebKit 请使用 -webkit-box-sizing，Opera 直接用 box-sizing 即可。

