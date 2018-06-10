import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: (resolve) => require(['@/pages/index'], resolve)
  },
  {
    path: '/HelloWorld',
    name: 'HelloWorld',
    meta: {title: '销售计划'},
    component: (resolve) => require(['@/components/HelloWorld'], resolve)
  }
]

var router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  window.document.title = '销售计划系统'
  next()
})
export default router
