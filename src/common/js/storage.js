const SELLER_KEY = '__seller__';

/**
 * 保存数据到本地
 * @param {*} id 存储目标的唯一标识
 * @param {*} key key
 * @param {*} value value
 */
export function saveToLocal(id, key, value) {
    let seller = window.localStorage[SELLER_KEY];
    if (!seller) {
        seller = {};
        seller[id] = {};
    } else {
        seller = JSON.parse(seller);
        if (!seller[id]) {
            seller[id] = {};
        }
    }

    seller[id][key] = value;
    window.localStorage[SELLER_KEY] = JSON.stringify(seller);
}

/**
 * 从本地获取数据
 * @param {*} id 唯一标识
 * @param {*} key key
 * @param {*} def 默认值
 */
export function loadFromLocal(id, key, def) {
    let seller = window.localStorage[SELLER_KEY];
    if (!seller) {
        return def;
    }
    seller = JSON.parse(seller)[id];
    if (!seller) {
        return def;
    }

    let ret = seller[key];
    return ret || def;
}