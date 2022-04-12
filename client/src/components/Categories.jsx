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
// const Container = styled.div`
// 	display: flex;
// 	padding: 10px;
// 	justify-content: space-between;
// 	${mobile({ padding: "0px", flexDirection: "column" })}
// `;

const Categories = () => {
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
				<QuickLink item={item.name} key={item.id} />
			))}
		</Container>
	);
};

export default Categories;
