import { useEffect, useState } from "react";
import { getProduct } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import ProductCard from "./Product/ProductCard";

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
`;
// { cat, filters, sort }
const Products = ({ filteredProducts }) => {
	return (
		<Container>
			{filteredProducts.map((item) => (
				<ProductCard item={item} key={item._id} />
			))}
		</Container>
	);
};

export default Products;
