import Vue from 'vue'
// 1. 导入 vue-router
import VueRouter from 'vue-router'
// 准备login组件
import login from '../views/login/index.vue'
// 2. 注册 vue-router
Vue.use(VueRouter)
// 3. 实例化
const router = new VueRouter({
    //这里就是路由的配制项
    routes: [
        {
            path:"/login",
            component:login
        },
    ]
}) 
export default router;