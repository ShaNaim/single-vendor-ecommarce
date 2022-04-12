import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Col } from "react-bootstrap";

const Info = styled.div`
	width: 110px;
	height: 110px;
	padding: 18px;
	margin-top: 12px;
	border: 2px solid #126ca06f;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	&:hover {
		transition: 350ms;
		border-radius: 20px;
		border: 6px solid #126ca06f;
	}
`;
const Container = styled(Col)`
	&:hover {
		cursor: pointer;
	}
`;
const Title = styled.span`
	font-size: 14px;
	color: Black;
	background-color: white;
`;

const QuickLink = ({ item }) => {
	return (
		<Container xs={4} md={2}>
			<Link to={`/products/${item}`}>
				<Info>
					<Title>{item}</Title>
				</Info>
			</Link>
		</Container>
	);
};

export default QuickLink;
