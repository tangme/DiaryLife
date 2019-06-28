import httpAxios from "@/assets/js/Utils";

export function updateUser(user) {
	return httpAxios.post("/user/updateUserInfo", user);
}