export default {
  getCookie (cookieKey) {
    if (document.cookie.length > 0) {
      let cookieArray = document.cookie.split(';')
      if (cookieArray !== undefined && cookieArray.length > 0) {
        let filters = cookieArray.filter(cookie => {
          return cookie.indexOf(cookieKey) !== -1
        })
        if (filters !== undefined && filters.length > 0) {
          let resultList = filters.map(cookie => {
            let cStart = cookie.indexOf('=')
            if (cStart !== -1) {
              let cEnd = cookie.indexOf(';')
              if (cEnd === -1 || cEnd === undefined) {
                cEnd = cookie.length
              }
              let obj = cookie.substr(cStart + 1, cEnd)
              let key = cookie.substr(0, cStart)
              //                  console.log(key+"   "+condition+"  "+cStart+ "   "+cEnd);
              return {key: key.trim(), obj: JSON.parse(unescape(obj))}
            }
            return null
          })
          return resultList
        }
      }
    }
    return null
  },
  setCookie (key, cookieObj, expireDays = 180) {
    var d = new Date()
    var days = expireDays === undefined ? 180 : expireDays
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    document.cookie = key + '=' + escape(JSON.stringify(cookieObj)) + ';' + expires
  }
}
