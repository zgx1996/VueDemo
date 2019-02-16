import Vue from 'vue'


// 引入 mint-ui 组件
import { Header, Swipe, SwipeItem, Button } from 'mint-ui';
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


// 引入路由模块
import VueRouter from "vue-router"
import router from './router.js'
Vue.use(VueRouter);

import moment from "moment"
// 定义全局的时间过滤器
Vue.filter('dateFormat',function(originDate,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(originDate).format(pattern)
})


import app from './App.vue'





var vm = new Vue({
  el:"#app",
  data:{},
  render : c => c(app),
  router : router
})