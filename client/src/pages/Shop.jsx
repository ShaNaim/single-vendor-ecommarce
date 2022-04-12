import React from "react";
import TabPanel from "../components/TabPanel";
import { setTitle } from "../customHooks";

const tabs = [
	{
		name: "1st Prof",
		value: "first-prof",
		filter: [
			{ value: "all", name: "categories" },
			{ value: "book", name: "categories" },
			{ value: "guide", name: "categories" },
			{ value: "bundle", name: "categories" },
		],
		topics: ["anatomy", "physiology", "biochemistry"],
	},

	{
		name: "2nd Prof",
		value: "second-prof",
		filter: [
			{ value: "all", name: "categories" },
			{ value: "book", name: "categories" },
			{ value: "guide", name: "categories" },
			{ value: "bundle", name: "categories" },
		],
		topics: ["community medicine", "forensic medicine"],
	},
	{
		name: "3rd Prof",
		filter: [
			{ value: "all", name: "categories" },
			{ value: "book", name: "categories" },
			{ value: "guide", name: "categories" },
			{ value: "bundle", name: "categories" },
		],
		topics: ["microbiology", "pathology", "pharmacology"],
	},
	{
		name: "4th Prof",
		filter: [
			{ value: "all", name: "categories" },
			{ value: "guide", name: "categories" },
			{ value: "bundle", name: "categories" },
		],
		topics: ["surgery", "gynecology and obstetrics", "medicine"],
	},
	{
		name: "PostGred",
		filter: [
			{ value: "all", name: "categories" },
			{ value: "guide", name: "categories" },
			{ value: "bundle", name: "categories" },
		],
		topics: ["surgery", "gynecology and obstetrics", "medicine"],
	},
];

export default function Shop(props) {
	setTitle("Books");
	return (
		<>
			<TabPanel default={props.default} tabs={tabs} />
		</>
	);
}
