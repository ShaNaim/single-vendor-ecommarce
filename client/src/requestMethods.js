import axios from "axios";
const BASE_URL = "http://localhost:8000/api/";
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
export const TOKEN = user && JSON.parse(user).accessToken;

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: { token: `Bearer ${TOKEN}` },
});
