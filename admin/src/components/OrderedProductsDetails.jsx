import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import styled from "styled-components";
import { getProducts } from "../redux/apiCalls";
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
	const productList = useSelector((state) => state.product);
	const [productsList, setproductsList] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const populate = async () => {
			try {
				const data = await getProducts(dispatch);
				console.log(data);
				setproductsList(data);
			} catch (error) {
				console.log(error);
			}
		};
		populate();
	}, [dispatch]);

	useEffect(() => {
		const getProduct = async (id) => {
			const product = await productsList.find((product) => product._id === id);
			console.log("product ::", id);
			console.log("product ::", product);
			setProducts(product);
		};
		getProduct(id);
	}, [productsList, id]);

	return (
		<>
			{products && (
				<TableRow key={products.title} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
					<TableCell component="th" scope="row">
						<BookTitle>
							<Button onClick={handleOpen}>{products.title}</Button>
						</BookTitle>
					</TableCell>
					<TableCell align="right">{quantity}</TableCell>
					<TableCell align="right">{products.price}</TableCell>
					<TableCell align="right">{products.price * quantity}</TableCell>
				</TableRow>
			)}
		</>
	);
};

export default Orderedproductsdetails;
