<style>
@import "./expand-width-input.css";
</style>
<template>
    <div class="expand-width-input-wrapper">
        <div v-if="$slots.prefix" class="prefix-div">
            <slot name="prefix"></slot>
        </div>
        <input v-bind="$attrs" :value='currentValue' @input="handleInput">
        <div v-if="$slots.suffix" class="suffix-div">
            <slot name="suffix"></slot>
        </div>
    </div>
</template>
<script>
export default {
	name: "expand-width-input",
	props: {
		value:[String],
	},
	data() {
		return {
			currentValue:this.value
		};
	},
	watch:{
		value(val){
			this.setCurrentValue(val);
		}
	},
	methods: {
		handleInput(event){
			this.$emit("input",event.target.value);
		},
		setCurrentValue(value){
			if(value === this.currentValue)return;
			this.currentValue = value;
		}
	}
};
</script>
