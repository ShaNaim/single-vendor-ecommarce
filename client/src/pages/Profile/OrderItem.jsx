import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
// Components
import Orderedproducts from "./OrderedProducts";
// UI
import { styled as styler } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styler((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

const InfoConatiner = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
`;

const InfoWrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
	${mobile({ flexDirection: "column" })}
`;

const DataContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.span`
	font-size: 12px;
`;

const Info = styled.span`
	font-size: 16px;
	letter-spacing: 2px;
	color: ${({ status }) =>
		status === "pending"
			? "#8f9e09"
			: status === "ready"
			? "#30a8ee"
			: status === "complete"
			? "#2c9629"
			: status === "cancelled"
			? "#97341b"
			: status === "on-the-way"
			? "#203ff1"
			: status === "processing"
			? "#f12ff1"
			: "#42bd32"};
`;

const formateDate = (fromdate) => {
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const date = new Date(fromdate);

	return `${date.getDate()}-${monthNames[date.getMonth() + 1]}-${date.getFullYear()}`;
};

const Orderitem = ({ order }) => {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	return (
		<>
			<CardActions>
				<InfoConatiner>
					<InfoWrapper direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
						<DataContainer>
							<Title>Order ID:</Title>
							<Info> {order.orderId}</Info>
						</DataContainer>
						<DataContainer>
							<Title>Contact:</Title>
							<Info> 0{order.contactNumber}</Info>
						</DataContainer>
						<DataContainer>
							<Title>Status:</Title>
							<Info status={order.status}> {order.status}</Info>
						</DataContainer>
						<DataContainer>
							<Title>Total:</Title>
							<Info> {order.amount}</Info>
						</DataContainer>
					</InfoWrapper>
				</InfoConatiner>
				<ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Orderedproducts products={order.products} total={order.amount} deliveryCost={order.deliveryCost} />
					<InfoConatiner>
						<InfoWrapper>
							<DataContainer>
								<Title>Address:</Title>
								<Info>
									{order.address.address} {order.address.city}
									{order.address.area} {order.address.zip}
								</Info>
							</DataContainer>

							<DataContainer>
								<Title>Payment Type:</Title>
								<Info>{order.paymentMethod}</Info>
							</DataContainer>
							<DataContainer>
								<Title>Placed At:</Title>
								<Info>{formateDate(order.createdAt)}</Info>
							</DataContainer>
						</InfoWrapper>
					</InfoConatiner>
				</CardContent>
			</Collapse>
		</>
	);
};

export default Orderitem;
