//放vuex代码
//导入
import Vue from 'vue';
import Vuex from 'vuex';
//注册
Vue.use(Vuex)
//实例化
const store = new Vuex.Store({
    state: {
        username: "",
        avatar: "",
        role: ""
    },
    mutations: {
        changeUsername(state, val) {
            state.username = val
        },
        changeAvatar(state, val) {
            state.avatar = val
        },
        changeRole(state, val) {
            state.role = val
        }


    }
})
//暴露出去
export default store;