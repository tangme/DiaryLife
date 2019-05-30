<style>
.list-complete-item {
  transition: all .2s;
  display: block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to{
  opacity: 0;
  transform: translateY(30px);
}
</style>

<template>
    <div>
		<transition-group name="list-complete">
			<todo-item v-for="(item) in datas" :data="item" :key="item.tid" class="list-complete-item"
				@afterDelItem="handleAfterDelItem"
				@afterFinishedItem="handleAfterFinishedItem"
			></todo-item>
		</transition-group>
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
		handleAfterDelItem(id){
			let index = this.datas.findIndex((item)=>{
				return item.tid === id;
			});
			this.datas.splice(index,1);
			// this.queryData();
		},
		/**
		 * 完成 待办后 事件
		 */
		handleAfterFinishedItem(id){
			let index = this.datas.findIndex((item)=>{
				return item.tid === id;
			});
			this.datas.splice(index,1);
			TodoEventBus.$emit("reloadUndo");
		}
	}
};
</script>

