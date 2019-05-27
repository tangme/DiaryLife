import httpAxios from "@/assets/js/Utils";


export function addTodo(content){
	return httpAxios.post("/todo/addTodo", {content});
}

export function delTodo(id){
	return httpAxios.post("/todo/deleteTodo", { tid: id});
}

export function updateTodo(data){
	return httpAxios.post("/todo/updateTodo",{data});
}

export function finishedTodo(id){
	return httpAxios.post("/todo/finishedTodo",{tid:id});
}

export function updateTodoToUndo(id){
	return httpAxios.post("/todo/undoTodo",{tid:id});
}

export function fetchTodoList(){
	return httpAxios.post("/todo/queryTodo",null);
}

export function fetchFinishedTodoList(){
	return httpAxios.post("/todo/queryFinishedTodo", null);
}