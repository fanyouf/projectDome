// 文件：/server/poemRouter.js
var express = require('express')
var router = express.Router()
var constData = require('./constData')
const _ = require('lodash')
// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
// define the home page route
function sleep (delay = 1000) {
  var start = (new Date()).getTime()
  while ((new Date()).getTime() - start < delay) {
    continue
  }
}

//  获取权限
router.get('/getRole', function (req, res) {
  let rs = {}
  rs.success = true
  rs.message = 'ok'
  let data = {}
  data.erp = 'test_erp'
  let roleMap = {}
  let deptManager = []
  deptManager.push({ dept3Id: 1765, dept3Name: '运营管理部' })
  deptManager.push({ dept3Id: 1324, dept3Name: '厨房小电部' })
  roleMap.DEPT_MANAGER = deptManager

  let saler = []
  saler.push({ dept3Id: 1324, dept3Name: '厨房小电部' })
  saler.push({ dept3Id: 1245, dept3Name: '苹果业务部' })
  roleMap.SALER = saler
  data.roleMap = roleMap

  rs.data = data
  res.send(rs)
})

router.get('/getTree', function (req, res) {
  // console.dir(req)
  console.dir(req.body.data)
  sleep()
  let data = constData.treeData
  // let data = expandList
  let rs = {data, success: Math.random() < 0.99, info: '不知道的原因:1/100'}
  res.send(rs)
})

router.get('/getSku', function (req, res) {
//   {
//     dept3Id:12//三级部门id
//     cateId:332,
//     cateLevel:cate3,
//     brandId:131312
// }
  // console.dir(req)
  console.dir(req.body.data)
  sleep()
  let data = _.range(1, 11).map((i) => {
    return {
      skuId: _.uniqueId('skuId_'),
      skuName: 'sku' + i
    }
  })
  let rs = {data, success: Math.random() < 0.99, info: '不知道的原因:1/100'}
  res.send(rs)
})

module.exports = router
