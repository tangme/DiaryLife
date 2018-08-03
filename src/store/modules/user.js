import Cookies from 'js-cookie';

const user = {
	state:{
		account:'',
		phone:'',
		email:'',
		nickName:''
	},
	mutations:{
		initUserInfo(state,userInfo){
			state.account = userInfo.account;
			state.phone = userInfo.phone;
			state.email = userInfo.email;
			state.nickName = userInfo.nickName;
			window.sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
			Cookies.set('userInfo',userInfo);
		},
		logout(state){
			Cookies.remove('userInfo');
		}
	}
};

export default user;