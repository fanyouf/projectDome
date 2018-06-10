
var express = require('express')
var router = express.Router()
const moment = require('moment')
var Mock = require('mockjs')
var constData = require('./constData')
const _ = require('lodash')
function sleep (delay = 1000) {
  var start = (new Date()).getTime()
  while ((new Date()).getTime() - start < delay) {
    continue
  }
}

function createDateArray (start, end) {
  var start = moment(start)
  var end = moment(end)
  let arr = []
  while (end - start > 0) {
    arr.push(start.format('YYYY-MM-DD'))
    start.add(1, 'days')
  }
  return arr
}

const R = function () { return Math.ceil(Math.random() * 2000) }
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.post('/', function (req, res) {
  res.send('销售计划！')
})

// 销售计划页：预测选项卡
// {
// 	startDate: yyyy-QQ|yyyy-MM|yyyy-WW|yyyy-MM-dd, //查询开始日期
//     endDate:  yyyy-QQ|yyyy-MM|yyyy-WW|yyyy-MM-dd, //查询结束日期
// 	saler：zhangsan,//选中节点所属的采销erp
// 	parentLevel: saler | cate1 | cate2 | cate3 | brand | sku,//选中节点对应的父节点级别
// 	parentId: 111, //选中节点对应的父节点，有且只有1个
// 	childrenLevel: saler | cate1 | cate2 | cate3 | brand | sku, //选中节点的级别
// 	childrenIdList: [123, 456, 789], //查询级别对应的id列表
// 	dataType: gmv | saleVolume, //查询数据类型
// 	timeDimension: q | m | w | d //查询时间维度
// }

// 1.预测tab卡上的数据
router.post('/queryForecastTableData', function (req, res) {
  sleep()
  var monthToSplit = req.param('monthToSplit')
  var versionType = req.param('versionType')
  var qmwd = req.body.timeDimension
  var level = req.param('level')
  var year = req.param('year')
  var childrenIdList = req.param('childrenIdList')
  var childrenLevel = req.param('childrenLevel')
  var parentId = req.param('parentId')
  var parentLevel = req.param('parentLevel')

  var count = 3// childrenIdList.split(",").length;
  console.info(`versionType:${versionType}qmwd:${qmwd}level:${level}monthToSplit:${monthToSplit}childrenIdList:${childrenIdList}year:${year}parentId:${parentId}parentLevel:${parentLevel}childrenLevel:${childrenLevel}`)
  let rs = {}
  if (qmwd === 'M') {
    let endMonth = 12
    // console.dir(req.body.data) //这里是重点，我终于于得到的结果了
    let type = 'M'
    rs.total = []
    let _sum = 0, _sumyoy = 0, _summom = 0
    for (var i = 1; i <= endMonth; i++) {
      let _t = {qmwd: 'M' + i, val: R() * 5, yoy: R(), mom: R(), editable: false, modified: false}
      _sum += _t.val
      _sumyoy += _t.yoy
      _summom += _t.mom
      rs.total.push(_t)
      if (i % 3 == 0) {
        rs.total.push({qmwd: 'Q' + i / 3, val: _sum, editable: false, modified: false})
        _sum = 0
        _sumyoy = 0
        _summom = 0
      }
    }
    rs.detail = []
    for (var i = 1; i <= count; i++) {
      let _obj = {name: 'XX' + i, id: 'id' + i, data: []}
      for (var j = 1; j <= endMonth; j++) {
        let _t = {qmwd: 'M' + j, yoy: R(), mom: R(), val: R(), editable: j > 3, modified: false}
        _sum += _t.val
        _sumyoy += _t.yoy
        _summom += _t.mom
        _obj.data.push(_t)
        if (j % 3 == 0) {
          _obj.data.push({qmwd: 'Q' + j / 3, val: _sum, mom: _summom, yoy: _sumyoy, editable: false, modified: false})
          _sum = 0
          _sumyoy = 0
          _summom = 0
        }
      }
      rs.detail.push(_obj)
    }
    rs.type = type
  } else if (qmwd === 'Q') {
    // console.dir(req.body.data) //这里是重点，我终于于得到的结果了
    let type = 'Q'

    rs.total = []
    for (var i = 1; i <= 4; i++) {
      let _t = {qmwd: 'Q' + i, val: R() * 5, editable: false, modified: false}
      rs.total.push(_t)
    }
    rs.detail = []
    for (var i = 1; i <= count; i++) {
      let _obj = {name: 'XX' + i, id: 'id' + i, data: []}
      for (var j = 1; j <= 4; j++) {
        let _t = {qmwd: 'Q' + j, val: R(), editable: j > 3, modified: false}
        _obj.data.push(_t)
      }
      rs.detail.push(_obj)
    }
    rs.type = type
  } else if (qmwd === 'W') {
    let endMonth = 5
    // console.dir(req.body.data) //这里是重点，我终于于得到的结果了
    let type = 'W'
    rs.total = []
    let _sum = 0
    for (var i = 1; i <= endMonth; i++) {
      let _t = {qmwd: 'W' + i, val: R() * 2, yoy: R(), mom: R(), editable: false, modified: false}
      rs.total.push(_t)
    }
    rs.detail = []
    for (var i = 1; i <= count; i++) {
      let _obj = {name: 'XX' + i, id: 'id' + i, data: []}
      for (var j = 1; j <= endMonth; j++) {
        let _t = {qmwd: 'W' + j, val: R(), yoy: R(), mom: R(), editable: j > 3, modified: false}
        _obj.data.push(_t)
      }
      rs.detail.push(_obj)
    }
    rs.type = type
  } else if (qmwd === 'D') {
    let endMonth = 30
    // console.dir(req.body.data) //这里是重点，我终于于得到的结果了
    let type = 'D'
    rs.total = []
    let _sum = 0
    for (var i = 1; i <= endMonth; i++) {
      let _t = {qmwd: 'D' + i, val: R() * 5, editable: false, modified: false}
      _sum += _t.val
      rs.total.push(_t)
      if (i % 7 == 0) {
        rs.total.push({qmwd: 'W' + i / 7, val: _sum, editable: false, modified: false})
        _sum = 0
      }
    }
    rs.detail = []
    for (var i = 1; i <= count; i++) {
      let _obj = {name: 'XX' + i, id: 'id' + i, data: []}
      for (var j = 1; j <= endMonth; j++) {
        let _t = {qmwd: 'd' + j, val: R(), editable: j > 24, modified: false}
        _sum += _t.val
        _obj.data.push(_t)
        if (j % 7 == 0) {
          _obj.data.push({qmwd: 'w' + j / 7, val: _sum, editable: false, modified: false})
          _sum = 0
        }
      }
      rs.detail.push(_obj)
    }
    rs.type = type
  }
  // rs.success = true
  res.send({data: rs, success: true, info: '成功'})
})
// 2.计划tab卡上的数据
router.post('/queryAdjustTableData', function (req, res) {
  sleep()
  var monthToSplit = req.body.monthToSplit
  var versionType = req.body.versionType
  var qmwd = req.body.timeDimension
  var level = req.body.level
  var year = req.body.year
  var childrenIdList = req.body.childrenIdList
  var childrenLevel = req.body.childrenLevel
  var parentId = req.body.parentId
  var parentLevel = req.body.parentLevel

  var count = childrenIdList.split(',').length
  console.info(`versionType:${versionType}qmwd:${qmwd}level:${level}monthToSplit:${monthToSplit}childrenIdList:${childrenIdList}year:${year}parentId:${parentId}parentLevel:${parentLevel}childrenLevel:${childrenLevel}`)
  let rs = {}
  if (qmwd === 'M') {
    let endMonth = 12
    // console.dir(req.body.data) //这里是重点，我终于于得到的结果了
    let type = 'M'
    rs.total = []
    let _sum = 0
    let _otherSum = 0
    let _sumyoy = 0
    let _summom = 0
    for (var i = 1; i <= endMonth; i++) {
      let _t = {qmwd: 'M' + i, val: R() * 5, otherSum: R(), editable: false, modified: false}
      _sum += _t.val
      _otherSum += _t.otherSum
      rs.total.push(_t)
      if (i % 3 == 0) {
        rs.total.push({qmwd: 'Q' + i / 3, val: _sum, otherSum: _otherSum, editable: false, modified: false})
        _sum = 0
        _otherSum = 0
      }
    }

    rs.detail = []
    for (var i = 1; i <= count; i++) {
      let _obj = {name: 'XX' + i, id: 'id' + i, data: []}
      for (var j = 1; j <= endMonth; j++) {
        let _t = {qmwd: 'M' + j, yoy: R(), mom: R(), val: R(), editable: j > 3, modified: false}
        _sum += _t.val
        _sumyoy += _t.yoy
        _summom += _t.mom
        _obj.data.push(_t)
        if (j % 3 == 0) {
          _obj.data.push({qmwd: 'Q' + j / 3, val: _sum, mom: _summom, yoy: _sumyoy, editable: false, modified: false})
          _sum = 0
          _sumyoy = 0
          _summom = 0
        }
      }
      rs.detail.push(_obj)
    }
    rs.type = type
  } else if (qmwd === 'Q') {
    // console.dir(req.body.data) //这里是重点，我终于于得到的结果了
    let type = 'Q'

    rs.total = []
    for (var i = 1; i <= 4; i++) {
      let _t = {qmwd: 'Q' + i, val: R() * 5, editable: false, modified: false}
      rs.total.push(_t)
    }
    rs.detail = []
    for (var i = 1; i <= count; i++) {
      let _obj = {name: 'XX' + i, id: 'id' + i, data: []}
      for (var j = 1; j <= 4; j++) {
        let _t = {qmwd: 'Q' + j, val: R(), editable: j > 3, modified: false}
        _obj.data.push(_t)
      }
      rs.detail.push(_obj)
    }
    rs.type = type
  } else if (qmwd === 'W') {
    let endMonth = 5
    // console.dir(req.body.data) //这里是重点，我终于于得到的结果了
    let type = 'W'
    rs.total = []
    let _sum = 0
    for (var i = 1; i <= endMonth; i++) {
      let _t = {qmwd: 'W' + i, val: R() * 2, yoy: R(), mom: R(), editable: false, modified: false}
      rs.total.push(_t)
    }
    rs.detail = []
    for (var i = 1; i <= count; i++) {
      let _obj = {name: 'XX' + i, id: 'id' + i, data: []}
      for (var j = 1; j <= endMonth; j++) {
        let _t = {qmwd: 'W' + j, val: R(), yoy: R(), mom: R(), editable: j > 3, modified: false}
        _obj.data.push(_t)
      }
      rs.detail.push(_obj)
    }
    rs.type = type
  } else if (qmwd === 'D') {
    let endMonth = 30
    // console.dir(req.body.data) //这里是重点，我终于于得到的结果了
    let type = 'D'
    rs.total = []
    let _sum = 0
    for (var i = 1; i <= endMonth; i++) {
      let _t = {qmwd: 'D' + i, val: R() * 5, editable: false, modified: false}
      _sum += _t.val
      rs.total.push(_t)
      if (i % 7 == 0) {
        rs.total.push({qmwd: 'W' + i / 7, val: _sum, editable: false, modified: false})
        _sum = 0
      }
    }
    rs.detail = []
    for (var i = 1; i <= count; i++) {
      let _obj = {name: 'XX' + i, id: 'id' + i, data: []}
      for (var j = 1; j <= endMonth; j++) {
        let _t = {qmwd: 'd' + j, val: R(), editable: j > 24, modified: false}
        _sum += _t.val
        _obj.data.push(_t)
        if (j % 7 == 0) {
          _obj.data.push({qmwd: 'w' + j / 7, val: _sum, editable: false, modified: false})
          _sum = 0
        }
      }
      rs.detail.push(_obj)
    }
    rs.type = type
  }
  // rs.success = true
  res.send({data: rs, success: true, info: '成功'})
})
// 3.漏斗图和气泡图使用
router.post('/queryAnalysisSaleStructureData', function (req, res) {
  sleep()
  let childrenIdList = req.body.childrenIdList.split(',')
  let rs = childrenIdList.map(idName => {
    let obj = {id: idName}
    obj.name = 'XXX' + idName
    obj.val = Math.ceil(10000 * Math.random())
    obj.yoy = Math.ceil(10000 * Math.random())
    return obj
  })
  res.send({data: rs, success: true})
})
// 4.趋势分析图使用
router.post('/queryAnalysisSaleTrendData', function (req, res) {
  sleep()
  var childrenIdList = req.body.childrenIdList.split(',')
  let list = childrenIdList.map(id => {
    return 'XX' + id
  })
  let str = 'data|' + childrenIdList.length
  let rs = Mock.mock({
    [str]: [{
      'name|+1': list,
      'data|30': [{
        year: 2018,
        quarter: 2,
        month: 4,
        week: 10,
        'day|+1': 1,
        'val|200-1200': 200
      }]
    }]
  })
  res.send({data: rs.data, success: true})
})
// 5.组合分析图使用
router.post('/queryAdjustAnalysisCombinationData', function (req, res) {
  sleep()
  // var monthToSplit = req.param('monthToSplit');
  // var versionType = req.param('versionType');
  // var qmwd = req.param('qmwd');
  // var level = req.param('level');
  // var year = req.param('year');
  // var childrenIdList = req.param('childrenIdList');
  // var childrenLevel = req.param('childrenLevel');
  // var parentId = req.param('parentId');
  // var parentLevel = req.param('parentLevel');
  //
  // var count = childrenIdList.split(",").length;

  let rs = Mock.mock({
    'name|+1': ['美的1', '美的2', '美的3', '美的4', '美的5', '美的6'],
    ...Mock.mock({'data|30': [{
      year: 2018,
      quarter: 2,
      month: 4,
      week: 10,
      'day|+1': 1,
      'val|1000-1200': 1000,
      'mom|1000-1200': 1000,
      'yoy|1000-1200': 1000,
      'dataType': this.day > 18 ? 'history' : 'forecast',
      'hasExtendVal|1-2': true,
      'extendVal|1000-1200': 1000
    }]})
  })
  res.send({data: rs, success: true})
})
// 6.预测tab上的组合分析图
router.post('/queryForecastAnalysisCombinationData', function (req, res) {
  sleep()

  var qmwd = req.body.timeDimension

  var year = req.body.year

  var start = Number(req.body.startDate.split('-')[1])
  var end = Number(req.body.endDate.split('-')[1])
  let data = _.range(start, end + 1).map(i => {
    let quarter = qmwd == 'Q' ? i : ''
    let month = qmwd == 'M' ? i : ''
    let week = qmwd == 'W' ? i : ''
    let day = qmwd == 'D' ? i : ''
    return {
      year,
      quarter,
      month,
      week,
      day,
      val: _.random(100, 200),
      mom: _.random(100, 200),
      yoy: _.random(100, 200),
      dataType: i < (start + end) / 2 ? 'history' : 'forecast',
      hasExtendVal: i > (start + end) / 2,
      extendVal: _.random(100, 200) // 目标，或者是计划
    }
  })

  let rs = {
    name: '汇总',
    data
  }
  res.send({data: rs, success: true})
})

// 'saveAdjustTableData',                  // 7.计划tab卡的明细表格数据进行保存
// 'saveForecastToAdjustTable',            // 8.预测tab卡的明细表格数据进行保存
// 'resetAdjustToLastOrForecast',          // 9.计划tab卡的明细表格数据重置
// 'resetToForecast',                      // 10.预测页面的明细表格数据重置为原始预测数据
// 'querySalePriceTableData',              // 11.查询sku售价数据

module.exports = router
