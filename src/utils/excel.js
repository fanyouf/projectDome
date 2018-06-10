var XLSX = require('xlsx')

// function fixdata (data) { // 文件流转BinaryString
//   let o = ''
//   let l = 0
//   let w = 10240
//   for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
//   o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
//   return o
// }

export default {
  // [{sheetName:'', sheetData:'']
  downloadAll: function (aDom, dataArray, fileName, type, properTitle) {
    let SheetNames = dataArray.map(item => item.sheetName)
    let Sheets = {}
    dataArray.forEach((it, index) => {
      let tmpdata = []
      let json = it.sheetData
      let keyMap = [] // 获取键
      for (let k in json[0]) {
        keyMap.push(k)
      }
      if (properTitle && properTitle.length > 0) {
        keyMap = properTitle
      }
      json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
      }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
        tmpdata[v.position] = {
          v: v.v
        }
      })

      let outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
      Sheets[it.sheetName] = Object.assign({},
        tmpdata, // 内容
        {
          '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
        })
    })
    let tmpWB = {SheetNames, Sheets}
    let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB, {
      bookType: (type === undefined ? 'xlsx' : type),
      bookSST: false,
      type: 'binary'
    } // 这里的数据是用来定义导出的格式类型
    ))], {
      type: ''
    }) // 创建二进制对象写入转换好的字节流
    var href = URL.createObjectURL(tmpDown) // 创建对象超链接

    aDom.download = fileName + '.xlsx' // 下载名称
    aDom.href = href // 绑定a标签
    aDom.click() // 模拟点击实现下载
    setTimeout(function () { // 延时释放
      URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
    }, 100)
  },
  /**
   * aDom,json,downName,type
   */
  download: function (aDom, json, downName, type) {
    let keyMap = [] // 获取键
    for (let k in json[0]) {
      keyMap.push(k)
    }
    let tmpdata = [] // 用来保存转换好的json
    json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
      v: v[k],
      position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
      tmpdata[v.position] = {
        v: v.v
      }
    })
    let outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
    let tmpWB = {
      SheetNames: ['mySheet'], // 保存的表标题
      Sheets: {
        'mySheet': Object.assign({},
          tmpdata, // 内容
          {
            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
          })
      }
    }
    let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB, {
      bookType: (type === undefined ? 'xlsx' : type),
      bookSST: false,
      type: 'binary'
    } // 这里的数据是用来定义导出的格式类型
    ))], {
      type: ''
    }) // 创建二进制对象写入转换好的字节流
    var href = URL.createObjectURL(tmpDown) // 创建对象超链接

    aDom.download = downName + '.xlsx' // 下载名称
    aDom.href = href // 绑定a标签
    aDom.click() // 模拟点击实现下载
    setTimeout(function () { // 延时释放
      URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
    }, 100)
  },
  getCharCol: function (n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
    let s = ''
    let m = 0
    while (n > 0) {
      m = n % 26 + 1
      s = String.fromCharCode(m + 64) + s
      n = (n - m) / 26
    }
    return s
  },
  s2ab: function (s) { // 字符串转字符流
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
  },
  /***
   *
   * @param f 文件
   * @param rABS 是否二进制，默认为false
   */
  import (f, rABS = false) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader()
      var wb
      if (rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
      reader.onload = function (e) {
        try {
          var data = e.target.result
          if (rABS) {
            wb = XLSX.read(btoa(this.fixdata(data)), {// 手动转化
              type: 'base64'
            })
          } else {
            wb = XLSX.read(data, {
              type: 'binary'
            })
          }
          // wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
          // wb.Sheets[Sheet名]获取第一个Sheet的数据
          resolve(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]))
          // console.info( JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) ) )
        } catch (e) {
          reject(e)
        }
      }
    })
  }
}
