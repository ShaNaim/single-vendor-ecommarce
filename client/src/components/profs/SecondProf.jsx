import React from "react";
import BasicTab from "../BasicTab";
const Secondprof = () => {
	return (
		<div>
			<div>
				{["book", "guide", "anatomy"].map((cat) => {
					<BasicTab cat={cat} />;
				})}
			</div>
		</div>
	);
};

export default Secondprof;
