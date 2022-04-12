import { useState } from "react";
import styled from "styled-components";
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setTitle } from "../../customHooks";
//.. UI
import Submitbutton from "../../components/SubmitButton";
import TextField from "@mui/material/TextField";
import { Container, Wrapper, Form, Title, ButtonContainer, RedirectLink } from "./styled";
//............................
const Error = styled.span`
	color: red;
`;

const Login = ({ noRedirect }) => {
	setTitle("Login");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [inputErrorMessage, setInputErrorMessage] = useState("");
	const history = useHistory();
	const dispatch = useDispatch();
	const { isFetching, error, errorMessage } = useSelector((state) => state.user);
	const [authError, setAuthError] = useState(error);
	console.log(password);
	const handleClick = async (e) => {
		e.preventDefault();
		await login(dispatch, { email, password });
		if (authError) {
			console.log("ERROR ::", error);
			setInputErrorMessage(errorMessage);
		} else {
			if (noRedirect) {
				history.push("/checkout");
			} else {
				console.log("ERROR 2::", error);
				history.push("/");
			}
		}
	};
	return (
		<Container>
			<Wrapper width="50%">
				<Form>
					<Title>SIGN IN</Title>
					<TextField className="mb-3 w-100" type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="standard-basic" label="Email" variant="standard" />
					<TextField
						className="mb-3 w-100"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						id="standard-basic"
						label="Password"
						variant="standard"
					/>
					<ButtonContainer>
						<Submitbutton onClick={handleClick} disabled={isFetching}>
							LOGIN
						</Submitbutton>
						{error && <Error>{inputErrorMessage} </Error>}
						<RedirectLink to="/register">CREATE A NEW ACCOUNT</RedirectLink>
					</ButtonContainer>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Login;
