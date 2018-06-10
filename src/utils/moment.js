const moment = require('moment')
function getYearWeek (date) {
  let week = moment(date).week()
  let year = moment(date).weekYear()
  week = week < 10 ? '0' + week : week
  return year + '-' + week
}
export default{
  getYearWeek,
  getNow () {
    return moment().format('YYYY-MM-DD-HH-mm-SS')
  },
  getStartAndEndUntilNow (type = 'M') {
    if (type === 'M') {
      return {
        start: moment(moment().year() + '-01').format('YYYY-MM'),
        end: moment(moment().year() + '-' + (moment().month() + 1)).format('YYYY-MM')
      }
    } else if (type === 'W') {
      return {
        start: moment().year() + '-01',
        end: moment().format('YYYY-WW')
      }
    } else if (type === 'D') {
      return {
        start: moment().year() + '-01-01',
        end: moment().format('YYYY-MM-DD')
      }
    } else {
      throw new Error('getStartAndEndUntilNow目前不支持类型:' + type)
    }
  },
  createDateArray (start, end) {
    start = moment(start)
    end = moment(end)
    let arr = []
    while (end - start > 0) {
      arr.push(start.format('YYYY-MM-DD'))
      start = start.add(1, 'days')
    }
    return arr
  },
  dateRangeAdpter (start, end, type) {
    if (type === 'D') {
      start = moment(start).startOf('month').format('YYYY-MM-DD')
      end = moment(end).endOf('month').format('YYYY-MM-DD')
    } else if (type === 'W') {
      start = moment(start).startOf('month').toDate()
      end = moment(end).endOf('month').toDate()
      // 格式化ww为周一为一周起始，WW为周日为一周起始
      start = getYearWeek(start)
      end = getYearWeek(end)
    } else if (type === 'Q') {
      start = moment(start).startOf('month').format('YYYY-0Q')
      end = moment(end).endOf('month').format('YYYY-0Q')
    } else if (type === 'M') {
      start = moment(start).startOf('month').format('YYYY-MM')
      end = moment(end).endOf('month').format('YYYY-MM')
    }
    return {start, end}
  }
}
