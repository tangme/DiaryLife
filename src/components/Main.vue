<template>
	<div>
		<div>
			<div class="header">
				<div class="user-group">
					<div class="user-group-item" style="color: #f8f8f9;cursor: pointer;position: relative;" @click.self="showUserSetting">
						{{userName}}
						<ul class="dropdown-ul" ref="test">
							<li @click="$router.push({name:'userCenter'})">个人中心</li>
							<li @click="loginOut">退出登录</li>
						</ul>
					</div>
					<div class="user-group-item">
						<span class="avatar">
							<img src="http://thepatternlibrary.com/img/aq.jpg" >
						</span>
					</div>
				</div>
				<!-- <button >注销</button> -->
			</div>
		</div>
		<div>
			<transition name="fade" mode="out-in">
				<router-view/>
			</transition>
		</div>
	</div>

</template>
<script>
import Cookies from 'js-cookie';

export default{
	computed:{
		userName(){
			return this.$store.state.user.nickName || this.$store.state.user.account || this.$store.state.user.email || this.$store.state.user.email;
		}
	},
	methods:{
		showUserSetting(event){
			let flag = this.$refs['test'].style.display;
			this.$refs['test'].style.display = (flag=='block'?'none':'block');
		},
		loginOut(){
			this.$store.commit('logout');
			sessionStorage.clear();
			this.$router.push({name:'login'});
		}
	}
}	
</script>
<style scoped>
.header{
	position: relative;
	height: 60px;
	background-color: #00CC99;
	box-shadow: 0 0 10px ;
}	
.user-group{
	position: absolute;
	right: 0;
	top: 0;
	display: flex;
	align-items: center;
	height: 100%;
	padding-right: 14px;
}
.user-group-item{
	display: inline-block;
	margin: 0 10px;
}
.avatar{
    position: relative;
	display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: middle;
	width: 32px;
	height: 32px;
	border-radius: 16px;
}
.avatar>img{
	width: 100%;
	height: 100%;
}

.dropdown-ul{
	position: absolute;
	display: none;
	padding: 0;
	list-style: none;
	border:1px solid;
	background-color: #fff;
	color:#ccc;
	min-width: 100px;
}
.dropdown-ul>li{
	margin: 5px 0;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}

.bounce-enter-active { animation: bounce-in .5s; } 
.bounce-leave-active { animation: bounce-in .5s reverse; } 
@keyframes bounce-in { 0% { transform: scale(0); } 50% { transform: scale(1.5); } 100% { transform: scale(1); } }


</style>