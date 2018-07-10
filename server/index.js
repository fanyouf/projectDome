// 文件：/server/server.js
const express = require('express')
const app = express()

const salePlan = require('./salePlan.js')

const saleTree = require('./saleTree.js')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false})) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()) // for parsing application/json

// 让它来跨域吧
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'access-control-allow-origin,content-type,x-requested-with,Content-Type, Content-Length, X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if (req.method === 'OPTIONS') {
    res.send(200)

    /*  让options请求快速返回 */
  } else {
    next()
  }
})

app.get('/', (req, res) => {
  res.end('这里是数据服务器')
})

// 使用路由
app.use('/api/salePlan', salePlan)
app.use('/api/saleTree', saleTree)

app.listen(8989, function () {
  console.log('node server is  listening on port 8989!')
})
