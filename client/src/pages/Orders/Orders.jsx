import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../../requestMethods";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";

const Button = styled.button`
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

const Success = () => {
	const location = useLocation();
	//in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
	const cart = location.state.cart;
	const currentUser = useSelector((state) => state.user.currentUser);
	const [orderId, setOrderId] = useState(null);

	useEffect(() => {
		const createOrder = async () => {
			try {
				const res = await userRequest.get(`/orders/find/${currentUser._id}`);
				console.log("SUCCESS", res.data);
			} catch {}
		};
		createOrder();
	}, [cart, currentUser]);

	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{orderId
				? `Order has been created successfully. Your order number is ${orderId}`
				: `Successfull. Your order is being prepared...`}
			<LinkContainer to="/">
				<Button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</Button>
			</LinkContainer>

			<div className="row">
				<div className="col-6"></div>
			</div>
		</div>
	);
};

export default Success;
