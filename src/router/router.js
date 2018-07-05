/*
* 路由配置文件
* tanglv
* createtime: 2018/4/27
*/

import Main from '@/components/Main.vue'



export const signInOutRouter = {
	path:'/signInOut',
	name:'signInOut',
	component:()=>import('@/components/signIn-signUp/signIn-signUp'),
	children:[
		{path:'login',name:'login',component:()=> import('@/components/signIn-signUp/login.vue')},
		{path:'register',name:'register',component:()=> import('@/components/signIn-signUp/register.vue')}
	]
};

export const otherRouter = {
	path:'/',
	name:'otherRouter',
	redirect:'/home',
	component:Main,
	children:[
		{path:'home',title:'首页',name:'home_index',component:()=>import('@/components/today')},
		{path:'userCenter',title:'个人中心',name:'userCenter',component:()=>import('@/components/userCenter')}
	]
};

export const routers = [
	signInOutRouter,
	otherRouter
];