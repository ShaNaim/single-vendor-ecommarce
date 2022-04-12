import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, increaseProduct, decreaseProduct } from "../../redux/cartRedux";
import { useHistory } from "react-router";

import Cartitem from "../../components/CartItem";
import DisplayPoster from "../../components/DisplayPoster";
import OrderTypeModal from "../../components/OrderTypeModal";

import {
	Container,
	Wrapper,
	Title,
	Top,
	TopButton,
	TopTexts,
	TopText,
	Bottom,
	Info,
	Hr,
	Summary,
	SummaryTitle,
	SummaryItem,
	SummaryItemText,
	SummaryItemPrice,
	Button,
} from "./styledCart.jsx";
import { setTitle } from "../../customHooks";
import DeliveryCost from "../../components/DeliveryCost";

const Cart = () => {
	setTitle("Cart");
	const cart = useSelector((state) => state.cart);
	const defaultDelivery = 60;
	const defaultDiscount = 50;
	const history = useHistory();
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();
	const [deliveryType, setDeliveryType] = useState(60);
	const [total, setTotal] = useState(defaultDelivery - defaultDiscount);
	const [open, setOpen] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState("");

	const handleOpen = () => {
		if (user) {
			history.push("/checkout");
		} else {
			setOpen(true);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleFilters = (event) => {
		setDeliveryType(Number(event.target.value));
		setTotal(Number(event.target.value) - defaultDiscount);
	};

	const handleRemove = (e) => {
		console.log(e);
		dispatch(deleteProduct(e));
	};

	const handleDecriment = (item) => {
		const dublicateItem = cart.products.find((cartItem) => cartItem._id === item._id);
		console.log("CART ::", cart.products);
		if (dublicateItem) {
			dispatch(
				decreaseProduct({
					...dublicateItem,
					quantity: dublicateItem.quantity - 1,
				})
			);
		}
	};

	const handleIncriment = (item) => {
		console.log(item);
		const dublicateItem = cart.products.find((cartItem) => cartItem._id === item._id);
		if (dublicateItem) {
			dispatch(
				increaseProduct({
					...dublicateItem,
					quantity: dublicateItem.quantity + 1,
				})
			);
		}
	};

	return (
		<>
			<Container>
				<Wrapper>
					{cart.products.length === 0 ? (
						<DisplayPoster imagesrc="/images/empty_cart.png">Continue Shopping</DisplayPoster>
					) : (
						<>
							<Title>YOUR BAG {paymentMethod} </Title>
							<Top>
								<TopButton
									onClick={() => {
										history.goBack();
									}}
								>
									Continue Shopping
								</TopButton>
								<TopTexts>
									<TopText>Your Wishlist (0)</TopText>
								</TopTexts>
								<TopButton onClick={handleOpen} type="filled">
									CHECKOUT NOW
								</TopButton>
							</Top>
							<Bottom>
								<Info>
									{cart.products.map((product) => {
										return <Cartitem key={product._id} handleDecriment={handleDecriment} handleIncriment={handleIncriment} product={product} handleRemove={handleRemove} />;
									})}
									<Hr />
								</Info>
								<Summary>
									<SummaryTitle>ORDER SUMMARY</SummaryTitle>
									<SummaryItem>
										<SummaryItemText>Subtotal</SummaryItemText>
										<SummaryItemPrice>
											Tk
											{cart.total}
										</SummaryItemPrice>
									</SummaryItem>
									<div>
										<span className="d-block"> Shipping </span>
										<DeliveryCost handleChange={handleFilters} />
									</div>
									<SummaryItem>
										<SummaryItemText>Estimated Shipping </SummaryItemText>
										<SummaryItemPrice>Tk {deliveryType}</SummaryItemPrice>
									</SummaryItem>
									<SummaryItem>
										<SummaryItemText>Shipping Discount</SummaryItemText>
										<SummaryItemPrice>Tk -50</SummaryItemPrice>
									</SummaryItem>
									<SummaryItem type="total">
										<SummaryItemText>Total</SummaryItemText>
										<SummaryItemPrice>Tk {cart.total + total}</SummaryItemPrice>
									</SummaryItem>
									<Button onClick={handleOpen}> CHECKOUT NOW </Button>

									<OrderTypeModal handleClose={handleClose} open={open} handleOpen={handleOpen} />
								</Summary>
							</Bottom>
						</>
					)}
				</Wrapper>
			</Container>
		</>
	);
};

export default Cart;
