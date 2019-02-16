<template>
    <div class="newsinfo-container">
        <!-- 标题区域 -->
        <h3 class="title">{{ newsinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间 : {{ newsinfo.add_time }}</span>
            <span>点击 : {{ newsinfo.click }}次</span>
        </p>
        <hr/>

        <!-- 内容区域 -->
        <div class="content" v-html="newsinfo.content"></div>

        <!-- 评论子组件 -->
        <comment :newsinfoid="id"></comment>

    </div>
</template>

<script>

    import axios from 'axios'
    import {Toast} from 'mint-ui'


    import comment from '../subcomponents/comment.vue'

    export default{
        data(){
            return {
                id:this.$route.params.id,
                newsinfo:{}
            }
        },
        methods:{
            getnewsinfo(){
                axios.get("http://www.liulongbin.top:3005/api/getnew/" + this.id).then(response => {
                    console.log(response)
                    if(response.data.status == '0'){
                        console.log(response)
                        this.newsinfo = response.data.message[0];
                    }
                })
            }
        },
        components:{
            comment
        },
        created(){
            this.getnewsinfo();
        }

    }

</script>

<style lang="scss" scoped>

    .newsinfo-container{
        .title{
            font-size: 16px;
            color: red;
            text-align: center;
            margin: 10px 0px;
            }
        .subtitle{
            color:blue;
            display: flex;
            justify-content: space-between;
        }
    }

    

</style>

