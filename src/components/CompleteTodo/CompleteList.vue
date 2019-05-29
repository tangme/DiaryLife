<template>
    <div>
		<complete-item v-for="item in list" :key="item.tid" :data="item" @afterUndo="handleAfterUndo"></complete-item>
    </div>
</template>

<script>
import {fetchFinishedTodoList} from "@/api/todo";
import CompleteItem from "@/components/CompleteTodo/CompleteItem";
export default {
	name:"CompleteList",
	components:{
		CompleteItem
	},
	mounted(){
		this.init();
	},
	data(){
		return{
			data:null,
			list:null
		};
	},
	methods:{
		init(){
			this.queryData();
		},
		queryData(){
			fetchFinishedTodoList().then(res=>{
				this.list = res;
			}).catch(err=>{
				console.warn("err:",err);
			});
		},
		handleAfterUndo(){
			this.queryData();
			//刷新待办事项列表
			
		}
	}
};
</script>

