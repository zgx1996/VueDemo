<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
					<router-link :to="'/home/newsInfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{ item.title }}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间 ：{{ item.add_time | dateFormat}} </span>
                                <span>点击次数 ： {{ item.click }} 次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
</template>


<script>

    import axios from 'axios'
    import {Toast} from 'mint-ui'

    export default{
        data(){
            return {
                newsList:[]
            }
        },
        methods:{
            getNewsList(){
                axios.get("http://www.liulongbin.top:3005/api/getNewslist")
                    .then(response => {
                       if(response.data.status == "0"){
                           this.newsList = response.data.message;
                       }else{
                           Toast("获取新闻资讯列表失败")
                       }
                        
                    })
            }
        },
        created(){
            this.getNewsList();
        }
    }

</script>

<style lang="scss" scoped>

    .mui-table-view{
        h1 {
            font-size: 16px;
        }
        .mui-ellipsis{
            font-size: 12px;
            color: blue;
            display: flex;
            justify-content: space-between;

        }

    }

</style>
