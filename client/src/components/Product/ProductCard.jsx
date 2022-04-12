import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { addProduct, increaseProduct } from "../../redux/cartRedux";
import Productimage from "../ProductImage";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import {
	Card,
	Body,
	Title,
	Price,
	Description,
	Button,
} from "./styledProductCard.jsx";

function ProductCard({ item }) {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const [product, setProduct] = useState(item);
	const { enqueueSnackbar } = useSnackbar();
	const alert = (message, type, center) => {
		enqueueSnackbar(message, {
			variant: type,
			anchorOrigin: {
				vertical: center ? "top" : "bottom",
				horizontal: center ? "center" : "left",
			},
			TransitionComponent: Slide,
			autoHideDuration: 2000,
		});
	};
	const handleClick = () => {
		const dublicateItem = cart.products.find(
			(cartItem) => cartItem._id === item._id
		);
		console.log(dublicateItem);
		if (dublicateItem) {
			dispatch(
				increaseProduct({
					...dublicateItem,
					quantity: dublicateItem.quantity + 1,
				})
			);
			alert("Product Added", "success", true);
		} else {
			dispatch(addProduct({ ...product, quantity: 1 }));
			alert("Product Added", "success", true);
		}
	};
	return (
		<Card>
			<LinkContainer to={`/product/${item._id}`}>
				<Productimage src={item.img} />
			</LinkContainer>
			<Body>
				<Title>{item.title}</Title>
				<Price>{item.price}</Price>
			</Body>
			<Button onClick={handleClick}>ADD TO CART</Button>
		</Card>
	);
}

export default ProductCard;
