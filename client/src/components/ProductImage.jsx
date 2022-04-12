import React from "react";
import styled from "styled-components";

export const Img = styled.img`
	padding: 3px;
	min-height: 160px;
	max-height: 160px;
	max-width: 160px;
	width: 100%;
	border: 5px solid white;
	border-radius: 10px;
	object-fit: cover;
`;

const Productimage = (props) => {
	return <Img {...props} />;
};

export default Productimage;
