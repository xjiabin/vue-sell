/**
 * 解析 url 参数
 * @example ?id=123&b=2
 * @return Object { id:123, b:2 }
 */
export function urlParse() {
    const url = window.location.search;
    const obj = {};
    const reg = /[?&][^?&]+=[^?&]+/g;

    const arr = url.match(reg);
    // ['?id=123', '&b=2']
    if (arr) {
        arr.forEach(item => {
            let tmpArr = item.substring(1).split('=');
            let key = decodeURIComponent(tmpArr[0]);
            let val = decodeURIComponent(tmpArr[1]);
            obj[key] = val;
        })
    }

    return obj;
}