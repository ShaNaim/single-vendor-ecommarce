import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

import Categories from "../Category/Categories";

export default function Home() {
	return (
		<div className="home">
			<Categories />
			<div className="homeWidgets">
				<WidgetSm />
				<WidgetLg />
			</div>
		</div>
	);
}
