<template>
    <div>
		<complete-item v-for="item in datas" :key="item.tid" :data="item" @afterUndo="handleAfterUndo"></complete-item>
    </div>
</template>

<script>
import {fetchFinishedTodoList} from "@/api/todo";
import TodoEventBus from "@/components/Todo/todo-eventbus";
import CompleteItem from "@/components/Todo/CompleteItem";
export default {
	name:"CompleteList",
	components:{
		CompleteItem
	},
	created(){
		this.queryData();
		TodoEventBus.$on("reloadUndo",()=>{
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
		 * 查询 已完成待办
		 */
		queryData(){
			fetchFinishedTodoList().then(res=>{
				this.datas = res;
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

