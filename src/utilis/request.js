import axios from 'axios'

// 创建一个新的请求对象
let request = axios.create({

    baseURL: process.env.VUE_APP_PicURL,
    withCredentials: true
})

// 导入token
import { getToken } from '@/utilis/token.js'
// 请求拦截，后面发请求不用自己再一个一个设置token
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken();

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default request;