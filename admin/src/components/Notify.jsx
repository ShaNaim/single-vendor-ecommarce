import React from "react";
import Button from "@mui/material/Button";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function MyApp() {
	const { enqueueSnackbar } = useSnackbar();

	const handleClick = () => {};

	return (
		<React.Fragment>
			<Button onClick={handleClick}>Show snackbar</Button>
		</React.Fragment>
	);
}
