import httpAxios from "@/assets/js/Utils";

export function updateTodoToUndo(id){
	return httpAxios.post("/todo/undoTodo",{tid:id});
}