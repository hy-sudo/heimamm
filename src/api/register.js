//导入axios
import axios from 'axios'
//封装一个axios方法并暴露出去
//发送手机验证码请求
export function sendSMS(data) {
    return axios({
        url: process.env.VUE_APP_PicURL + "/sendsms",
        method: 'post',
        data,
        withCredentials: true
    })
}
//发送注册账号接口请求
export function register(data) {
    return axios({
        url: process.env.VUE_APP_PicURL + "/register",
        method: 'post',
        data,
        withCredentials: true
    })
}