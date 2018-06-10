//文件：/server/poemRouter.js
var express = require('express');
var router = express.Router();

function sleep(delay=3000) {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
    continue;
  }
}

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


//查询达成看板概览数据
router.post('/uploadAvailableSetting', function(req, res) {
  console.log(req.query)
  var result = { success:true, info:'成功', data:null};

  result.data = '   1122233    ';
  res.send(result)
});

//查询stockCover数据
router.get('/queryStockCover', function(req, res) {
  sleep(2000);
  var result = { success:true, info:'成功', data:null};
  let data = {};
  let periodOriginData = [];
  for(var i=0;i<6;i++){
    let obj = {
      id:125 + '' + i,
      name:'这是我胡乱起的名字为了测试超长........'+i,
    };
    let itemList = [];
    for(var num=1;num <=12;num++){
      let item = {
        year:2018,
        month:num,
        title:num <10 ? 2018 + '-0' + num : 2018 + '-' + num,
        purchase:parseInt(Math.random() * 10000).toString(),
        inTransit:parseInt(Math.random() * 10000).toString(),
        sale:parseInt(Math.random() * 10000).toString(),
        stock:parseInt(Math.random() * 10000).toString(),
        availablePeriod:parseFloat(Math.random() * 100).toFixed(2).toString(),
      };
      itemList.push(item);
    }
    obj.itemList = itemList;
    periodOriginData.push(obj);
  }
  data.periodOriginData = periodOriginData;

  let availableData = [];
  for(var i=0;i<5;i++){
    let danger = parseInt(Math.random() * 100);
    let obj = {
      id:125 + '' + i,
      name:'这是我胡乱起的名字为了测试超长........'+i,
      period:'week',
      danger:danger,
      warning:danger + 5,
      normal:danger + 10,
      poorSale:danger + 15,
    };
    availableData.push(obj);
  }
  data.availableData = availableData;

  result.data = data;
  res.send(result)
});

module.exports = router;
