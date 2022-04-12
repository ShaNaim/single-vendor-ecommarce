import styled from "styled-components";
import { mobile } from "../../responsive";

export const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px;
`;

export const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;

export const Info = styled.div`
	flex: 3;
`;

export const Hr = styled.hr`
	background-color: #eee;
	border: none;
	height: 1px;
`;

export const Summary = styled.div`
	flex: 1;
	border: 0.5px solid lightgray;
	border-radius: 10px;
	padding: 4px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding: 20px;
`;

export const SummaryItem = styled.div`
	border: 0.5px solid lightgray;
	border-radius: 10px;
	width: 100%;
	padding: 4px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	padding: 8px;
	margin: 8px;
`;

export const Button = styled.button`
	width: 100%;
	padding: 10px;
	background-color: black;
	color: white;
	font-weight: 600;
	cursor: pointer;
`;
