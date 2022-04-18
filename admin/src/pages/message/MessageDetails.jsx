import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import { useSnackbar } from "notistack";
// UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Slide from "@material-ui/core/Slide";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TokenOutlinedIcon from "@mui/icons-material/TokenOutlined";
import SendIcon from "@mui/icons-material/Send";
////////////
export default function MessageDetails() {
	const currentUser = useSelector((state) => state.user.currentUser);

	const location = useLocation();
	const messageID = location.pathname.split("/")[3];

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [email, setEmail] = useState("");
	const [productId, setProductId] = useState("");
	const [newMessage, setNewMessage] = useState("");
	const [messageList, setmessageList] = useState("");

	const [titleError, setTitleError] = useState(false);
	const [descriptionError, setDescriptionError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [newMessageError, setNewMessageError] = useState("");

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
		setTitleError(false);
		setDescriptionError(false);
		setEmailError(false);
		setNewMessageError(false);
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
		if (newMessage === "") {
			setNewMessageError(true);
			validated = false;
		}
		return validated;
	};

	const handleSubmit = async (event) => {
		const validated = validate();
		if (validated) {
			try {
				const response = await userRequest.put("/message/" + messageID, {
					title,
					description,
					email,
					productId,
					messages: [...messageList, { sender: currentUser.email, message: newMessage }],
				});
				console.log(response.data);
				alert("Message Delivered", "success", true);
				populateData(response.data);
				// handleClear();
			} catch (error) {
				console.log(error);
				alert("Something Went Wrong , Please Try Again", "error", true);
			}
		} else {
			alert("Please Provide Nessery Information", "error", true);
		}
	};

	const populateData = (newData) => {
		setTitle(newData.title);
		setDescription(newData.description);
		setEmail(newData.email);
		setProductId(newData.productId);
		setmessageList(newData.messages);
	};

	const getMessageDetails = async (id) => {
		try {
			const response = await userRequest.get("/message/" + id);
			populateData(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getMessageDetails(messageID);
	}, [messageID]);

	return (
		<div style={{ flex: 6 }}>
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
									disabled
									error={titleError}
									helperText="Message Title"
									autoComplete="given-name"
									name="ticketTitle"
									fullWidth
									id="ticketTitle"
									label="Enter Title"
									value={title}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField required disabled error={emailError} fullWidth id="email" label="Sender Email Address" name="email" autoComplete="email" value={email} />
							</Grid>
							<Grid item xs={12}>
								<List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
									{messageList &&
										messageList.map((message, index) => {
											return (
												<React.Fragment key={index}>
													<ListItem alignItems="flex-start">
														<ListItemAvatar>
															<Avatar sx={{ m: 1, bgcolor: currentUser.email === message.sender ? "#4296ce" : "secondary.main" }}>
																<MailOutlineIcon />
															</Avatar>
														</ListItemAvatar>
														<ListItemText
															primary={message.sender}
															secondary={
																<React.Fragment>
																	<Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
																		{message.message}
																	</Typography>
																</React.Fragment>
															}
														/>
													</ListItem>
													<Divider variant="inset" component="li" />
												</React.Fragment>
											);
										})}
								</List>

								<TextField
									required
									error={newMessageError}
									helperText={newMessageError && "Enter A Message"}
									id="description"
									multiline
									fullWidth
									rows={4}
									label="Enter Message"
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									onClick={handleClear}
								/>
							</Grid>

							<Grid item xs={12}>
								<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={12}>
									<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
										<SendIcon />
									</Button>
								</Stack>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</div>
	);
}
