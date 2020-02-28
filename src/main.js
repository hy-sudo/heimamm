import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./style/bese.css"
Vue.use(ElementUI)
Vue.config.productionTip = false

//导入vuex对象
import store from './store/index';
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
