import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useHistory } from "react-router-dom";

const Container = styled.div`
	display: flex;
	min-height: 80px;
	margin: 20px;
	flex-direction: column;
	justify-content: top;
	align-items: center;
	${mobile({ margin: "20px 4px 0 4px" })}
`;
const Image = styled.img`
	width: 60%;
	border: 1px solid #a18cd1d1;
	height: 60%;
	object-fit: cover;
	box-shadow: 3px 4px 5px -1px rgba(0, 0, 0, 0.38);
	transform: scale(1.05);
	${mobile({ height: "60%", width: "100%" })}
`;

const BackButton = styled.button`
	width: 13rem;
	border: 1px solid #a18cd1d1;
	margin-top: -80px;
	padding: 4px;
	transition: 0.4s ease-in-out;

	transform: scale(1.05);
	&:hover {
		-webkit-transform: scale(1.05);
		-moz-transform: scale(1.05);
		box-shadow: 10px 11px 13px -4px rgba(0, 0, 0, 0.38);
		-webkit-box-shadow: 10px 11px 13px -4px rgba(0, 0, 0, 0.38);
		-moz-box-shadow: 10px 11px 13px -4px rgba(0, 0, 0, 0.38);
	}
`;

const DisplayPoster = (props) => {
	let history = useHistory();
	return (
		<Container>
			<Image src={props.imagesrc} />
			<div>
				<BackButton onClick={() => history.goBack()}>
					{props.children}
				</BackButton>
			</div>
		</Container>
	);
};

export default DisplayPoster;
