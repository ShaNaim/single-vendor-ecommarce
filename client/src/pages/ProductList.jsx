import React, { useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
//..... UI
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Filtercontailer from "../components/FilterContailer";
//.....
const Container = styled.div``;

const Title = styled.h2`
	margin: 20px;
`;

const ProductList = (props) => {
	const [filteredProducts, setFilteredProducts] = useState([]);
	const location = useLocation();
	const cat = props.cat ? props.cat : location.pathname.split("/")[2];
	const cat2 = props.cat ? props.cat : location.pathname.split("/")[3];
	console.log(cat);
	console.log(cat2);
	return (
		<Container>
			<Title className="text-capitalize">{cat2 ? "" : cat}</Title>
			<Filtercontailer filterOptions={props.filters} setFilteredProducts={setFilteredProducts} category={cat}>
				<Products filteredProducts={filteredProducts} />
			</Filtercontailer>
			<Newsletter />
		</Container>
	);
};

export default ProductList;
