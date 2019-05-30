<style>
.complete-item-container{
	display: flex;
	justify-content: space-between;
	margin: 5px 0;
	background-color: aquamarine;
	font-size: 1.2rem;
	transition: .2s;
}
.complete-item-container:hover{
	background-color: #00cc99;
}
.complete-item-content{
	text-align: left;
	padding: 5px 8px;
}	
.complete-item-setting{
	align-self: stretch;
	display: flex;
	align-items: center;
	padding: 0 .5rem;
	background-color: lightcoral;
}
.custom-icon-svg{
	cursor: pointer;
	transition: .2s;
}
.custom-icon-svg:hover{
	color:aliceblue;
}
</style>

<template>
    <div class="complete-item-container">
        <div class="complete-item-content">{{data.content}}</div>
		<div class="complete-item-setting">
			<icon-svg iconClass="unfinished_question" class="custom-icon-svg" @click.stop="handleUndo" title="重置此项"/>
		</div>
    </div>
</template>

<script>
import {updateTodoToUndo} from "@/api/todo";
export default {
	name:"CompleteItem",
	props:{
		data:{
			type:Object
		}
	},
	methods:{
		/**
		 * 重置 已完成待办
		 */
		handleUndo(){
			updateTodoToUndo(this.data.tid).then(res=>{
				if(res.code === 1){
					this.$emit("afterUndo",this.data.tid);
				}
			});
		}
	}
};
</script>

