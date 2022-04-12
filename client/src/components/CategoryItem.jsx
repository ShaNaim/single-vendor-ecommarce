import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Row, Col } from "react-bootstrap";
import { publicRequest } from "../requestMethods";

const Wrapper = styled(Row)`
	display: flex;
	justify-content: space-between;
	${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Info = styled.div`
	width: 100%;
	height: 70px;
	background-image: linear-gradient(to top, #a18cd145 0%, #fdf4fb 100%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	${mobile({ top: "-150px" })}
`;

const Container = styled.div`
	background-image: url(${({ imglink }) => imglink});
	background-position: center; /* Center the image */
	background-repeat: no-repeat; /* Do not repeat the image */
	background-size: cover;
	background-color: #fdfdff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 400px;
	&:hover {
		cursor: pointer;
	}
	border: 1px solid #a18cd1d1;
	transition: 0.4s ease-in-out;
	&:hover {
		transform: scale(1.05);
		-webkit-transform: scale(1.05);
		-moz-transform: scale(1.05);
		box-shadow: 10px 11px 13px -4px rgba(0, 0, 0, 0.38);
		-webkit-box-shadow: 10px 11px 13px -4px rgba(0, 0, 0, 0.38);
		-moz-box-shadow: 10px 11px 13px -4px rgba(0, 0, 0, 0.38);
	}
	${mobile({ height: " 400px", width: "100%" })}
`;

const Title = styled.span`
	font-size: 23px;
	color: #252323;
	font-weight: 600;
	text-transform: capitalize;
	cursor: pointer;
`;

const CategoryItem = () => {
	const [category, setCategory] = useState([]);
	const getAllCategories = async () => {
		const res = await publicRequest.get(`/layout/category`);
		console.log("CATEGORY ::", res.data);
		if (res.data) {
			setCategory(res.data);
		}
	};

	useEffect(() => {
		try {
			getAllCategories();
		} catch (error) {
			console.error("Category Error:", error);
		}
	}, []);

	return (
		<>
			<Wrapper fluid="md">
				{category.map((item) => {
					return (
						<Col xs={12} sm={12} md={6}>
							<Link to={`/categories/${item.name}`}>
								<Container imglink={item.image}>
									<Info>
										<Title>{item.name}</Title>
									</Info>
								</Container>
							</Link>
						</Col>
					);
				})}
			</Wrapper>
		</>
	);
};

export default CategoryItem;
