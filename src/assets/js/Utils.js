import axios from "axios";

export function sendRequest(url,params){
	return axios.post(url,params,{
		withCredentials:true
	});
}

const service = axios.create({
	baseURL:"",
	withCredentials:true,
	timeout:5000
});

service.interceptors.request.use(
	config => {
		return config;
	},
	error =>{
		console.log(error);
	}
);

service.interceptors.response.use(
	response =>{
		const res = response.data;
		if(res.code === 0 ){
			alert("错误");
		}else{
			return res;
		}
	},
	error=>{
		return Promise.reject(error);
	}
);

export default service;