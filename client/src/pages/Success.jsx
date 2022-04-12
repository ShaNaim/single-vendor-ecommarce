import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { setTitle } from "../customHooks";

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
	setTitle("Order Success");
	const location = useLocation();
	const cart = location.state.user;
	console.log(cart);
	const order = useSelector((state) => state.order.orders);
	console.log(order);
	const [orderId, setOrderId] = useState(order[0].orderId);
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			{orderId ? (
				<>
					<span className="d-block fs-3">
						Order has been created successfully. Your order number is
						<span className="text-success"> {orderId} </span>
					</span>
					<span className="d-block text muted">
						to track your order please go to
						<Link className="text-decoration-underline  mx-3" to="/track-order">
							Track order
						</Link>
						and Provide nessery Information
					</span>
				</>
			) : (
				<>
					<span className="d-block text muted">Successfull. Your order is being prepared...</span>
					<LinkContainer to="/profile">
						<Button style={{ padding: 10, marginTop: 20 }}>View Orders</Button>
					</LinkContainer>
				</>
			)}
		</div>
	);
};

export default Success;
