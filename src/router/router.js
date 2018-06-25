/*
* 路由配置文件
* tanglv
* createtime: 2018/4/27
*/

import Main from '@/components/Main.vue'

export const loginRouter = {
	path:'/login',
	name:'login',
	component:()=> import('@/components/login.vue')
};
export const registerRouter = {
	path:'/register',
	name:'register',
	component:()=> import('@/components/register')
};

export const otherRouter = {
	path:'/',
	name:'otherRouter',
	redirect:'/home',
	component:Main,
	children:[
		{path:'home',title:'首页',name:'home_index',component:()=>import('@/components/today')}
	]
};

export const routers = [
	loginRouter,
	registerRouter,
	otherRouter
];