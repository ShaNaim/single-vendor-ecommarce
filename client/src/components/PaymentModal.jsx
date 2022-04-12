import React from "react";
// Components
import PaymentMethood from "./PaymentMethood";
// UI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const style = {
	display: "flex",
	flexDirection: "column",
	position: "absolute",
	borderRadius: "20px",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	pt: 2,
	px: 1,
	pb: 3,
};

export default function PaymentModal({ setPaymentMethod, setOpen, open, handleClick }) {
	const handleClose = () => {
		handleClick();
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Modal hideBackdrop open={open} onClose={handleClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
				<Box sx={{ ...style, width: 300 }}>
					<h6 id="child-modal-title">Please Cloose a Payment Methood</h6>
					<PaymentMethood setPaymentMethod={setPaymentMethod} />
					<Button variant="outlined" color="success" onClick={handleClose}>
						Confirm
					</Button>
				</Box>
			</Modal>
		</React.Fragment>
	);
}
