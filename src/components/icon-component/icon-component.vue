<template>
    <div>
        <svg class="icon" aria-hidden="true" @click="handleClick">
            <use :xlink:href="iconName"></use>
        </svg>
    </div>
</template>
<script>
export default {
	name: "icon-svg",
	props: {
		iconClass: {
			type: String,
			required: true
		}
	},
	computed: {
		iconName() {
			return `#icon-${this.iconClass}`;
		}
	},
	methods: {
		handleClick(event) {
			this.$emit("click", event);
		}
	}
};
</script>
<style>
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>

