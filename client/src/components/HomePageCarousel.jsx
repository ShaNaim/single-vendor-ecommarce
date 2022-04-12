import React, { useEffect, useState } from "react";
import ProductCarousel from "./ProductCarousel";
import CarouselList from "./CarouselList";
import Heading from "./Heading";
import { getProduct } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Homepagecarousel = () => {
	const topics = [
		{ name: "Selling Fast", value: "anatomy" },
		{ name: "Recenty Added", value: "cardiology" },
	];
	const dispatch = useDispatch();
	const [product, setproduct] = useState(useSelector((state) => state.product.products));

	useEffect(() => {
		try {
			getProduct(dispatch);
		} catch (err) {
			console.log(err);
		}
	}, [dispatch]);

	return (
		<div>
			{topics.map((topic) => (
				<>
					THIS IS ME
					<Heading title={{ name: topic.name, value: topic.value }} />
					<ProductCarousel items={product} cat={topic.value} />
				</>
			))}
		</div>
	);
};

export default Homepagecarousel;
