// 文件：/server/common.js
var express = require('express')
var router = express.Router()

var constData = require('./constData')
function sleep (delay = 1000) {
  var start = (new Date()).getTime()
  while ((new Date()).getTime() - start < delay) {
    continue
  }
}

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
// define the home page route

router.get('/getTree', function (req, res) {
  // console.dir(req)
  console.dir(req.body.data)
  sleep()
  let data = constData.treeData
  let expandList = []
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 3; j++) {
      for (let k = 1; k < 7; k++) {
        for (let l = 10; l <= 19; l++) {
          let expand = {gmv: Math.ceil(1000 * Math.random()), brandId: 1764 + '' + i, brandName: '苹果' + i, salerId: 'test_erp', dept3Id: 1324, dept3Name: '厨房小电部'}
          expand.cate1Id = 691 + '' + j
          expand.cate1Name = '手机' + j
          expand.cate2Id = 227 + '' + k
          expand.cate2Name = '智能手机' + k
          expand.cate3Id = 102 + '' + l
          expand.cate3Name = 'Apple' + l
          expandList.push(expand)
        }
      }
    }
  }
  // let data = expandList
  let rs = {data, success: Math.random() < 0.99, info: '不知道的原因:1/100'}
  res.send(rs)
})

router.get('/getExpandList', function (req, res) {
  let rs = {}

  let cateID1List = []
  let cateID2List = []
  let cateID3List = []
  let brandList = []
  let salerList = []
  let skuIDList = []
  for (let i = 1; i <= 50; i++) {
    // {id:'',label:'',sort:33};
    cateID1List.push({id: 'cate1 ' + i, label: '一级品类' + i, sort: i})
    cateID2List.push({id: 'cate2 ' + i, label: '二级品类' + i, sort: i})
    cateID3List.push({id: 'cate3 ' + i, label: '三级品类' + i, sort: i})
    brandList.push({id: 'brand ' + i, label: '品牌' + i, sort: i})
    salerList.push({id: 'saler ' + i, label: '销售员' + i, sort: i})
    skuIDList.push({id: 'sku ' + i, label: '商品' + i, sort: i})
  }
  rs.cate1IdList = cateID1List
  rs.cate2IdList = cateID2List
  rs.cate3IdList = cateID3List
  rs.brandIdList = brandList
  rs.salerIdList = salerList
  rs.skuIdList = skuIDList

  let expandList = []
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 3; j++) {
      for (let k = 1; k < 7; k++) {
        for (let l = 10; l <= 19; l++) {
          let expand = {gmv: Math.ceil(1000 * Math.random()), brandId: 1764 + '' + i, brandName: '品牌A' + i, salerId: 'test_erp', dept3Id: 1324, dept3Name: '厨房小电部'}
          expand.cate1Id = 691 + '' + j
          expand.cate1Name = '一级品类' + j
          expand.cate2Id = 227 + '' + k
          expand.cate2Name = '二级品类' + k
          expand.cate3Id = 102 + '' + l
          expand.cate3Name = '三级品类' + l
          expandList.push(expand)
        }
      }
    }
  }
  rs.expandList = expandList
  res.send(rs)
})

module.exports = router
