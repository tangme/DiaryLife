<style lang="scss" scoped>
	@import './input.scss';
</style>
<template>
    <div class="wrapper">
    	<div class="input-label" >
            {{label}}
        </div>
        <div class="input-div" :class="{withCon:currentValue}">
            <input class="input"
        	:type="type" 
        	:placeholder="placeholder" 
        	:value="currentValue"
        	@input="handleInput">
        </div>
        
        <!-- <div class="animated" :class="{slideInRight:currentValue,zoomOut:!currentValue}" :style="{display:!currentValue?'none':'table-cell'}">
            <span>{{label}}</span>
        </div>
        <input 
        	:type="type" 
        	:placeholder="placeholder" 
        	:value="currentValue"
        	@input="handleInput"> -->
    </div>
</template>
<script>
/*import animate from 'animate.css';*/

export default {
	props:{
		type:{
			validator(value){
				return ['text', 'textarea', 'password', 'url', 'email', 'date'].some(function(item){
					return item == value;
				})
			},
			default:'text'
		},
		value:{
			type:String,
			default:''
		},
		placeholder:{
			type:String,
			default:''
		},
		label:{
			type:String,
			default:''
		}
	},
	data(){
		return {
			currentValue:this.value
		};
	},
	methods:{
		setCurrentValue(value){
			if(value === this.currentValue) return;
			this.currentValue = value;
		},
		handleInput(event){
			let value = event.target.value;
			this.$emit('input', value);
            this.setCurrentValue(value);
		}
	},
	watch: {
        value (val) {
        	this.setCurrentValue(val);
        }
    }
}
</script>
