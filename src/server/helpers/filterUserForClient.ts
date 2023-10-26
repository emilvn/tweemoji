import {type User} from "@clerk/backend";

function filterUserForClient(user: User){
	return {
		id: user.id,
		username: user.username,
		imageUrl: user.imageUrl,

	}
}
export default filterUserForClient;