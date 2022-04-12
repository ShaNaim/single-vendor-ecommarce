import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

export const Select = styled.select`
	width: 100%;
	padding: 10px;
	margin-right: 20px;
	${mobile({ margin: "10px 2px" })}
`;

export const Option = styled.option`
	width: 40%;
`;

export default function DeliveryCost({ handleChange }) {
	return (
		<>
			<Select onChange={handleChange}>
				<Option value="60">Standered (60 Tk)</Option>
				<Option value="100">Express (100 Tk)</Option>
			</Select>
		</>
	);
}
