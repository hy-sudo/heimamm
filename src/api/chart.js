import request from '@/utilis/request.js'

//封装获取顶部数据的
export function getTop(){

    return request({
        url:"/data/title",
        method:"post"
    })
}

// 封装获取底部数据的
export function statistics(){

    return request({

        url:"/data/statistics",
        method:"post"
    })
}
