<style lang="scss" scoped>
@import "./login.scss";
</style>
<!-- <style>
	@import '../assets/showBo/showBo.css';
</style> -->
<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
<template>
    <div class="login">
        <div class="login-panel">
            <div class="login-panel-title">用户登录</div>
            <div style="margin:1rem auto;">
                <expand-width-input placeholder="帐号、邮箱或手机" v-model.trim="form.account">
                    <template v-slot:prefix>
                        <div style="margin:0 1rem;">
                            <icon-svg iconClass="login_user"/>
                        </div>
                    </template>
                </expand-width-input>
            </div>
            <div style="margin:1rem auto;">
                <expand-width-input placeholder="密码" type="password" v-model.trim="form.pwd">
                    <template v-slot:prefix>
                        <div style="margin:0 1rem;">
                            <icon-svg iconClass="pwd"/>
                        </div>
                    </template>
                </expand-width-input>
            </div>

            <!-- <input type="text" v-model.trim="account" class="login-panel-input" placeholder="帐号、邮箱或手机" @keydown.enter="login">
            <input type="password" v-model.trim="pwd" class="login-panel-input" placeholder="密码" @keydown.enter="login">-->
            <!-- <div class="login-panel-unLogin">
				<input type="checkbox" id="un-login" v-model="unLogin">
				<label for="un-login">三天免登录</label>
            </div>-->
            <div class="login-panel-btnGroup">
                <input
                    type="button"
                    class="login-panel-btn"
                    @click="login"
                    value="登 录"
                    @keydown.enter="login"
                >
                <input type="button" class="login-panel-btn" @click="gotoRegister" value="注 册">
            </div>
        </div>
    </div>
</template>
<script>
import Cookies from "js-cookie";
import { Showbo } from "@/assets/showBo/showBo";
import { HOST } from "@/assets/config";
// import * as Utils from '@/assets/js/Utils';
import { sendRequest } from "@/assets/js/Utils";

import expandWidthInput from "@/components/expand-width-input";

export default {
	components: {
		expandWidthInput
	},
	data() {
		return {
			form: {
				account: "",
				pwd: ""
			},
			account: "",
			pwd: "",
			unLogin: false
		};
	},
	methods: {
		init() {
			let tmpAccount = Cookies.get("account");
			if (tmpAccount) {
				this.account = tmpAccount;
			}
		},
		login() {
			console.log(this.form);
			return;
			if (!(!!this.account && !!this.pwd)) {
				alert("请输入帐号与密码进行登录");
				return;
			}
			let $this = this;
			// sendRequest(HOST + '/server/login', {
			sendRequest("/server/login", {
				account: this.account,
				pwd: this.pwd
			})
				.then(res => {
					alert(res.data.msg);
					if (res.data.code == 1) {
						console.log(res.data);
						$this.$store.commit("initUserInfo", res.data.userObj);
						$this.$router.push({
							name: "home_index"
						});
					}
				})
				.catch(err => {
					console.warn("err:", err);
				});

			return;
			if (this.unLogin) {
				var inFifteenMinutes = new Date(
					new Date().getTime() + 3 * 24 * 60 * 60 * 1000
				);
				Cookies.set("account", this.account, {
					expires: inFifteenMinutes
				});
			} else {
				Cookies.set("account", this.account);
			}
		},
		/**
         * [gotoRegister 跳转至注册页面]
         * @author tanglv 2018-08-16
         */
		gotoRegister() {
			this.$router.push({
				name: "register"
			});
		}
	},
	mounted() {
		this.init();
	}
};
</script>
