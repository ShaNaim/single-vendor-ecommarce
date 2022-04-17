import "./widgetSm.css";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { Visibility } from "@material-ui/icons";

export default function WidgetSm() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const res = await userRequest.get("users/?new=true");
				setUsers(res.data);
			} catch {}
		};
		getUsers();
	}, []);

	return (
		<div className="widgetSm">
			<span className="widgetSmTitle">New Join Members</span>
			<ul className="widgetSmList">
				{users.map((user) => (
					<li className="widgetSmListItem" key={user._id}>
						<div className="widgetSmUser">
							<span className="widgetSmUsername">{user.email}</span>
						</div>
						<button className="widgetSmButton">
							<Visibility className="widgetSmIcon" />
							Display
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
