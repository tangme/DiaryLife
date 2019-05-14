<style lang="scss" scoped>
	@import './register.scss';
</style>
<style>
.icon-color {
    color: #ffffff;
    font-weight: bold;
}
.mar-15{
	margin: 1rem auto;
}
</style>

<template>
	<div class="out-div">
		<div class="register-panel">
			<div class="register-panel-title">
				<span>账号注册</span>
				<span>已有账号，<a @click="$router.push({name:'login'})">立即登录</a> </span>
			</div>
			<div class="mar-15">
				<expand-width-input placeholder="电子邮箱" v-model.trim="registerForm.email">
					<template v-slot:prefix>
                        <div style="margin:0 1rem;">
                            <icon-svg iconClass="email" class="icon-color"/>
                        </div>
                    </template>
				</expand-width-input>
			</div>
			<div class="mar-15">
				<expand-width-input placeholder="电话号码" v-model.trim="registerForm.phone">
					<template v-slot:prefix>
                        <div style="margin:0 1rem;">
                            <icon-svg iconClass="phone" class="icon-color"/>
                        </div>
                    </template>
				</expand-width-input>
			</div>
			<div class="mar-15">
				<expand-width-input placeholder="用户昵称" v-model.trim="registerForm.nickname">
					<template v-slot:prefix>
                        <div style="margin:0 1rem;">
                            <icon-svg iconClass="login_user" class="icon-color"/>
                        </div>
                    </template>
				</expand-width-input>
			</div>
			<div class="mar-15">
				<expand-width-input type="password" placeholder="登录密码" v-model.trim="registerForm.pwd">
					<template v-slot:prefix>
                        <div style="margin:0 1rem;">
                            <icon-svg iconClass="pwd" class="icon-color"/>
                        </div>
                    </template>
				</expand-width-input>
			</div>
			<div class="mar-15">
				<expand-width-input type="password" placeholder="确认密码" v-model.trim="registerForm.comfirmPwd">
					<template v-slot:prefix>
                        <div style="margin:0 1rem;">
                            <icon-svg iconClass="mimacopy" class="icon-color"/>
                        </div>
                    </template>
				</expand-width-input>
			</div>

			<button class="register-panel-button" @click="register">注册</button>
			
		</div>
	</div>
</template>
<script>
import {sendRequest} from "@/assets/js/Utils";
import _ from "lodash";
import expandWidthInput from "@/components/expand-width-input";

export default{
	components:{
		expandWidthInput
	},
	data(){
		return{
			registerForm:{
				email:"",
				phone:"",
				nickname:"",
				pwd:"",
				comfirmPwd:"",
				test:"zhoudan"
			}
		};
	},
	computed:{
		isEmail(){//是否为有效电子邮箱
			let patt = new RegExp(/^([A-z]|[0-9])+@([A-z]|[0-9])+\.[A-z]/);
			if(this.registerForm.email){
				if(patt.test(this.registerForm.email)){
					return "邮箱格式正确";
				}else{
					return "邮箱格式错误";
				}
			}else{
				return "";
			}
		},
		isPhone(){//是否为有效电话
			let patt = new RegExp(/^[1][356789][0-9]{9}$/);
			if(this.registerForm.phone){
				if(patt.test(this.registerForm.phone)){
					return "电话格式正确";
				}else{
					return "电话格式错误";
				}
			}else{
				return "";
			}
		},
		isStrongPwd(){//是否为有效密码强度
			let patt = new RegExp(/^(?![^a-zA-Z]{3,}$)(?!\D{3,}$)/);
			if(this.registerForm.pwd){
				if(patt.test(this.registerForm.pwd)){
					return "密码强度 ok";
				}else{
					return "密码强度 弱";
				}
			}else{
				return "";
			}
		}
	},
	methods:{
		/**
		 * [register 注册]
		 * @author tanglv 2018-08-16
		 */
		register(){
			sendRequest("/server/register",this.registerForm).then(res=>{
				alert(res.data.msg);
			});
		},
		hello:_.debounce(function () {
			console.log("123");
		}, 500)
	}
};	
</script>