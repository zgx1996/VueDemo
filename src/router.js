import VueRouter from "vue-router"


import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'

import PhotoList from './components/photo/PhotoList.vue'
import PhotoInfo from './components/photo/PhotoInfo.vue'

var router = new VueRouter({
    routes : [
        {path:"/",redirect:"/home"},
        {path:"/home",component:HomeContainer},
        {path:"/member",component:MemberContainer},
        {path:"/shopcar",component:ShopcarContainer},
        {path:"/search",component:SearchContainer},
        {path:"/home/newsList",component:NewsList},
        {path:"/home/newsInfo/:id",component:NewsInfo},
        {path:"/home/photoList",component:PhotoList},
        {path:"/home/photoinfo/:id",component:PhotoInfo}
        
    ] ,
    linkActiveClass:'mui-active'
})

export default router