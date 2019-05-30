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
			<complete-item v-for="item in datas" :key="item.tid" :data="item" class="list-complete-item"
			@afterUndo="handleAfterUndo"></complete-item>
		</transition-group>
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
		handleAfterUndo(id){
			let index = this.datas.findIndex((item)=>{
				return item.tid === id;
			});
			this.datas.splice(index,1);
			TodoEventBus.$emit("reloadTodo");//刷新待办事项列表
		}
	}
};
</script>

