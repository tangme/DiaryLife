<template>
    <div class="hello">
        <br>
        <input type="text" class="todoInput" v-model="inputData" @keydown.enter="saveInfo" placeholder="要记录点什么呢~"/>
        <div class="todoList_div">
            <ul class="todoList_ul">
                <li class="todoList_li" v-for="(item,index) in showList" @click="showItem(item)">
                    {{item}}
                    <span class="todoList_span" @click="delItem(index)">x</span>
                </li>
            </ul>
        </div>
        
    </div>
</template>
<script>
import Cookies from 'js-cookie';
export default {
    name: 'HelloWorld',
    mounted(){
        console.log(Cookies.get('account'));
        if(!!sessionStorage.getItem('todoList')){
            this.showList = JSON.parse(sessionStorage.getItem('todoList'))
        }
    },
    data() {
        return {
            inputData: '',
            showList: []
        }
    },
    methods:{
        saveInfo(){
            this.showList.push(this.inputData);
            let tmpData;
            if(!!sessionStorage.getItem('todoList')){
                tmpData = JSON.parse(sessionStorage.getItem('todoList'));
                tmpData.push(this.inputData);
                sessionStorage.setItem('todoList',JSON.stringify(tmpData));
            }else{
                sessionStorage.setItem('todoList',JSON.stringify(new Array(this.inputData)));
            }
            
            console.log(JSON.parse(sessionStorage.getItem('todoList')));
            this.inputData = "";
        },
        showItem(info){//显示所选日迹
            console.info(info);
        },
        delItem(index){//删除所选日迹
            console.log(index);
            this.showList.splice(index,1);
        }
    }
}
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
.todoList_li{
    position: relative;
    background-color: lightblue;
    border-left: 3px solid #ccc;
    padding: 5px 8px;
    margin: 5px 0;
    cursor: pointer;
    font-size: 1.2rem;
}
.todoList_span{
    cursor: pointer;
    position: absolute;
    background-color: lightcoral;
    height: 100%;
    right: -20px;
    top: 0;
    width: 20px;
    text-align: center;
    display: flex;
    justify-content:center;
    align-items:center;
}
.todoInput{
    width: 80%;
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
