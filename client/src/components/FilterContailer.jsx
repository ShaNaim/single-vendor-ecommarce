import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import FilterOptions from "./FilterOptions";
import { getProduct } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Filtercontailer = ({ category, setFilteredProducts, filterOptions, children }) => {
	const location = useLocation();
	const cat = category;

	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState("newest");

	const dispatch = useDispatch();
	const products = useSelector((state) => state.product.products);
	console.log(products);

	useEffect(() => {
		console.log(cat);
		try {
			if (cat) {
				getProduct(dispatch, cat);
			} else {
				getProduct(dispatch);
			}
		} catch (err) {
			console.log(err);
		}
	}, [dispatch, cat]);

	useEffect(() => {
		if (filters) {
			if (filters.categories === "all") {
				setFilteredProducts(products);
			} else {
				setFilteredProducts(
					products.filter((item) =>
						Object.entries(filters).every(
							([key, value]) => item[key].includes(value)
							//console.log("filters :", filters, "key : ", key, "value :", value)
						)
					)
				);
			}
		} else {
			setFilteredProducts(products);
		}
	}, [products, setFilteredProducts, filters]);

	useEffect(() => {
		if (sort === "newest") {
			setFilteredProducts((prev) => [...prev].sort((a, b) => b.createdAt - a.createdAt));
		} else if (sort === "asc") {
			setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
		} else {
			setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
		}
	}, [setFilteredProducts, sort]);

	const handleFilters = (e) => {
		const value = e.target.value;
		setFilters({
			...filters,
			[e.target.name]: value,
		});
	};

	return (
		<div>
			<FilterOptions handleFilters={handleFilters} filters={filterOptions} setSort={setSort} />

			{children}
		</div>
	);
};

export default Filtercontailer;
