import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
		isFetching: false,
		error: false,
		errorMessage: null,
		accessToken: null,
	},
	reducers: {
		loginStart: (state, action) => {
			state.isFetching = true;
			state.error = false;
		},
		loginSuccess: (state, action) => {
			console.log("loginSuccess :", action.payload);
			state.isFetching = false;
			state.currentUser = action.payload;
			state.accessToken = action.payload.accessToken;
		},
		loginFailure: (state, action) => {
			state.isFetching = false;
			state.error = true;
			state.currentUser = null;
			state.errorMessage = action.payload;
		},
		updateUserStart: (state, action) => {
			state.isFetching = true;
			state.error = false;
		},
		updateUserSuccess: (state, action) => {
			console.log("loginSuccess :", action.payload);
			state.isFetching = false;
			state.currentUser = action.payload;
		},
		updateUserFailure: (state, action) => {
			state.isFetching = false;
			state.error = true;
			state.errorMessage = action.payload;
		},
		logOutStart: (state, action) => {
			state.isFetching = true;
			state.error = false;
		},
		logOutSuccess: (state, action) => {
			console.log("logOutSuccess :", state);
			state.isFetching = false;
			storage.removeItem("persist:root");
			state.currentUser = undefined;
		},
		logOutFailure: (state) => {
			state.isFetching = false;
			state.error = true;
		},
		registerStart: (state) => {
			state.isFetching = true;
			state.error = false;
			state.errorMessage = null;
		},
		registerSuccess: (state, action) => {
			state.isFetching = false;
			state.currentUser = action.payload;
			state.accessToken = action.payload.accessToken;
		},
		registerFailure: (state, action) => {
			state.isFetching = false;
			state.error = true;
			state.currentUser = null;
			state.errorMessage = action.payload;
		},
	},
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	logOutStart,
	logOutSuccess,
	logOutFailure,
	registerStart,
	registerSuccess,
	registerFailure,
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
