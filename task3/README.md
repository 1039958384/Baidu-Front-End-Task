# task3 说明
本文件中源码是我完成的IFE春季班第三阶段的任务。该阶段的重点是综合运用HTML, CSS, JavaScript 完成可配置的UI组件开发。

文件 task3-1 ~ task3-6 是为第四阶段大任务：RIA 问卷管理平台 的准备工作

通过本阶段的练习，我学习了如何使用 JavaScript 定制可配置样式和功能的UI组件，通过对功能组件的重构(仓库[Works](https://github.com/1039958384/Works)中的组件 Layer, Table 和 Calendar )，了解了模块化开发可复用的 WEB组件 的方法。

# 文件说明
* task3-1 ：实现了一个浮出层组件, [Demo](http://1039958384.github.io/IFE/task3/task3-1/);
* task3-2 ：实现了一个支持表头排序功能的表格, [Demo](http://1039958384.github.io/IFE/task3/task3-2/);
* task3-3 ：在 task3-2 的基础上实现了表格的表头冻结功能, [Demo](http://1039958384.github.io/IFE/task3/task3-3/);
* task3-4 ：实现了一个简单的日历,[Demo](http://1039958384.github.io/IFE/task3/task3-4/);
* task3-5 ：在 task3-4 的基础上对日历的功能做了升级，给日历提供了显示日期的接口和选择日期后的回调函数接口,[Demo](http://1039958384.github.io/IFE/task3/task3-5/);
* task3-6 ：在 task3-4 的基础上继续增强日历的功能，使得日历即可以选择一天，也可以选择一个时间段,[Demo](http://1039958384.github.io/IFE/task3/task3-6/)。


# 功能组件重构
仓库[Works](https://github.com/1039958384/Works)中的组件 Layer, Table 和 Calendar 是对本阶段实现的3个功能组件进行了 封装 和重构，以对象的方式重新实现了这3个组件，增强了3个功能组件的复用性。 
