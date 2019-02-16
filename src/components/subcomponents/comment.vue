<template>
    <div class="comment-container">
        <h3>发表评论</h3>
        <hr/>
        <textarea placeholder="请输入评论内容" maxlength="120"></textarea>

        <mt-button type="primary" size="large">发表评论</mt-button>

        <div class="comment-list">
            <div class="comment-item" v-for="(item,i) in commentList" :key="item.add_time">
                <div class="comment-title">
                    第{{i + 1}}楼&nbsp;&nbsp;用户:{{item.user_name}} 发表时间  {{item.add_time | dateFormat}}
                </div>
                <div class="comment-content">
                    {{item.content == 'undefined' || item.content == ''? '此用户暂时没有评论':item.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="loadNextPage">加载更多</mt-button>

    </div>
</template>

<script>

import axios from 'axios'
import {Toast} from 'mint-ui'

export default {
    data(){
        return {
            pageindex: 1,
            commentList:[]
        }
    },
    props:['newsinfoid'],
    methods:{
        getComments(){
            axios.get("http://www.liulongbin.top:3005/api/getComments/" + this.newsinfoid + "?pageindex=" + this.pageindex)
                .then((response) => {
                    console.log("评论的内容是"+JSON.stringify(response.data));
                    if(response.data.status == "0"){
                        this.commentList = this.commentList.concat(response.data.message);
                    }else{
                        Toast("加载评论失败！！！")
                    }
                    
                })
        },
        loadNextPage(){
            this.pageindex ++;
            this.getComments();
        }
    },
    created(){
        this.getComments();
    }
}
</script>

<style lang="scss" scoped>

.comment-container{
    h3{
        font-size: 16px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    
    .comment-list{
        .comment-item{
            margin-top: 10px;
            .comment-title{
                line-height: 30px;
                background-color: #ccc;
                font-size: 13px;
            }
            .comment-content{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }

}

</style>

