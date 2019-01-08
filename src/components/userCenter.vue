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
			<br>
			<form name="uploadForm" 
			    id="uploadForm" 
			    method="post" 
			    enctype="multipart/form-data" 
			    :action="uploadUrl" 
			    target="uploadFrame">
			    <p style="margin:10px 0;">上传图片:
			        <input type="text" name="name" value="">
			        <input type="file" name="imageFile" multiple="multiple"/>
			        <input type="submit" id="fileSubmit" value="上传" />
			    </p>
			</form>
			<button @click="updateData">保存</button>
		</div>
	</div>
</template>
<script>
import tanglvinput from '@/components/input/input';	
import Axios from 'axios';
import request from '@/assets/js/Utils';
import {sendRequest} from '@/assets/js/Utils';
import {HOST} from '@/assets/config';

export default{
	created(){
		
	},
	components:{
		tanglvinput
	},
	data(){
		return{
			uploadUrl:`${HOST}/uploads`,
			userInfo:{
				account:this.$store.state.user.account,
				nickName:this.$store.state.user.nickName,
				phone:this.$store.state.user.phone,
				email:this.$store.state.user.email
			}
		}
	},
	methods:{
		/**
		 * [updateData 更新数据]
		 * @author tanglv 2018-08-08
		 */
		updateData(){
			sendRequest(HOST+'/user/updateUserInfo',{
				account:this.userInfo.account,
				nickName:this.userInfo.nickName,
				phone:this.userInfo.phone,
				email:this.userInfo.email,
			}).then(res=>{
				console.log(res);
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