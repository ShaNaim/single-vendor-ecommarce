import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
	getProductFailure,
	getProductStart,
	getProductSuccess,
	deleteProductFailure,
	deleteProductStart,
	deleteProductSuccess,
	updateProductFailure,
	updateProductStart,
	updateProductSuccess,
	addProductFailure,
	addProductStart,
	addProductSuccess,
} from "./productRedux";

import {
	getOrderStart,
	getOrderSuccess,
	getOrderFailure,
	deleteOrderStart,
	deleteOrderSuccess,
	deleteOrderFailure,
	updateOrderStart,
	updateOrderSuccess,
	updateOrderFailure,
	addOrderStart,
	addOrderSuccess,
	addOrderFailure,
} from "./orderRedux";

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post("/auth/login", user);
		console.log(res.data);
		if (res.data.isAdmin === true) {
			dispatch(loginSuccess(res.data));
		} else {
			dispatch(loginFailure("You Are Not Authincated"));
		}
	} catch (err) {
		dispatch(loginFailure(err.response.data));
	}
};

export const authenticate = async (dispatch) => {
	dispatch(loginStart());
	try {
		const res = await userRequest.get("/auth/authenticate");
		if (res.status !== 200) {
			console.log("authenticate ::", res.data);
			dispatch(loginFailure("You Are Not Authincated"));
		}
	} catch (err) {
		console.log(err.response.data);
		dispatch(loginFailure(err.response.data));
	}
};

export const getProducts = async (dispatch) => {
	dispatch(getProductStart());
	try {
		const res = await publicRequest.get("/products");
		dispatch(getProductSuccess(res.data.products));
	} catch (err) {
		dispatch(getProductFailure());
	}
};

export const deleteProduct = async (id, dispatch) => {
	dispatch(deleteProductStart());
	try {
		const res = await userRequest.delete(`/products/${id}`);
		if (res) dispatch(deleteProductSuccess(id));
	} catch (err) {
		dispatch(deleteProductFailure());
	}
};

export const updateProduct = async (id, product, dispatch) => {
	dispatch(updateProductStart());
	try {
		// update
		dispatch(updateProductSuccess({ id, product }));
	} catch (err) {
		dispatch(updateProductFailure());
	}
};

export const addProduct = async (product, dispatch) => {
	dispatch(addProductStart());
	try {
		const res = await userRequest.post(`/products`, product);
		dispatch(addProductSuccess(res.data));
	} catch (err) {
		dispatch(addProductFailure());
	}
};

export const getAllOrders = async (dispatch) => {
	dispatch(getOrderStart());
	try {
		const res = await userRequest.get("orders");
		dispatch(getOrderSuccess(res.data));
		console.info(res.data);
	} catch (error) {
		dispatch(getOrderFailure());
	}
};

export const getOrderById = async (dispatch, id) => {
	dispatch(getOrderStart());
	try {
		const res = await userRequest.get(`orders/${id}`);
		dispatch(getOrderSuccess(res.data));
		console.info(res.data);
	} catch (error) {
		dispatch(getOrderFailure());
	}
};
