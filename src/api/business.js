import axios from 'axios'
import { getToken } from "@/utilis/token.js";
//创建一个新的请求对象
let businessRequest = axios.create({
    baseURL: process.env.VUE_APP_PicURL,
    withCredentials: true
})
//拦截器
businessRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

//封装一个获取企业列表的接口
export function businessList(params) {
    return businessRequest({
        url: "/enterprise/list",
        params
    })
}

//封装一个获取企业状态的接口
export function businessStatus(data) {
    return businessRequest({
        url: "/enterprise/status",
        method: "post",
        data
    })
}

//封装一个添加企业的接口
export function newbusiness(data) {
    return businessRequest({
        url: "/enterprise/add",
        method: "post",
        data
    })
}

//封装一个编辑企业的接口
export function BusinessEdit(data) {
    return businessRequest({
        url: "/enterprise/edit",
        method: "post",
        data
    })
}

//封装一个删除企业的接口
export function businessRemove(data) {
    return businessRequest({
        url: "/enterprise/remove",
        method: "post",
        data
    })
}