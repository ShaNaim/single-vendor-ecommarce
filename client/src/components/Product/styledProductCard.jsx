import styled from "styled-components";

export const Card = styled.div`
	box-shadow: 0px 1px 3px 0px #a8abb8;
	border-radius: 0.8rem;
	margin: 6px;
	min-width: 120px;
	max-width: 160px;
	min-height: 200px;
	max-height: 480px;
	width: 100%;
	border: 0.1px solid #a8abb853;
	transition: transform 0.2s ease-in-out;
	:hover {
		top: 0;
		transform: scale(1.03);
		-webkit-transform: scale(1.03);
		-moz-transform: scale(1.03);
		box-shadow: 10px 11px 13px -4px rgba(0, 0, 0, 0.38);
		-webkit-box-shadow: 10px 11px 13px -4px rgba(0, 0, 0, 0.38);
		-moz-box-shadow: 10px 11px 13px -4px rgba(0, 0, 0, 0.38);
	}
	cursor: pointer;
	display: flex;
	flex-direction: column;
`;

export const Body = styled.div`
	display: flex;
	min-height: 80px;
	flex-direction: column;
	justify-content: top;
	align-items: center;
	margin: 1px;
`;

export const Title = styled.span`
	font-size: 14px;
	font-weight: 600;
	color: #250d2cb3;
	text-align: center;
`;

export const Price = styled.span`
	font-size: 16px;
	font-weight: 900;
	color: #062006;
`;
export const Description = styled.span`
	font-size: 10px;
	color: #5f755fa7;
	padding: 0px 20px 0px 20px;
	text-align: center;
`;
export const Button = styled.button`
	bottom: 0;
	border: none;
	border-top: 1px solid #ee3000;
	background-color: transparent;
	font-family: inherit;
	font-size: 16px;
	font-weight: bold;
	color: inherit;
	width: 100%;
	padding-top: 8px;
	margin-bottom: 8px;
	cursor: pointer;

	&:hover {
		color: #0e48fe;
	}
`;
