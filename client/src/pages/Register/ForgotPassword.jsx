import React, { useState } from "react";
import TextField from "../../components/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { publicRequest } from "../../requestMethods";
import LinearProgress from "@mui/material/LinearProgress";
import { RedirectLink } from "./styled";
import ResetPasswordModal from "../../components/ResetPasswordModal";
import LoadingModal from "../../components/LoadingModal";
import { Link } from "react-router-dom";
const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
	${mobile({ padding: "8px" })}
`;
const Wrapper = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
	border: 1px solid grey;
	border-radius: 10px;
	width: 40%;
	${mobile({ width: "100%" })}
`;
const Progress = styled.div`
	margin-top: 28px;
	width: 100%;
`;
const Hr = styled.hr`
	border: 0;
	height: 1px;
	width: 100%;
	background-image: linear-gradient(
		to right,
		rgb(248, 65, 9),
		rgba(0, 0, 0, 0.75),
		rgb(248, 65, 9)
	);
`;

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(false);
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [info, setInfo] = useState({});

	const HandelSubmit = () => {
		const createOrder = async () => {
			try {
				setIsLoading(true);
				const res = await publicRequest.post(`/auth/forgot-password`, {
					email,
				});
				if (res.status === 200) {
					setInfo({
						type: "success",
						message: "Check Your Email for Reset Password Link",
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
						message: "Reset Password Failed Plese Try Again",
					});
				}

				setIsLoading(false);
				setOpen(true);
			}
		};
		createOrder();
	};

	const Test = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setInfo({
				type: "success",
				message: "Check Your Email for Reset Password Link",
			});
			setIsLoading(false);
			setOpen(true);
		}, 2000);
	};

	return (
		<Container>
			<Wrapper>
				<span className="ms-1 mb-3"> Forgot Password ? </span>

				<TextField
					sx={{ width: "100%" }}
					required
					type="text"
					id="email"
					name="email"
					label="Email "
					value={email}
					variant="standard"
					onChange={(e) => setEmail(e.target.value)}
					error={emailError}
					onClick={(e) => {
						setEmailError(false);
					}}
				/>
				<>
					{isLoading ? (
						<Progress>
							<LinearProgress color="success" />
						</Progress>
					) : (
						<Button
							sx={{ width: "100%", marginTop: "30px" }}
							color="success"
							onClick={HandelSubmit}
							variant="contained"
						>
							Forgot Password
						</Button>
					)}
					<Hr />
					<RedirectLink to="/login">LOGIN</RedirectLink>
				</>
			</Wrapper>
			<ResetPasswordModal open={open} setOpen={setOpen} info={info} />
			<LoadingModal open={isLoading} />
		</Container>
	);
}
