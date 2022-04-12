import React, { createRef } from "react";
import { SnackbarProvider } from "notistack";
import { Link } from "react-router-dom";
//.... UI
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { Row, Col, Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Navbar from "./components/Nav/Navbar";

export default function Layouts(props) {
	const notistackRef = createRef();
	const onClickDismiss = (key) => () => {
		notistackRef.current.closeSnackbar(key);
	};

	return (
		<>
			<SnackbarProvider
				ref={notistackRef}
				action={(key) => (
					<div>
						<Link className="text-light" to={`/cart`}>
							Viwe Cart
						</Link>
						<Button className="text-light" onClick={onClickDismiss(key)}>
							<CloseIcon />
						</Button>
					</div>
				)}
				maxSnack={4}
			>
				<Navbar user={props.user} />
				<Container fluid="md">
					<Row container direction="row">
						<Col lg={2}></Col>
						<Col item xs={12} sm={12} md={12} lg={9}>
							{props.children}
						</Col>
						<Col sm={2}></Col>
					</Row>
				</Container>
				<Footer />
			</SnackbarProvider>
		</>
	);
}
