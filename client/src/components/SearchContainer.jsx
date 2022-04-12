import React, { useState } from "react";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as BoltIcon } from "./icons/searchIcon.svg";
import { mobile } from "../responsive";
const SearchIcon = styled(BoltIcon)`
	width: 25px;
	height: 25px;
`;

const Form = styled.form`
	flex: 1;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	margin-left: 10px;
	${mobile({
		marginLeft: 0,
		paddingLeft: 10,
		paddingright: 10,
		marginTop: 4,
		backgroundColor: "#9575cd",
		width: "100%",
	})}
`;

const SearchField = styled.input`
	width: 100%;
	height: 30px;
	box-sizing: border-box;
	border: 2px solid #9c27b0;
	border-radius: 10px;
	outline: none;
	padding: 12px 20px 12px 46px;
	font-size: 18px;
	background-color: white;
	background-image: url("/images/searchIcon.png");
	background-position: 5px 1px;
	background-repeat: no-repeat;
	transition: height 0.4s ease-in-out, background-position 0.4s ease-in-out;
	:focus {
		height: 40px;
		background-position: 10px 6px;
	}
	${mobile({ width: "80%" })}
`;

const Searchcontainer = () => {
	const [input, setInput] = useState("");
	const handleClick = () => {};
	return (
		<Form>
			<SearchField onChange={(e) => setInput(e.target.value)} value={input} />
			<IconButton size="small" color="secondary" aria-label="search">
				<SearchIcon />
			</IconButton>
		</Form>
	);
};

export default Searchcontainer;
