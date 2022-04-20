import React from "react";
// Components
import PaymentMethoodDetails from "./PaymentMethoodDetails";
// UI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import styled from "styled-components";

export const ImageSelect = styled.img`
	width: 120px;
	height: 80px;
`;

const style = {
	display: "flex",
	flexDirection: "column",
	position: "absolute",
	justifyContent: "space-between",
	alignItems: "center",
	borderRadius: "20px",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	border: "2px solid #b9b4b4",
	boxShadow: 20,
	pt: 2,
	px: 1,
	pb: 3,
};

export default function PaymentModal({ paymentMethod, setOpen, open, handleClick, amount }) {
	const handleClose = () => {
		handleClick();
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Modal open={open} onClose={() => setOpen(false)} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
				<Box sx={{ ...style, width: 500 }}>
					<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ width: "100%" }}>
						<ImageSelect
							src={
								paymentMethod === "paypal"
									? "images/paypal.png"
									: paymentMethod === "american-express"
									? "images/americal-express.jpg"
									: paymentMethod === "master-card"
									? "images/master-card.jpg"
									: "images/visa.jpg"
							}
							alt=""
						/>
						<span className="text-success fs-5">AMOUNT: ${amount}</span>
					</Stack>
					<h6 id="child-modal-title"> {paymentMethod} </h6>
					<PaymentMethoodDetails handleClose={handleClose} />
				</Box>
			</Modal>
		</React.Fragment>
	);
}
