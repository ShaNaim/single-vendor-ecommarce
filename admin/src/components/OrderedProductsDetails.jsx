import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import styled from "styled-components";

const Button = styled.button`
	border: none;
	background: none;
	cursor: pointer;
	&:hover {
		color: grey;
	}
`;

const BookTitle = styled.div`
	white-space: nowrap;
	width: 60%;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const Orderedproductsdetails = ({ id, quantity, handleOpen }) => {
	const [products, setProducts] = useState({});
	const productList = useSelector((state) => state.product.products);
	console.log("ID :", id);
	useEffect(() => {
		const getProduct = (id) => {
			const product = productList.find((product) => product._id === id);
			setProducts(product);
			console.log(product);
		};
		getProduct(id);
	}, [productList, id]);
	return (
		<>
			<TableRow
				key={products.title}
				sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
			>
				<TableCell component="th" scope="row">
					<BookTitle>
						<Button onClick={handleOpen}>{products.title}</Button>
					</BookTitle>
				</TableCell>
				<TableCell align="right">{quantity}</TableCell>
				<TableCell align="right">{products.price}</TableCell>
				<TableCell align="right">{products.price * quantity}</TableCell>
			</TableRow>
		</>
	);
};

export default Orderedproductsdetails;
