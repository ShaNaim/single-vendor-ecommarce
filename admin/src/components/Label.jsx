import React, { Children } from "react";
import styled from "styled-components";
const Wrapper = styled.span`
	font-size: 20px;
	font-weight: 600;
	color: red;
`;
const Label = (props) => {
	return <Wrapper>{props.children}</Wrapper>;
};

export default Label;
