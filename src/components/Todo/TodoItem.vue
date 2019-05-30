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

/* .displayNone{
    display: none;
} */

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

.fade-enter-active, .fade-leave-active {
  transition: .1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>

<template>
    <div>
		<transition name="fade" mode="out-in" v-on:after-enter="afterEnter">
			<div ref="itemtodo" draggable="false" class="item-for-display" :class="{focusBg}" v-if="!isEdit" :key="data.tid"
				@click.stop="changeView('edit')"
				@dragover.prevent.stop="handleDragover"
				@dragleave.stop="focusBg = false" 
				@dragend.stop="handleDragend"
			>
				<div class="item-for-display-content">{{data.content}}</div>
				<div class="item-for-display-setting">
					<icon-svg iconClass="More"/>
					<div class="item-for-display-setting-toolsgroup">
						<icon-svg iconClass="el-icon-delete" class="custom-icon-svg" title="删除" @click.stop="handleDelItem"/>
						<icon-svg iconClass="finished-" class="custom-icon-svg" title="完成此项" @click.stop="handleItemDone"/>
						<icon-svg iconClass="sort" class="custom-icon-svg" title="按住并拖动以排序"
							@mousedown.stop.native="handleMouseDown"
							@click.stop
						/>
					</div>
				</div>
			</div>
			<div class="item-for-edit" v-else :key="data.tid + 1">
				<input type="text" ref="input" :value="data.content" @blur="changeView" @keyup.stop.enter="handleUpdate">
			</div>
		</transition>
    </div>
</template>

<script>
import { delTodo,updateTodo ,finishedTodo} from "@/api/todo";
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
		afterEnter(){
			if(this.isEdit){
				this.$nextTick(()=>{
					console.log();
					this.$refs.input.focus();
				});
			}
		},
		/**
         * 删除 待办项目
         */
		handleDelItem(){
			delTodo(this.data.tid).then(res=>{
				if(res.code === 1){
					this.$emit("afterDelItem",this.data.tid);
				}
			});
		},
		/**
		 * 更新 待办项目
		 */
		handleUpdate(event){
			updateTodo({
				tid:this.data.tid,
				content:event.target.value}).then(res=>{
				this.isEdit = false;
				if(res.code === 1){
					this.$emit("afterUpdateItem",this.data.tid);
				}
			});
		},
		/**
		 * 完成 待办项目
		 */
		handleItemDone(){
			finishedTodo(this.data.tid).then(res=>{
				if(res.code === 1){
					this.$emit("afterFinishedItem",this.data.tid);
				}
			});
		},
		handleDragover(){
			this.focusBg = true;
		},
		handleDragend(){
			console.log("drag end.");
			this.focusBg = false;
			this.$refs.itemtodo.removeAttribute("draggable");
		},
		handleMouseDown(){
			console.log("拖拽按钮点下了");
			// this.$refs.itemtodo.setAttribute("draggable",true);
		},
		changeView(editView){
			if(editView==="edit"){//编辑视图
				this.isEdit = true;
				/* this.$nextTick(()=>{
					this.$refs.input.focus();
				}); */
			}else{//查看视图
				this.isEdit = false;
			}
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
