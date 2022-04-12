import React, { useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { setTitle } from "../customHooks";
//...
import Products from "./Products";
import Newsletter from "./Newsletter";
import Filtercontailer from "./FilterContailer";

//.....
const Container = styled.div``;

const Title = styled.h3`
	text-transform: capitalize;
	margin: 20px;
`;

const CategoryList = (props) => {
	const [filteredProducts, setFilteredProducts] = useState([]);
	const location = useLocation();
	const subCategory = props.cat ? props.cat : location.pathname.split("/")[2];
	setTitle(subCategory ? subCategory : "All Products");
	return (
		<>
			<Container>
				<Title className="text-capitalize">{subCategory}</Title>

				<Filtercontailer filterOptions={props.filters} setFilteredProducts={setFilteredProducts} category={subCategory}>
					<Products filteredProducts={filteredProducts} />
				</Filtercontailer>
				<Newsletter />
			</Container>
		</>
	);
};

export default CategoryList;
