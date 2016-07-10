# JavaScript实现 DOM 多叉树的 添加节点和删除节点功能
[Demo](http://1039958384.github.io/IFE/task-2-11/)

## 任务描述
* 基于 task-2-11 ，添加节点的选择、增加与删除的功能
* 点击某个节点元素，则该节点元素呈现一个特殊被选中的样式
* 增加一个删除按钮，当选中某个节点元素后，点击删除按钮，则将该节点及其所有子节点删除掉
* 增加一个输入框及一个“添加”按钮当选中某个节点元素后，点击增加按钮，则在该节点下增加一个子节点，节点内容为输入框中内容，插入在其子节点的最后一个位置


## 将类数组对象转换为数组的方法总结

实际中常常遇到的类数组对象：DOM 操作返回的 NodeList 集合,以及函数内部的arguments对象

* ES5的写法：

<pre><code>
` var Arr = [].slice.call(arrayLike); `
</pre></code>

* ES6的扩展方法:
<pre><code>
` var Arr = Array.from(arrayLike); `
</pre></code>

* 本任务中想到的方法：
<pre><code>
`var Arr = [];
for (var i=0; i<arrayLike.length; i++)
{
		Arr.push(arrayLike[i]);
}`
</pre></code>
