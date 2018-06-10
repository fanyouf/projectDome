// 文件：/server/common.js
var express = require('express')
var router = express.Router()

// 获取权限
router.get('/getRole', function (req, res) {
  let condition = req.query
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

module.exports = router
