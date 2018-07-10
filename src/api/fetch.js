require('es6-promise').polyfill()
require('isomorphic-fetch')
let basicUrl = process.env.SER_URL
const handleResponse = res => {
  console.info(res)
  var contentType = res.headers.get('Content-Type')
  if (res.ok) {
    if (contentType.includes('json')) {
      return res.json()
    } else if (contentType.includes('octet-stream')) {
      return res.blob()
    } else {
      return res
    }
  } else if (res.status === 400) {
    return res.json()
  } else if (res.status === 503) {
    // router.push({
    //   name: 'Error50x'
    // })
  } else if (res.status === 401) {
    window.location.href = process.env.FRONT_URL
  } else {
    throw new Error(res.status)
  }
}
//
// const handleResponseError = (err => {
//   var code = err.message;
//   if (code == 401) {
//     window.location.href = process.env.FRONT_URL;
//   } else if (code == 404) {
//     router.push({
//       name: "Error404"
//     });
//   } else if (code == 403) {
//     router.push({
//       name: "Error403"
//     });
//   } else if (code == 500 || code == 501 || code == 502) {
//     router.push({
//       name: "Error50x"
//     });
//   } else if (code == "Failed to fetch") {
//     fetch(settings.root, {
//       method: "head",
//       mode: "cors",
//       credentials: "include"
//     }).catch(err => {
//       console.log(err);
//       if (err.message == "Failed to fetch")
//         router.push({
//           name: "ErrorConnect"
//         });
//     });
//   }
//   console.log("发现未捕获异   常:" + err);
// })

const get = function (url, params, config = {}) {
  url += '?' + new URLSearchParams(params)
  url = url.startsWith('http') ? url : (basicUrl + url)
  let defaultSetting = {
    method: 'get',
    credentials: 'include',
    mode: 'cors'
  }





  return fetch(url, Object.assign(defaultSetting, config))
    .then(handleResponse)
}
export default {
  fileDownload: function (url, cond) {
    let config = {
      responseType: 'arraybuffer',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }
    return get(url, cond, config).then(
      (res) => { // 处理返回的文件流
        let a = document.createElement('a')
        a.href = res.url
        a.click()
        window.URL.revokeObjectURL(a.href)
      })
  },
  fileUpload: function (url, cond) {
    url = url.startsWith('http') ? url : (basicUrl + url)
    let fileData = new FormData()
    for (var key in cond) {
      fileData.append(key, cond[key])
    }
    return fetch(url, {
      headers: {
        // 'content-type':'multipart/form-data',
      },
      method: 'post',
      credentials: 'include',
      mode: 'cors',
      body: fileData
    })
      .then(handleResponse)
  },
  post: function (url, params) {
    params = JSON.stringify(params)
    url = url.startsWith('http') ? url : (basicUrl + url)
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      method: 'post',
      credentials: 'include',
      mode: 'cors',
      body: params
    })
      .then(handleResponse)
  },
  post1: function (url, params) {
    params = new URLSearchParams(params)
    url = url.startsWith('http') ? url : (basicUrl + url)
    return fetch(url, {
      method: 'post',
      credentials: 'include',
      mode: 'cors',
      body: params
    }).then(handleResponse)
  },
  get
}
