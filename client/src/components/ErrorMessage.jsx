import React from "react";

export default function ErrorMessage({ messages }) {
	console.log(messages);
	Object.values(messages).forEach(({ value }) => {
		console.log(value);
	});
	return <>{messages && <span> {messages} </span>}</>;
}
