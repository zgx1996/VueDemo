<template>
    
    <div class="mui-numbox" data-numbox-min="0">
    <!-- "-"按钮，点击可减小当前数值 -->
    <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
    <input class="mui-numbox-input" type="number" value="1" @change="changeCount" ref="numberBox"/>
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
        changeCount(){
            this.$emit("getCount",parseInt(this.$refs.numberBox.value));
        }
    },
    props:["getCount","max"],
    watch:{
        "max":function(newVal,oldVal){
            mui(".mui-numbox").numbox().setOption('max',newVal)

        }
    },
    mounted(){
        mui(".mui-numbox").numbox()
    }
}
</script>

<style lang="scss" scoped>

</style>

