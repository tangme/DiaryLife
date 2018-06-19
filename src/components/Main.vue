<template>
	<div>
		<div>
			<div class="header">
				<button @click="loginOut">注销</button>
			</div>
		</div>
		<div>
			<router-view/>
		</div>
	</div>

</template>
<script>
import Cookies from 'js-cookie';

export default{
	methods:{
		loginOut(){
			Cookies.remove('account');
			sessionStorage.clear();
			this.$router.push({name:'login'});
		}
	}
}	
</script>
<style scoped>
.header{
	height: 60px;
	background-color: lightblue;
}	
</style>