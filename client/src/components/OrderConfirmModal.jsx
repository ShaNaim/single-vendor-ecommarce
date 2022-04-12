import React, { useState } from "react";
import { mobile } from "../responsive";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

import styled from "styled-components";
import CartConfirmDetail from "./CartConfirmDetail";
import UserConfirmModal from "./UserConfirmModal";
import Stack from "@mui/material/Stack";
import Submitbutton from "./SubmitButton";
import PaymentModal from "./PaymentModal";
//......
const ProductDetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

const Hr = styled.hr`
	border-top: 1px solid red;
`;

const ChangeAddress = styled.span`
	font-size: 14px;
	letter-spacing: 1px;
	color: #3eabf3e8;
	transition: 0.4s;
	padding: 6px;
	border: 1px dotted #3eabf3e8;
	border-radius: 20px;
	&:hover {
		color: #2175ade8;
		border: 1px solid #2175ade8;
		cursor: pointer;
	}
`;

const Container = styled(Box)`
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	${mobile({ width: "95%" })}
`;

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

export default function OrderConfirmModal({
	user,
	setCurrentUser,
	forceUpdate,
	handleClick,
	cart,
	total,
	paymentMethod,
	setPaymentMethod,
	open,
	handleClose,
}) {
	const [deliveryAddress, setDeliveryAddress] = useState(
		user ? user.address : null
	);
	const [openPaymentModal, setOpenPaymentModal] = useState(false);
	const [openUserConfirm, setOpenUserConfirm] = useState(false);
	const handleOpen = () => {
		setOpenPaymentModal(true);
	};
	const handleConfirm = () => {
		if (user) {
			if (paymentMethod !== "") {
				handleClick();
			} else {
				handleOpen();
			}
		} else {
			setOpenUserConfirm(true);
		}
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="parent-modal-title"
				aria-describedby="parent-modal-description"
			>
				<Box sx={{ ...style, alignItems: "center" }}>
					{/* <div id="parent-modal-description"> */}
					<Container>
						<h5 id="parent-modal-title"> Confirm Order ? </h5>
						<ProductDetailsContainer>
							<CartConfirmDetail cart={cart} total={total} />
							{deliveryAddress ? (
								<>
									<div>
										{`Address: ${deliveryAddress.address} ${deliveryAddress.area} ${deliveryAddress.city} -${deliveryAddress.zip}`}
									</div>
									<div>
										<Button
											sx={{ marginRight: 1 }}
											onClick={() => setOpenUserConfirm(true)}
										>
											Change Address
										</Button>
									</div>
									<div>
										Contact :
										<span className="ms-3">0{user && user.contact}</span>
									</div>
								</>
							) : (
								<div className="m-3">
									<ChangeAddress onClick={() => setOpenUserConfirm(true)}>
										"Please Provide Address"
									</ChangeAddress>
								</div>
							)}

							<div>
								Payment Methood :
								<Button sx={{ marginRight: 1 }} onClick={handleOpen}>
									{paymentMethod ? paymentMethod : "Choose One"}
								</Button>
							</div>

							<p> Some Details About The Delivery .... </p>
							<PaymentModal
								open={openPaymentModal}
								setOpen={setOpenPaymentModal}
								setPaymentMethod={setPaymentMethod}
							/>
						</ProductDetailsContainer>
						<Stack
							direction="row"
							justifyContent="space-evenly"
							alignItems="center"
							spacing={3}
							sx={{ width: "100%" }}
						>
							<Submitbutton variant="success" onClick={handleConfirm}>
								Confirm
							</Submitbutton>
							<Submitbutton
								variant="danger"
								color="danger"
								onClick={handleClose}
							>
								Cancel
							</Submitbutton>
						</Stack>
					</Container>
					{/* </div> */}
				</Box>
			</Modal>

			<UserConfirmModal
				setCurrentUser={setCurrentUser}
				setGetUser={forceUpdate}
				userEmail={user ? user.email : ""}
				userContact={user ? user.contact : ""}
				open={openUserConfirm}
				setOpen={setOpenUserConfirm}
				setDeliveryAddress={setDeliveryAddress}
				onlyaddress={user ? true : false}
			/>
		</div>
	);
}
