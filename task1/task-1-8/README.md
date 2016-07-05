#Flexbox布局学习
本任务综合运用了Flexbox布局和媒体查询
##Flexbox布局
Flex是Flexible Box的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
任何一个容器都可以指定为Flex布局。
> `.box{
  display: flex;
}`

行内元素也可以使用Flex布局:
>`.box{
  display: inline-flex;
}`

###利用flexbox布局可以非常简单地实现 元素(.child) 在 容器(.parent) 中水平垂直居中
> `.parent{
    display : flex;
    height:500px;
} 
  .child{
    margin:auto;
    width:100px;
    height:100px;
}`

## Flexbox布局常用到的属性及其说明
###  以下6个常用属性设置在容器(包含块)上
* flex-direction
* flex-wrap
* flex-flow
* justify-content
* align-items
* align-content

flex-direction属性
flex-direction属性：决定主轴的方向（即被包含项目的排列方向）。
它可能有4个值。

> row（默认值）：主轴为水平方向，起点在左端。<br>
> row-reverse：主轴为水平方向，起点在右端。<br>
> column：主轴为垂直方向，起点在上沿。<br>
> column-reverse：主轴为垂直方向，起点在下沿。

flex-wrap属性
默认情况下，被包含项都排在一条线（又称"轴线"）上(主轴为row时，都在一行上)
flex-wrap属性定义，如果一条轴线排不下，如何换行。

> 即flex-wrap属性默认值为nowrap，表示不换行<br>
> wrap：换行，第一行在上方。<br>
> wrap-reverse：换行，第一行在下方。

flex-flow属性是flex-direction属性和flex-wrap属性的简写形式

> 默认值为row nowrap

justify-content属性
justify-content属性定义了被包含项在主轴上的对齐方式

> flex-start（默认值）：在主轴的起始位置对齐<br>
> flex-end：在主轴的结束位置对齐<br>
> center： 居中，两端空白空间相同<br>
> space-between: 两端对齐(第一个在起始位置，最后一个在结束位置)，项目之间的间隔都相等<br>
> space-around: 每个项目两侧的间隔相等。所以，包含项之间的间隔比项目与边框的间隔大一倍。

align-items属性
align-items属性定义项目在交叉轴上如何对齐。

> flex-start：交叉轴的起点对齐。<br>
> flex-end：交叉轴的终点对齐。<br>
> center：交叉轴的中点对齐。<br>
> baseline: 项目的第一行文字的基线对齐。<br>
> stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

align-content属性
align-content属性定义了多根轴线的对齐方式(多根主轴的对齐方式，类似于伸缩项目在主轴上使用“justify-content”一样)。如果项目只有一根轴线，该属性不起作用。

>  flex-start：与交叉轴的起点对齐。<br>
> flex-end：与交叉轴的终点对齐。<br>
> center：与交叉轴的中点对齐。<br>
> space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。<br>
> space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。<br>
> stretch（默认值）：轴线占满整个交叉轴。

###  以下6个属性设置在项目(被包含项)上
* order属性：默认情况下，伸缩项目是按照文档流出现先后顺序排列，order属性可以控制项目的排列顺序。数值越小，排列越靠前，默认为0。
* flex-grow属性: 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
* flex-shrink属性: 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
* flex-basis属性: 如果设置为“0”，不考虑剩余空白空间。如果设置为auto，则按照flex-grow值分配剩余空白空间
* flex属性: 是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
* align-self：用来在单独的伸缩项目上覆写默认的对齐方式; 属性值：auto | flex-start | flex-end | center | baseline | stretch;
