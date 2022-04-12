import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name, subCatagory, theme) {
	return {
		fontWeight:
			subCatagory.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function MultiSelect({
	label,
	subCatagory,
	setSubCatagory,
	options,
}) {
	const theme = useTheme();
	const handleSubCatagoryChange = (event) => {
		const {
			target: { value },
		} = event;
		setSubCatagory(typeof value === "string" ? value.split(",") : value);
	};

	return (
		<div>
			<FormControl sx={{ m: 2, width: 300 }}>
				<InputLabel id="multi-select-label">{label || "Category"}</InputLabel>
				<Select
					labelId="multi-select-label"
					id="multi-select"
					multiple
					value={subCatagory}
					onChange={handleSubCatagoryChange}
					input={
						<OutlinedInput
							id="select-multiple-chip"
							label={label || "Category"}
						/>
					}
					renderValue={(selected) => (
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
							{selected.map((value) => (
								<Chip key={value} label={value} />
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{options.map((topic, index) => (
						<MenuItem
							key={index}
							value={topic}
							style={getStyles(topic, subCatagory, theme)}
						>
							{topic}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
