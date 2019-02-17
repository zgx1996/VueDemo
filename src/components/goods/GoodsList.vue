<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <div class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </div>
                <div class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="loadMore">加载更多</mt-button>
    </div>
</template>

<script>

import axios from 'axios'

export default {

    data(){
        return {
            pageindex:1,
            goodsList:[]
        }
    },
    methods:{
        getGoodsList(){
            axios.get("http://www.liulongbin.top:3005/api/getgoods?pageindex=" + this.pageindex).then(response => {
                if(response.data.status == '0'){
                    this.goodsList = this.goodsList.concat(response.data.message);
                }
            })
        },
        loadMore(){
            this.pageindex++;
            this.getGoodsList();
        },
        goDetail(id){
            console.log("id:" + id);
            this.$router.push({name:"goodsinfo",params:{id}})
        }
    },
    created(){
        this.getGoodsList();
    }
}
</script>

<style lang="scss" scoped>

    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        .goods-item{
            border: 1px solid #ccc;
            width: 49%;
            margin: 4px 0;
            box-shadow: 0 0 8px #ccc;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            min-height: 292px;
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }
            
            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                }

                .price{
                    
                    .now{
                        color: red;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }

                .sell{
                    font-size: 12px;
                    display: flex;
                    justify-content: space-between;
                }

            }

        }
    }

</style>
