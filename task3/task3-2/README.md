#UI组件之排序表格
[Demo](http://1039958384.github.io/IFE/task3/task3-2/)

## 任务目的
* 练习综合运用HTML、CSS、JavaScript实现局部功能;
* 练习对于代码的抽象与封装;
* 为第四阶段的RIA任务做准备。

## 任务描述
* 实现一个支持列排序的表格组件;
* 提供生成表格的接口，表格中的数据，表格样式尽量低耦合;
* 可以配置对哪些列支持排序功能，并在表头进行排序按钮的显示;
* 提供点击排序按钮后的响应接口，并提供默认的排序方法，当提供的接口没有具体实现时，按默认的排序方法进行排序操作，并更新表格中的数据显示。

## 任务注意事项
* 请注意代码风格的整齐、优雅
* 代码中含有必要的注释
* 可以合理选择使用其它第三方类库，但不建议

## 任务实现说明
### 生成表格的接口
init对象用于定义表格样式、表格数据 以及 配置哪些列可排序。
###　排序按钮的实现
> * 上三角 
``` JavaScript
  span.style.width="0px";
	span.style.height="0px";
	span.style.borderLeft="6px solid transparent";
	span.style.borderRight="6px solid transparent";
	span.style.bottom="10px";
	span.style.borderTop="12px solid #fff";
```
> * 上三角 
``` JavaScript
  span.style.width="0px";
	span.style.height="0px";
	span.style.borderLeft="6px solid transparent";
	span.style.borderRight="6px solid transparent";
  span.style.bottom="10px";
	span.style.borderTop="12px solid #fff";
```
### 排序功能的实现
```JavaScript
//根据数组init.tbTrContent的第二列数据，对整个数组从小到大排序
init.tbTrContent.sort(function(x,y){return x[1]-y[1];});
//根据数组init.tbTrContent的第二列数据，对整个数组从大到小排序
init.tbTrContent.sort(function(x,y){return y[1]-x[1];});
```
