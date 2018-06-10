/**
公共接口 api
*/
import http from './fetch.js'
export default {
  getTree: (params) => http.post1('/saleTree/getTree', params),
  getSku: (params) => http.post1('/saleTree/getSku', params),
  getExpandList: (params) => http.get('/common/getExpandList', params).then(d => d.data)
}
