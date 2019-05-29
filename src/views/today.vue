<style>
/* ----- 输入框样式 ------ */
.input-todo{
    margin:15px auto;
    width: 85%;
}
.input-todo input{
    box-sizing: border-box;
    width: 100%;
    padding: .8rem .6rem;
    border: 1px solid #dddee1;
    border-radius: 4px;
    height: 50px;
    line-height: 1.5;
    font-size: 18px;
}
.input-todo input:hover{
    border-color: #57a3f3;
}
.input-todo input:focus{
    border-color: #57a3f3;
    outline: 0;
    box-shadow: 0 0 3px rgba(45,140,240,.8);
}
.input-todo input::-webkit-input-placeholder{
    color:#dddee1;
}
/* ---- todo组件样式 ---- */
.custom-todo-list{
    margin:auto;
    width: 80%;
}
</style>
<template>
    <div>
        <div class="input-todo">
            <input type="text" class="todoInput" ref="input" v-model="inputData" @keydown.enter="saveInfo" placeholder="要记录点什么呢~"/>
        </div>
        <todo-list :data="showList" class="custom-todo-list"></todo-list>
		<hr>
		<div>
			<complete-list class="custom-todo-list"></complete-list>
		</div>
    </div>
</template>
<script>
import {addTodo} from "@/api/todo";
import TodoList from "@/components/TodoItem/TodoList";
import CompleteList from "@/components/CompleteTodo/CompleteList";

export default {
	components:{
		TodoList,
		CompleteList
	},
	mounted(){
		this.$refs["input"].focus();
		/*console.log(Cookies.get('userInfo'));
        if(!!sessionStorage.getItem('todoList')){
            this.showList = JSON.parse(sessionStorage.getItem('todoList'))
        }*/
	},
	data() {
		return {
			inputData: "",
			showList: []
		};
	},
	methods:{
		saveInfo(){
			let flag_index = this.showList.length;
			addTodo(this.inputData).then(res=>{
				let tmpData = {"tid":res.data.tid,"content":this.showList[flag_index].content};
				this.$set(this.showList,flag_index,tmpData);
			}).catch(err=>{
				console.warn("err:",err);
			});

			this.showList.push({"tid":null,"content":this.inputData});
			this.inputData = "";
			/*let tmpData;
            if(!!sessionStorage.getItem('todoList')){
                tmpData = JSON.parse(sessionStorage.getItem('todoList'));
                tmpData.push(this.inputData);
                sessionStorage.setItem('todoList',JSON.stringify(tmpData));
            }else{
                sessionStorage.setItem('todoList',JSON.stringify(new Array(this.inputData)));
            }
            console.log(JSON.parse(sessionStorage.getItem('todoList')));*/
			
		}
	}
};
</script>
