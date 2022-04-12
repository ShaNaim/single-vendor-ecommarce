import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ItemSelect({ options, category, handleSelectChange }) {
	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 300 }}>
				<InputLabel id="demo-simple-select-helper-label">Catagory</InputLabel>
				<Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={category} label="Catagory" onChange={handleSelectChange}>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					{options.map((category, index) => (
						<MenuItem key={index} value={category.name}>
							{category.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
