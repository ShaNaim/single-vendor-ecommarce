import React, { useState } from "react";
import TextField from "../components/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import Orderitem from "./Profile/OrderItem";
const Wrapper = styled.form`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
	border: 1px solid grey;
	border-radius: 10px;
	${mobile({ flexDirection: "column" })}
`;

const Item = styled.div`
	width: 30%;
	padding: 20px;
	${mobile({ width: "100%" })}
`;
export default function TrackOrder() {
	const [orderId, setOrderId] = useState("");
	const [contact, setContact] = useState("");

	const [orderIdError, setOrderIdError] = useState(false);
	const [contactError, setContactError] = useState(false);
	const [order, setOrder] = useState(null);
	const HandelSubmit = () => {
		const createOrder = async () => {
			try {
				const res = await publicRequest.post(`/orders/find`, {
					orderId,
					contact: Number(contact),
				});
				if (res.status === 200) {
					setOrder(res.data);
				}
				console.log("SUCCESS", res.data);
			} catch (error) {
				console.log("SUCCESS", error);
			}
		};
		createOrder();
	};

	return (
		<>
			<span className="fs-3 ms-1"> Track Order</span>
			<Wrapper>
				<Item>
					<TextField
						sx={{ width: "100%" }}
						required
						type="text"
						id="orderId"
						name="orderId"
						label="Order ID "
						value={orderId}
						variant="standard"
						onChange={(e) => setOrderId(e.target.value)}
						error={orderIdError}
						onClick={(e) => {
							setOrderIdError(false);
						}}
					/>
				</Item>
				<Item>
					<TextField
						required
						sx={{ width: "100%" }}
						type="number"
						id="contact"
						name="contact"
						label="Contact"
						value={contact}
						variant="standard"
						onChange={(e) => setContact(e.target.value)}
						error={contactError}
						onClick={(e) => {
							setContactError(false);
						}}
					/>
				</Item>

				<Button color="success" onClick={HandelSubmit} variant="outlined">
					Track
				</Button>
			</Wrapper>
			{order && (
				<div className="mt-3 border rounded border-success p-2">
					<Orderitem order={order} />
				</div>
			)}
		</>
	);
}
