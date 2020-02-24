//导入axios
import axios from 'axios'
//暴露一个登录的方法出去
export function login(data) {
    return axios({
        url: process.env.VUE_APP_PicURL + "/login",
        method: 'post',
        data,
        withCredentials: true
    });
}