//导入主页面的子路由
import chart from '@/views/index/components/chart/chart';
import user from '@/views/index/components/user/user';
import question from '@/views/index/components/question/question';
import business from '@/views/index/components/business/business';
import subject from '@/views/index/components/subject/subject';

export default [
    //子路由路径不加/
    {
        path: 'chart',
        component: chart,
        meta: { title: '数据概览', roles: ['超级管理员', '管理员'], icon: "el-icon-pie-chart" }
    },
    {
        path: 'user',
        component: user,
        meta: { title: '用户列表', roles: ['超级管理员', '管理员'], icon: "el-icon-user" }
    },
    {
        path: 'question',
        component: question,
        meta: { title: '题库列表', roles: ['超级管理员', '管理员', '老师', '学生'], icon: "el-icon-edit-outline" }
    },
    {
        path: 'business',
        component: business,
        meta: { title: '企业列表', roles: ['超级管理员', '管理员', '老师'], icon: "el-icon-office-building" }
    },
    {
        path: 'subject',
        component: subject,
        meta: { title: '学科列表', roles: ['超级管理员', '管理员', '老师', '学生'], icon: "el-icon-notebook-2" }
    },
]
