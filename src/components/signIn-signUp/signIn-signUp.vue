<template>
	<div class="container">
		<transition name="fade" mode="out-in">
			<router-view/>
		</transition>
	</div>
</template>
<script>
import Cookies from 'js-cookie';

export default{
	methods:{
		showUserSetting(event){
			let flag = this.$refs['test'].style.display;
			this.$refs['test'].style.display = (flag=='block'?'none':'block');
		},
		loginOut(){
			Cookies.remove('account');
			sessionStorage.clear();
			this.$router.push({name:'login'});
		}
	}
}	
</script>
<style scoped>
.container{
	width: 100%;
	height: 100%;
	background: url('http://thepatternlibrary.com/img/aq.jpg') repeat;
	position: relative;
	display: flex;
	justify-content:center;
    align-items:center;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>