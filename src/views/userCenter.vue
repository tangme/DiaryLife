<template>
    <div class="container">
        <button @click="$router.push({name:'home_index'});">返回首页</button>
        <div class="panel">
            <div style="margin:1rem auto;">
                <expand-width-input placeholder="帐号" v-model.trim="userInfo.account">
                    <template v-slot:prefix>
                        <div style="margin:0 1rem;">
                            <icon-svg iconClass="login_user" class="icon-color"/>
                        </div>
                    </template>
                </expand-width-input>
            </div>

            <div style="margin:1rem auto;">
                <expand-width-input placeholder="昵称" v-model.trim="userInfo.nickName">
                    <template v-slot:prefix>
                        <div style="margin:0 1rem;">
                            <icon-svg iconClass="nickname" class="icon-color"/>
                        </div>
                    </template>
                </expand-width-input>
            </div>

            <div style="margin:1rem auto;">
                <expand-width-input placeholder="手机" v-model.trim="userInfo.phone">
                    <template v-slot:prefix>
                        <div style="margin:0 1rem;">
                            <icon-svg iconClass="phone" class="icon-color"/>
                        </div>
                    </template>
                </expand-width-input>
            </div>

            <div style="margin:1rem auto;">
                <expand-width-input placeholder="邮箱" v-model.trim="userInfo.email">
                    <template v-slot:prefix>
                        <div style="margin:0 1rem;">
                            <icon-svg iconClass="email" class="icon-color"/>
                        </div>
                    </template>
                </expand-width-input>
            </div>

            <!-- <br>
            <tanglvinput label="帐号" placeholder="帐号" v-model="userInfo.account"/>
            <br>
            <tanglvinput label="昵称" placeholder="昵称" v-model="userInfo.nickName"/>
            <br>
            <tanglvinput label="绑定手机" placeholder="手机" v-model="userInfo.phone"/>
            <br>
            <tanglvinput label="绑定邮箱" placeholder="邮箱" v-model="userInfo.email"/>
            <br> -->
            <form
                name="uploadForm"
                id="uploadForm"
                method="post"
                enctype="multipart/form-data"
                :action="uploadUrl"
                target="uploadFrame"
            >
                <p style="margin:10px 0;">
                    上传图片:
                    <input type="text" name="name" value>
                    <input type="file" name="imageFile" multiple="multiple">
                    <input type="submit" id="fileSubmit" value="上传">
                </p>
            </form>
            <button @click="updateData">保存</button>
        </div>
    </div>
</template>
<script>
import ExpandWidthInput from "@/components/expand-width-input";
import { sendRequest } from "@/assets/js/Utils";
import { HOST } from "@/assets/config";
import {updateUser} from "@/api/user";

export default {
	created() {},
	components: {
		ExpandWidthInput
	},
	data() {
		return {
			uploadUrl: `${HOST}/uploads`,
			userInfo: {
				account: this.$store.state.user.account,
				nickName: this.$store.state.user.nickName,
				phone: this.$store.state.user.phone,
				email: this.$store.state.user.email
			}
		};
	},
	methods: {
		/**
         * [updateData 更新数据]
         * @author tanglv 2018-08-08
         */
		updateData() {
			updateUser(this.userInfo).then(res=>{
				console.log(res);
			});
		}
	}
};
</script>
<style scoped>
.panel {
    width: 70%;
    min-width: 400px;
    margin: 0 auto;
}
.container {
    background: #50a3a2;
    background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
}
</style>