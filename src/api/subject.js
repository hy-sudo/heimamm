import axios from 'axios'
import { getToken } from "@/utilis/token.js";
//创建一个新的请求对象
let subjectRequest = axios.create({
    baseURL: process.env.VUE_APP_PicURL,
    withCredentials: true
})
//拦截器
subjectRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken();
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

//封装一个获取学科列表的接口
export function subjectList(params) {
    return subjectRequest({
        url: "/subject/list",
        params
    })
}

//封装一个获取学科状态的接口
export function subjectStatus(data) {
    return subjectRequest({
        url: "/subject/status",
        method: "post",
        data
    })
}

//封装一个添加学科的接口
export function newSubject(data) {
    return subjectRequest({
        url: "/subject/add",
        method: "post",
        data
    })
}

//封装一个编辑学科的接口
export function SubjectEdit(data) {
    return subjectRequest({
        url: "/subject/edit",
        method: "post",
        data
    })
}

//封装一个删除学科的接口
export function SubjectRemove(data) {
    return subjectRequest({
        url: "/subject/remove",
        method: "post",
        data
    })
}