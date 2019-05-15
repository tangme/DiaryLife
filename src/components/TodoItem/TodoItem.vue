<style>
.item-display{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: lightblue;
    border-left: 3px solid #ccc;
    margin: 5px auto;
    cursor: pointer;
    font-size: 1.2rem;
}
.item-display .item-show{
    padding: 5px 8px;
}
.item-display .item-edit{
    position: relative;
    align-self: stretch;
    display: flex;
    align-items: center;
    padding: 0 .5rem;
    background-color: lightcoral;
}
.item-more-edit{
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    right: 0;
    height: 100%;
    width:0;
    background-color: lightcoral;
    transition: all .2s;
}
.item-edit:hover .item-more-edit{
    width:72px;
}

.displayNone{
    display: none;
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
</style>

<template>
    <div>
        <div class="item-display" :class="{displayNone:isEdit}" @click.stop="changeView('edit')">
            <div class="item-show">{{data.content}}</div>
            <div class="item-edit">
                <icon-svg iconClass="More"/>
                <div class="item-more-edit">
                    <icon-svg iconClass="el-icon-delete" style="width:36px;" title="删除" @click="delItem(data.tid)"/>
                    <icon-svg iconClass="sort" style="width:36px;" title="按住并拖动以排序" @click="handleSort"/>
                </div>
            </div>
        </div>
        <div class="item-could-eidt" :class="{displayNone:!isEdit}">
            <input type="text" class="todoInput" ref="input" :value="data.content" @blur="changeView" @keyup.stop.enter="handleUpdate">
        </div>
    </div>
</template>

<script>
import {sendRequest} from "@/assets/js/Utils";
export default {
	name:"TodoItem",
	props:{
		data:{
			type:Object
		}
	},
	data(){
		return{
			isEdit:false
		};
	},
	methods:{
		changeView(editView){
			if(editView==="edit"){//编辑视图
				this.isEdit = true;
				// this.$refs.input.focus();
				this.$nextTick(()=>{
					this.$refs.input.focus();
				});
			}else{//查看视图
				this.isEdit = false;
			}
		},
		handleUpdate(event){
			sendRequest("/todo/updateTodo",{
				tid:this.data.tid,
				content:event.target.value
			}).then(res=>{
				this.isEdit = false;
				this.$emit("delSuccess");
			});
		},
		/**
         * 删除todo项目
         */
		delItem(id){
			sendRequest("/todo/deleteTodo",{
				tid:id,
			}).then(res=>{
				this.$emit("delSuccess",id);
			});
		},
		/**
         * 排序
         */
		handleSort(){
			console.log("handleSort");
		}
	}
};
</script>
