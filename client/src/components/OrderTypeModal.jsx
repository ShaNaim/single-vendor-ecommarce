import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
// Components
import LoginModule from "../pages/Register/LoginModule";
import Submitbutton from "./SubmitButton";
///...... UI
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};
const Container = styled(Box)`
	min-width: 20%;
	${mobile({ minWidth: "80%" })}
`;
export default function OrderTypeModal({ open, handleClose }) {
	const [noRedirect, setNoRedirect] = useState(true);
	return (
		<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
			<Container sx={style}>
				<Stack direction="column" justifyContent="space-evenly" alignItems="center" spacing={3} sx={{ width: "100%" }}>
					<LoginModule noRedirect={noRedirect} />
					<span className="m-3"> OR </span>
					<Link to="/checkout">
						<Submitbutton variant="info">Continue As Guest ?</Submitbutton>
					</Link>
				</Stack>
			</Container>
		</Modal>
	);
}
