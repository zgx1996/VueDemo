<template>
    <div>
        <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cate" :key="item.id" @click="getImageListByCate(item.id)" href="#item1mobile" data-wid="tab-top-subpage-1.html">
                        {{item.title}}
                    </a>
                </div>
			</div>
		</div>

        <ul class="product-list">
            <router-link tag="li" v-for="item in imageList" :key="item.id" :to="'/home/photoinfo/' + item.id">
                <img v-lazy="item.img_url">
                <div class="info">
                    <div class="info-title">{{ item.title }}</div>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>


    </div>
</template>

<script>

import mui from '../../lib/mui/js/mui.min.js'
import axios from 'axios'

export default {
    data(){
        return {
            cate:[],
            imageList:[]
        }
    },
    methods:{
        getImageCategory(){
            axios.get("http://www.liulongbin.top:3005/api/getimgcategory").then(response => {
                if(response.data.status == "0"){
                    response.data.message.unshift({title:"全部",id:0});
                    console.log(response)
                    this.cate = response.data.message;
                }
            })
        },
        getImageListByCate(cateId){
            axios.get("http://www.liulongbin.top:3005/api/getimages/" + cateId).then(response => {
                if(response.data.status == "0"){
                    this.imageList = response.data.message;
                }
            })
        }
    },
    created(){
        this.getImageCategory();
        this.getImageListByCate(0);
    },
    mounted(){
        mui(".mui-scroll-wrapper").scroll({
            deceleration: 0.0005
        })
    }
}



</script>

<style lang="scss" scoped>

*{
    touch-action: pan-y
}

.product-list{
    list-style: none;
    margin: 0;
    padding: 10px;
    margin-bottom: 0px;

    li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img{
            width: 100%;
            vertical-align: middle;
        }

        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }

        .info{
            position: absolute;
            bottom: 0px;
            color: white;
            text-align: left;
            background-color: rgba(0, 0, 0, 0.4);
            max-height: 84px;
            .info-title{
                font-size: 14px;
            }

            .info-body{
                font-size: 13px;
            }
        }

    }
}

</style>


