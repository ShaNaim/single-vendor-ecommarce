import React from "react";
import { useSelector } from "react-redux";
//////
import CreateMessage from "./CreateMessage";
import MessageList from "./MessageList";
const Message = () => {
	const user = useSelector((state) => state.user.currentUser);

	return (
		<>
			<CreateMessage currentUser={user} />
			<div style={{ margin: "40px" }}></div>
			<MessageList currentUser={user} />
		</>
	);
};

export default Message;
