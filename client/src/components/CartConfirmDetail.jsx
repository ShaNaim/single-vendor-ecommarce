import React from "react";
import styled from "styled-components";
// UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Container = styled.div`
	width: 100%;
`;

const BookTitle = styled.div`
	white-space: nowrap;
	width: 90px;
	overflow: hidden;
	text-overflow: ellipsis;
`;
const Cartconfirmdetail = ({ cart, total }) => {
	return (
		<Container>
			<TableContainer component={Paper}>
				<Table size="small" aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Product</TableCell>
							<TableCell align="right">Quantity</TableCell>
							<TableCell align="right">Subtottal</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{cart.products.map((row) => (
							<TableRow key={row.title} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell component="th" scope="row">
									<BookTitle> {row.title} </BookTitle>
								</TableCell>
								<TableCell align="right">{row.quantity}</TableCell>
								<TableCell align="right">{row.quantity * row.price}</TableCell>
							</TableRow>
						))}
						<TableRow
							sx={{
								border: 0,
								background: "#c5b8b8",
							}}
						>
							<TableCell align="left"> Subtotal </TableCell>
							<TableCell align="right"> </TableCell>
							<TableCell align="right">{cart.total}</TableCell>
						</TableRow>
						<TableRow
							sx={{
								border: 0,
								background: "#c5b8b8",
							}}
						>
							<TableCell align="left"> Delivery </TableCell>
							<TableCell align="right"> </TableCell>
							<TableCell align="right"> {total} </TableCell>
						</TableRow>
						<TableRow
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
									background: "#999393",
								},
							}}
						>
							<TableCell align="left"> Total </TableCell>
							<TableCell align="right"> </TableCell>
							<TableCell align="right">{cart.total + total}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default Cartconfirmdetail;
