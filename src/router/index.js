import Vue from 'vue'
//1.导入vue-router
import VueRouter from 'vue-router'
//导入进度条nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//导入info
import { info } from "@/api/index.js";
//导入删除token的方法
import { removeToken } from "@/utilis/token.js";
//导入提示框样式
import { Message } from 'element-ui'
//导入vuex对象
import store from '../store/index'
//导入子路由
import children from './childrenRouter'

//准备login组件
import login from '../views/login/index.vue';
//导入index组件
import index from '../views/index/index.vue'
//2.注册vue-router
Vue.use(VueRouter)
//3.实例化
const router = new VueRouter({
    //这里就是路由的配制项
    routes: [
        {
            path: "/login",
            component: login,
            meta: { title: '登录', roles: ['超级管理员', '管理员', '老师', '学生'] }
        },
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/index",
            component: index,
            meta: { title: '首页', roles: ['超级管理员', '管理员', '老师', '学生'] },
            children
        }

    ]
});
//定义白名单数组
let whiteUrl = ['/login'];
// 导航守卫
// 跳转之前的钩子
router.beforeEach((to, from, next) => {
    //开始进度条
    NProgress.start();
    //如果页面是登录页就直接放行
    // if (to.path == '/login') {
    if (whiteUrl.includes(to.path)) {
        next();
    } else {
        //如果不是就给token做判断
        info().then(res => {
            console.log(res)
            if (res.data.code == 200) {
                // console.log(res)
                //调用vuex里的方法来获取数据
                if (res.data.data.status == 1) {  // 判断账号登录权限(1为启用)
                    store.commit('changeUsername', res.data.data.username);
                    store.commit('changeAvatar', process.env.VUE_APP_PicURL + "/" + res.data.data.avatar);
                    store.commit('changeRole',res.data.data.role)
                    //登录页面跳转才提示
                    if (from.path == '/login') {
                        Message.success('登录成功');
                    }
                    //判断账号身份权限是否有权访问
                    if (to.meta.roles.includes(res.data.data.role)) {
                        next();
                    } else {
                        Message.warning('该页面,你无权访问~')
                        //手动完成进度条
                        NProgress.done();
                        //打回来时页面
                        next(from.path)
                    }

                } else {
                    Message.warning('账号已被禁用，请与管理员联系~')
                    //手动完成进度条
                    NProgress.done();
                    //打回登录页
                    next('/login')
                }
            } else {
                Message.error('登录状态异常，请重新登录!')
                //删除Token
                removeToken();
                //手动完成进度条
                NProgress.done();
                //打回登录页
                next('/login')
            }
        })
    }
})
//跳转之后的钩子
router.afterEach((to) => {
    //进度条完成
    NProgress.done();
    //取出当前要去的页面的标签设置给title
    document.title = to.meta.title;
})
// 暴露出去
export default router;