<style lang="scss" scoped>
	@import './register.scss';
</style>
<template>
	<div>
		<div class="register-panel">
			<h1>
				账号注册
				<span>已有账号，<a href="">立即登录</a> </span>
			</h1>
			<hr>
			<div style="display: table;width: 100%;">
				<div class="animated" style="display: table-cell;">
					<span>电子邮箱</span>
				</div>
				<input type="text" placeholder="请输入电子邮箱" v-model="registerForm.email">
			</div>
			<div><input type="text" placeholder="请输入电话号码" v-model="registerForm.phone"></div>
			<div><input type="text" placeholder="请输入昵称" v-model="registerForm.nickname"></div>
			<div><input type="password" placeholder="请输入密码" v-model="registerForm.pwd"></div>
			<div><input type="password" placeholder="请确认密码" v-model="registerForm.comfirmPwd"></div>
			<hr>
			<button class="register-panel-button" @click="register">注册</button>
		</div>
	<!-- http://thepatternlibrary.com/img/i.jpg -->
	</div>
</template>
<script>
import Axios from 'axios';
import animate from 'animate.css';

export default{
	data(){
		return{
			registerForm:{
				email:'',
				phone:'',
				nickname:'',
				pwd:'',
				comfirmPwd:''
			}
		}
	},
	computed:{
		isEmail(){//是否为有效电子邮箱
			let patt = new RegExp(/^([A-z]|[0-9])+@([A-z]|[0-9])+\.[A-z]/);
			if(!!this.registerForm.email){
				if(patt.test(this.registerForm.email)){
					return '邮箱格式 正确';
				}else{
					return '邮箱格式 错误';
				}
			}else{
				return '';
			}
		},
		isPhone(){//是否为有效电话
			let patt = new RegExp(/^[1][356789][0-9]{9}$/);
			if(!!this.registerForm.phone){
				if(patt.test(this.registerForm.phone)){
					return '电话格式 正确';
				}else{
					return '电话格式 错误';
				}
			}else{
				return '';
			}
		},
		isStrongPwd(){//是否为有效密码强度
			let patt = new RegExp(/^(?![^a-zA-Z]{3,}$)(?!\D{3,}$)/);
			if(!!this.registerForm.pwd){
				if(patt.test(this.registerForm.pwd)){
					return '密码强度 ok';
				}else{
					return '密码强度 弱';
				}
			}else{
				return '';
			}
		}
	},
	methods:{
		register(){
			console.log('hello');
			Axios.post('http://localhost:3000/register',{
			    registerForm: this.registerForm
			},{
				headers: {'tanglv': 'zhoudan'}
			})
			.then(function (response) {
			    console.log(response);
			})
			.catch(function (error) {
			    console.log(error);
			});
		}
	}
}	
</script>