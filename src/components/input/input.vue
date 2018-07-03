<style lang="scss" scoped>
	@import './input.scss';
</style>
<template>
    <div class="wrapper">
        <div class="animated" :class="{fadeInUp:currentValue,slideOutLeft:!currentValue}">
            <span>电子|邮箱：</span>
        </div>
        <input 
        	:type="type" 
        	:placeholder="placeholder" 
        	:value="currentValue">
    </div>
</template>
<script>
/*import animate from 'animate.css';*/

export default {
	props:{
		type:{
			/*validator(value){
				return ['text', 'textarea', 'password', 'url', 'email', 'date'].some(function(item){
					return item == value;
				})
			},*/
			default:'text'
		},
		value:{
			type:String,
			default:''
		},
		placeholder:{
			type:String,
			default:''
		}
	},
	data(){
		return {
			currentValue:"tanglv"
		};
	},
	methods:{
		
	},
	watch: {
        value (val) {
        	console.log('=========');
        },
        currentValue(val){
        	console.log('lalalla');
        }
    }
}
</script>
