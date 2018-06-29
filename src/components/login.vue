<template>
	<div class="login" >
		<div class="login-panel" @keydown.enter="login">
			<div class="login-panel-title">登录</div>
			<div class="login-panel-formCom">
				账号	<input type="text" v-model="account" class="login-panel-formCom-input">
			</div>
			<div class="login-panel-formCom">
				密码	<input type="password" v-model="pwd" class="login-panel-formCom-input">
			</div>
			<div class="login-panel-btn" @click="login">登录</div>
			<div>
				<input type="checkbox" id="un-login" v-model="unLogin">
				<label for="un-login">三天免登录</label>
				<a @click="gotoRegister">注册</a>
			</div>
		</div>
		<div class="test"></div>
	</div>
</template>
<script>
import Cookies from 'js-cookie';
import {Showbo} from '@/assets/showBo/showBo';
import Axios from 'axios';
export default{
	data(){
		return {
			account:'',
			pwd:'',
			unLogin:false
		};
	},
	methods:{
		init(){
			let tmpAccount = Cookies.get('account');
			if(!!tmpAccount){
				this.account = tmpAccount;
			}
		},
		login(){
			if(!(!!this.account && !!this.pwd)){
				alert("please input account and pwd;");
				return;
			}
			Axios.post('http://localhost:3000/server/login',{
			    account: this.account,
			    pwd: this.pwd
			})
			.then(res => {
				alert(res.data.msg);
			    if(res.data.code == 1){
			    	console.log('lalal');
			    	this.$router.push({
		                name: 'home_index'
		            });
			    }
			})
			.catch(function (error) {
			    console.log(error);
			});
			return;
			if(this.unLogin){
				var inFifteenMinutes = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
				Cookies.set('account',this.account,{
					expires:inFifteenMinutes
				});
			}else{
				Cookies.set('account',this.account);
			}
		},
		gotoRegister(){
			this.$router.push({
                name: 'register'
            });
			console.log("===");
		}
	},
	mounted(){
		this.init();
	}
}	
</script>
<style lang="scss" scoped>
	@import './login.scss';
</style>
<style>
	@import '../assets/showBo/showBo.css';
</style>