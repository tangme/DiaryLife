<style>
/* --------------- todo 编辑条目 --------------- */
.item-for-edit{}
.item-for-edit input{
	box-sizing: border-box;
    width: 100%;
    padding: 4px 7px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    height: 32px;
    line-height: 1.5;
    font-size: 16px;
}
.item-for-edit input:hover{
    border-color: #57a3f3;
}
.item-for-edit input:focus{
    border-color: #57a3f3;
    outline: 0;
    box-shadow: 0 0 3px rgba(45,140,240,.8);
}

/* --------------- todo 显示条目 --------------- */
.item-for-display{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: lightblue;
    border-left: 3px solid #ccc;
    margin: 5px auto;
    cursor: pointer;
    font-size: 1.2rem;
	transition: .2s;
}
.item-for-display:hover{
	background-color: #57a3f3;
}
.item-for-display .item-for-display-content{
	text-align: left;
    padding: 5px 8px;
}
.item-for-display .item-for-display-setting{
    position: relative;
    align-self: stretch;
    display: flex;
    align-items: center;
    padding: 0 .5rem;
    background-color: lightcoral;
}
.item-for-display-setting-toolsgroup{
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    right: 0;
    height: 100%;
    width:0;
    background-color: lightcoral;
	overflow: hidden;
    transition: all .2s;
}
.item-for-display-setting:hover .item-for-display-setting-toolsgroup{
    width:90px;
}

/* --------------- other css ---------------*/

.displayNone{
    display: none;
}

.focusBg{
    background-color: bisque;
}
.custom-icon-svg{
	width:30px;
	text-align:center;
	transition: .2s;
}
.custom-icon-svg:hover{
	color:aliceblue;
}
</style>

<template>
    <div>
        <div ref="itemtodo" class="item-for-display" :class="{displayNone:isEdit,focusBg}" 
			@click.stop="changeView('edit')"
			@dragover.prevent.stop="handleDragover"
			@dragleave.stop="focusBg = false" 
			@dragend.stop="handleDragend"
		>
            <div class="item-for-display-content">{{data.content}}</div>
            <div class="item-for-display-setting">
                <icon-svg iconClass="More"/>
                <div class="item-for-display-setting-toolsgroup">
                    <icon-svg iconClass="el-icon-delete" class="custom-icon-svg" title="删除" @click.stop="delItem(data.tid)"/>
                    <icon-svg iconClass="finished-" class="custom-icon-svg" title="完成此项" @click.stop="handleItemDone"/>
                    <icon-svg iconClass="sort" class="custom-icon-svg" title="按住并拖动以排序"
                        @mousedown.stop.native="handleMouseDown"
                        @click.stop
                    />
                </div>
            </div>
        </div>
        <div class="item-for-edit" :class="{displayNone:!isEdit}">
            <input type="text" ref="input" :value="data.content" @blur="changeView" @keyup.stop.enter="handleUpdate">
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
			isEdit:false,
			focusBg:false
		};
	},
	methods:{
		handleItemDone(){
			console.log("handleItemDone");
		},
		handleDragover(){
			this.focusBg = true;
		},
		dragstart(){
			
		},
		handleDragend(){
			this.focusBg = false;
			this.$refs.itemtodo.removeAttribute("draggable");
		},
		handleDragStart(){
			
		},
		handleMouseDown(){
			
			this.$refs.itemtodo.setAttribute("draggable",true);
		},
		changeView(editView){
			if(editView==="edit"){//编辑视图
				this.isEdit = true;
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
			console.log(this.$refs.itemtodo);
			this.$refs.itemtodo.setAttribute("draggable",true);
		}
	}
};
</script>
