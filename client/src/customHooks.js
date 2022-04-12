import { useState, useEffect } from "react";
import { addProduct, updateProduct } from "./redux/cartRedux";
import { useSelector, useDispatch } from "react-redux";
import {} from "react-redux";
function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

export function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}

function getMobile(limit) {
	const { width } = getWindowDimensions();
	if (width < limit) {
		return true;
	} else {
		return false;
	}
}

export function useMobile(limit) {
	const [isMobile, setisMobile] = useState(getMobile(limit));

	useEffect(() => {
		function handleResize() {
			setisMobile(getMobile(limit));
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [limit]);

	return isMobile;
}
export function setTitle(title) {
	document.title =
		"WhiteCoatBD - " + title.charAt(0).toUpperCase() + title.slice(1);
}

export function useValidator() {
	return (options = []) => {
		let result = true;
		if (options.length === 0) return false;
		options.forEach((option) => {
			if (option === false || option === "" || option === 0) {
				result = false;
			}
		});
		return result;
	};
}
