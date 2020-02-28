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
            component: login,
            meta: { title: '登录' }
        },
        {
            path: "/",
            redirect: "/login"
        },
        {
            path: "/index",
            component: index,
            meta: { title: '首页' },
            children: [
                //子路由路径不加/
                {
                    path: 'chart',
                    component: chart,
                    meta: { title: '数据概览' }
                },
                {
                    path: 'user',
                    component: user,
                    meta: { title: '用户列表' }
                },
                {
                    path: 'business',
                    component: business,
                    meta: { title: '题库列表' }
                },
                {
                    path: 'question',
                    component: question,
                    meta: { title: '企业列表' }
                },
                {
                    path: 'subject',
                    component: subject,
                    meta: { title: '学科列表' }
                },
            ]
        },

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
            if (res.data.code == 200) {
                // console.log(res)
                //调用vuex里的方法来获取数据
                store.commit('changeUsername', res.data.data.username);
                store.commit('changeAvatar', process.env.VUE_APP_PicURL + "/" + res.data.data.avatar);
                next();
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