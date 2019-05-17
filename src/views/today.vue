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
        <todo-list :data="showList" class="custom-todo-list" @delSuccess="handleDelSuccess"></todo-list>
    </div>
</template>
<script>
import {sendRequest} from "@/assets/js/Utils";
import TodoList from "@/components/TodoItem/TodoList";

export default {
	components:{
		TodoList
	},
	mounted(){
		this.$refs["input"].focus();
		/*console.log(Cookies.get('userInfo'));
        if(!!sessionStorage.getItem('todoList')){
            this.showList = JSON.parse(sessionStorage.getItem('todoList'))
        }*/
		this.queryData();
	},
	data() {
		return {
			inputData: "",
			showList: []
		};
	},
	methods:{
		/**
         * [queryData description]
         * @author tanglv 2018-08-13
         */
		queryData(){
			let $this = this;
			sendRequest("/todo/queryTodo",null).then(res=>{
				$this.showList = res.data;
			}).catch(err=>{
				console.warn("err:",err);
			});
		},
		/**
         * [addData description]
         * @author tanglv 2018-08-13
         */
		addData(data,flag_index){
			sendRequest("/todo/addTodo",{
				content:data,
			}).then(res=>{
				let tmpData = {"tid":res.data.data.tid,"content":this.showList[flag_index].content};
				console.log(tmpData);
				this.$set(this.showList,flag_index,tmpData);
			}).catch(err=>{
				console.warn("err:",err);
			});
		},
		saveInfo(){
			let flag_index = this.showList.length;
			this.addData(this.inputData,flag_index);
			this.showList.push({"tid":null,"content":this.inputData});
			/*let tmpData;
            if(!!sessionStorage.getItem('todoList')){
                tmpData = JSON.parse(sessionStorage.getItem('todoList'));
                tmpData.push(this.inputData);
                sessionStorage.setItem('todoList',JSON.stringify(tmpData));
            }else{
                sessionStorage.setItem('todoList',JSON.stringify(new Array(this.inputData)));
            }
            console.log(JSON.parse(sessionStorage.getItem('todoList')));*/
			this.inputData = "";
		},
		handleDelSuccess(id){
			this.queryData();
		}
	}
};
</script>
