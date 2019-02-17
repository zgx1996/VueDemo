<template>

  <div class="app-container">
    <mt-header fixed title="Vue Demo">
			<span slot="left" @click="goBack" v-if="flag">
				<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>


		<transition>
			<router-view></router-view>
		</transition>
    
    
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-llb" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{this.$store.getters.getAllCount}}</span>
        </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

  </div>



</template>

<script>

export default{
	data(){
		return {
			flag:false
		}
	},
	methods:{
		goBack(){
			this.$router.go(-1);
		}
	},
	created(){
		this.$route.path == "/home"?this.flag = false:this.flag = true;
	},
	watch:{
		'$route.path':function(newValue){
			console.log(newValue);
			if(newValue == "/home"){
				this.flag = false;
			}else{
				this.flag = true;
			}
		}
	}
}

</script>

<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
	overflow-x: hidden;
	background-color: white;
	padding-bottom: 50px;
	height: 100%;
}

.v-enter{
	opacity: 0;
	transform: translateX(100%)
}

.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}

.v-enter-active,
.v-leave-active{
	transition: all 0.5s ease
}


.mui-bar-tab .mui-tab-item-llb.mui-active {
    color: #007aff;
}


.mui-bar-tab .mui-tab-item-llb {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-llb .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}


.mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}


.mint-header {
	z-index: 99;
}

</style>

