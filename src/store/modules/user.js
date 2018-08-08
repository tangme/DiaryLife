import Cookies from 'js-cookie';
import * as Utils from '@/assets/js/Utils';
import {HOST} from '@/assets/config';
import {router} from '@/router/index.js';

const user = {
	state:{
		account:'',
		phone:'',
		email:'',
		nickName:''
	},
	mutations:{
		/**
		 * [initUserInfo 初始化用户信息]
		 * @author tanglv 2018-08-08
		 * @param  {[type]} state    [description]
		 * @param  {[type]} userInfo [description]
		 */
		initUserInfo(state,userInfo){
			state.account = userInfo.account;
			state.phone = userInfo.phone;
			state.email = userInfo.email;
			state.nickName = userInfo.nickName;
			window.sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
			Cookies.set('userInfo',userInfo);
		}
	},
	actions:{
		/**
		 * [logout 注销登出]
		 * @author tanglv 2018-08-08
		 * @param  {[type]} options.state     [description]
		 * @param  {[type]} options.commit    [description]
		 * @param  {[type]} options.rootState [description]
		 */
		logout({ state, commit, rootState }){
			router.push({name:'login'});
			Utils.request(HOST+'/server/logout',null,function(data){
				Cookies.remove('connect.sid');
			},function(data){});
			Cookies.remove('userInfo');
			window.sessionStorage.clear();
		}
	}
};

export default user;