<template>
	<div>
		<button @click="$router.push({name:'home_index'});">返回首页</button>
		<div class="panel">
			<tanglvinput label="帐号"/>
			<br>
			<tanglvinput label="昵称"/>
			<br>
			<tanglvinput label="绑定手机"/>
			<br>
			<tanglvinput label="绑定邮箱"/>
		</div>
	</div>
</template>
<script>
import tanglvinput from '@/components/input/input';	

export default{
	components:{
		tanglvinput
	}
}	
</script>
<style scoped>
.panel	{
	width: 300px;
	margin:0 auto;
}
</style>