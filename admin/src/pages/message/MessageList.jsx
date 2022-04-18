import React, { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import styled from "styled-components";

const Table = styled.table`
	border-collapse: collapse;
	border-spacing: 0;
	width: 100%;
	border: 1px solid #ddd;
`;

const Th = styled.th`
	text-align: left;
	padding: 16px;
`;
const Td = styled.td`
	text-align: left;
	padding: 16px;
`;
const Tr = styled.tr`
	&:nth-child(odd) {
		background-color: #bec7cf;
	}
`;

export default function MessageList({ currentUser }) {
	const [messageList, setMessageList] = useState([]);

	const handleDelete = (id) => {
		console.log(id);
	};

	useEffect(() => {
		const getAllMessages = async () => {
			try {
				const allMessages = await userRequest.get(`/message`);
				console.log(allMessages.data);
				setMessageList(allMessages.data);
			} catch (error) {
				console.log(error);
			}
		};
		getAllMessages();
	}, [currentUser]);

	return (
		<div>
			{messageList && (
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<Th>#</Th>
							<Th>Message Title</Th>
							<Th>Product Title</Th>
							<Th>Last Updated</Th>
							<Th>Email</Th>
							<Th>Status</Th>
							<Th></Th>
						</tr>
					</thead>
					<tbody>
						{messageList.map((message, index) => {
							return (
								<Tr key={index}>
									<Td>{index + 1} </Td>
									<Td>{message.title}</Td>
									<Td>{message.productTitle}</Td>
									<Td>{format(message.updatedAt)} </Td>
									<Td>{message.email} </Td>
									<Td>{message.status === 0 ? "Pending" : "Solved"} </Td>
									<Td>
										<Link to={`/messages/details/${message._id}`}>View</Link>
									</Td>
								</Tr>
							);
						})}
					</tbody>
				</Table>
			)}
		</div>
	);
}
