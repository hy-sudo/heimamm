import axios from 'axios'
import { getToken } from '@/utilis/token.js'
//克隆一个axios对象，这里克隆的对象自带有配置好的属性
let indexRequest = axios.create({
    //基地址
    baseURL: process.env.VUE_APP_PicURL,
    //请求头
    headers: {
        token: getToken()
    }
});

//添加一个拦截器
indexRequest.interceptors.request.use(function(config){
    //config参数就是被拦截下来的配置
    config.headers.token = getToken();
    return config;
},function(error){
    return Promise.reject(error);
})

//获取登录的用户信息
export function info() {
    // return axios({
    //     url: process.env.VUE_APP_PicURL+"/info",
    //     method: 'get',
    //     headers:{
    //         token: getToken()
    //     }
    // })
    return indexRequest({
        url: "/info",
        method: "get"
    })
}

//退出请求
export function logout() {
    return indexRequest({
        url: "/logout",
        method: "get"
    })
}