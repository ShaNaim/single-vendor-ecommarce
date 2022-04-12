import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		quantity: 0,
		total: 0,
	},
	reducers: {
		addProduct: (state, action) => {
			state.quantity += 1;
			state.products.push(action.payload);
			state.total =
				state.total + action.payload.price * action.payload.quantity;
		},

		increaseProduct: (state, action) => {
			state.products = state.products.map((cartItem) => {
				if (cartItem._id === action.payload._id) {
					cartItem.quantity = action.payload.quantity;
				}
				return cartItem;
			});
			console.log("state.products Before::", state.products);
			console.log("state.total Before::", state.total);
			state.total = state.products
				.map((cartItem) => cartItem.price * cartItem.quantity)
				.reduce((previousValue, currentValue) => previousValue + currentValue);
		},

		deleteProduct: (state, action) => {
			state.products = state.products.filter(
				(item) => item._id !== action.payload._id
			);
			state.quantity -= 1;
			state.total =
				state.total - action.payload.price * action.payload.quantity;
		},

		decreaseProduct: (state, action) => {
			state.products = state.products.map((cartItem) => {
				if (cartItem._id === action.payload._id) {
					cartItem.quantity = action.payload.quantity;
				}
				return cartItem;
			});
			console.log("state.products Before::", state.products[0]);
			console.log("state.total Before::", state.total);
			state.total = state.products
				.map((cartItem) => cartItem.price * cartItem.quantity)
				.reduce((previousValue, currentValue) => currentValue - previousValue);
		},
		deleteCart: (state, action) => {},
	},
});

export const { addProduct, increaseProduct, deleteProduct, decreaseProduct } =
	cartSlice.actions;
export default cartSlice.reducer;
