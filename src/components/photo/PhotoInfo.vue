<template>
    <div class="photoinfo-container">
        <h3 class="title">{{photoinfo.title}}</h3>
        <div class="subTitle">
            <span>发表时间:{{photoinfo.add_time | dateFormat}}</span>
            <span>点击:{{photoinfo.click}}次</span>
        </div>

        <!-- 缩略图区域 -->
        <div class="thumbImage">
            <vue-preview
            :list="thumbImageList"
            :thumbImageStyle="{width: '80px', height: '80px', margin: '10px'}"
            :previewBoxStyle="{border: '1px solid #eee'}"
            :tapToClose="true"
            @close="closeHandler"
            @destroy="destroyHandler"
            />

        </div>
        


        <div class="content" v-html="photoinfo.content"></div>

        <comment :id="id"></comment>


    </div>
</template>


<script>

import comment from "../subcomponents/comment.vue"
import axios from 'axios'

export default {
    data(){
        return {
            id:this.$route.params.id,
            msg:'',
            photoinfo:{},
            thumbImageList:[]
        }
    },
    methods:{
        getImageInfo(){
            axios.get("http://www.liulongbin.top:3005/api/getimageInfo/" + this.id).then(response => {
                console.log(response);
                if(response.data.status == '0'){
                    this.photoinfo = response.data.message[0];
                }
            })
        },
        getthumimages(){
            axios.get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id).then(response => {
                console.log( "缩略图"+ response);
                if(response.data.status == '0'){
                    var thumbList =  response.data.message;
                    thumbList.forEach(element => {
                        element.w = 600;
                        element.h = 400;
                    });
                    this.thumbImageList = thumbList;
                }
            })
        },
        // 即将关闭的时候，调用这个处理函数
        closeHandler() {
        console.log('closeHandler')
        },
        // 完全关闭之后，调用这个函数清理资源
        destroyHandler() {
        console.log('destroyHandler')
        }
    },
    created(){
        this.getImageInfo();
        this.getthumimages();
    },
    components:{
        comment
    }

}
</script>

<style lang="scss" scoped>
    .photoinfo-container{
        padding: 3px;
        .title{
            color: #1B9BFF;
            text-align: center;
            font-size: 15px;
            margin: 15px 0;
        }
        .subTitle{
            font-size: 13px;
            display: flex;
            justify-content: space-between;
        }

        .thumbImage{
            margin: 5px;
            box-shadow: 0 0 8px #999;
        }

        .content{
            margin-top: 5px;
            font-size: 13px;
            line-height: 30px;
            letter-spacing: 2px;
        }

    }


</style>
