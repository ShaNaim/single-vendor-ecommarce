import React from "react";
import { setTitle } from "../customHooks";
//.. UI
import Newsletter from "../components/Newsletter";
import HomeSlider from "../components/HomeSlider";
import CategoryItem from "../components/CategoryItem";

const Home = () => {
	setTitle("Home");
	return (
		<div>
			<HomeSlider />
			<CategoryItem />
			<Newsletter />
		</div>
	);
};

export default Home;
