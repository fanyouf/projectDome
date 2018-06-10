import common from './common.js'
// import excel from "./excel.js"
// import moment from "./moment.js"
// import directive from "./directive.js"
// import filter from "./filter.js"
// import cookie from './cookie'
export default {
  install: function (Vue, options) {
    Vue.prototype._utils = common
    let keys = Object.keys(common)
    keys.forEach(key => {
      console.info(key)
      if (key in Vue.prototype) {
        console.error(`utils赋值错误，${key}在Vue中已经存在`)
      }
      // else{
      //   Vue.prototype[key] = common[key];
      // }
    })
    // for(var key in directive){
    //   Vue.directive(key, directive[key]);
    // }

    // Object.keys(filter).forEach(key => {
    //   Vue.filter(key, filter[key])

    //   if(key in Vue.prototype){
    //     console.error(`utils赋值错误，${key}在Vue中已经存在`);
    //   }
    //   else{
    //     Vue.prototype[key] = filter[key];
    //   }
    // })

    // Vue.prototype._excel = excel
    // Vue.prototype._moment = moment
    // Vue.prototype._cookie = cookie
  }
}
