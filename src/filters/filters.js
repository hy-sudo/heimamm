import Vue from 'vue'
import moment from 'moment'

//创建一个过滤时间的过滤器
Vue.filter('formatTime',function(value){

    return moment(value).format('YYY-MM-DD')
})