<template>
    <div>
        <todo-item v-for="(item,index) in datas" :data="item" :key="index" 
			@afterDelItem="handleAfterDelItem"
			@afterFinishedItem="handleAfterFinishedItem"
		></todo-item>
    </div>
</template>

<script>
import {fetchTodoList} from "@/api/todo";
import TodoEventBus from "@/components/Todo/todo-eventbus";
import TodoItem from "@/components/Todo/TodoItem";
export default {
	name:"TodoList",
	components:{
		TodoItem
	},
	created(){
		this.queryData();
		TodoEventBus.$on("reloadTodo",()=>{
			this.queryData();
		});
	},
	data(){
		return{
			datas:null
		};
	},
	methods:{
		/**
         * [queryData 查询待办事项]
         * @author tanglv 2018-08-13
         */
		queryData(){
			fetchTodoList().then(res=>{
				this.datas = res;
			}).catch(err=>{
				console.warn("err:",err);
			});
		},
		/**
		 * 删除 待办后 事件
		 */
		handleAfterDelItem(){
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

