import "./styledOrder.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../../requestMethods";
import styled from "styled-components";
import LoadingButton from "@mui/lab/LoadingButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import Orderedproducts from "../../components/OrderedProducts";
import Ordercustomer from "../../components/OrderCustomer";
import { format } from "timeago.js";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Status from "../../components/Status";
const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	margin: 10px;
`;
const ButtonContainer = styled.div`
	width: 40%;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	justify-content: space-between;
	margin: 10px;
`;

const ItemWrapper = styled.div`
	padding: 10px;
	border: 1px dotted grey;
`;

const Container = styled.div`
	flex: 1;
`;

const ItemContainer = styled.div`
	margin: 2px;
	padding: 4px;
	letter-spacing: 0.8px;
`;

const Item = styled.span`
	margin-left: 8px;
	font-size: 20px;
	color: #f3680c;
`;

const Edit = styled.button`
	border: none;
	padding: 10px;
	width: 80px;
`;

const readyRequest = (tempOrder, userInputs, deliveryStatus) => {
	const req = tempOrder;
	req.address.address = userInputs.address;
	req.address.area = userInputs.area;
	req.address.city = userInputs.city;
	req.contactNumber = userInputs.contact;
	req.status = deliveryStatus;
	console.log(req);
	return req;
};

const Orderview = () => {
	const location = useLocation();
	const [inputs, setInputs] = useState({});
	const cat = location.pathname.split("/")[2];
	const [order, setOrder] = useState({});
	const [edit, setEdit] = useState(false);
	const [contact, setContact] = useState(0);
	const [status, setStatus] = useState("");
	const { isFetching } = useSelector((state) => state.order);

	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
		console.log(inputs);
	};

	const handleUpdate = () => {
		const getOrders = async (id) => {
			const res = await userRequest.put(
				`orders/${id}`,
				readyRequest(order, inputs, status)
			);
			console.log(res.data);
			setOrder(res.data);
			setEdit(false);
		};
		getOrders(cat);
	};

	const handleClick = (e) => {
		setEdit(!edit);
		if (!edit) {
			setInputs((prev) => {
				return {
					...prev,
					address: order.address.address,
					area: order.address.area,
					city: order.address.city,
					contact: contact,
				};
			});
			setStatus(order.status);
		} else {
			setInputs((prev) => {
				return {
					...prev,
					address: "",
					area: "",
					city: "",
					contact: "",
				};
			});
		}
	};

	const formateDate = (fromdate) => {
		const date = new Date(fromdate);

		return `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`;
	};

	useEffect(() => {
		const getOrders = async (id) => {
			const res = await userRequest.get(`orders/${id}`);
			console.log(res.data);

			setOrder(res.data);
		};
		getOrders(cat);
	}, [cat]);

	return (
		<div className="productList">
			<Wrapper>
				{order.address && (
					<Container>
						<ItemContainer>
							<span> DELIVERY DETAILS </span>
							<ItemContainer>
								<ItemWrapper>
									<div>
										Order ID :<Item>{order.orderId || ""}</Item>
									</div>
									<FormControl
										sx={{ mr: 3 }}
										disabled={!edit}
										variant="standard"
									>
										<InputLabel htmlFor="component-simple">
											{!edit ? order.address.address : "Address"}
										</InputLabel>
										<Input
											id="component-simple"
											name="address"
											value={inputs.address || ""}
											onChange={handleChange}
										/>
									</FormControl>
									<FormControl
										sx={{ mr: 3 }}
										disabled={!edit}
										variant="standard"
									>
										<InputLabel htmlFor="component-simple">
											{!edit ? order.address.area : "Area"}
										</InputLabel>
										<Input
											id="component-simple"
											name="area"
											value={inputs.area || ""}
											onChange={handleChange}
										/>
									</FormControl>
									<FormControl disabled={!edit} variant="standard">
										<InputLabel htmlFor="component-simple">
											{!edit ? order.address.city : "City"}
										</InputLabel>
										<Input
											id="component-simple"
											name="city"
											value={inputs.city || ""}
											onChange={handleChange}
										/>
									</FormControl>
									<p id="parent-modal-description">
										ADDRESS:
										<Item>
											{order.address &&
												` ${order.address.address} ${order.address.area} ${order.address.city}`}
										</Item>
									</p>
									<div>
										Delivery Type :<Item>{order.paymentMethod || "COD"}</Item>
									</div>
								</ItemWrapper>
								<ItemWrapper>
									<FormControl disabled={!edit} variant="standard">
										<InputLabel htmlFor="component-simple">
											{!edit ? contact : "Contact"}
										</InputLabel>
										<Input
											id="component-simple"
											name="contact"
											type="number"
											value={inputs.contact || ""}
											onChange={handleChange}
										/>
									</FormControl>
									<p id="parent-modal-description">
										User Contact :<Item>0{order.contactNumber || contact}</Item>
									</p>
								</ItemWrapper>
								<ItemWrapper>
									<p id="parent-modal-description">
										Order Placed :
										<Item>
											{format(order.createdAt)} ||{" "}
											{formateDate(order.createdAt)}
										</Item>
									</p>
									<p id="parent-modal-description">
										Last Updated :<Item>{format(order.updatedAt)}</Item>
									</p>
								</ItemWrapper>
								<Ordercustomer setContact={setContact} id={order.userId} />
							</ItemContainer>
							<Status
								edit={edit}
								value={status}
								status={order.status}
								setStatus={setStatus}
							/>
							<p id="parent-modal-description"></p>
						</ItemContainer>
					</Container>
				)}

				{order.products && (
					<Orderedproducts
						products={order.products}
						total={order.amount}
						deliveryCost={order.deliveryCost}
					/>
				)}
			</Wrapper>
			<ButtonContainer>
				<LoadingButton
					color={!edit ? "secondary" : "error"}
					onClick={handleClick}
					loading={isFetching}
					loadingPosition="start"
					startIcon={!edit ? <EditIcon /> : <CloseIcon />}
					variant="contained"
				>
					{!edit ? "Edit" : "Cancel"}
				</LoadingButton>
				{edit && (
					<LoadingButton
						color="success"
						onClick={handleUpdate}
						loading={isFetching}
						loadingPosition="start"
						startIcon={<SaveIcon />}
						variant="contained"
					>
						Update
					</LoadingButton>
				)}
			</ButtonContainer>
		</div>
	);
};

export default Orderview;
