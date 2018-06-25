import Vue from 'vue'
import VueRouter from 'vue-router'
import {routers} from './router'
import Cookies from 'js-cookie'

Vue.use(VueRouter)

//路由配置
const RouterConfig = {
	routes: routers
}

export const router = new VueRouter(RouterConfig);

router.beforeEach((to,form,next)=>{
	if(!Cookies.get('account') && to.name!='login'){
		if(to.name == 'register'){
			next();
		}else{
			next({name:'login'});
		}
	}else{
		next();
	}
});

