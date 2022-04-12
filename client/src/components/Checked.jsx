import React from "react";
import styled from "styled-components";
import Radio from "@mui/material/Radio";

const Chip = styled.button`
	text-align: center;
	border: none;
	border: 0.5px solid #668a8d29;
	border-radius: 40px;
	padding: 10px;
	font-size: 12px;
	background: ${(props) => (props.checked ? "#3da7a75a" : "white")};
	box-shadow: 1px 0.5px 1px 1px #a8abb8;
	&:hover {
		outline: none;
		background-color: white;
		border: 0.5px solid #9eb4b688;
		box-shadow: 1px 0.5px 1px 2px #9eb4b688;
		color: #2f6d74f4;
	}
`;
const ChipActive = styled.button`
	text-align: center;
	border: none;
	border: 0.5px solid #668a8d29;
	border-radius: 40px;
	padding: 10px;
	font-size: 14px;
	background: #3da7a75a;
	box-shadow: 1px 0.5px 1px 1px #a8abb8;
	&:hover {
		outline: none;
		background-color: white;
		border: 0.5px solid #9eb4b688;
		box-shadow: 1px 0.5px 1px 2px #9eb4b688;
		color: #2f6d74f4;
	}
`;
const label = { inputProps: { "aria-label": "Checkbox" } };

export default function Checked(props) {
	return (
		<>
			<Radio
				{...label}
				{...props}
				icon={<Chip className="text-capitalize">{props.label}</Chip>}
				checkedIcon={
					<ChipActive className="text-capitalize">{props.label}</ChipActive>
				}
			/>
		</>
	);
}
