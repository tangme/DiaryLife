import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import {routers} from './router'
import Cookies from 'js-cookie'

Vue.use(VueRouter)

//路由配置
const RouterConfig = {
	routes: routers
}

export const router = new VueRouter(RouterConfig);

/*router.beforeEach((to,form,next)=>{
	if(!Cookies.get('account') && to.name!='login'){
		next({name:'login'});
	}else{
		next();
	}
});*/
/*export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})*/
