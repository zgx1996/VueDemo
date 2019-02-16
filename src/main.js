import Vue from 'vue'


// 引入 mt-header 组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header)

// 引入 轮播图 组件
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


// 引入路由模块
import VueRouter from "vue-router"
import router from './router.js'
Vue.use(VueRouter);





import app from './App.vue'





var vm = new Vue({
  el:"#app",
  data:{},
  render : c => c(app),
  router : router
})