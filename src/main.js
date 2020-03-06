import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./style/bese.css"
Vue.use(ElementUI)
Vue.config.productionTip = false

//导入获取学科的组件注册成全局组件
import subjectSelect from './components/subjectSelect.vue'
Vue.component('subjectSelect', subjectSelect)

//导入获取企业的组件注册成全局组件
import businessSelect from './components/businessSelect.vue'
Vue.component('businessSelect', businessSelect)

//导入过滤器全局使用
import '@/filters/filters.js'

//导入vuex对象
import store from './store/index';
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
