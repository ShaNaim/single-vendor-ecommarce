import React, { useState, useEffect } from "react";
import { userRequest } from "../requestMethods";

//UI
import Input from "../components/Input";
import styled from "styled-components";
import Topic from "../components/Topic";
import MultiSelect from "../components/select/MultiSelect";
import ItemSelect from "../components/select/ItemSelect";

import Stack from "@mui/material/Stack";
const Container = styled.div`
	flex: 6;
	display: flex;
	font-size: 12px;
	flex-direction: column;
`;
const Wrapper = styled.div`
	padding: 20px;
`;

// {
// 	name: "1st Prof",
// 	value: "first-prof",
// 	filter: [
// 		{ value: "all", name: "categories" },
// 		{ value: "book", name: "categories" },
// 		{ value: "guide", name: "categories" },
// 		{ value: "bundle", name: "categories" },
// 	],
// 	topics: ["anatomy", "physiology", "biochemistry"],
// },
const Tabs = () => {
	const [inputValue, setInputValue] = useState({});
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState([]);
	const [subCatagory, setSubCatagory] = useState([]);

	const handleChange = (e) => {
		console.log(inputValue);
		setInputValue((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
		console.log(inputValue);
	};

	const handleCategoryChange = (event) => {
		console.log(event.target.value);
		const cat = categories.find((cat) => cat._id === event.target.value);
		console.log(cat.mainCategory);
		//setCategory(cat.mainCategory);
		setSubCatagory(cat.subCategories);
	};

	useEffect(() => {
		try {
			const getAllCategories = async () => {
				const res = await userRequest.get(`/layout/category`);

				if (res.data) {
					setCategories(res.data);
				}
			};
			getAllCategories();
		} catch (error) {
			console.error(error);
		}
	}, []);
	return (
		<Container>
			<Wrapper>
				<Stack
					direction="row"
					justifyContent="flex-start"
					alignItems="center"
					spacing={3}
				>
					<Input name="name" label="Tab Name" onChange={handleChange} />
					<ItemSelect
						options={categories}
						value={category}
						handleSelectChange={handleCategoryChange}
					/>

					{/* <MultiSelect
						label="Sub Category"
						subCatagory={subCatagory}
						setSubCatagory={setSubCatagory}
						options={category.map((item) => item.mainCategory)}
						disabled
					/>
					<Input name="topics" label="Topics" onChange={handleChange} />
					<Input name="filter" label="Filters" onChange={handleChange} /> */}
				</Stack>
			</Wrapper>
			<Wrapper>
				{subCatagory !== [] ? (
					<div
						style={{
							border: "1px solid grey",
							maxWidth: "550px",
						}}
					>
						{subCatagory.map((topic, index) => {
							return (
								<Topic
									name="mainCategory"
									catId={index}
									className="m-1"
									key={index}
									label={topic}
								/>
							);
						})}
					</div>
				) : (
					""
				)}
			</Wrapper>
		</Container>
	);
};

export default Tabs;
