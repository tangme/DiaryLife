<template>
    <div>
		<complete-item v-for="item in list" :key="item.tid" :data="item" @afterUndo="handleAfterUndo"></complete-item>
    </div>
</template>

<script>
import {fetchFinishedTodoList} from "@/api/todo";
import TodoEventBus from "@/components/TodoItem/eventBus";
import CompleteItem from "@/components/CompleteTodo/CompleteItem";
export default {
	name:"CompleteList",
	components:{
		CompleteItem
	},
	created(){
		TodoEventBus.$on("reloadUndo",()=>{
			this.queryData();
		});
	},
	mounted(){
		this.init();
	},
	data(){
		return{
			list:null
		};
	},
	methods:{
		init(){
			this.queryData();
		},
		/**
		 * 查询 已完成待办
		 */
		queryData(){
			fetchFinishedTodoList().then(res=>{
				this.list = res;
			}).catch(err=>{
				console.warn("err:",err);
			});
		},
		/**
		 * 撤销 已完成待办
		 */
		handleAfterUndo(){
			this.queryData();
			//刷新待办事项列表
			TodoEventBus.$emit("reloadTodo");
		}
	}
};
</script>

