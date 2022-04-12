import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "#e2f8f8",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function StatusModal({ handleClose, open, setStatus, status }) {
	const handleChange = (event) => {
		console.log(event.target.value);
		console.log(status);
		setStatus(event.target.value);
	};
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<InputLabel id="demo-simple-select-label">Choose</InputLabel>

						<Select
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							value={status}
							label="Status"
							onChange={handleChange}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={"pending"}>pending</MenuItem>
							<MenuItem value={"processing"}>processing</MenuItem>
							<MenuItem value={"on-the-way"}>on-the-way</MenuItem>
							<MenuItem value={"delivery-failed"}>Delivery Failed</MenuItem>
							<MenuItem value={"complete"}>complete</MenuItem>
							<MenuItem value={"cancelled"}>cancelled</MenuItem>
						</Select>
						<Button
							sx={{ mt: 5 }}
							color="success"
							variant="outlined"
							startIcon={<SaveIcon />}
							onClick={handleClose}
						>
							Change
						</Button>
					</FormControl>
				</Box>
			</Modal>
		</div>
	);
}
