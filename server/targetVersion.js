//文件：/server/poemRouter.js
var express = require('express');
var router = express.Router();
const moment = require("moment")
var Mock = require('mockjs')
var constData = require('./constData')
const _ = require("lodash")
function sleep(delay=1000) {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
    continue;
  }
}

// 1.查看版本管理列表 'listVersion',
// 2. 查看版本详情
router.post('/getVersion', function(req, res) {
  sleep();
  let rs = {
    year: 2018,//目标是给2018年做的
    creater: "张三",//最后修改人
    date: '2018-05-11',  //最后修改时间
    remark:'备注信息XXXXX'
  }
  res.send({data:rs,success:true})
})
module.exports = router;
