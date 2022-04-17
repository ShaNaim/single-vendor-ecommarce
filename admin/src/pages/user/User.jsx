import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { userRequest } from "../../requestMethods";
import { useLocation } from "react-router-dom";
// Components
import AddressInput from "./AddressInput";
// UI
import LoadingButton from "@mui/lab/LoadingButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
const PersonalInfoContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: ${(props) => props.justifycontent};
`;

const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-around;
	margin: 10px;
`;

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	margin: 4px;
`;

const InfoTitle = styled.span`
	font-size: 12px;
`;
const InfoDetail = styled.span`
	font-size: 20px;
	letter-spacing: 1px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	border-radius: 20px;
	margin: 20px;
	padding: 20px;
	box-shadow: 4px 3px 4px 1px rgba(0, 0, 0, 0.31);
	-webkit-box-shadow: 4px 3px 4px 1px rgba(0, 0, 0, 0.31);
	-moz-box-shadow: 4px 3px 4px 1px rgba(0, 0, 0, 0.31);
`;
function useForceUpdate() {
	const [value, setValue] = useState(0);
	return () => setValue((value) => value + 1);
}

const PersonalInfo = () => {
	const location = useLocation();
	const userId = location.pathname.split("/")[2];

	const [currentUser, setCurrentUser] = useState(null);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [gender, setGender] = useState("");
	const [contact, setContact] = useState(0);
	const [address, setAddress] = useState(null);
	const [isFetching, setIsFetching] = useState(false);

	const [edit, setEdit] = useState(false);

	const [firstNameError, setFirstNameError] = useState(false);
	const [lastNameError, setLastNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [contactError, setContactError] = useState(false);
	const [genderError, setGenderError] = useState(false);

	const forceUpdate = useForceUpdate();

	const addressRef = useRef(null);

	const validate = (address) => {
		let valid = true;
		if (firstName === "") {
			console.log("FirstName");
			setFirstNameError(true);
			valid = false;
		}
		if (lastName === "") {
			console.log("lastName");
			setLastNameError(true);
			valid = false;
		}
		if (email === "") {
			console.log("email");
			setEmailError(true);
			valid = false;
		}

		if (contact === "") {
			console.log("contact");

			setContactError(true);
			valid = false;
		}
		if (gender === "") {
			console.log("gender");

			setGenderError(true);
			valid = false;
		}

		if (!address) {
			console.log("address");
			valid = false;
		}

		return valid;
	};
	const handleChange = (e) => {
		setGender(e.target.value);
		setGenderError(false);
		console.log("STATE ::", gender);
	};

	const handleEditClick = (e) => {
		setEdit(!edit);
		if (edit) {
			setFirstName(currentUser.firstName);
			setLastName(currentUser.lastName);
			setEmail(currentUser.email);
			setGender(currentUser.gender);
			setContact(currentUser.contact);
			setAddress(currentUser.address);
		}
	};
	const handleUpdate = async (updateUserData) => {
		console.log(updateUserData);
		try {
			const res = await userRequest.put(`/users/${userId}`, updateUserData);
			setIsFetching(false);
			forceUpdate();
		} catch (error) {
			console.log("User Auth Error :", error);
			setIsFetching(false);
		}
	};

	const handleClick = async (e) => {
		e.preventDefault();
		setIsFetching(true);
		const updatedAddress = addressRef.current.getAddress();
		if (validate(address)) {
			try {
				handleUpdate({
					firstName,
					lastName,
					email,
					contact,
					gender,
					address: updatedAddress,
				});
				setEdit(false);
				setAddress(updatedAddress);
				forceUpdate();
			} catch (error) {
				console.log("User Auth Error :");
			}
		}
	};

	useEffect(() => {
		const getUser = async (id) => {
			const response = await userRequest.get("/users/find/" + id);
			console.log(response.data);
			setCurrentUser(response.data);
		};
		getUser(userId);
	}, [userId]);

	useEffect(() => {
		const populate = async (currentUser) => {
			setFirstName(currentUser.firstName);
			setLastName(currentUser.lastName);
			setEmail(currentUser.email);
			setGender(currentUser.gender);
			setContact(currentUser.contact);
			setAddress(currentUser.address);
		};
		currentUser && populate(currentUser);
	}, [currentUser]);

	///.......................

	///.......................
	return (
		<div style={{ flex: 6 }}>
			<Container>
				{currentUser && (
					<>
						<PersonalInfoContainer justifycontent="space-between">
							{!edit ? (
								<>
									<InfoContainer>
										<InfoTitle> First Name: </InfoTitle>
										<InfoDetail> {firstName} </InfoDetail>
									</InfoContainer>
									<InfoContainer>
										<InfoTitle> Last Name: </InfoTitle>
										<InfoDetail> {lastName} </InfoDetail>
									</InfoContainer>
									<InfoContainer>
										<InfoTitle> Email: </InfoTitle> <InfoDetail> {email} </InfoDetail>
									</InfoContainer>
								</>
							) : (
								<>
									<TextField
										required
										type="text"
										id="firstName"
										name="firstName"
										value={firstName}
										label="First Name"
										variant="standard"
										onChange={(e) => setFirstName(e.target.value)}
										error={firstNameError}
										onClick={(e) => {
											setFirstNameError(false);
										}}
									/>
									<TextField
										required
										type="text"
										id="standard-basic"
										label="Last Name"
										name="lastName"
										value={lastName}
										variant="standard"
										onChange={(e) => setLastName(e.target.value)}
										error={lastNameError}
										onClick={(e) => {
											setLastNameError(false);
										}}
									/>
									<TextField
										required
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
									/>
								</>
							)}
						</PersonalInfoContainer>
						<PersonalInfoContainer justifycontent="space-between">
							{!edit ? (
								<>
									<InfoContainer>
										<InfoTitle> Gender: </InfoTitle>
										<InfoDetail> {gender} </InfoDetail>
									</InfoContainer>
									<InfoContainer>
										<InfoTitle> Contact :</InfoTitle>
										<InfoDetail> 0{contact} </InfoDetail>
									</InfoContainer>
								</>
							) : (
								<>
									<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} error={genderError}>
										<InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
										<Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={gender} onChange={handleChange} label="Gender">
											<MenuItem value="">
												<em>Choose..</em>
											</MenuItem>
											<MenuItem value={"male"}>Male</MenuItem>
											<MenuItem value={"female"}>Female</MenuItem>
											<MenuItem value={"other"}>Other</MenuItem>
										</Select>
									</FormControl>
									<TextField
										required
										type="number"
										id="standard-basic"
										label="Contact"
										name="contact"
										value={contact}
										placeholder="+880"
										variant="standard"
										onChange={(e) => setContact(e.target.value)}
										error={contactError}
										onClick={(e) => {
											setContactError(false);
										}}
									/>{" "}
								</>
							)}
						</PersonalInfoContainer>

						{!edit ? (
							address && (
								<>
									<PersonalInfoContainer justifycontent="space-between">
										<InfoContainer>
											<InfoTitle> Address: </InfoTitle>
											<InfoDetail> {address.address} </InfoDetail>
										</InfoContainer>
									</PersonalInfoContainer>
									<PersonalInfoContainer justifycontent="space-between">
										<InfoContainer>
											<InfoTitle> City: </InfoTitle>
											<InfoDetail> {address.city} </InfoDetail>
										</InfoContainer>
										<InfoContainer>
											<InfoTitle> Area: </InfoTitle>
											<InfoDetail> {address.area} </InfoDetail>
										</InfoContainer>
										<InfoContainer>
											<InfoTitle> Zip-Code: </InfoTitle>
											<InfoDetail> {address.zip} </InfoDetail>
										</InfoContainer>
									</PersonalInfoContainer>
								</>
							)
						) : (
							<>
								<AddressInput address={address} ref={addressRef} disabled={!edit} />
							</>
						)}

						<ButtonContainer>
							<LoadingButton
								color={!edit ? "secondary" : "error"}
								onClick={handleEditClick}
								disabled={isFetching}
								loadingPosition="start"
								startIcon={!edit ? <EditIcon /> : <CloseIcon />}
								variant="contained"
							>
								{!edit ? "Edit" : "Cancel"}
							</LoadingButton>
							{edit && (
								<LoadingButton color="success" loading={isFetching} onClick={handleClick} loadingPosition="start" startIcon={<SaveIcon />} variant="contained">
									Update
								</LoadingButton>
							)}
						</ButtonContainer>
					</>
				)}
			</Container>
		</div>
	);
};

export default PersonalInfo;
