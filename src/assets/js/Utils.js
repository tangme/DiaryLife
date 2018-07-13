import axios from 'axios';
/**
 * [request 请求方法]
 * @author tanglv 2018-07-13
 * @param  {[type]} url        [请求地址]
 * @param  {[type]} params     [请求参数]
 * @param  {[type]} successFun [成功回调函数]
 * @param  {[type]} failFun    [失败回调函数]
 * @param  {[type]} $this      [组件上下文]
 */
export function request(url,params,successFun,failFun,$this){
	axios.post(url,{
	    data: params
	},{
		headers:{
			'timestamp':parseInt(new Date().getTime() / 1000),
			'tanglv':'zhoudan'
		}
	})
	.then(function (response) {
	    if(!!successFun){
	    	successFun(response);	
	    }
	})
	.catch(function (error) {
		if (error.response) {
	      // The request was made and the server responded with a status code
	      // that falls out of the range of 2xx
	      console.log(error.response.data);
	      console.log(error.response.status);
	      console.log(error.response.headers);
	    } else if (error.request) {
	      // The request was made but no response was received
	      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
	      // http.ClientRequest in node.js
	      console.log(error.request);
	    } else {
	      // Something happened in setting up the request that triggered an Error
	      console.log('Error', error.message);
	    }
	    failFun();
	});
};