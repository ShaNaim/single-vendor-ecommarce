import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/apiCalls";

const Login = () => {
	const history = useHistory();
	const { currentUser, error, errorMessage } = useSelector((state) => state.user);
	if (currentUser) {
		history.push("/");
	}
	const [email, setemail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const [inputErrorMessage, setInputErrorMessage] = useState("");

	const handleClick = async (e) => {
		e.preventDefault();
		await login(dispatch, { email, password });
		if (error) {
			console.log("ERROR ::", error);
			setInputErrorMessage(errorMessage);
		} else {
			console.log("ERROR 2::", error);
			history.push("/");
		}
	};

	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					border: "2px solid grey",
					padding: "20px",
				}}
			>
				<span style={{ fontSize: 24, color: "#352d2d", marginBottom: 10 }}>Welcome to Tennis Shop Admin</span>
				<input style={{ padding: 10, marginBottom: 20 }} type="text" placeholder="email" onChange={(e) => setemail(e.target.value)} />
				<input style={{ padding: 10, marginBottom: 20 }} type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />

				<button onClick={handleClick} style={{ padding: 10, width: 100 }}>
					Login
				</button>
				<span style={{ fontSize: 14, color: "tomato", marginTop: 10 }}>{inputErrorMessage}</span>
			</div>
		</div>
	);
};

export default Login;
