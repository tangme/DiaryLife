<style>
    @import './expand-width-input.css'
</style>
<template>
    <div class="expand-width-input-wrapper" :class="{'expand-width-input-wrapper-onfocus':isFocus}">
    	<div v-if="$slots.prefix" class="prefix-div">
	        <slot name="prefix"></slot>
    	</div>
        <input type="text" @focus="handleFocus" @blur="handleBlur">
        <div v-if="$slots.suffix" class="suffix-div">
	        <slot name="suffix"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "expand-width-input",
    data(){
    	return {
    		isFocus:false//文本框是否在焦点状态
    	}
    },
    methods:{
    	handleFocus(){
    		this.isFocus = true;
    	},
    	handleBlur(){
    		this.isFocus = false;
    	}
    }
}

</script>
