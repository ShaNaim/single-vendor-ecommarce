import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { default as Input } from "@mui/material/TextField";

const UserInput = styled(Input)`
	margin-bottom: 10px;
	${mobile({ width: "100%" })}
`;

const TextField = (props) => {
	return (
		<>
			<UserInput sx={{ mb: 2 }} {...props} />
		</>
	);
};

export default TextField;
