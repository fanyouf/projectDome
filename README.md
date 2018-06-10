# sps-ui

> sps-ui

## Build Setup

``` bash
# install dependencies
npm install

# 先打包静态资源文件
npm run dll
# 启动前端:
npm run dev
# 启动前端+启动node端
npm run dev-server

# 如果需要使用node中的模拟数据
第一步：npm run dev-server
第二步：修改api文件.
sps-ui/src/api/saleTarget.js为例。在文件中中的alias对象中，添加键值对：
queryAdjustVersion:http://localhost:8989/api/saleTarget/queryAdjustVersion

## 打包给测试环境使用
npm run build-test
具体的配置项在：config/prod-test.env.js中修改

## 打包给测试环境使用
npm run build
具体的配置项在：config/prod.env.js中修改
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
