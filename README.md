# react h5 项目模板

该仓库是 brick-cli 的模板，不要直接克隆使用！

**创建完项目后您应该检查 todo-tree，所有需要关注的内容都以todo的方式提示您。可以全局搜索`TODO:`或使用插件**

## 功能
- [x] autobg.macro
- [ ] ~~px转vw（插件偶尔会失效，暂时无法解决）~~
- [x] 路由
- [x] 状态管理器
- [x] 部署脚本
- [x] 接口代码生成脚本
- [x] 图片压缩脚本


## 通用工具库

- [ahooks](https://ahooks.js.org/zh-CN)
- [swiper](https://swiperjs.com/react)

**以上工具库仅为默认安装，不需要可以删掉**

## 需要安装好以下基础设施才可以正常运行


## 开启mock
开启前端mock有两个条件
  1. 非正式环境(`BUILD_ENV !== 'prod'`)
  2. url参数添加 `mock`


## 关于rpf
rpf是使用jsdoc注释提供类型，在ts中可以正确识别类型。

**如果在使用过程中发现rpf中的函数类型出错的话，请修正rpf的jsdoc类型，并提交mr！！**
