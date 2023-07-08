
//格式化观看次数
export function formateCountView(countview) {

    // (number).toFixed(n)  对number保留n位小数
    // if (countview > 10000) return (countview / 10000).toFixed(1) + 'w'
    return countview > 10000 ? (countview / 10000).toFixed(1) + 'w' : countview
}
//格式化播放时长
export function formatetime(time) {
    var min = Math.floor(time / 60)
    var sec = time % 60
    // return min+" ' "+sec+' " '
    return (min < 10 ? '0' + min : min) + "'" + (sec < 10 ? '0' + sec : sec) + '"'
}
// 格式化年月日
export function formatetimecapsule(time) {
    var date = new Date(time * 1000);  // 参数需要毫秒数，所以这里将秒数乘于 1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    return (Y + '-' + M + '-' + D)
}
// 格式化几天前或者几小时前
export function formatepublishtime(timespan) {
    var dateTime = new Date(timespan*1000) // 将传进来的字符串或者毫秒转为标准时间
    var year = dateTime.getFullYear()
    var month = dateTime.getMonth() + 1
    var day = dateTime.getDate()
    var hour = dateTime.getHours()
    var minute = dateTime.getMinutes()
    // var second = dateTime.getSeconds()
    var millisecond = dateTime.getTime() // 将当前编辑的时间转换为毫秒
    var now = new Date() // 获取本机当前的时间
    var nowNew = now.getTime() // 将本机的时间转换为毫秒
    var milliseconds = 0
    var timeSpanStr
    milliseconds = nowNew - millisecond
    if (milliseconds <= 1000 * 60 * 1) { // 小于一分钟展示为刚刚
      timeSpanStr = '刚刚'
    } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) { // 大于一分钟小于一小时展示为分钟
      timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前'
    } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) { // 大于一小时小于一天展示为小时
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
    } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) { // 大于一天小于十五天展示位天
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
    } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
      timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute
    } else {
        timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    }
    return timeSpanStr
}