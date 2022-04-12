import React, { useState, useEffect } from "react";
import styled from "styled-components";

//.. UI ..//
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

///..... Custom
import Orderedproductsdetails from "./OrderedProductsDetails";
import Productswidget from "./ProductsWidget";
//..  ..//
const Wrapper = styled.div`
	flex: 1;
	font-size: 18px;
`;
const Orderedproducts = ({ products, total, deliveryCost }) => {
	const [open, setOpen] = React.useState(false);
	const handleClose = () => setOpen(false);
	const handleOpen = () => setOpen(true);
	return (
		<Wrapper>
			<div>
				<TableContainer component={Paper}>
					<Table size="small" aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Product</TableCell>
								<TableCell align="right">Quantity</TableCell>
								<TableCell align="right">Price</TableCell>
								<TableCell align="right">Subtottal</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{products.map((row) => (
								<Orderedproductsdetails
									id={row.productId}
									quantity={row.quantity}
									handleOpen={handleOpen}
								/>
							))}
							<TableRow
								sx={{
									border: 0,
									background: "#c5b8b8",
								}}
							>
								<TableCell align="left"> Sub Tottal </TableCell>
								<TableCell align="left"> </TableCell>
								<TableCell align="left"> </TableCell>
								<TableCell align="right">{total}</TableCell>
							</TableRow>
							<TableRow
								sx={{
									border: 0,
									background: "#c5b8b8",
								}}
							>
								<TableCell align="left"> Delivery Cost </TableCell>
								<TableCell align="left"> </TableCell>
								<TableCell align="left"> </TableCell>
								<TableCell align="right">{deliveryCost}</TableCell>
							</TableRow>
							<TableRow
								sx={{
									"&:last-child td, &:last-child th": {
										border: 0,
										background: "#999393",
									},
								}}
							>
								<TableCell align="left"> Tottal </TableCell>
								<TableCell align="left"> </TableCell>
								<TableCell align="left"> </TableCell>
								<TableCell align="right">{total + deliveryCost}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			<Productswidget handleClose={handleClose} open={open} />
		</Wrapper>
	);
};

export default Orderedproducts;
