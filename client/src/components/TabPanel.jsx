import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import ProductList from "../pages/ProductList";

export default function PanelTabs(props) {
	const [value, setValue] = useState(props.default);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ p: 0, width: "100%" }}>
			<TabContext value={value}>
				<Box sx={{ p: 0, borderBottom: 1, borderColor: "divider" }}>
					<TabList onChange={handleChange} aria-label="Top Level Tab">
						{props.tabs.map((item, index) => {
							if (item.name) {
								return (
									<Tab
										key={index}
										className="text-capitalize"
										label={item.name}
										value={`${index}`}
									/>
								);
							}
						})}
					</TabList>
				</Box>
				{props.tabs.map((item, index) => {
					return (
						<>
							{item.filter ? (
								item.topics ? (
									<>
										<TabPanel
											key={index}
											sx={{ p: 0, width: "100%" }}
											value={`${index}`}
										>
											<ProductList
												key={index + item.name}
												carousel={true}
												topics={item.topics}
												filters={item.filter}
											/>
										</TabPanel>
									</>
								) : (
									<>
										<TabPanel
											key={index}
											sx={{ p: 0, width: "100%" }}
											value={`${index}`}
										>
											<ProductList
												key={index + item.name}
												filters={item.filter}
											/>
										</TabPanel>
									</>
								)
							) : (
								<>
									<TabPanel
										key={index}
										sx={{ p: 0, width: "100%" }}
										value={`${index}`}
									>
										<ProductList key={index + item.name} />
									</TabPanel>
								</>
							)}
						</>
					);
				})}
			</TabContext>
		</Box>
	);
}

// {item.filter ? (
// 	<>
// 		<TabPanel sx={{ p: 0, width: "100%" }} value={`"${index}"`}>
// 			{console.log("BASIC Construct")}
// 			<ProductList filters={item.filter} />
// 		</TabPanel>
// 	</>
// ) : (
// 	<>
// 		{console.log("BASIC TAB", item)}
// 		<TabPanel sx={{ p: 0, width: "100%" }} value={`"${index}"`}>
// 			{console.log("BASIC Construct")}
// 			<ProductList />
// 		</TabPanel>
// 	</>
// )}

// const ConstructTab = (props) => {
// 	const [value, setValue] = useState("1");
// 	console.log("CONSTRUCT");
// 	console.log("CONSTRUCT TAB :", props.tab);
// 	const handleChange = (event, newValue) => {
// 		setValue(newValue);
// 	};

// 	return (
// 		<Box sx={{ width: "100%", typography: "body1" }}>
// 			<TabContext value={value}>
// 				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
// 					<TabList onChange={handleChange} aria-label="Top Level Tab">
// 						{props.tab.map((item, index) => {
// 							console.log(`Construct TAB ${index} :`, item.tab);
// 							if (item.tab) {
// 								return <Tab label={item.tab} value={`"${index}"`} />;
// 							}
// 						})}
// 					</TabList>
// 				</Box>
// 				{props.tab.map((item, index) => {
// 					console.log(`Construct TABPANEL  ${index} :`, item);
// 					return (
// 						<>
// 							{item.tab ? (
// 								<>
// 									<TabPanel value={`"${index}"`}>
// 										{console.log("BASIC Construct")}
// 										<ConstructTab tab={item.data} />
// 									</TabPanel>
// 								</>
// 							) : (
// 								<>
// 									{console.log("BASIC TAB", item)}
// 									<BasicTab cat={item} />
// 								</>
// 							)}
// 						</>
// 					);
// 				})}
// 			</TabContext>
// 		</Box>
// 	);
// };
