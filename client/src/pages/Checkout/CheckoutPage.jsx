import React, { useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import { useValidator } from "../../customHooks";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createOrder } from "../../redux/apiCalls";
import { useHistory } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
// Components
import PaymentModal from "../../components/PaymentModal";
import TextField from "../../components/TextField";
import AddressInput from "../Register/AddressInput";
import Cartconfirmdetail from "../../components/CartConfirmDetail";
import DeliveryCost from "../../components/DeliveryCost";
import PaymentMethood from "./PaymentMethood";
// UI

import { Top, Bottom, Info, Summary, SummaryItem, Button, Payment } from "./StyledCheckout";

const formateCart = (order) => {
	console.log("ORDER ::", order);
	const products = [];
	order.products.forEach((item) => {
		products.push({
			productId: item._id,
			quantity: item.quantity,
		});
	});
	return products;
};

export default function CheckoutPage() {
	const cart = useSelector((state) => state.cart);
	const { currentUser, error, errorMessage } = useSelector((state) => state.user);

	const defaultDiscount = 0;
	const defaultDelivery = 60;
	const taxPercentage = 3;
	const [firstName, setFirstName] = useState(currentUser ? currentUser.firstName : "");
	const [email, setEmail] = useState(currentUser ? currentUser.email : "");
	const [name, setName] = useState(false);
	const [tax, setTax] = useState((cart.total * taxPercentage) / 100);
	const [contact, setContact] = useState(currentUser ? currentUser.contact : "");
	const [deliveryAddress, setDeliveryAddress] = useState(currentUser ? currentUser.address : "");

	const [paymentMethod, setPaymentMethod] = useState("");
	const [deliveryCost, setDeliveryCost] = useState(defaultDelivery);
	const [total, setTotal] = useState(defaultDelivery - defaultDiscount);
	const billingAddressRef = useRef(null);
	const deliveryAddressRef = useRef(null);
	const [openPaymentModal, setOpenPaymentModal] = useState(false);

	const [guestUser, setGuestUser] = useState({});

	const [inputErrorMessage, setInputErrorMessage] = useState("");
	const [firstNameError, setFirstNameError] = useState(false);
	const [contactError, setContactError] = useState(false);
	const [emailError, setEmailError] = useState(false);

	const history = useHistory();

	const validateInput = useValidator();
	const dispatch = useDispatch();

	const handleFilters = (event) => {
		setDeliveryCost(Number(event.target.value));
		setTotal(Number(event.target.value) - defaultDiscount);
	};

	const handelSubmit = async (event) => {
		event.preventDefault();
		try {
			if (currentUser) {
				setGuestUser(currentUser);
				setOpenPaymentModal(true);
			} else {
				const billingAddress = billingAddressRef.current.getAddress();
				const deliveryAddress = deliveryAddressRef.current.getAddress();
				const contactNumber = Number(contact);
				console.log({
					contactNumber,
					firstName,
					email,
					billingAddress,
					deliveryAddress,
				});
				if (validateInput([contactNumber, firstName, email, billingAddress, deliveryAddress])) {
					const res = await publicRequest.post("/auth/register", {
						contact: contactNumber,
						firstName,
						email,
						address: billingAddress,
						password: contact,
					});
					console.log(res.status);
					if (res.status === 201) {
						setInputErrorMessage("");
						setOpenPaymentModal(true);
						setGuestUser(res.data);
					}
				} else {
					setInputErrorMessage("Please Provide Information");
				}
			}
		} catch (error) {
			console.log(error.response.status);
			if (error.response.status === 500 && error.response) {
				if (error.response?.data.email) {
					console.log(error.response?.data.email);
					setInputErrorMessage(error.response?.data.email);
				}
				if (error.response?.data.contact) {
					setInputErrorMessage(error.response?.data.contact);
				}
			} else {
				setInputErrorMessage("");
			}
		}
	};

	const handleClick = async () => {
		try {
			await createOrder(dispatch, {
				userId: guestUser._id,
				products: formateCart(cart),
				amount: cart.total + tax,
				address: guestUser.address,
				deliveryCost: deliveryCost,
				contactNumber: guestUser.contact,
				paymentMethod: paymentMethod,
			});
			history.push("/success", {
				user: guestUser,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<Top>
				<span className="text-danger"> {inputErrorMessage} </span>
				{/* <ErrorMessage message={inputErrorMessage} /> */}
			</Top>
			<Bottom>
				<Info className="p-3 me-3">
					<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3} sx={{ width: "100%" }}>
						<TextField
							required
							type="text"
							id="firstName"
							name="firstName"
							label="Name"
							value={firstName}
							variant="standard"
							onChange={(e) => setFirstName(e.target.value)}
							error={firstNameError}
							onClick={(e) => {
								setFirstNameError(false);
							}}
						/>
						<TextField
							required
							type="text"
							id="standard-basic"
							label="Contact"
							name="contact"
							value={contact}
							placeholder="+880"
							variant="standard"
							onChange={(e) => setContact(e.target.value)}
							error={contactError}
							onClick={(e) => {
								setContactError(false);
							}}
						/>
					</Stack>
					<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3} sx={{ width: "100%" }}>
						<TextField
							required
							sx={{ width: "100%" }}
							type="email"
							id="standard-basic"
							label="Email"
							name="email"
							value={email}
							variant="standard"
							onChange={(e) => setEmail(e.target.value)}
							error={emailError}
							onClick={(e) => {
								setEmailError(false);
							}}
						/>
					</Stack>

					<div>
						<div className="mt-4">
							<span className="fs-4">Delivery Address</span>
							<hr className="border-bottom border-primary " />
							<AddressInput name={name} address={deliveryAddress} ref={deliveryAddressRef} />
						</div>
						<hr className="border-bottom border-primary " />
					</div>
				</Info>
				<Summary>
					<span> Order Summery </span>
					<Cartconfirmdetail cart={cart} total={total} tax={tax} />
					<SummaryItem>
						<span className="d-block mb-2"> Available Payment Methood </span>
						<Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />

						<PaymentMethood setPaymentMethod={setPaymentMethod} />
						<PaymentModal
							amount={cart.total + tax + total}
							paymentMethod={paymentMethod}
							open={openPaymentModal}
							setOpen={setOpenPaymentModal}
							setPaymentMethod={setPaymentMethod}
							handleClick={handleClick}
						/>
					</SummaryItem>
					<SummaryItem>
						<span className="d-block mb-2"> Shipping </span>
						<DeliveryCost handleChange={handleFilters} />
					</SummaryItem>
					<div className="w-100">
						<Button className="mt-2" onClick={handelSubmit}>
							Confirm Order
						</Button>
					</div>
				</Summary>
			</Bottom>
		</div>
	);
}
