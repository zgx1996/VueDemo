import Vue from 'vue'


// 引入 mint-ui 组件
import MintUI from 'mint-ui';
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


// 引入路由模块
import VueRouter from "vue-router"
import router from './router.js'
Vue.use(VueRouter);

import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

var car = JSON.parse(localStorage.getItem("car"))||[];


import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
  state:{
    car:car
  },
  mutations:{
    addToCar(state,carData){
      console.log(carData)

      var flag = false;

      state.car.some(item => {
        if(item.id == carData.id){
          item.count += parseInt(carData.count);
          flag = true;
          return true;
        }
      })
      
      if(!flag){
        state.car.push(carData)
      }
      
      localStorage.setItem("car",JSON.stringify(state.car))

    },
    updateCarCount(state,carItemInfo){
      state.car.some(item => {
        if(item.id == carItemInfo.id){
          item.count = carItemInfo.count;
          return true;
        }
      })
      localStorage.setItem("car",JSON.stringify(state.car))
    },
    deleteCarItem(state,id){
      state.car.some((item,i) => {
        console.log("=================")
        if(item.id == id){
          state.car.splice(i,1);
          console.log("=================")
          return true;
        }
      })
      localStorage.setItem("car",JSON.stringify(state.car))
    },
    changeCarItemStatus(state,json){
      state.car.some((item,i) => {
        if(item.id == json.id){
          console.log(json)
          item.selected = json.status;
          return true;
        }
      })
      localStorage.setItem("car",JSON.stringify(state.car));
    }
  },
  getters:{
    getAllCount(state){
      let total = 0;
      state.car.forEach(item => {
        total += item.count;
      })
      return total;
    },
    getShopCarCount(state){
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.count;
      })
      return o;
    },
    getShopCarItemStatus(state){
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected;
      })
      return o;
    },
    getSelectedShopCarItemAndTotalPrice(state){
      var o = {
        selectedShopCarCount:0,
        totalAmount:0
      };
      state.car.forEach(item => {
        if(item.selected){
          o.selectedShopCarCount += 1;
          o.totalAmount += (item.count * item.price);
        }
      })

      return o;

    }
  }
})



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
  router : router,
  store
})