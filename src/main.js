// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueDND from 'awe-dnd'

import {DropdownMenu, DropdownItem, Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Loading,
  InputNumber,
  Tree,
  DatePicker,
  Pagination,
  Dialog,
  Table,
  MessageBox,
} from 'element-ui'

import echarts from 'echarts'

import router from './router'
import store from './vuex'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
import '@/assets/fonts/iconfont.js'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

// Vue.prototype._validate = function(fn,beforeFn){
//   return function(){
//     let rs = beforeFn.apply(this,arguments);
//     if(rs === true){
//       return fn.apply(this, arguments)
//     }
//     else{
//       Vue.prototype.$Notice.error({title:'条件验证不通过',desc:rs,duration:3})
//     }
//   }
// }
//
// Vue.prototype._validate = (cond,vF)=>{
//   return new Promise(function(resolve,reject){
//     let rs = vF(cond);
//     if(rs === true){
//       resolve(cond)
//     }
//     else{
//       Vue.prototype.$Notice.error({title:'条件验证不通过',desc:rs,duration:3})
//       //reject()
//     }
//   })
// }

import filter from '@/filter'

import api from './api'

import utils from './utils'
import constSetting from './const'

Vue.config.productionTip = false // 拖动排序 https://www.npmjs.com/package/awe-dnd
Vue.use(VueDND)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Loading)
Vue.use(InputNumber)
Vue.use(Tree)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Table)
Vue.prototype._echarts = echarts // 使用 CSS
Vue.use(iView)

Vue.prototype._echart = require('echarts')
Vue.prototype.$alert = MessageBox.alert
Vue.prototype._error = function (desc) {
  Vue.prototype.$Notice.error({
    title: '操作失败',
    desc,
    duration: 3,
  })
}
Vue.prototype._info = function (title) {
  Vue.prototype.$Notice.info({
    title,
  })
}
Vue.prototype._success = function (title) {
  Vue.prototype.$Notice.success({
    title,
  })
}
Vue.prototype._loading = function (title = '加载中') {
  return Vue.prototype.$loading({
    lock: true,
    text: title,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
}

Vue.prototype._do = (opString, defaultFunction, okFunction, errFunction) => {
  const arr = opString.split('_') // 获取最后一位标记位。
  let flag = false
  if (arr.length === 2 && arr[1].toString().toLowerCase() === 'ok') { // “操作_ok” 只有在这种情况下才会输出操作成功的提示框
    flag = true
  }
  opString = arr[0]

  return res => {
    defaultFunction && defaultFunction()
    if (res && res.success) {
      flag && Vue.prototype._success(`${opString}成功！`)
      okFunction && okFunction(res.data)
    } else {
      let str = `${opString}失败！`
      if (res && res.info && res.info.trim() !== '') {
        str += `原因是:${res.info}`
      }
      if (res && res.message && res.message.trim() !== '') {
        str += `原因是:${res.message}`
      }
      Vue.prototype._error(str)
      errFunction && errFunction()
    }
  }
}

Vue.prototype._validate = (cond, vF) => {
  const rs = vF(cond)
  if (rs === true) {
    return true
  }
  Vue.prototype.$Notice.error({
    title: '条件验证不通过',
    desc: rs,
    duration: 3,
  })

  return false
}
Vue.use(filter)
Vue.prototype._api = api
Vue.use(utils)
Vue.use(constSetting)
//
// import 'vue-easytable/libs/themes-base/index.css' // 引入样式
// import {VTable,VPagination} from 'vue-easytable'  // 导入 table 和 分页组件
// Vue.component(VTable.name, VTable)                // 注册到全局
// Vue.component(VPagination.name, VPagination)      //

const eventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  _bus: {
    get: () => eventBus,
  },
})

// import './components/global.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App,
  },
  template: '<App/>',
  router,
  store,
})
