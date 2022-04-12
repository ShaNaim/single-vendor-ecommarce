import styled from "styled-components";
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";

export const Container = styled.div`
	width: 100%;
	height: 100%;
	background: #92d1d4;
	display: flex;
	align-items: center;
	justify-content: center;
	background-size: cover;
`;

export const PersonalInfoContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: ${(props) => props.justifycontent};
	${mobile({
		flexDirection: "column",
		mobileOn: "450px",
		alignItems: "flex-start",
	})};
`;

export const Wrapper = styled.div`
	border-radius: 20px;
	width: ${(props) => (props.width ? props.width : "80%")};
	padding: 20px;
	background-color: white;
	box-shadow: 14px 13px 19px 1px rgba(0, 0, 0, 0.51);
	-webkit-box-shadow: 14px 13px 19px 1px rgba(0, 0, 0, 0.51);
	-moz-box-shadow: 14px 13px 19px 1px rgba(0, 0, 0, 0.51);
	${mobile({ width: "94%", margin: "20px 0 20px 0" })}
`;

export const PasswordContainer = styled.div`
	width: 30%;
`;

export const Title = styled.h1`
	font-size: 24px;
	font-weight: 300;
`;

export const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Hr = styled.hr`
	border-top: 2px dashed #92d1d4;
	background: white;
	margin: 0.5px;
	padding: 0;
`;

export const Agreement = styled.span`
	font-size: 12px;
	margin: 20px;
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	justify-content: space-evenly;
`;

export const RedirectLink = styled(Link)`
	font-size: 12px;
	letter-spacing: 1px;
	color: #58a5d884;
	transition: transform 0.4s;
	backface-visibility: hidden;
	-webkit-font-smoothing: subpixel-antialiased;
	&:hover {
		color: #2175ade8;
		transform: scale(1.1);
	}
`;
