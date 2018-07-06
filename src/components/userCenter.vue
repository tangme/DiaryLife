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
			<button>保存</button>
		</div>
	</div>
</template>
<script>
import tanglvinput from '@/components/input/input';	
import Axios from 'axios';
import {HOST} from '@/assets/config';

export default{
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
			Axios.post(HOST+'/server/login',{
			    account: this.account,
			    pwd: this.pwd
			})
			.then(res => {
				alert(res.data.msg);
			    if(res.data.code == 1){
			    	console.log(res.data);
			    }
			})
			.catch(function (error) {
			    console.log(error);
			});
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