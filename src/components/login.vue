<template>
	<div>
		<div class="loginPanel">
			<div class="loginPanel-title">登录</div>
			<div>
				<div style="display:table;">
					<div style="display:table-cell">
						账号 	
					</div>
					<input type="text" v-model="account">
				</div>
			</div>
			<div>
				密码 <input type="password" v-model="pwd">
			</div>
			<div class="btn-login" @click="login">登录</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			account:'',
			pwd:''
		};
	},
	methods:{
		login(){
			console.log('hello login');
			console.log(this.account);
			console.log(this.pwd);
		}
	}
}	
</script>
<style scoped>
.loginPanel{
	width: 300px;
	border:1px solid;
}	
.loginPanel-title{
	font-size: 1.5rem;
}
.btn-login{
	width: 90%;
	padding: 8px 0;
	margin: 5px auto;
	color:#fff;
	background-color: #2d8cf0;
}
</style>