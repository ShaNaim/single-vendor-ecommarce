import {
	Facebook,
	Instagram,
	MailOutline,
	Phone,
	Pinterest,
	Room,
	Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { LinkContainer } from "react-router-bootstrap";
const Container = styled.div`
	margin-top: 40px;
	border-top: 4px solid #346da7;
	background: #74b9ff;
	display: flex;
	${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 40px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
	margin: 20px 0px;
`;

const SocialContainer = styled.div`
	display: flex;
`;

const SocialIcon = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	color: white;
	background-color: #${(props) => props.color};
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20px;
`;

const Center = styled.div`
	flex: 1;
	padding: 20px;
	${mobile({ display: "none" })}
`;

const Title = styled.h3`
	margin-bottom: 30px;
`;

const List = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
	display: flex;
	flex-wrap: wrap;
`;

const ListItem = styled.li`
	width: 50%;
	margin-bottom: 10px;
	cursor: pointer;
`;

const Right = styled.div`
	flex: 1;
	padding: 20px;
	${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
	margin-bottom: 20px;
	display: flex;
	align-items: center;
`;

const Payment = styled.img`
	width: 50%;
`;

const Footer = () => {
	return (
		<Container>
			<Left>
				<Logo>WhiteCoatBD.</Logo>
				<Desc>
					There are many variations of passages of Lorem Ipsum available, but
					the majority have suffered alteration in some form, by injected
					humour, or randomised words which don’t look even slightly believable.
				</Desc>
				<SocialContainer>
					<SocialIcon color="3B5999">
						<Facebook />
					</SocialIcon>
					<SocialIcon color="E4405F">
						<Instagram />
					</SocialIcon>
					<SocialIcon color="55ACEE">
						<Twitter />
					</SocialIcon>
					<SocialIcon color="E60023">
						<Pinterest />
					</SocialIcon>
				</SocialContainer>
			</Left>
			<Center>
				<Title>Useful Links</Title>
				<List>
					<LinkContainer to="/">
						<ListItem>Home</ListItem>
					</LinkContainer>
					<LinkContainer to="/cart">
						<ListItem>Cart</ListItem>
					</LinkContainer>
					<LinkContainer to="/books">
						<ListItem>Books</ListItem>
					</LinkContainer>
					<LinkContainer to="/guides">
						<ListItem>Guides</ListItem>
					</LinkContainer>
					<LinkContainer to="/bundels">
						<ListItem>Bundles</ListItem>
					</LinkContainer>
					<LinkContainer to="/profile">
						<ListItem>My Account</ListItem>
					</LinkContainer>
					<LinkContainer to="/profile/orders">
						<ListItem>Order Tracking</ListItem>
					</LinkContainer>
					<LinkContainer to="/profile/wishlist">
						<ListItem>Wishlist</ListItem>
					</LinkContainer>
				</List>
				<LinkContainer to="/terms">
					<ListItem>Terms</ListItem>
				</LinkContainer>
			</Center>
			<Right>
				<Title>Contact</Title>
				<ContactItem>
					<Room style={{ marginRight: "10px" }} /> Dhaka , Bangladesh
				</ContactItem>
				<ContactItem>
					<Phone style={{ marginRight: "10px" }} /> +8801711178654
				</ContactItem>
				<ContactItem>
					<MailOutline style={{ marginRight: "10px" }} />{" "}
					contact@WhiteCoatBD.dev
				</ContactItem>
				<Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
			</Right>
		</Container>
	);
};

export default Footer;
