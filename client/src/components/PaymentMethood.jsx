import React from "react";
// UI
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function PaymentMethood({ setPaymentMethod }) {
	const [value, setValue] = React.useState("COD");
	const handleChange = (event) => {
		setValue(event.target.value);
		setPaymentMethod(event.target.value);
	};
	return (
		<>
			<FormControl>
				<RadioGroup aria-labelledby="payment-method-radio-group" name="payment-method-radio-group" value={value} onChange={handleChange}>
					<FormControlLabel value="Cash on Delivery" control={<Radio />} label="COD" />
					<FormControlLabel value="Online Payment" control={<Radio />} label="Online Payment" />
				</RadioGroup>
			</FormControl>
		</>
	);
}
