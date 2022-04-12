import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getUserOrders } from "../../redux/apiCalls";
import { setTitle } from "../../customHooks";
import PersonalInfo from "./PersonalInfo";
import Orderlist from "./OrderList";

function useForceUpdate() {
	const [value, setValue] = useState(0); // integer state
	console.log("FORCED");
	return () => setValue((value) => value + 1); // update the state to force render
}
const Profilepage = () => {
	setTitle("Profile");

	const user = useSelector((state) => state.user.currentUser);
	const order = useSelector((state) => state.order.orders);
	const { isFetching } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const forceUpdate = useForceUpdate();
	console.log(order);
	const handleUpdate = async (updateUserData) => {
		console.log(updateUserData);
		try {
			updateUser(dispatch, user._id, updateUserData);
			forceUpdate();
		} catch (error) {
			console.log("User Auth Error :", error);
		}
	};
	useEffect(() => {
		const getOrders = async (dispatch, id) => {
			await getUserOrders(dispatch, id);
		};
		try {
			getOrders(dispatch, user._id);
		} catch (error) {
			console.log("The FUCKING ERROR", error);
		}
	}, [dispatch, user]);
	return (
		<div>
			<div>
				<PersonalInfo user={user} isFetching={isFetching} handleUpdate={handleUpdate} />
			</div>

			<div>
				<Orderlist orders={order} />
			</div>
		</div>
	);
};

export default Profilepage;
