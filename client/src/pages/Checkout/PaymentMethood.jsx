import React from "react";
// UI
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ImageSelect } from "./StyledCheckout";

export default function PaymentMethood({ setPaymentMethod }) {
	const [value, setValue] = React.useState("visa");

	const handleChange = (event) => {
		setValue(event.target.value);
		setPaymentMethod(event.target.value);
	};

	return (
		<>
			<FormControl>
				<RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="visa" name="radio-buttons-group" onChange={handleChange}>
					<FormControlLabel
						value="visa"
						control={<Radio />}
						label={
							<div className="text-danger">
								<ImageSelect src="images/visa.jpg" alt="" /> Visa
							</div>
						}
					/>
					<FormControlLabel
						value="master-card"
						control={<Radio />}
						label={
							<div className="text-danger">
								<ImageSelect src="images\master-card.jpg" alt="" /> Master Card
							</div>
						}
					/>
					<FormControlLabel
						value="paypal"
						control={<Radio />}
						label={
							<div className="text-danger">
								<ImageSelect src="images\paypal.png" alt="" /> PayPal
							</div>
						}
					/>
					<FormControlLabel
						value="american-express"
						control={<Radio />}
						label={
							<div className="text-danger">
								<ImageSelect src="images\americal-express.jpg" alt="" /> Americal Express
							</div>
						}
					/>
				</RadioGroup>
			</FormControl>
		</>
	);
}
