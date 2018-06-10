// 文件：/server/poemRouter.js
var express = require('express')
var router = express.Router()

function sleep (delay = 3000) {
  var start = (new Date()).getTime()
  while ((new Date()).getTime() - start < delay) {
    continue
  }
}

const R = function () { return Math.ceil(Math.random() * 2000) }
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// 查询达成看板概览数据
router.get('/queryReachedBoard', function (req, res) {
  // {subject:'',type:'',value:'',mom:undefined,yoy:undefined}
  var result = {success: true, info: '成功', data: null}
  let rs = []
  let ratio = {subject: '达成率', type: 'reached', value: 0.9327}
  let time = {subject: '时间进度', type: 'time', value: Math.random().toFixed(3), mom: undefined, yoy: undefined}
  let target = {subject: '', type: 'target', value: Math.random().toFixed(9) * 1000000, mom: Math.random() * -1, yoy: Math.random()}
  let plan = {subject: '', type: 'plan', value: Math.random().toFixed(9) * 1000000, mom: Math.random(), yoy: Math.random() * -1}
  let real = {subject: '', type: 'real', value: Math.random().toFixed(9) * 1000000, mom: Math.random(), yoy: Math.random() * -1}
  let cate3Num = {subject: '', type: 'cate3Num', value: Math.random().toFixed(1) * 10}
  let salerNum = {subject: '', type: 'salerNum', value: Math.random().toFixed(1) * 10}
  let brandNum = {subject: '', type: 'brandNum', value: Math.random().toFixed(1) * 10}
  let skuNum = {subject: '', type: 'skuNum', value: Math.random().toFixed(1) * 10}
  rs.push(ratio)
  rs.push(time)
  rs.push(target)
  rs.push(plan)
  rs.push(real)
  rs.push(cate3Num)
  rs.push(salerNum)
  rs.push(brandNum)
  rs.push(skuNum)

  result.data = rs
  res.send(result)
})

// 查询达成分析数据
router.get('/queryReachedAnalysis', function (req, res) {
  var result = {success: true, info: '成功', data: null}
  let condition = req.query
  let rs = {}
  rs.chart = {}
  let xAxisList = []
  let targetData = []
  let targetData2 = []
  let ratioData1 = []
  let ratioData2 = []
  for (var i = 0; i < 15; i++) {
    xAxisList.push('品牌' + i)
    targetData.push(parseFloat(Math.random().toFixed(10) * 500000))
    targetData2.push(parseFloat(Math.random().toFixed(10) * 500000))
    ratioData1.push(parseFloat(Math.random().toFixed(6)))
    ratioData2.push(parseFloat(Math.random().toFixed(6)))
  }
  rs.chart.xaxisList = xAxisList

  let yAxisList = []
  let y1 = {name: 'GMV', isRatio: false}
  let y2 = {name: '达成率', isRatio: true}
  yAxisList.push(y1)
  yAxisList.push(y2)
  rs.chart.yaxisList = yAxisList

  let seriesList = []
  let ser1 = { name: '目标', type: 'bar', data: targetData }
  let ser2 = { name: '达成进度', type: 'line', yaxisIndex: 1, data: ratioData1 }
  seriesList.push(ser1)
  seriesList.push(ser2)
  let ser3 = { name: '计划', type: 'line', yaxisIndex: 1, showShadow: true, data: ratioData2 }
  seriesList.push(ser3)
  let ser4 = { name: '实际', type: 'bar', data: targetData2 }
  seriesList.push(ser4)
  rs.chart.seriesList = seriesList
  // rs.table = {column:3322};

  let table = []
  for (var i = 0; i < 2; i++) {
    let tableData = {}
    tableData.id = 176 + i
    tableData.name = '三级品类' + i
    tableData.isTotal = i % 2 === 0
    tableData.type = 'cateID1'

    let columnList = []
    for (var j = 1; j <= 12; j++) {
      let column = {}
      column.type = 'month'// month 、week、day
      column.year = 2017
      column.month = j
      column.isRatio = false// 是否是比例
      if (j < 10) {
        column.title = 2017 + '0' + j
      } else {
        column.title = 2017 + '' + j
      }
      column.value = Math.random().toFixed(8) * 1000000
      columnList.push(column)
    }
    tableData.columnList = columnList
    table.push(tableData)
  }

  rs.table = table
  result.data = rs
  res.send(result)
})

// 查询达成页面，趋势分析数据
router.get('/queryReachedTrend', function (req, res) {
  var result = { success: true, info: '成功', data: null}
  let condition = req.query
  let rs = {}
  rs.chart = {}
  let dimension = condition.dimension
  let xAxisList = []
  let targetData = []
  let targetData2 = []
  let ratioData1 = []
  let ratioData2 = []
  for (var i = 1; i <= 12; i++) {
    let xAxis = ''
    if (i < 10) {
      xAxis = 2018 + '年0' + i + '月'
    } else {
      xAxis = 2018 + '年' + i + '月'
    }
    xAxisList.push(xAxis)
    targetData.push(parseFloat(Math.random().toFixed(10) * 500000))
    targetData2.push(parseFloat(Math.random().toFixed(10) * 500000))
    ratioData1.push(parseFloat(Math.random().toFixed(6)))
    ratioData2.push(parseFloat(Math.random().toFixed(6)))
  }
  rs.chart.xaxisList = xAxisList

  let yAxisList = []
  let y1 = {name: 'GMV', isRatio: false}
  let y2 = {name: '达成率', isRatio: true}
  yAxisList.push(y1)
  yAxisList.push(y2)
  rs.chart.yaxisList = yAxisList

  let seriesList = []
  let ser1 = { name: '目标', type: 'bar', data: targetData }
  seriesList.push(ser1)
  let ser4 = { name: '实际', type: 'bar', data: targetData2 }
  seriesList.push(ser4)
  let ser3 = { name: '计划', type: 'line', yaxisIndex: 1, showShadow: true, data: ratioData2 }
  seriesList.push(ser3)
  let ser2 = { name: '进度', type: 'line', yaxisIndex: 1, data: ratioData1 }
  seriesList.push(ser2)
  rs.chart.seriesList = seriesList
  // rs.table = {column:3322};

  let table = []
  for (var i = 0; i < 2; i++) {
    let tableData = {}
    tableData.id = 176 + i
    tableData.name = '三级品类' + i
    tableData.isTotal = i % 2 == 0
    tableData.type = 'cateID1'

    let columnList = []
    for (var j = 1; j <= 12; j++) {
      let column = {}
      column.type = 'month'// month 、week、day
      column.year = 2017
      column.month = j
      column.isRatio = false// 是否是比例
      if (j < 10) {
        column.title = 2017 + '0' + j
      } else {
        column.title = 2017 + '' + j
      }
      column.value = Math.random().toFixed(8) * 1000000
      columnList.push(column)
    }
    tableData.columnList = columnList
    table.push(tableData)
  }

  rs.table = table
  result.data = rs
  res.send(result)
})

// 查询PV现货率表格
router.get('/queryPvSpotData', function (req, res) {
  var result = { success: true, info: '成功', data: null}
  let condition = req.query
  let rs = {}
  let table = []
  for (var i = 0; i < 8; i++) {
    let tableData = {}
    tableData.id = 176 + i
    tableData.name = '三级品类' + i
    tableData.isTotal = i % 2 == 0
    tableData.type = 'cateID1'

    let columnList = []
    for (var j = 1; j <= 17; j++) {
      let column = {}
      column.type = 'month'// month 、week、day
      column.year = 2017
      column.month = j
      column.isRatio = false// 是否是比例
      if (j < 10) {
        column.title = 2017 + '0' + j
      } else {
        column.title = 2017 + '' + j
      }
      column.value = Math.random().toFixed(8) * 100
      columnList.push(column)
    }
    tableData.columnList = columnList
    table.push(tableData)
  }

  rs = table
  result.data = rs
  res.send(result)
})

// 查询库存周转表格
router.get('/queryTurnOverData', function (req, res) {
  var result = { success: true, info: '成功', data: null}
  let condition = req.query
  let rs = {}
  let table = []
  for (var i = 0; i < 8; i++) {
    let tableData = {}
    tableData.id = 176 + i
    tableData.name = '三级品类' + i
    tableData.isTotal = i % 2 == 0
    tableData.type = 'cateID1'

    let columnList = []
    for (var j = 1; j <= 12; j++) {
      let column = {}
      column.type = 'month'// month 、week、day
      column.year = 2017
      column.month = j
      column.isRatio = false// 是否是比例
      if (j < 10) {
        column.title = 2017 + '0' + j
      } else {
        column.title = 2017 + '' + j
      }
      column.value = Math.random().toFixed(8) * 100
      columnList.push(column)
    }
    tableData.columnList = columnList
    table.push(tableData)
  }

  rs = table
  result.data = rs
  res.send(result)
})

// 查询指标分析数据
router.get('/querySubjectAnalysis', function (req, res) {
  var result = { success: true, info: '成功', data: null}
  let condition = req.query
  let rs = {}
  rs.chart = {}
  let view = condition.view
  let xName = '品牌'
  if (view == 'brand') {
    xName = 'GMV'
  } else if (view == 'cate1Id') {
    xName = '一级品类'
  } else if (view == 'cate2Id') {
    xName = '二级品类'
  } else if (view == 'cate3Id') {
    xName = '三级品类'
  } else if (view == 'sku') {
    xName = 'SKU'
  }

  let subject = condition.subject
  let subjectName = 'GMV'
  if (subject == 'gmv') {
    subjectName = 'GMV'
  } else if (subject == 'sale') {
    subjectName = '销量'
  } else if (subject == 'order') {
    subjectName = '单量'
  } else if (subject == 'ac') {
    subjectName = '客单价'
  } else if (subject == 'numUnitPrice') {
    subjectName = '件均单价'
  }
  let xAxisList = []
  let originList = []
  let yoyListList = []
  for (var i = 1; i <= 12; i++) {
    let xAxis = 175 + '' + i + xName + i
    xAxisList.push(xAxis)
    originList.push(parseFloat(Math.random().toFixed(10) * 500000))
    yoyListList.push(parseFloat(Math.random().toFixed(4)))
  }
  rs.chart.xaxisList = xAxisList

  let yAxisList = []
  let y1 = {name: subjectName, isRatio: false}
  let y2 = {name: subjectName + '同比', isRatio: true}
  yAxisList.push(y1)
  yAxisList.push(y2)
  rs.chart.yaxisList = yAxisList

  let seriesList = []
  let ser1 = { name: subjectName, type: 'bar', data: originList }
  seriesList.push(ser1)
  let ser2 = { name: subjectName + '同比', type: 'line', yaxisIndex: 1, data: yoyListList }
  seriesList.push(ser2)
  rs.chart.seriesList = seriesList

  result.data = rs
  res.send(result)
})

// 查询指标分析数据
router.get('/queryOverview', function (req, res) {
  var result = { success: true, info: '成功', data: null}
  let condition = req.query
  let rs = []
  let typeArr = ['gmv', 'plan', 'profit', 'profitRate', 'turnOver', 'pvSpot']
  let gmv = {type: 'gmv', value: Math.random().toFixed(9) * 1000000, mom: Math.random() * -1, yoy: Math.random(), reached: Math.random()}
  let plan = {type: 'plan', value: Math.random().toFixed(9) * 1000000, mom: Math.random() * -1, yoy: Math.random() * -1, reached: Math.random()}
  let profit = {type: 'profit', value: Math.random().toFixed(9) * 1000000, mom: Math.random(), yoy: Math.random()}
  let profitRate = {type: 'profitRate', value: Math.random(), mom: Math.random(), yoy: Math.random() * -1}
  let turnOver = {type: 'turnOver', value: Math.random().toFixed(4) * 100, mom: Math.random(), yoy: Math.random() * -1}
  let pvSpot = {type: 'pvSpot', value: Math.random(), mom: Math.random() * -1, yoy: Math.random()}
  rs.push(gmv)
  rs.push(plan)
  rs.push(profit)
  rs.push(profitRate)
  rs.push(turnOver)
  rs.push(pvSpot)
  result.data = rs
  res.send(result)
})

// 查询GMV分仓排名及同比分析
router.get('/queryStockGMV', function (req, res) {
  sleep(200)
  var result = { success: true, info: '成功', data: null}
  let condition = req.query

  let gmvList = []
  for (var i = 0; i < 15; i++) {
    let obj = {}
    obj.id = 152 + '' + i
    obj.name = '仓库' + i
    let gmv = Math.random().toFixed(8) * 1000000
    let old = Math.random().toFixed(8) * 1000000
    obj.gmv = gmv
    obj.old = old
    let yoy = (gmv - old) / old
    obj.yoy = yoy
    obj.skuNum = parseInt(Math.random() * 200)
    gmvList.push(obj)
  }
  result.data = gmvList
  res.send(result)
})

// 查询仓库占比分析
router.get('/queryStockPie', function (req, res) {
  var result = { success: true, info: '成功', data: null}
  let condition = req.query

  let pieDatas = []
  for (var i = 0; i < 20; i++) {
    pieDatas.push({name: '仓库' + i, value: Math.random().toFixed(3) * 100})
  }

  result.data = pieDatas
  res.send(result)
})

// 查询库存健康指标数据
router.get('/queryStockDetailTable', function (req, res) {
  var result = { success: true, info: '成功', data: null}
  let condition = req.query

  let columns = [
    { title: '名称', key: 'name'},
    { title: 'GMV', key: 'gmv'},
    { title: 'GMV同比', key: 'gmvYoy'},
    { title: '销量', key: 'saleNum'},
    { title: '销量同比', key: 'saleNumYoy'},
    { title: 'PV现货率', key: 'pvSpot'},
    { title: '库存周转', key: 'turnOver'},
    { title: '在库占用库存', key: 'occupyStock'},
    { title: '在库可用库存', key: 'avaliableStock'},
    { title: 'PO在途', key: 'inTransitPO'},
    { title: '已预约在途', key: 'inTransitOrder'}]

  let datas = []
  for (var i = 0; i < 7; i++) {
    let data = {}
    data.id = i
    data.name = '仓库' + i
    columns.forEach(column => {
      if (column.key != 'name' && column.key != 'action') {
        data[column.key] = parseInt(Math.random().toFixed(3) * 100)
      }
    })
    datas.push(data)
  }

  result.data = datas
  res.send(result)
})

// 查询库存健康指标数据
router.get('/queryGMVYoy', function (req, res) {
  var result = { success: true, info: '成功', data: null}
  let condition = req.query

  let gmvList = []
  for (var i = 0; i < 15; i++) {
    let obj = {}
    obj.id = 152 + '' + i
    obj.name = '品类' + i
    let gmv = Math.random().toFixed(8) * 1000000
    let old = Math.random().toFixed(8) * 1000000
    obj.gmv = gmv
    obj.old = old
    let yoy = (gmv - old) / old
    obj.yoy = yoy
    obj.skuNum = parseInt(Math.random() * 200)
    gmvList.push(obj)
  }

  result.data = gmvList
  res.send(result)
})

// 查询明细页面，趋势分析数据
router.get('/queryDetailTrend', function (req, res) {
  var result = { success: true, info: '成功', data: null}
  let condition = req.query
  let rs = {}
  rs.chart = {}
  let dimension = condition.dimension
  let xAxisList = []
  let targetData = []
  let targetData2 = []
  let ratioData1 = []
  let ratioData2 = []
  for (var i = 1; i <= 12; i++) {
    let xAxis = ''
    if (i < 10) {
      xAxis = 2018 + '年0' + i + '月'
    } else {
      xAxis = 2018 + '年' + i + '月'
    }
    xAxisList.push(xAxis)
    targetData.push(parseFloat(Math.random().toFixed(10) * 500000))
    targetData2.push(parseFloat(Math.random().toFixed(10) * 500000))
    ratioData1.push(parseFloat(Math.random().toFixed(6)))
    ratioData2.push(parseFloat(Math.random().toFixed(6)))
  }
  rs.chart.xaxisList = xAxisList

  let yAxisList = []
  let y1 = {name: 'GMV', isRatio: false}
  let y2 = {name: '达成率', isRatio: true}
  yAxisList.push(y1)
  yAxisList.push(y2)
  rs.chart.yaxisList = yAxisList

  let seriesList = []
  let ser1 = { name: '品牌1', type: 'bar', data: targetData }
  seriesList.push(ser1)
  let ser4 = { name: '品牌2', type: 'bar', data: targetData2 }
  seriesList.push(ser4)
  let ser3 = { name: '品牌3', type: 'bar', data: targetData2 }
  seriesList.push(ser3)
  let ser5 = { name: '品牌4', type: 'bar', data: targetData }
  seriesList.push(ser5)
  let ser2 = { name: '进度', type: 'line', yaxisIndex: 1, data: ratioData1 }
  seriesList.push(ser2)
  rs.chart.seriesList = seriesList
  // rs.table = {column:3322};

  let table = []
  for (var i = 0; i < 2; i++) {
    let tableData = {}
    tableData.id = 176 + i
    tableData.name = '三级品类' + i
    tableData.isTotal = i % 2 == 0
    tableData.type = 'cateID1'

    let columnList = []
    for (var j = 1; j <= 12; j++) {
      let column = {}
      column.type = 'month'// month 、week、day
      column.year = 2017
      column.month = j
      column.isRatio = false// 是否是比例
      if (j < 10) {
        column.title = 2017 + '0' + j
      } else {
        column.title = 2017 + '' + j
      }
      column.value = Math.random().toFixed(8) * 1000000
      columnList.push(column)
    }
    tableData.columnList = columnList
    table.push(tableData)
  }

  rs.table = table
  result.data = rs
  res.send(result)
})

module.exports = router
