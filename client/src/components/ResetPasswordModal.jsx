import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AlertTitle from "@mui/material/AlertTitle";
import { useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	p: 4,
};

export default function ResetPasswordModal({ open, setOpen, info }) {
	const history = useHistory();
	const handleClose = () => {
		setOpen(false);
		// history.push("/");
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Alert
						variant="filled"
						severity={info.type === "success" ? "success" : "error"}
						action={
							<Button onClick={handleClose} color="inherit" size="small">
								Ok
							</Button>
						}
					>
						<AlertTitle>
							{info.type === "success"
								? "Email Sent"
								: info.type === "not-found"
								? " User Dosen't Exists "
								: " Failed"}{" "}
						</AlertTitle>
						{info.message}
					</Alert>
				</Box>
			</Modal>
		</div>
	);
}
