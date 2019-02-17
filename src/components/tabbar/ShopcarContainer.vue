<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in carList" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch @change="selectedChange(item.id,$store.getters.getShopCarItemStatus[item.id])" v-model="$store.getters.getShopCarItemStatus[item.id]"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numberbox :initcount="$store.getters.getShopCarCount[item.id]" :itemId="item.id"></numberbox>
                                <a href="#" @click="del(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner jiesuan">
                    <div class="left">
                        <p>总计（不含运费）</p>
                        <p>已勾选商品 <span class="red">{{$store.getters.getSelectedShopCarItemAndTotalPrice.selectedShopCarCount}}</span>  件，总价 ￥ <span class="red">{{$store.getters.getSelectedShopCarItemAndTotalPrice.totalAmount}}</span> </p>
                    </div>
                    <mt-button type="primary" size="small">去结算</mt-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import numberbox from "../subcomponents/shopcar_numberbox.vue"
import axios from 'axios'

export default{
    data(){
        return {
            carList:[]
        }
    },
    methods:{
        getShopCarList(){
            var carList = [];
            this.$store.state.car.forEach(item => {
                carList.push(item.id);
            })
            if(carList.length < 1){
                return [];
            }
            axios.get("http://www.liulongbin.top:3005/api/goods/getshopcarlist/" + carList.join(",")).then(response => {
                console.log(response)
                if(response.data.status == '0'){
                    this.carList = response.data.message;
                }
            })
        },
        del(id,index){
            this.carList.splice(index,1);
            this.$store.commit("deleteCarItem",id)
        },
        selectedChange(id,status){
            this.$store.commit("changeCarItemStatus",{id:id,status:status})
        }
    },
    components:{
        numberbox
    },
    created(){
        this.getShopCarList();
    }
}

</script>

<style lang="scss" scoped>
.shopcar-container{
    overflow: hidden;
    background-color: #ccc;

    .goods-list{

        .mui-card-content-inner{
            display: flex;
            text-align: center;
        }

        img{
            width: 60px;
            height: 60px;
        }

        .info{
            h1{
                font-size: 13px;
            }
            .price{
                color: red;
                
            }
        }
    }

    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;

        .red{
            color: red;
            font-size: 13px;
            font-weight: bold;
        }
    }

}
</style>
