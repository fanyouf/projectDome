# 说明

> 关键字：vue vuex node 前后端分离


## 基本使用流程

1. 安装
> npm install

2. 提前打包静态资源文件
> npm run dll

在项目中会有一些“静态”的外部资源，这些资源基本上不会变动。所以我们可以提前把这些资源打包成一个单独的.js文件。具体要打包的文件及打包设置在根目录的webpack.dll.conf.js中进行配置
```
var vendors = [
  'xlsx',
  'lodash',
  'vue/dist/vue.esm.js',
  'vue-router',
  'vuex',
  'element-ui',
  'echarts',
  'iview',
  'moment',
];
```

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
