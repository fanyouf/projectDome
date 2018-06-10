import http from '../fetch.js'

let apiObj = {}
let modelName = '/salePlan/'
let rs = {}
let alias = {
  //  别名
}
let apiList = ['queryForecastTableData', 'queryJieqi']
apiList.forEach(item => {
  apiObj[item] = modelName + item
})

apiObj = {...apiObj, ...alias}

for (var name in apiObj) {
  rs[name] = (function (name) {
    return (p) => http.post1(apiObj[name], p)
  }(name))
}

export default rs
