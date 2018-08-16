<style lang="scss" scoped>
@import './login.scss';
</style>
<!-- <style>
	@import '../assets/showBo/showBo.css';
</style> -->
<template>
    <div class="login">
        <div class="login-panel">
            <div class="login-panel-title">用户登录</div>
            <br>
            <input type="text" v-model.trim="account" class="login-panel-input" placeholder="帐号、邮箱或手机" @keydown.enter="login">
            <input type="password" v-model.trim="pwd" class="login-panel-input" placeholder="密码" @keydown.enter="login">
            <!-- <div class="login-panel-unLogin">
				<input type="checkbox" id="un-login" v-model="unLogin">
				<label for="un-login">三天免登录</label>
			</div> -->
            <div class="login-panel-btnGroup">
                <input type="button" class="login-panel-btn" @click="login" value="登录" @keydown.enter="login"></input>
                <input type="button" class="login-panel-btn" @click="gotoRegister" value="注册"></input>
                <!-- <div class="login-panel-btn" @click="gotoRegister">注册</div> -->
            </div>
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import {
    Showbo
} from '@/assets/showBo/showBo';
import {
    HOST
} from '@/assets/config';
import * as Utils from '@/assets/js/Utils';

export default {
    data() {
        return {
            account: '',
            pwd: '',
            unLogin: false
        };
    },
    methods: {
        init() {
            let tmpAccount = Cookies.get('account');
            if (!!tmpAccount) {
                this.account = tmpAccount;
            }
        },
        login() {
            if (!(!!this.account && !!this.pwd)) {
                alert("请输入帐号与密码进行登录");
                return;
            }
            let $this = this;
            Utils.request(HOST + '/server/login', {
                account: this.account,
                pwd: this.pwd
            }, function(data) {
                alert(data.data.msg);
                if (data.data.code == 1) {
                    console.log(data.data);
                    $this.$store.commit('initUserInfo', data.data.userObj)
                    $this.$router.push({
                        name: 'home_index'
                    });
                }
            }, function(error) {
                console.log(error);
            }, this);
            return;
            if (this.unLogin) {
                var inFifteenMinutes = new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000);
                Cookies.set('account', this.account, {
                    expires: inFifteenMinutes
                });
            } else {
                Cookies.set('account', this.account);
            }
        },
        /**
         * [gotoRegister 跳转至注册页面]
         * @author tanglv 2018-08-16
         */
        gotoRegister() {
            this.$router.push({
                name: 'register'
            });
        }
    },
    mounted() {
        this.init();
    }
}
</script>
