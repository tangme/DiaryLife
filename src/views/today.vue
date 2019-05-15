<style>
.input-todo{
    margin:15px auto;
    width: 80%;
}
</style>
<template>
    <div>
        <div class="input-todo">
            <input type="text" class="todoInput" v-model="inputData" @keydown.enter="saveInfo" placeholder="要记录点什么呢~"/>
        </div>
        <div class="todoList_div">
            <ul class="todoList_ul">
                <todo-item v-for="(item,index) in showList" :data="item" :key="index" @delSuccess="handleDelSuccess"></todo-item>
            </ul>
        </div>
        
    </div>
</template>
<script>
import {sendRequest} from "@/assets/js/Utils";
import TodoItem from "@/components/TodoItem/TodoItem";

export default {
	components:{
		TodoItem
	},
	mounted(){
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todoList_div{
    width: 80%;
    margin:auto;
    text-align: left;
}
.todoList_ul{
    list-style: none;
    padding-left: 0;
}
.todoInput{
    width: 100%;
    padding: 4px 7px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    height: 32px;
    line-height: 1.5;
    font-size: 16px;
}
.todoInput:hover{
    border-color: #57a3f3;
}
.todoInput:focus{
    border-color: #57a3f3;
    outline: 0;
    box-shadow: 0 0 3px rgba(45,140,240,.8);
}
input::-webkit-input-placeholder{
    color:#dddee1;
}
</style>
