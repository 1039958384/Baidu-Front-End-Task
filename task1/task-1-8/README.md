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

利用flexbox布局可以非常简单地实现 元素(.child) 在 容器(.parent) 中水平垂直居中
> `.parent{
    display : flex;
    height:500px;
} 
  .child{
    margin:auto;
    
    width:100px;
    height:100px;
}`


