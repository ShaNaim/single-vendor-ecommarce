import React, { useState } from "react";
import TextField from "../../components/TextField";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import Passwordinput from "../../components/PasswordInput";
import { useValidator } from "../../customHooks";
import { publicRequest } from "../../requestMethods";
import ResetPasswordModal from "../../components/ResetPasswordModal";
import LoadingModal from "../../components/LoadingModal";
import { Container, Wrapper, Form, Title, ButtonContainer } from "./styled";

const Resetpassword = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [info, setInfo] = useState({});

	const { search } = useLocation();
	const queryString = new URLSearchParams(search);
	const userId = queryString.get("id");
	const tokenId = queryString.get("token");
	console.log(userId, tokenId);

	const handleClick = async (e) => {
		if (email === "") setEmailError(true);
		if (password === "") setPasswordError(true);
		if (password !== confirmPassword) setConfirmPasswordError(true);
		if (
			!emailError &&
			!passwordError &&
			!confirmPasswordError &&
			userId &&
			tokenId
		) {
			const createOrder = async () => {
				try {
					setIsLoading(true);
					const res = await publicRequest.post(`/auth/reset-password`, {
						email,
						userId,
						tokenId,
						password,
					});
					if (res.status === 200) {
						setInfo({
							type: "success",
							message: "Password Reset Successfull Login In to Continue",
						});
					} else {
						setInfo({
							type: "failed",
							message: "Reset Password Failed Plese Try Again",
						});
					}
					setIsLoading(false);
					setOpen(true);
				} catch (error) {
					console.log(error.response.status);
					if (error.response.status === 404) {
						setInfo({
							type: "not-found",
							message: "Check Your Email Address",
						});
					} else {
						setInfo({
							type: "failed",
							message: "The Link is Invalid or Expired",
						});
					}
					setIsLoading(false);
					setOpen(true);
				}
			};
			createOrder();
		}
	};
	return (
		<div>
			<Container className="p-3">
				<Wrapper width="50%">
					<Form>
						<Title>Reset Password </Title>
						<TextField
							required
							type="email"
							className="mb-3 w-100"
							id="standard-basic"
							label="Email"
							name="email"
							variant="standard"
							onChange={(e) => {
								setEmail(e.target.value);
								setEmailError(false);
							}}
							error={emailError}
							onClick={(e) => {
								setEmailError(false);
							}}
							helperText={emailError && "Enter Your Email Address"}
						/>
						<Passwordinput
							label="Password"
							setPassword={setPassword}
							setPasswordError={setPasswordError}
							passwordError={passwordError}
							helperText={passwordError && "Enter Your Email Password "}
						/>
						<Passwordinput
							label="Confirm Password"
							setPassword={setConfirmPassword}
							setPasswordError={setConfirmPasswordError}
							passwordError={confirmPasswordError}
							confirmPasswordError={confirmPasswordError}
							helperText={confirmPasswordError && "Password Don't Match"}
						/>
						<ButtonContainer>
							<Button variant="contained" color="success" onClick={handleClick}>
								Reset Password
							</Button>
						</ButtonContainer>
					</Form>
				</Wrapper>
			</Container>
			<ResetPasswordModal open={open} setOpen={setOpen} info={info} />
			<LoadingModal open={isLoading} />
		</div>
	);
};

export default Resetpassword;
