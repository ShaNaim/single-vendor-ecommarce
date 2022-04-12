import React, { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { format } from "timeago.js";
import styled from "styled-components";

const Wrapper = styled.div`
	margin-top: 4px;
	padding: 3px;
	border: 1px dotted red;
`;
const Title = styled.div`
	margin-bottom: 4px;
	border-bottom: 1px dotted red;
`;

const Item = styled.p`
	margin-top: 4px;
	letter-spacing: 0.5px;
`;
const Ordercustomer = ({ setContact, id }) => {
	const [person, setPerson] = useState({});

	const handleClick = (e) => {
		console.log(e);
	};

	const formateDate = (fromdate) => {
		const date = new Date(fromdate);

		return `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`;
	};

	useEffect(() => {
		const getPerson = async (id) => {
			const res = await userRequest.get(`users/find/${id}`);
			setPerson(res.data);
			setContact(res.data.contact);
		};
		getPerson(id);
		console.log(person);
	}, [id]);

	return (
		<Wrapper>
			<Title>Customer Info :</Title>
			<Item>
				Name :
				<span>
					{person.firstName} {person.lastName}
				</span>
			</Item>
			<Item>
				Email : <span>{person.email}</span>
			</Item>
			<Item>
				User since :
				<span>
					{format(person.createdAt)} || {formateDate(person.createdAt)}
				</span>
			</Item>
		</Wrapper>
	);
};

export default Ordercustomer;
