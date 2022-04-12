import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";

const Title = styled.span`
	font-size: 22px;
	font-weight: 600;
	text-transform: capitalize;
	cursor: pointer;
	color: black;
`;

const Heading = ({ title }) => {
	return (
		<div>
			<LinkContainer to={`/products/${title.value ? title.value : title}`}>
				<Title>{title.name ? title.name : title}</Title>
			</LinkContainer>
		</div>
	);
};

export default Heading;
