<template>
    <div class="goodsinfo-container">

        <transition 
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-if="flag" ref="ball"></div>
        </transition>
        

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunboImgList="lunboImgList" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        <span class="market-price">市场价：<del>{{goodsinfo.market_price}}</del> </span>
                        <span class="sell_price">销售价：￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量：<goodsinfNumberBox :max="goodsinfo.stock_quantity" @getCount="selectedCount"></goodsinfNumberBox> </p>
                    <p>
                        <span><mt-button type="primary" size="small">立即购买</mt-button></span>
                        <span><mt-button type="danger" size="small" @click="addToCart">加入购物车</mt-button></span>
                    </p>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goGoodsDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goGoodsComment(id)">商品评论</mt-button>
            </div>
            
        </div>
    </div>


</template>

<script>

import axios from 'axios'
import swiper from '../subcomponents/swiper.vue'
import goodsinfNumberBox from '../subcomponents/goodsinfo_numberbox.vue'

export default {
    data(){
        return {
            id:this.$route.params.id,
            lunboImgList:[],
            goodsinfo:{},
            flag:false,
            count:1
        }
    },
    methods:{
        getlunbo(){
            axios.get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id).then(response => {
                console.log( "缩略图"+ response);
                if(response.data.status == '0'){
                    var thumbList =  response.data.message;
                    thumbList.forEach(element => {
                        element.w = 600;
                        element.h = 400;
                        element.img = element.src;
                    });
                    this.lunboImgList = thumbList;
                }
            })
        },
        getGoodsInfo(){
            axios.get("http://www.liulongbin.top:3005/api/goods/getinfo/" + this.id).then(response => {
                if(response.data.status == '0'){
                    this.goodsinfo = response.data.message[0];
                }
            })
        },
        goGoodsDesc(id){
            this.$router.push({name:"goodsdesc",params:{id}})
        },
        goGoodsComment(id){
            this.$router.push({name:"goodscomment",params:{id}})
        },
        addToCart(){
            this.flag = !this.flag;
        },
        beforeEnter(el){
            el.style.transform = "translate(0,0)";
        },
        enter(el,done){

            // 完善不同的分辨率，不同的位置，小球动画的轨迹
            const obj1 = this.$refs.ball.getBoundingClientRect();
            const obj2 = document.getElementById("badge").getBoundingClientRect();

            const distanceX = obj2.left - obj1.left;
            const distanceY = obj2.top - obj1.top;

            console.log(distanceX);
            console.log(distanceY);

            el.offsetWidth;
            el.style.transform = `translate(${distanceX}px,${distanceY}px)`;
            el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
            done();
        },
        afterEnter(el){
            this.flag = !this.flag;
        },
        selectedCount(count){
            this.count = count;
            console.log("父组件从子组件获取到的count是:" + count);
        }
    },
    components:{
        swiper,goodsinfNumberBox
    },
    created(){
        this.getlunbo();
        this.getGoodsInfo();
    }
}
</script>

<style lang="scss" scoped>

.goodsinfo-container{
    background-color: #ccc;
    overflow: hidden;

    .price{
        .market_price{

        }

        .sell_price{
            margin-left: 10px;
            color: red;
            font-size: 14px;
            font-weight: bolder;
        }
    }

    .mui-card-footer{
        display: block;
        button{
            margin: 15px 0;
        }
    }

    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        left: 150px; 
        top: 400px;
    }


}

</style>

