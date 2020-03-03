import request from '@/utilis/request.js'

//封装请求

//获取用户列表
export function userList(params){

    return request({
        url:"/user/list",
        method:'get',
        params
    })
}

// 新增用户
export function userAdd(data){

    return request({
        url:"/user/add",
        method:'post',
        data
    })
}

// 编辑用户
export function userEdit(data){

    return request({
        url:"/user/edit",
        method:'post',
        data
    })
}

// 删除用户
export function userRemove(data){

    return request({
        url:"/user/remove",
        method:'post',
        data
    })
}


// 修改用户状态
export function userStatus(data){

    return request({
        url:"/user/status",
        method:'post',
        data
    })
}


