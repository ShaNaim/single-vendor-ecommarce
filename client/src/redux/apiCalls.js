import {
	loginFailure,
	loginStart,
	loginSuccess,
	logOutStart,
	logOutSuccess,
	logOutFailure,
	registerStart,
	registerSuccess,
	registerFailure,
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
} from "./userRedux";

import { getProductStart, getProductSuccess, getProductFailure } from "./productRedux";

import {
	getOrderStart,
	getOrderSuccess,
	getOrderFailure,
	updateOrderStart,
	updateOrderSuccess,
	updateOrderFailure,
	createOrderStart,
	createOrderSuccess,
	createOrderFailure,
} from "./orderRedux";

import { publicRequest, userRequest } from "../requestMethods";

export const createOrder = async (dispatch, order) => {
	console.log("something in createOrder");
	dispatch(createOrderStart());
	try {
		const res = await userRequest.post("/orders/", order);
		console.log(res.data);
		dispatch(createOrderSuccess(res.data));
	} catch (err) {
		console.error(err);
		dispatch(createOrderFailure());
	}
};

export const getUserOrders = async (dispatch, id) => {
	dispatch(getOrderStart());
	try {
		const res = await userRequest.get(`/orders/find/${id}`);
		dispatch(getOrderSuccess(res.data));
	} catch (err) {
		console.error(err);
		dispatch(getOrderFailure());
	}
};

export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		console.log(user);
		const res = await publicRequest.post("/auth/login", user);
		dispatch(loginSuccess(res.data));
	} catch (err) {
		console.log("err.response.data", err.response.data);
		dispatch(loginFailure(err.response.data));
	}
};

export const logOut = async (dispatch) => {
	dispatch(logOutStart());
	try {
		dispatch(logOutSuccess());
	} catch {
		dispatch(logOutFailure());
	}
};

export const register = async (dispatch, user) => {
	dispatch(registerStart());
	try {
		const res = await publicRequest.post("/auth/register", user);
		dispatch(registerSuccess(res.data));
		console.log("fetching Done");
	} catch (err) {
		console.log(err.response.data);
		await dispatch(registerFailure(err.response.data));
	}
};

export const registerGuest = async (dispatch, user) => {
	dispatch(registerStart());
	try {
		const res = await publicRequest.post("/auth/register", user);
		return res.data;
	} catch (err) {
		console.log(err.response.data);
		await dispatch(registerFailure(err.response.data));
	}
};

export const updateUser = async (dispatch, id, user) => {
	dispatch(updateUserStart());
	try {
		const res = await userRequest.put(`/users/${id}`, user);
		console.log(res);
		dispatch(updateUserSuccess(res.data));
	} catch (err) {
		console.error(err);
		dispatch(updateUserFailure());
	}
};

export const getProduct = async (dispatch, cat) => {
	dispatch(getProductStart());
	try {
		if (cat) {
			const res = await publicRequest.get(`/products?category=${cat}`);
			console.log(res.data);
			dispatch(getProductSuccess(res.data));
		} else {
			const res = await publicRequest.get("/products");
			dispatch(getProductSuccess(res.data));
		}
	} catch (err) {
		console.log(err);
		dispatch(getProductFailure());
	}
};
