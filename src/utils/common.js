export default {
  switchArray (arr, value) {
    let index = arr.findIndex(item => item === value)
    if (index === -1) {
      arr.push(value)
    } else {
      arr.splice(index, 1)
    }
  },
  createArray (n) {
    if (!Number.isInteger(n)) {
      throw new Error('createArray要求参数必须是整数')
    }
    let rs = []
    for (var i = 0; i < n; i++) {
      rs.push(i)
    }
    return rs
  },
  distinct (arr, prop) {
    let obj = {}
    let rs = []
    arr.forEach(item => {
      if (obj[item[prop + 'Name']]) {

      } else {
        obj[item[prop + 'Name']] = 1
        rs.push({[item[prop + 'Id']]: item[prop + 'Name']})
      }
    })
    return rs
  },
  per (val1, val2) {
    if (isNaN(val1)) {
      throw new Error(val1 + '不是数值')
    }
    if (isNaN(val2)) {
      throw new Error(val2 + '不是数值')
    }
    return (val1 * 100 / val2).toFixed(1) + '%'
  },
  cloneObj: function cloneObj (obj) {
    if (obj === undefined || obj === null) {
      throw new Error('cloneObj时，obj不能为undefined或者是null')
    }
    let str
    let newobj = obj.constructor === Array ? [] : {}
    if (typeof obj !== 'object') {
      return
    } else if (window.JSON) {
      str = JSON.stringify(obj) //  系列化对象
      newobj = JSON.parse(str) //  还原
    } else {
      for (var i in obj) {
        newobj[i] = typeof obj[i] === 'object'
          ? cloneObj(obj[i]) : obj[i]
      }
    }
    return newobj
  }
}
