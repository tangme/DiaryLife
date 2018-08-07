<template>
	<div>
		<button @click="$router.push({name:'home_index'});">返回首页</button>
		<div class="panel">
			<tanglvinput label="帐号" placeholder="帐号" v-model="userInfo.account" />
			<br>
			<tanglvinput label="昵称" placeholder="昵称" v-model="userInfo.nickName"/>
			<br>
			<tanglvinput label="绑定手机" placeholder="手机" v-model="userInfo.phone"/>
			<br>
			<tanglvinput label="绑定邮箱" placeholder="邮箱" v-model="userInfo.email"/>
			<button @click="updateData">保存</button>
		</div>
	</div>
</template>
<script>
import tanglvinput from '@/components/input/input';	
import Axios from 'axios';
import {request} from '@/assets/js/Utils';
import {HOST} from '@/assets/config';
import * as Utils from '@/assets/js/Utils';

export default{
	created(){
		
		return;
		Axios.post(HOST+'/user/updateUserInfo',{})
		.then(res => {
			console.log(res);
		})
		.catch(function (error) {
		    console.log(error);
		});
	},
	components:{
		tanglvinput
	},
	data(){
		return{
			userInfo:{
				account:this.$store.state.user.account,
				nickName:this.$store.state.user.nickName,
				phone:this.$store.state.user.phone,
				email:this.$store.state.user.email
			}
		}
	},
	methods:{
		/*更新数据*/
		updateData(){
			Utils.request(HOST+'/user/updateUserInfo',{
				nickName:this.userInfo.nickName
			},function(data){
				console.log('request success and end.');
			},function(error){
				console.log(error);
			},this);

			return;
			request(HOST+'/user/updateUserInfo',{
			    account: this.userInfo.account,
			    nickName: this.userInfo.nickName
			},function(data){
				console.log("--------------");
				console.log(data);
			},function(data){

			},this);
		}
	}
}	
</script>
<style scoped>
.panel	{
	width: 300px;
	margin:0 auto;
}
</style>