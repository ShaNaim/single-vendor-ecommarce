import React from "react";
import { useSelector } from "react-redux";
//////
import CreateMessage from "./CreateMessage";
import MessageList from "./MessageList";
const Message = () => {
	const user = useSelector((state) => state.user.currentUser);

	return (
		<div style={{ flex: 6 }}>
			<MessageList currentUser={user} />
			{/* <CreateMessage currentUser={user} /> */}
		</div>
	);
};

export default Message;
