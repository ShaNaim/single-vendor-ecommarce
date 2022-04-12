import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { default as Form } from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import styled from "styled-components";
import { mobile } from "../responsive";

const FormControl = styled(Form)`
	margin-bottom: 10px;
	width: 100%;
	${mobile({ width: "100%" })}
`;

const Passwordinput = (props) => {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	return (
		<>
			<FormControl
				error={props.passwordError}
				required
				variant="standard"
				sx={{ mb: "12px" }}
			>
				<InputLabel htmlFor="filled-adornment-password">
					{props.label}
				</InputLabel>
				<Input
					required
					id="filled-adornment-password"
					type={showPassword ? "text" : "password"}
					onChange={(e) => {
						props.setPassword(e.target.value);
						props.setPasswordError(false);
					}}
					onClick={(e) => {
						props.setPasswordError(false);
					}}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
				/>
				<FormHelperText id="outlined-weight-helper-text">
					{props.confirmPasswordError
						? "Password Dont match"
						: props.passwordError && "Enter Password"}
				</FormHelperText>
			</FormControl>
		</>
	);
};

export default Passwordinput;
