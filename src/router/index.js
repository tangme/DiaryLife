import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import {routers} from './router'

Vue.use(VueRouter)

//路由配置
const RouterConfig = {
	routes: routers
}

export const router = new VueRouter(RouterConfig);

/*export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})*/
