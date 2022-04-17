import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethods";
// UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TokenOutlinedIcon from "@mui/icons-material/TokenOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";

const theme = createTheme();

export default function CreateMessage({ currentUser }) {
	const { search } = useLocation();
	const query = new URLSearchParams(search);
	const productId = query.get("productId");

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [email, setEmail] = useState(currentUser.email);

	const [titleError, setTitleError] = useState(false);
	const [descriptionError, setDescriptionError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const { enqueueSnackbar } = useSnackbar();

	const alert = (message, type, center) => {
		enqueueSnackbar(message, {
			variant: type,
			anchorOrigin: {
				vertical: center ? "top" : "bottom",
				horizontal: center ? "center" : "left",
			},
			TransitionComponent: Slide,
			autoHideDuration: 2000,
		});
	};

	const handleClear = () => {
		setTitle("");
		setDescription("");
	};
	const validate = () => {
		let validated = true;
		if (title === "") {
			setTitleError(true);
			validated = false;
		}
		if (description === "") {
			setDescriptionError(true);
			validated = false;
		}
		if (email === "") {
			setEmailError(true);
			validated = false;
		}
		if (!validated) setErrorMessage("Please Provide Nessery Information");
		return validated;
	};

	const handleSubmit = async (event) => {
		const validated = validate();
		if (validated) {
			try {
				const response = await userRequest.post("/message/", { productId, title, description, email });
				console.log(response.data);
				alert("Message Delivered", "success", true);
				handleClear();
			} catch (error) {
				console.log(error);
				setErrorMessage("Something Went Wrong , Please Try Again");
			}
		} else {
			alert("Please Provide Nessery Information", "error", true);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<TokenOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Create new Message
					</Typography>

					<Box sx={{ mt: 2 }}>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<TextField
									required
									error={titleError}
									helperText="Enter A Title"
									autoComplete="given-name"
									name="ticketTitle"
									fullWidth
									id="ticketTitle"
									label="Enter Title"
									value={title}
									onChange={(event) => setTitle(event.target.value)}
									autoFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									error={descriptionError}
									helperText="Enter A Description"
									id="description"
									multiline
									fullWidth
									rows={4}
									label="Enter Description"
									value={description}
									onChange={(event) => setDescription(event.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									error={emailError}
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={(event) => setEmail(event.target.value)}
									value={email}
								/>
							</Grid>

							<Grid item xs={12}>
								<FormLabel className="text-danger" id="demo-error-radios">
									{errorMessage}
								</FormLabel>
							</Grid>
						</Grid>

						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
							Submit
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
