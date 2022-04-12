import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import TextField from "../../components/TextField";
import styled from "styled-components";
import { mobile } from "../../responsive";

const PersonalInfoContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	${mobile({
		flexDirection: "column",
		mobileOn: "450px",
		alignItems: "flex-start",
	})};
`;

const AddressInput = forwardRef((props, ref) => {
	const [address, setAddress] = useState(props.address ? props.address.address : "");
	const [city, setCity] = useState(props.address ? props.address.city : "");
	const [area, setArea] = useState(props.address ? props.address.area : "");
	const [zip, setZip] = useState(props.address ? props.address.zip : "");

	const [addressError, setAddressError] = useState(false);
	const [cityError, setCityError] = useState(false);
	const [areaError, setAreaError] = useState(false);
	const [zipError, setZipError] = useState(false);

	const validate = () => {
		let valid = true;
		if (address === "") {
			setAddressError(true);
			valid = false;
		}
		if (city === "") {
			setCityError(true);
			valid = false;
		}
		if (area === "") {
			setAreaError(true);
			valid = false;
		}
		if (zip === "") {
			setZipError(true);
			valid = false;
		}
		return valid;
	};

	useImperativeHandle(ref, () => ({
		getAddress() {
			if (validate()) {
				return {
					address: address,
					city: city,
					area: area,
					zip: zip,
				};
			} else {
				return false;
			}
		},
	}));

	useEffect(() => {
		const setData = (address) => {
			setAddress(address.address);
			setCity(address.city);
			setArea(address.area);
			setZip(address.zip);
		};
		if (props.address) {
			setData(props.address);
		}
	}, [props.address]);

	return (
		<>
			<PersonalInfoContainer justifycontent="space-between">
				<TextField
					disabled={props.disabled}
					required
					sx={{ width: "100%", mb: "12px" }}
					type="text"
					id="standard-basic"
					label="Address"
					name="address"
					value={address}
					variant="standard"
					onChange={(e) => setAddress(e.target.value)}
					placeholder="street name / house no / flat no"
					error={addressError}
					onClick={(e) => {
						setAddressError(false);
					}}
				/>
			</PersonalInfoContainer>
			<PersonalInfoContainer justifycontent="space-between">
				<TextField
					disabled={props.disabled}
					required
					sx={{ width: "100%", mb: "12px" }}
					type="text"
					id="standard-basic"
					label="City"
					name="city"
					value={city}
					variant="standard"
					onChange={(e) => setCity(e.target.value)}
					error={cityError}
					onClick={(e) => {
						setCityError(false);
					}}
				/>
				<TextField
					disabled={props.disabled}
					required
					sx={{ width: "100%", mb: "12px" }}
					type="text"
					id="standard-basic"
					label="Area"
					name="area"
					value={area}
					variant="standard"
					onChange={(e) => setArea(e.target.value)}
					error={areaError}
					onClick={(e) => {
						setAreaError(false);
					}}
				/>
				<TextField
					disabled={props.disabled}
					required
					sx={{ width: "100%", mb: "12px" }}
					type="number"
					id="standard-basic"
					label="Zip Code"
					name="zip"
					value={zip}
					variant="standard"
					onChange={(e) => setZip(e.target.value)}
					error={zipError}
					onClick={(e) => {
						setZipError(false);
					}}
				/>
			</PersonalInfoContainer>
		</>
	);
});

export default AddressInput;
