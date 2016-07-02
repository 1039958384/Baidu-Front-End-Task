#三栏式布局

要求：左右两栏宽度固定，中间一栏根据父元素宽度填充满，父元素高度取决于三个子元素中最高的高度。

采用两种方法用CSS实现了三栏式布局，下面分别介绍一下这两种方法

##方法一：
* 左列：float:left；  
* 右列：float:right;  
* 中间列：margin-left:左宽度，margin-right:右宽度；
* 父元素：overflow:hidden(清除浮动)
* 具体文件见：index.html及index.css 
* [方法一的demo](http://1039958384.github.io/IFE/task1/task-1-3/)

##方法二：又称为双飞翼布局
* 父元素：overflow:hidden;
* 中间列：float:left;   width:100%;    padding:0 220px 0 190px;
* 左列：  float:left;   width:190px;   position:relative;left:-190px;
* 右列：  float:left;   width:220px;   position:relative;right:-220px;
* 具体文件见：index1.html及index1.css 
* [方法二的demo](http://1039958384.github.io/IFE/task1/task-1-3/index1.html)

##两种方法的区别
* 由于方法二三列全使用float定位，当浏览器缩小到一定范围，三列布局会变为两列甚至一列
* 而方法一中，中间列未采用float定位，所以无论浏览器怎么缩小，仍然是三列布局，只是中间列的宽度会越来越窄。

## 使用float、position布局,元素层叠规则总结

CSS有一个 z-index 属性，允许层叠元素。

在没有指定 z-index 属性的情况下，所有元素默认在0层渲染。当多个元素的 z-index 属性相同时，将按照以下顺序布局：
* 普通流(无定位)里的块元素将按其在HTML中出现的顺序堆叠，即：后出现的元素叠放在先出现的元素的前面。
* 定位元素也是按照其在HTML中出现的顺序堆叠
* 当普通流里的块元素、浮动元素、定位元素叠放在了一起时，堆叠顺序为：普通元素 < 浮动元素 < 定位元素，即：浮动元素堆叠在普通元素和定位元素之间，定位元素放在最前面。

在指定 z-index 属性的情况下（z-index属性仅在定位元素上定义时才有效），元素将一律按照 z-index 属性值的顺序叠放：z-index 属性值大的元素叠放在属性值小的元素的前面  ，z-index 值越小，表示距离观察者越远，相反 z-index 值越大，表示距离观察者越近。 
