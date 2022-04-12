import React, { useState } from "react";
import { TextField } from "@mui/material";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import {
	Container,
	Wrapper,
	WrapperLabel,
	IconWrapper,
} from "../Category/StyledCategory";

const Input = styled(TextField)`
	margin: 20px;
	width: 8rem;
`;

const SectionTitle = styled.span`
	font-size: 24px;
	margin-bottom: 8px;
	padding-bottom: 4px;
	border-bottom: 1px solid #df21d5;
`;
const DiscountLabel = styled.span`
	font-size: 18px;
	margin: 8px;
`;

const Config = () => {
	const [inputValue, setInputValue] = useState({});
	const handleChange = (e) => {
		setInputValue((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};
	const addNewCategory = (e) => {
		console.log(inputValue);
	};
	return (
		<Container>
			<SectionTitle> Delivery Config </SectionTitle>
			<div>
				<WrapperLabel>Delivery Discount</WrapperLabel>
				<Wrapper>
					<Input
						type="number"
						onChange={handleChange}
						name="deliveryDiscount"
						id="config-discount"
						label="Discount"
						variant="standard"
					/>
					<DiscountLabel> {inputValue.deliveryDiscount} </DiscountLabel>
				</Wrapper>
				<WrapperLabel>Delivery Type</WrapperLabel>
				<Wrapper>
					<Input
						onChange={handleChange}
						name="deliveryTypeName"
						id="config-delivery-type"
						label="Name"
						variant="standard"
					/>
					<Input
						onChange={handleChange}
						name="deliveryTypeValue"
						id="standard-basic"
						label="Cost"
						variant="standard"
					/>
					<IconWrapper width="40px" color={["#2d819b", "#9bd7db"]}>
						<IconButton
							onClick={addNewCategory}
							color="inherit"
							aria-label="Add Category"
						>
							<AddIcon />
						</IconButton>
					</IconWrapper>
					<DiscountLabel> {inputValue.deliveryDiscount} </DiscountLabel>
					<DiscountLabel> {inputValue.deliveryDiscount} </DiscountLabel>
				</Wrapper>
			</div>
		</Container>
	);
};

export default Config;
