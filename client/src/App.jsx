import React from "react";
import "./app.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import Layouts from "./Layouts";

const App = () => {
	const user = useSelector((state) => state.user.currentUser);
	return (
		<Router>
			<Layouts user={user}>
				<Routes user={user} />
			</Layouts>
		</Router>
	);
};

export default App;
