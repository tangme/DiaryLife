<template>
    <div>
        <todo-item v-for="(item,index) in currentData" :data="item" :key="index" 
			@afterDelItem="handleAfterDelItem"
			@afterFinishedItem="handleAfterFinishedItem"
		></todo-item>
    </div>
</template>

<script>
import TodoItem from "@/components/TodoItem/TodoItem";
export default {
	name:"TodoList",
	components:{
		TodoItem
	},
	props:{
		data:{
			type:Array,
			default:()=>[]
		}
	},
	mounted(){},
	watch:{
		data(val,oldVal){
			this.currentData = val;
		}
	},
	data(){
		return{
			currentData:this.data
		};
	},
	methods:{
		handleAfterDelItem(id){
			this.$emit("delSuccess");
		},
		handleAfterFinishedItem(){
			
		}
	}
};
</script>

