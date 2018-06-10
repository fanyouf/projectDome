let number = {
  bind: function (el, binding, vnode) {
    el.isNumber = function () {
      if (isNaN(el.value.trim())) {
        console.info('不是数字')
      }
    }

    var s = JSON.stringify
    var str = 'name: ' + s(binding.name) + '<br>' +
      'value: ' + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: ' + s(binding.arg) + '<br>' +
      'modifiers: ' + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')

    el.addEventListener('blur', el.isNumber)
    console.info(binding, str)
  },
  unbind: function (el, binding) {
    el.removeEventListener('blur', el.isNumber)
  }
}

let jumpNumber = {
  bind: function (el, binding, vnode) {
    console.info('bind', binding, vnode)
    el.f = function (vnode) {
      el.targetData = vnode.children[0].text * 1
      if (isNaN(el.targetData)) {
        throw new Error('jumpNumber必须是数值，而得到的是' + vnode.children[0].text)
      }
      el.innerHTML = el.startData = 0

      let dt = (el.targetData - el.startData) / 50

      dt = dt.toFixed(1) * 1
      if (Math.abs(dt) < 0.1) {
        dt = dt > 0 ? 0.1 : -0.1
      }

      el.timerId = setInterval(function () {
        var t = el.startData + dt
        if (dt > 0) {
          if (t < el.targetData) {
            el.startData = t
          } else {
            t = el.targetData
            clearInterval(el.timerId)
          }
        } else {
          if (t > el.targetData) {
            el.startData = t
          } else {
            t = el.targetData
            clearInterval(el.timerId)
          }
        }
        el.innerHTML = t
      }, 20)
    }
    el.f(vnode)
    // console.dir(binding)
    // console.dir(vnode)
  },
  unbind: function (el, binding) {

  },
  update: function (el, binding, vnode) {
    el.f(vnode)
  }
}

export default {
  number: number,
  jumpNumber: jumpNumber
}
