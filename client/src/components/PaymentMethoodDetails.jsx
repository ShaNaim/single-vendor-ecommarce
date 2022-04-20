import React from "react";
// UI
import { Stack, TextField, Button } from "@mui/material";
export default function PaymentMethood({ handleClose }) {
	const [cardNumber, setCardNumber] = React.useState("");
	const [cardNumberError, setCardNumberError] = React.useState("");

	const [csc, setCsc] = React.useState("");
	const [cscError, setCscError] = React.useState("");

	const [expaires, setExpaires] = React.useState("");
	const [expairesError, setExpairesError] = React.useState("");

	const [firstName, setFirstName] = React.useState("");
	const [firstNameError, setFirstNameError] = React.useState("");

	const [lastName, setLastName] = React.useState("");
	const [lastNameError, setLastNameError] = React.useState("");

	const validate = () => {
		let validated = true;

		if (cardNumber === "") {
			setCardNumberError(true);
			validated = false;
		}

		if (csc === "") {
			setCscError(true);
			validated = false;
		}

		if (expaires === "") {
			setExpairesError(true);
			validated = false;
		}

		if (firstName === "") {
			setFirstNameError(true);
			validated = false;
		}

		if (lastName === "") {
			setLastNameError(true);
			validated = false;
		}

		return validated;
	};

	const handleCLick = (event) => {
		if (validate()) {
			handleClose();
		}
	};

	return (
		<>
			<TextField
				helperText={cardNumberError && "Provide A Card Number"}
				sx={{ m: 1 }}
				variant="filled"
				required
				fullWidth
				type="text"
				id="standard-basic"
				label="Card Number"
				name="cardNumber"
				value={cardNumber}
				onChange={(e) => setCardNumber(e.target.value)}
				error={cardNumberError}
				onClick={(e) => {
					setCardNumberError(false);
				}}
			/>
			<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3} sx={{ width: "100%" }}>
				<TextField
					helperText={expairesError && "Provide An Expaires Date"}
					sx={{ m: 1, width: "50%" }}
					variant="filled"
					required
					type="text"
					id="expaires"
					name="expaires"
					label="Expaires"
					value={expaires}
					onChange={(e) => setExpaires(e.target.value)}
					error={expairesError}
					onClick={(e) => {
						setExpairesError(false);
					}}
				/>

				<TextField
					helperText={cscError && "Provide CSC Number"}
					sx={{ m: 1, width: "50%" }}
					variant="filled"
					required
					type="text"
					id="standard-basic"
					label="CSC"
					name="csc"
					value={csc}
					placeholder="8806"
					onChange={(e) => setCsc(e.target.value)}
					error={cscError}
					onClick={(e) => {
						setCscError(false);
					}}
				/>
			</Stack>

			<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3} sx={{ width: "100%" }}>
				<TextField
					helperText={firstNameError && "Provide First Name"}
					sx={{ m: 1, width: "50%" }}
					variant="filled"
					required
					type="text"
					id="firstName"
					name="firstName"
					label="First Name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					error={firstNameError}
					onClick={(e) => {
						setFirstNameError(false);
					}}
				/>

				<TextField
					helperText={lastNameError && "Provide First Name"}
					sx={{ m: 1, width: "50%" }}
					variant="filled"
					required
					type="text"
					id="lastName"
					name="lastName"
					label="Last Name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					error={lastNameError}
					onClick={(e) => {
						setLastNameError(false);
					}}
				/>
			</Stack>
			<Button sx={{ width: "90%", mt: 2 }} variant="outlined" color="success" onClick={handleCLick}>
				Confirm
			</Button>
		</>
	);
}
