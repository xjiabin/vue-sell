/**
 * 根据模板格式化日期格式
 * @param {*} date 格式化的时间
 * @param {*} fmt 格式化的模板 YYYY-MM-DD hh:mm:ss
 */
export function formatDate(date, fmt) {
    // 因为年份是4位数, 所以先匹配替换模板中的年份格式
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, date.getFullYear());
    }

    // 模板正则对象
    let o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDay(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }

    for (let k in o) {
        // 先转换为字符串
        let str = o[k] + '';

        // 动态生成模板正则, 匹配模板格式; 如果模板的月日是一位数 不需要补0
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.length === 1) ? str : /* 补零 */ padLeftZero(str))
        }
    }

    // 返回替换之后的模板
    return fmt;
}

/**
 * 在字符串左侧添加0
 * @param {*} str 需要填充的字符串
 */
function padLeftZero(str) {
    // 截取字符串的长度位数之后的字符串
    // 如果传入的是 1 => 001 => 01
    // 如果传入的是 11 => 0011 => 11
    return ('00' + str).substr(str.length)
}
