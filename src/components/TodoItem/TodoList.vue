<template>
    <div>
        <todo-item v-for="(item,index) in currentData" :data="item" :key="index" 
			@afterDelItem="handleAfterDelItem"
			@afterFinishedItem="handleAfterFinishedItem"
		></todo-item>
    </div>
</template>

<script>
import {fetchTodoList} from "@/api/todo";
import TodoEventBus from "@/components/TodoItem/eventBus";
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
	created(){
		TodoEventBus.$on("reloadTodo",()=>{
			this.queryData();
		});
		this.queryData();
	},
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
		/**
         * [queryData 查询待办事项]
         * @author tanglv 2018-08-13
         */
		queryData(){
			fetchTodoList().then(res=>{
				this.currentData = res;
			}).catch(err=>{
				console.warn("err:",err);
			});
		},
		/**
		 * 删除 待办后 事件
		 */
		handleAfterDelItem(id){
			this.queryData();
		},
		/**
		 * 完成 待办后 事件
		 */
		handleAfterFinishedItem(){
			this.queryData();
			TodoEventBus.$emit("reloadUndo");
		}
	}
};
</script>

