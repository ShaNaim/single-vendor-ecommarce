import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
	name: "orders",
	initialState: {
		orders: [],
		isFetching: false,
		error: false,
	},
	reducers: {
		//GET ALL

		createOrderStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		createOrderSuccess: (state, action) => {
			state.isFetching = false;
			state.orders.push(action.payload);
		},
		createOrderFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		getOrderStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		getOrderSuccess: (state, action) => {
			state.isFetching = false;
			state.orders = action.payload;
		},
		getOrderFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		updateOrderStart: (state) => {
			state.isFetching = true;
			state.error = false;
		},
		updateOrderSuccess: (state, action) => {
			state.isFetching = false;
			state.orders = action.payload;
		},
		updateOrderFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
	},
});

export const {
	getOrderStart,
	getOrderSuccess,
	getOrderFailure,
	updateOrderStart,
	updateOrderSuccess,
	updateOrderFailure,
	createOrderStart,
	createOrderSuccess,
	createOrderFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
