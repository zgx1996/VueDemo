<template>
    <div class="goodsdesc-container">
        <h3 class="title">{{goodsdesc.title}}</h3>
        <hr/>
        <div class="content" v-html="goodsdesc.content"></div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data(){
        return {
            goodsdesc:{}
        }
        
    },
    methods:{
        getGoodsDesc(){
            axios.get("http://www.liulongbin.top:3005/api/goods/getdesc/" + this.$route.params.id).then(response => {
                if(response.data.status == '0'){
                    this.goodsdesc = response.data.message[0];
                }
            })
        }
    },
    created(){
        this.getGoodsDesc();
    }
}
</script>

<style lang="scss">
.goodsdesc-container {
    h3{
        text-align: center;
        font-size: 16px;
        color: blue;
        margin: 15px 0;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>


