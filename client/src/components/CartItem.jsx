import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, increaseProduct, decreaseProduct } from "../redux/cartRedux";
// Component
import Productimage from "./ProductImage";
//.. UI
import { Add, Remove } from "@material-ui/icons";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product, ProductDetail, Details, ProductName, ProductAmount, ProductPrice, IconContainer, AmountContainer, RemoveButton, Amount, Price } from "./styledCartItem.jsx";

const Cartitem = ({ product }) => {
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	const handleRemove = (e) => {
		console.log(e);
		dispatch(deleteProduct(e));
	};

	const handleDecriment = (item) => {
		const dublicateItem = cart.products.find((cartItem) => cartItem._id === item._id);
		console.log(dublicateItem);
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
		console.log(cart.products);
	};
	return (
		<>
			<Product>
				<Productimage src={product.img} />
				<ProductDetail>
					<Details>
						<ProductName>{product.title}</ProductName>
						<ProductAmount>
							PRICE : <Price>{product.price}</Price> Tk
						</ProductAmount>
						<AmountContainer>
							<IconContainer>
								<Remove
									onClick={() => {
										handleDecriment(product);
									}}
								/>
							</IconContainer>
							<Amount>{product.quantity}</Amount>
							<IconContainer>
								<Add
									onClick={() => {
										handleIncriment(product);
									}}
								/>
							</IconContainer>
						</AmountContainer>
						<ProductPrice>{product.price && <Price> SUBTOTAL: {product.price * product.quantity} Tk</Price>}</ProductPrice>
					</Details>
				</ProductDetail>
				{/* <PriceDetail>
					<ProductAmountContainer> sdfsdf </ProductAmountContainer>
				</PriceDetail> */}

				<RemoveButton>
					<DeleteIcon
						onClick={() => {
							handleRemove(product);
						}}
					/>
				</RemoveButton>
			</Product>
		</>
	);
};

export default Cartitem;
