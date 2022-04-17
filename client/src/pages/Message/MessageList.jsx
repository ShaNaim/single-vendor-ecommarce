import React, { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function MessageList({ currentUser }) {
	const [messageList, setMessageList] = useState([]);
	useEffect(() => {
		const getAllMessages = async (id) => {
			try {
				const allMessages = await userRequest.get(`/message/find/${id}`);
				console.log(allMessages.data);
				setMessageList(allMessages.data);
			} catch (error) {
				console.log(error);
			}
		};
		getAllMessages(currentUser._id);
	}, [currentUser]);
	return (
		<div>
			{messageList && (
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>#</th>
							<th>Message Title</th>
							<th>Product Title</th>
							<th>Last Updated</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{messageList.map((message, index) => {
							return (
								<tr key={index}>
									<td>{index + 1} </td>
									<td>{message.title}</td>
									<td>{message.productTitle}</td>
									<td>{message.updatedAt} </td>
									<td>
										<Link to={`/messages/details/${message._id}`}>View</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			)}
		</div>
	);
}
