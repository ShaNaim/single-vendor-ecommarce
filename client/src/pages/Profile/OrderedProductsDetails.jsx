import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
// UI
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const BookTitle = styled.div`
	white-space: nowrap;
	width: 60%;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const Orderedproductsdetails = ({ id, quantity, handleOpen }) => {
	const [products, setProducts] = useState({});
	const productList = useSelector((state) => state.product.products);
	useEffect(() => {
		const getProduct = (id) => {
			const product = productList.find((product) => product._id === id);
			setProducts(product);
		};
		return getProduct(id);
	}, [productList, id]);
	return (
		<>
			<TableRow key={products.title} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
				<TableCell component="th" scope="row">
					<BookTitle>
						<Link className="text-muted" to={`/product/${id}`}>
							{products.title}
						</Link>
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
