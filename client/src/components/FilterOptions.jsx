import React from "react";

// UI
import { mobile } from "../responsive";
import Checked from "./Checked";
import styled from "styled-components";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
//
const Wrapper = styled.div`
	font-size: 14px;
	display: flex;
	flex-direction: row;
	${mobile({
		flexDirection: "column",
	})}

	justify-content: space-between;
`;

const Filter = styled.div`
	${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const typefilters = [
	{ value: "all", name: "categories" },
	{ value: "book", name: "categories" },
	{ value: "guide", name: "categories" },
	{ value: "statiscope", name: "categories" },
	{ value: "gifts", name: "categories" },
];

const FilterOptions = ({ setSort, handleFilters, filters, sorts }) => {
	const filtersList = filters ? filters : typefilters;
	return (
		<Wrapper>
			<Filter>
				<RadioGroup
					defaultValue="all"
					row
					aria-label="filter-products"
					name="row-radio-buttons-group"
				>
					{filtersList.map((filter, index) => (
						<Checked
							key={index}
							value={filter.value}
							label={filter.value === "book" ? "text-book" : filter.value}
							name={filter.name}
							onClick={handleFilters}
						/>
					))}
				</RadioGroup>
			</Filter>
			<Filter>
				<FormControl variant="standard" sx={{ minWidth: 110 }}>
					<InputLabel id="product-sort">Sort</InputLabel>
					<Select
						labelId="product-sort"
						defaultValue={"newest"}
						onChange={(e) => setSort(e.target.value)}
					>
						<MenuItem value="newest">Newest</MenuItem>
						<MenuItem value="asc">Price (Lowest)</MenuItem>
						<MenuItem value="desc">Price (Highest)</MenuItem>
					</Select>
				</FormControl>
			</Filter>
		</Wrapper>
	);
};

export default FilterOptions;
