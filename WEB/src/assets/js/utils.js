export default {
  formatterDate (data, fmt) {
    if (!data) {
      return ''
    }
    data = new Date(data)
    let o = {
      'M+': data.getMonth() + 1, // 月份
      'd+': data.getDate(), // 日
      'h+': data.getHours() % 12 === 0 ? 12 : data.getHours() % 12, // 小时
      'H+': data.getHours(), // 小时
      'm+': data.getMinutes(), // 分
      's+': data.getSeconds(), // 秒
      'q+': Math.floor((data.getMonth() + 3) / 3), // 季度
      'S': data.getMilliseconds() // 毫秒
    }
    let week = {
      '0': '/u65e5',
      '1': '/u4e00',
      '2': '/u4e8c',
      '3': '/u4e09',
      '4': '/u56db',
      '5': '/u4e94',
      '6': '/u516d'
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[data.getDay() + ''])
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
}
