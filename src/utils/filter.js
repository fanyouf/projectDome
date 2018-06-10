/**
 * 作者： fanyoufu
 * 日期： 2018/3/14 - 11:50
 * 功能：
 * 被引用：
 */
export default {
  moneyUnit: function (val, type = 'yuan') {

  },
  formatCurrency1: function (num, type = 'yuan') {
    if (!num || isNaN(num)) {
      return num
    }
    if (type === 'yuan') {
    } else if (type === 'thousand') {
      num = num / 1000
    } else if (type === 'million') {
      num = num / 1000 / 1000
    }
    num = num.toString().replace(/\$|\,/g, '')
    let sign = (num === (num = Math.abs(num)))
    num = Math.floor(num * 10 + 0.50000000001)
    let cents = num % 10
    num = Math.floor(num / 10).toString()
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
      num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3))
    }
    return (((sign) ? '' : '-') + num + '.' + cents)
  },
  /**
   * val是个小数。如：0.9899113
   * @param val
   */
  percent: function (val, dig = 1) {
    let _val = val * 100
    return _val.toFixed(1) + '%'
  },
  int: function (val, dig = 1) {
    if (isNaN(val)) {
      console.error(`${val}不是数值，不能用int过滤器`)
      return val
    }
    return (Number(val)).toFixed(dig)
  }
}
