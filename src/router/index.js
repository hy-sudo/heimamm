import Vue from 'vue'
//1.导入vue-router
import VueRouter from 'vue-router'
//导入进度条nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//准备login组件
import login from '../views/login/index.vue';
//导入index组件
import index from '../views/index/index.vue'
//导入主页面的子路由
import chart from '@/views/index/components/chart/chart';
import user from '@/views/index/components/user/user';
import business from '@/views/index/components/business/business';
import question from '@/views/index/components/question/question';
import subject from '@/views/index/components/subject/subject';
//2.注册vue-router
Vue.use(VueRouter)
//3.实例化
const router = new VueRouter({
    //这里就是路由的配制项
    routes: [
        {
            path: "/login",
            component: login
        },
        {
            path: "/index",
            component: index,
            children: [
                //子路由路径不加/
                {
                    path: 'chart',
                    component: chart
                },
                {
                    path: 'user',
                    component: user
                },
                {
                    path: 'business',
                    component: business
                },
                {
                    path: 'question',
                    component: question
                },
                {
                    path: 'subject',
                    component: subject
                },
            ]
        },

    ]
})
// 导航守卫
// 跳转之前的钩子
router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
})
//跳转之后的钩子
router.afterEach(() => {
    NProgress.done();
})
// 暴露出去
export default router;