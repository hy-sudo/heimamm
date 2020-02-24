//声明一个常量来保存token
const TOKENKEY = 'hmmmtoken';
// 暴露一个获取token的方法
export function getToken() {
    return window.localStorage.getItem(TOKENKEY)
}
//暴露设置token的方法
export function setToken(token) {
    return window.localStorage.setItem(TOKENKEY, token)
}
//暴露删除token的方法
export function removeToken() {
    return window.localStorage.removeItem(TOKENKEY)
}
