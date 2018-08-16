<style lang="scss" scoped>
	@import './register.scss';
</style>
<template>
	<div class="out-div">
		<div class="register-panel">
			<h1>
				账号注册
				<span>已有账号，<a @click="$router.push({name:'login'})">立即登录</a> </span>
			</h1>
			<br>
			<input type="text" v-model.trim="registerForm.email" class="login-panel-formCom-input" placeholder="电子邮箱">
			<input type="text" v-model.trim="registerForm.phone" class="login-panel-formCom-input" placeholder="电话号码">
			<input type="text" v-model.trim="registerForm.nickname" class="login-panel-formCom-input" placeholder="用户昵称">
			<input type="password" v-model.trim="registerForm.pwd" class="login-panel-formCom-input" placeholder="登录密码">
			<input type="password" v-model.trim="registerForm.comfirmPwd" class="login-panel-formCom-input" placeholder="确认密码">

			<!-- <tanglvinput type="text" label='电子邮箱 ' placeholder="电子邮箱" v-model="registerForm.email"></tanglvinput>
			<br>
			<tanglvinput type="text" label='电话号码 ' placeholder="电话号码" v-model="registerForm.phone"></tanglvinput>
			<br>
			<tanglvinput type="text" label='昵称 ' placeholder="昵称" v-model="registerForm.nickname"></tanglvinput>
			<br>
			<tanglvinput type="text" label='密码 ' placeholder="密码" v-model="registerForm.pwd"></tanglvinput>
			<br>
			<tanglvinput type="text" label='确认密码 ' placeholder="确认密码" v-model="registerForm.comfirmPwd"></tanglvinput> -->
			<!-- <div class="register-panel-row">
				<div class="animated" v-bind:class="{ fadeInUp: registerForm.email,slideOutLeft: !registerForm.email}"  v-bind:style="{ display: emailDisplay }">
					<span>电子邮箱：</span>
				</div>
				<input type="text" placeholder="请输入电子邮箱" v-model="registerForm.email" @input="hello">
				<div class="register-panel-row-notice">{{this.isEmail}}</div>
			</div>
			<div class="register-panel-row">
				<div class="animated" v-bind:class="{ fadeInUp: registerForm.phone,slideOutLeft: !registerForm.phone}"  v-bind:style="{ display: phoneDisplay }">
					<span>电话号码：</span>
				</div>
				<input type="text" placeholder="请输入电话号码" v-model="registerForm.phone">
				<div class="register-panel-row-notice">{{this.isPhone}}</div>
			</div>
			<div class="register-panel-row">
				<div class="animated" v-bind:class="{ fadeInUp: registerForm.nickname,slideOutLeft: !registerForm.nickname}"  v-bind:style="{ display: nicknameDisplay }">
					<span>昵称：</span>
				</div>
				<input type="text" placeholder="请输入昵称" v-model="registerForm.nickname">
			</div>
			<div class="register-panel-row">
				<div class="animated" v-bind:class="{ fadeInUp: registerForm.pwd,slideOutLeft: !registerForm.pwd}"  v-bind:style="{ display: pwdDisplay }">
					<span>密码：</span>
				</div>
				<input type="password" placeholder="请输入密码" v-model="registerForm.pwd">
			</div>
			<div class="register-panel-row">
				<div class="animated" v-bind:class="{ fadeInUp: registerForm.comfirmPwd,slideOutLeft: !registerForm.comfirmPwd}"  v-bind:style="{ display: comfirmPwdDisplay }">
					<span>确认密码：</span>
				</div>
				<input type="password" placeholder="请确认密码" v-model="registerForm.comfirmPwd">
			</div> -->
			<button class="register-panel-button" @click="register">注册</button>
			
		</div>
	</div>
</template>
<script>
import {request} from '@/assets/js/Utils';
import _ from 'lodash';
import tanglvinput from '@/components/input/input';
import {HOST} from '@/assets/config';

export default{
	components:{
		tanglvinput
	},
	watch:{},
	data(){
		return{
			registerForm:{
				email:'',
				phone:'',
				nickname:'',
				pwd:'',
				comfirmPwd:'',
				test:'zhoudan'
			}
		}
	},
	computed:{
		emailDisplay(){
			return !!this.registerForm.email?'table-cell':'none';
		},
		phoneDisplay(){
			return !!this.registerForm.phone?'table-cell':'none';
		},
		nicknameDisplay(){
			return !!this.registerForm.nickname?'table-cell':'none';
		},
		pwdDisplay(){
			return !!this.registerForm.pwd?'table-cell':'none';
		},
		comfirmPwdDisplay(){
			return !!this.registerForm.comfirmPwd?'table-cell':'none';
		},
		isEmail(){//是否为有效电子邮箱
			let patt = new RegExp(/^([A-z]|[0-9])+@([A-z]|[0-9])+\.[A-z]/);
			if(!!this.registerForm.email){
				if(patt.test(this.registerForm.email)){
					return '邮箱格式正确';
				}else{
					return '邮箱格式错误';
				}
			}else{
				return '';
			}
		},
		isPhone(){//是否为有效电话
			let patt = new RegExp(/^[1][356789][0-9]{9}$/);
			if(!!this.registerForm.phone){
				if(patt.test(this.registerForm.phone)){
					return '电话格式正确';
				}else{
					return '电话格式错误';
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
		/**
		 * [register 注册]
		 * @author tanglv 2018-08-16
		 */
		register(){
			request(HOST+'/server/register',this.registerForm,function(data){
				alert(data.data.msg);
			});
		},
		hello:_.debounce(function () {
		    console.log('123');
		}, 500)
	}
}	
</script>