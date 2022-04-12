import React, { useState, useEffect } from "react";
import Orderitem from "./OrderItem";
import styled from "styled-components";

const SectionTitle = styled.span`
	width: 100%;
	font-size: 24px;
	letter-spacing: 2px;
	border-bottom: 1px solid red;
	margin-bottom: 20px;
`;
const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Item = styled.div`
	border-radius: 20px;
	margin: 10px 10px 30px 10px;
	padding: 10px;
	box-shadow: 4px 3px 4px 1px rgba(0, 0, 0, 0.31);
	-webkit-box-shadow: 4px 3px 4px 1px rgba(0, 0, 0, 0.31);
	-moz-box-shadow: 4px 3px 4px 1px rgba(0, 0, 0, 0.31);
`;

const Orderlist = ({ orders }) => {
	const [userOrders, setuserOrders] = useState(orders);

	useEffect(() => {
		function sortData() {
			setuserOrders((prev) => [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
		}
		sortData();
	}, []);

	return (
		<Container>
			<SectionTitle>Orders</SectionTitle>
			{userOrders.map((order) => (
				<Item>
					{console.log(order)}
					<Orderitem order={order} />
				</Item>
			))}
		</Container>
	);
};

export default Orderlist;
