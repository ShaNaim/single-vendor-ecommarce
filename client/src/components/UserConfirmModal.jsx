import React, { useState, useRef } from "react";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
//.. UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import AddressInput from "../pages/Register/AddressInput";
import TextField from "./TextField";
import Submitbutton from "./SubmitButton";
import { PersonalInfoContainer } from "../pages/Register/styled";

const Containet = styled(Box)`
	width: "40%";
	${mobile({ width: "90%" })}
`;

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	border: "2px solid #000",
	borderRadius: "20px",
	boxShadow: 24,
	p: 2,
};

export default function UserConfirmModal({
	open,
	setOpen,
	forceUpdate,
	setDeliveryAddress,
	userEmail,
	userContact,
	setCurrentUser,
	onlyaddress,
}) {
	const [email, setEmail] = useState(userEmail ? userEmail : "");
	const [contact, setContact] = useState(userContact ? userContact : "");

	const [emailError, setEmailError] = useState(false);
	const [contactError, setContactError] = useState(false);

	const dispatch = useDispatch();
	const handleClose = () => setOpen(false);
	const addressRef = useRef(null);
	const handleClick = async (e) => {
		e.preventDefault();
		const address = addressRef.current.getAddress();
		if (onlyaddress) {
			setDeliveryAddress(address);
			setCurrentUser((prev) => {
				return { ...prev, address: address, contact: contact };
			});
		} else {
			console.log({ email, password: email, contact, address });
			setDeliveryAddress(address);
			try {
				register(dispatch, {
					email,
					password: email,
					contact,
					address,
				});
				setOpen(false);
			} catch (error) {
				console.log("User Auth Error :");
			}
		}
	};
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Containet sx={style}>
					<Stack
						direction="column"
						justifyContent="space-between"
						alignItems="center"
						spacing={2}
					>
						<Typography id="modal-modal-title" variant="h6" component="h4">
							Delivery Information
						</Typography>
						<PersonalInfoContainer className="d-flex justify-content-between">
							<TextField
								required
								sx={{ width: "100%", mb: "12px", mr: "12px" }}
								type="email"
								id="standard-basic"
								label="Email"
								name="email"
								value={email}
								variant="standard"
								onChange={(e) => setEmail(e.target.value)}
								error={emailError}
								onClick={(e) => {
									setEmailError(false);
								}}
								// focused={userEmail === "" ? false : true}
								disabled={userEmail === "" ? false : true}
							/>
							<TextField
								required
								sx={{ width: "100%", mb: "12px", mr: "12px" }}
								type="number"
								id="standard-basic"
								label="Contact"
								name="contact"
								value={contact}
								variant="standard"
								onChange={(e) => setContact(e.target.value)}
								placeholder="+880"
								error={contactError}
								onClick={(e) => {
									setContactError(false);
								}}
							/>
						</PersonalInfoContainer>
						<AddressInput ref={addressRef} />
						<Submitbutton onClick={handleClick}> Submit </Submitbutton>
					</Stack>
				</Containet>
			</Modal>
		</div>
	);
}
