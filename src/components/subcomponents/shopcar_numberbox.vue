<template>
    
    <div class="mui-numbox" data-numbox-min="0">
    <!-- "-"按钮，点击可减小当前数值 -->
    <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
    <input class="mui-numbox-input" type="number" @change="countChange" :itemId="itemId" :value="initcount" ref="numberBox" readonly/>
    <!-- "+"按钮，点击可增大当前数值 -->
    <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>

</template>

<script>

import mui from '../../lib/mui/js/mui.min.js'

export default {
    data(){
        return {

        }
    },
    methods:{
        countChange(){
            this.$store.commit("updateCarCount",{id:this.itemId,count:parseInt(this.$refs.numberBox.value)});
        }
    },
    props:["initcount","itemId"],
    mounted(){
        mui(".mui-numbox").numbox()
    }
}
</script>

<style lang="scss" scoped>
.mui-numbox{
    height: 25px;
}
</style>

