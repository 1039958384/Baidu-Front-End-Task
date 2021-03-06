# JavaScript遍历 DOM 多叉树

[Demo](http://1039958384.github.io/IFE/task-2-10/)

## 任务描述

* 基于 task-2-9，参考示例图，将二叉树变成了多叉树，并且每一个节点中带有内容
* 提供一个按钮，显示开始遍历，点击后，以动画的形式呈现遍历的过程
* 当前被遍历到的节点做一个特殊显示（比如不同的颜色）
* 每隔一段时间（500ms，1s等时间自定）再遍历下一个节点
* 增加一个输入框及一个“查询”按钮，点击按钮时，开始在树中以动画形式查找节点内容和输入框中内容一致的节点，找到后以特殊样式显示该节点，找不到的话给出找不到的提示。查询过程中的展示过程和遍历过程保持一致

## 任务注意事项

* 树的遍历算法和方式自定，但推荐可以提供多种算法的展示（增加多个按钮，每个按钮对应不同的算法）
* 如果按照示例图中展示树，可以使用flexbox布局
* 实现简单功能的同时，请仔细学习JavaScript基本语法、事件、DOM相关的知识
* 请注意代码风格的整齐、优雅
* 代码中含有必要的注释
* 建议不使用任何第三方库、框架

## 任务实现总结
* 深度优先遍历 ：先遍历完最深一层，再逐层返回(借助于栈实现)
* 广度优先遍历 ：先遍历完一层，再遍历更深一层(借助于队列实现)
* 详细代码见[我的博客](http://blog.csdn.net/ll_xiaohanqing_91/article/details/51868134)
