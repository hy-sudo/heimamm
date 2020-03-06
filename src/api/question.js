//导入封装好的请求拦截器
import request from '@/utilis/request.js'

//发布题目
export function addQuestion(data) {
    return request({
        url: "/question/add",
        method: "post",
        data
    })
}

//获取题目信息
export function getQuestionInfo(data) {
    return request({
        url: "/question/one",
        method: "post",
        data
    })
}

//获取题目状态
export function questionStatus(data) {
    return request({
        url: "/question/status",
        method: "post",
        data
    })
}

//删除题目
export function questionRemove(data) {
    return request({
        url: "/question/remove",
        method: "post",
        data
    })
}

//编辑题目
export function questionEdit(data) {
    return request({
        url: "/question/edit",
        method: "post",
        data
    })
}

//获取题目列表
export function questionList(params) {
    return request({
        url: "/question/list",
        method: "get",
        params
    })
}

//上传文件
export function questionUpload(data) {
    return request({
        url: "/question/upload",
        method: "post",
        data
    })
}
