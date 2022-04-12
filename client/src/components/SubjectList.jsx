import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import QuickLink from "./QuickLink";
import { publicRequest } from "../requestMethods";
import { Row } from "react-bootstrap";

const Container = styled(Row)`
	margin-top: 50vh;
`;

const Info = styled.div`
	width: 40%;
	height: 40px;
	margin: 10px;
	padding: 18px;
	border: 2px solid #fd0ff16e;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	&:hover {
		cursor: pointer;
		transition: 350ms;
		box-shadow: 0.1px 0.1px 1px 1px #fd0ff16e;
	}
`;

const Title = styled.div`
	font-size: 14px;
	color: Black;
	background-color: white;
`;

const Subjectlist = () => {
	const [topic, setTopic] = useState([]);
	useEffect(() => {
		try {
			const getAllTopic = async () => {
				const res = await publicRequest.get(`/layout/topic`);
				console.log("DTA ::::", res.data);
				if (res.data) {
					setTopic(res.data);
				}
			};

			getAllTopic();
		} catch (error) {
			console.error(error);
		}
	}, [setTopic]);

	return (
		<Container className="justify-content-md-center mt-3 mb-3">
			{topic.map((item) => (
				<Info key={item.id}>
					<Title> {item.name} </Title>{" "}
				</Info>
			))}
		</Container>
	);
};

export default Subjectlist;
