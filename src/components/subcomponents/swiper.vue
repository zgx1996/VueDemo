<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunboImgList" :key="item.id"> 
                <img :src="item.img" :class="{'full':isfull}" alt=""> 
            </mt-swipe-item>
        </mt-swipe>
    </div> 
</template>


<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        
    },
    props:["lunboImgList","isfull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe{
        height: 200px;
        text-align: center;
        .mint-swipe-item{
            img {
                height: 100%;
            }

        }
    }

.full{
    width: 100%;
    }
</style>
