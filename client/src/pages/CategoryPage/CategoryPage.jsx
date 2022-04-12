import React, { useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { setTitle } from "../../customHooks";
//...
import Shop from "../Shop";
import Products from "../../components/Products";
import Newsletter from "../../components/Newsletter";
import Filtercontailer from "../../components/FilterContailer";
import CarouselList from "../../components/CarouselList";

//.....
const Container = styled.div``;

const Title = styled.h3`
	text-transform: capitalize;
	margin: 20px;
`;

const Categorypage = ({ isCarousel = false, cat = null, filters }) => {
	const [filteredProducts, setFilteredProducts] = useState([]);
	const location = useLocation();

	const [carousel, setCarousel] = useState(isCarousel);
	const [topics, setTopics] = useState([]);

	const mainCategory = cat ? cat : location.pathname.split("/")[2];
	const subCategory = cat ? cat : location.pathname.split("/")[3];

	setTitle(subCategory ? subCategory : "All Products");
	return (
		<>
			{subCategory === "book" ? (
				<Shop default="0" />
			) : (
				<Container>
					<Title className="text-capitalize">{subCategory}</Title>
					{mainCategory}
					<Filtercontailer filterOptions={filters} setFilteredProducts={setFilteredProducts} category={subCategory}>
						{carousel ? <CarouselList topics={topics} filteredProducts={filteredProducts} /> : <Products filteredProducts={filteredProducts} />}
					</Filtercontailer>
					<Newsletter />
				</Container>
			)}
		</>
	);
};

export default Categorypage;
