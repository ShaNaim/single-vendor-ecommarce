import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { getAllOrders } from "../../redux/apiCalls";
import "./widgetLg.css";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
export default function WidgetLg() {
	// const [orders, setOrders] = useState([]);
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.order.orders);

	useEffect(() => {
		const getOrders = async (dispatch) => {
			await getAllOrders(dispatch);
		};
		getOrders(dispatch);
	}, [dispatch]);

	const Button = ({ type }) => {
		return <button className={"widgetLgButton " + type}>{type}</button>;
	};
	return (
		<div className="widgetLg">
			<h3 className="widgetLgTitle">Latest transactions</h3>
			<table className="widgetLgTable">
				<tr className="widgetLgTr">
					<th className="widgetLgTh">Customer</th>
					<th className="widgetLgTh">Date</th>
					<th className="widgetLgTh">Amount</th>
					<th className="widgetLgTh">Status</th>
				</tr>
				{orders.map((order) => (
					<tr className="widgetLgTr" key={order._id}>
						<td className="widgetLgUser">
							<span className="widgetLgName">{order.userId}</span>
						</td>
						<td className="widgetLgDate">{format(order.createdAt)}</td>
						<td className="widgetLgAmount">{order.amount}tk</td>
						<td className="widgetLgStatus">
							<Button type={order.status} />
						</td>
					</tr>
				))}
			</table>
		</div>
	);
}
