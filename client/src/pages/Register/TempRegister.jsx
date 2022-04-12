import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { register } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Switch,
	useHistory,
	Redirect,
} from "react-router-dom";
const Tempregister = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [contact, setContact] = useState(0);
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [area, setArea] = useState("");
	const [Zip, setZip] = useState(0);

	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [contactError, setContactError] = useState(false);
	const [addressError, setAddressError] = useState(false);
	const [cityError, setCityError] = useState(false);
	const [areaError, setAreaError] = useState(false);
	const [ZipError, setZipError] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();

	const { isFetching, error } = useSelector((state) => state.user);

	const getAddress = () => {
		return { address: address, city: city, area: area, zip: Zip };
	};

	const validate = ({ email, password, contact, address }) => {
		let valid = true;
		if (email == "") {
			setEmailError(true);
			valid = false;
		}

		if (password == "") {
			setPasswordError(true);
			valid = false;
		}

		if (contact == "") {
			setContactError(true);
			valid = false;
		}

		if (address == "") {
			setAddressError(true);
			valid = false;
		}
		if (city == "") {
			setCityError(true);
			valid = false;
		}
		if (area == "") {
			setAreaError(true);
			valid = false;
		}
		return valid;
	};

	const handleClick = (e) => {
		e.preventDefault();
		const formatedAddress = getAddress();
		if (validate({ email, password, contact, address })) {
			console.log({ email, password, contact, address, formatedAddress });
			try {
				register(dispatch, { email, password, contact, formatedAddress });
				history.push("/");
			} catch (error) {
				console.log("User Auth Error :");
			}
		}
	};
	return (
		<div>
			<Form>
				<Row className="mb-3">
					<Form.Group as={Col} controlId="formGridEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							sm="6"
							placeholder="Enter email"
							required
							isInvalid={emailError}
							onClick={(e) => {
								setEmailError(false);
							}}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide your Email.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							placeholder="Password"
							isInvalid={passwordError}
							onClick={(e) => {
								setPasswordError(false);
							}}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a Password.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} controlId="formGridPassword">
						<Form.Label>Contact</Form.Label>
						<Form.Control
							onChange={(e) => setContact(Number(e.target.value))}
							type="number"
							placeholder="Contact"
							isInvalid={contactError}
							onClick={(e) => {
								setContactError(false);
							}}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide your Contact.
						</Form.Control.Feedback>
					</Form.Group>
				</Row>

				<Form.Group className="mb-3" controlId="formGridAddress1">
					<Form.Label>Address</Form.Label>
					<Form.Control
						onChange={(e) => setAddress(e.target.value)}
						placeholder="1234 Main St"
						isInvalid={addressError}
						onClick={(e) => {
							setAddressError(false);
						}}
					/>
					<Form.Control.Feedback type="invalid">
						Please provide your Address.
					</Form.Control.Feedback>
				</Form.Group>

				<Row className="mb-3">
					<Form.Group as={Col} controlId="formGridCity">
						<Form.Label>City</Form.Label>
						<Form.Control
							onChange={(e) => setCity(e.target.value)}
							isInvalid={cityError}
							onClick={(e) => {
								setCityError(false);
							}}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide your City.
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} controlId="formGridState">
						<Form.Label>Area</Form.Label>
						<Form.Select
							onChange={(e) => setArea(e.target.value)}
							isInvalid={areaError}
							onClick={(e) => {
								setAreaError(false);
							}}
							defaultValue="Choose..."
						>
							<option>Choose...</option>
							<option value="Dhaka Medical">Dhaka Medical</option>
							<option value="Shohid Soroardi Medical">
								Shohid Soroardi Medical
							</option>
							<option value="Rajshahi Medical">Rajshahi Medical</option>
							<option value="Chittagong Medical">Chittagong Medical</option>
							<option value="Khulna Medical">Khulna Medical</option>
						</Form.Select>
						<Form.Control.Feedback type="invalid">
							Please provide your Area Details
						</Form.Control.Feedback>
					</Form.Group>

					<Form.Group as={Col} controlId="formGridZip">
						<Form.Label>Zip</Form.Label>
						<Form.Control
							onChange={(e) => setZip(e.target.value)}
							isInvalid={ZipError}
							onClick={(e) => {
								setZipError(false);
							}}
						/>
						<Form.Control.Feedback type="invalid">
							Please provide your Zip Code.
						</Form.Control.Feedback>
					</Form.Group>
				</Row>

				<Button variant="primary" type="submit" onClick={handleClick}>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default Tempregister;
