import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/apiCalls";
import CarouselList from "./CarouselList";
import { publicRequest } from "../requestMethods";

const BasicTab = ({ cat }) => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.product.products);
	const [topic, setTopic] = useState([]);
	const category = cat;

	console.log("BASIC TAB:", cat);
	useEffect(() => {
		try {
			if (category) {
				getProduct(dispatch, category);
			} else {
				getProduct(dispatch);
			}
		} catch (err) {
			console.log(err);
		}
	}, [dispatch, category]);

	useEffect(() => {
		try {
			const getAllTopic = async () => {
				const res = await publicRequest.get(`/layout/topic`);
				console.log("DTA ::::", res.data);
				if (res.data) {
					setTopic(res.data);
				}
			};

			getAllTopic();
		} catch (error) {
			console.error(error);
		}
	}, [setTopic]);
	return (
		<div>
			<CarouselList
				topics={topic.map((topic) => topic.name)}
				filteredProducts={products}
			/>
		</div>
	);
};

export default BasicTab;
