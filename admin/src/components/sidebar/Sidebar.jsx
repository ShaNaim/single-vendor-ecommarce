import "./sidebar.css";
import { Link } from "react-router-dom";
import { LineStyle, PermIdentity, Storefront } from "@mui/icons-material";
import TableChartIcon from "@mui/icons-material/TableChart";
import MessageIcon from "@mui/icons-material/Message";
export default function Sidebar() {
	return (
		<div className="sidebar">
			<div className="sidebarWrapper">
				<div className="sidebarMenu">
					<h3 className="sidebarTitle">Dashboard</h3>
					<ul className="sidebarList">
						<Link to="/" className="link">
							<li className="sidebarListItem active">
								<LineStyle className="sidebarIcon" />
								Home
							</li>
						</Link>
					</ul>
				</div>

				<div className="sidebarMenu">
					<h3 className="sidebarTitle">Category</h3>
					<ul className="sidebarList">
						<Link to="/layouts/categories" className="link">
							<li className="sidebarListItem ">
								<TableChartIcon className="sidebarIcon" />
								Categories
							</li>
						</Link>
					</ul>
				</div>

				<div className="sidebarMenu">
					<h3 className="sidebarTitle">Quick Menu</h3>
					<ul className="sidebarList">
						<Link to="/users" className="link">
							<li className="sidebarListItem">
								<PermIdentity className="sidebarIcon" />
								Users
							</li>
						</Link>
						<Link to="/orders" className="link">
							<li className="sidebarListItem">
								<PermIdentity className="sidebarIcon" />
								Orders
							</li>
						</Link>
						<Link to="/products" className="link">
							<li className="sidebarListItem">
								<Storefront className="sidebarIcon" />
								ProductsList
							</li>
						</Link>
						<Link to="/newproduct" className="link">
							<li className="sidebarListItem">
								<Storefront className="sidebarIcon" />
								Add Products
							</li>
						</Link>
						<Link to="/messages" className="link">
							<li className="sidebarListItem">
								<MessageIcon className="sidebarIcon" />
								Messages
							</li>
						</Link>
					</ul>
				</div>
			</div>
		</div>
	);
}
