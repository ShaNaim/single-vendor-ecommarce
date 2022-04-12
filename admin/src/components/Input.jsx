import React from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

const InputField = styled.div`
	display: flex;
	align-items: center;
`;

const Input = (props) => {
	return (
		<InputField>
			<TextField id="outlined-input" variant="outlined" {...props} />
		</InputField>
	);
};

export default Input;
