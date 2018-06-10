function vStartEnd (cond) {
  if (cond.start !== undefined) {
    if (!cond.start || !cond.end) { return true }
    if (cond.end < cond.start) {
      return '结束时间不能小于起始时间'
    }
  } else if (cond.startDate !== undefined) {
    if (!cond.startDate || !cond.startDate) { return true }
    if (cond.endDate < cond.startDate) {
      return '结束时间不能小于起始时间'
    }
  }
  return true
}
function vChildrenList (cond) {
  if (cond.childrenIdList.length === 0) { return '必须选中数据项' }
  return true
}
function vNotNull (cond) {
  if (cond['cateId'].toString().trim() === '') {
    return '类别编号不能为空'
  }
  if (cond['cateLevel'].toString().trim() === '') {
    return '类别级别不能为空'
  }
  if (cond['brandId'].toString().trim() === '') {
    return '品牌不能为空'
  }
  return true
}
let notNull = {};

(function (obj) {
  for (var key in obj) {
    notNull[key] = (function (key) {
      return function (cond) {
        if (cond[key] === undefined) {
          return obj[key] + '不能为空'
        }
        if (cond[key].length === 0) {
          return obj[key] + '长度不能为0'
        }
        if (cond[key].toString().trim() === '') {
          return obj[key] + '不能为空'
        }
        return true
      }
    }(key))
  }
})({dept3Id: '三级部门编号',
  year: '年份',
  childrenLevel: '选中数据的层级',
  timeDimension: '日期维度',
  roleType: '用户角色',
  versionType: '版本信息',
  monthList: '月份信息',
  holiday: '节假日信息'})
// * dept3Id:12,//当前操作多dept3Id,一个erp可能多个部门
// * roleType:DEPT_MANAGER | SALER,
// * year:2018,
// * monthList:[3,4,5]//月份
// salerId：zhangsan,
// * parentId: 8888,
// * parentLevel: "root",
// * childrenIdList:[123,234]//品类品牌多个
// * childrenLevel: cate1|cate2|cate3|brand|manager//默认3级品类
// * timeDimension:Q|M|W|D  //季月周天时间维度,
// * versionType:CHALLENGE|ASSESSMENT|DRAFT//挑战|考核|草稿
// * holiday:chunjie  //农历节日拼音
function vTimeDiffMustBeQuarter (cond) {
  if (!cond.qmwd || !cond.start || !cond.end) { return true }
  if (cond.qmwd === 'Q') {
    if (cond.start.split('-')[1] % 3 === 1 && cond.end.split('-')[1] % 3 === 0) {
    } else {
      return '所选时间区间必须是完整的季度'
    }
  }
  return true
}

const validate = {
  queryAdjustTableData: [vChildrenList],
  analyzeBoardQuery: [vChildrenList, vStartEnd, vTimeDiffMustBeQuarter],
  getSku: [vNotNull],
  queryForecastTableData: [vChildrenList, vStartEnd],
  queryAdjustVersion: [notNull.dept3Id, notNull.year, notNull.roleType, notNull.timeDimension],
  queryAnalysisSaleStructureData: [vChildrenList, vStartEnd],
  queryJieqi: [notNull.year],
  queryHolidayYoy: [notNull.dept3Id, notNull.year, notNull.roleType, notNull.timeDimension, notNull.holiday, notNull.versionType] // 节假日校准
}

const validateList = {}
for (var key in validate) {
  validateList[key] = (function (arr) {
    return function (cond) {
      for (var i = 0; i < arr.length; i++) {
        var rs = arr[i](cond)
        if (rs !== true) {
          return rs
        }
      }
      return true
    }
  }(validate[key]))
}
export default validateList
