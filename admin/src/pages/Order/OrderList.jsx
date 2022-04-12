import "./styledOrder.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts, getAllOrders } from "../../redux/apiCalls";
import styled from "styled-components";
import { useLocation } from "react-router";
import { useState } from "react";
import { format } from "timeago.js";

const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Filter = styled.div`
	margin: 20px;
`;

const FilterText = styled.span`
	font-size: 20px;
	font-weight: 600;
	margin-right: 20px;
`;

const Select = styled.select`
	padding: 10px;
	margin-right: 20px;
`;

const Option = styled.option``;

export default function OrderList() {
	// getAllOrders(dispatch);
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.order.orders);
	// console.info(useSelector((state) => state));
	const location = useLocation();
	const cat = location.pathname.split("/")[2];
	const [filters, setFilters] = useState({});
	const [filteredProducts, setfilteredProducts] = useState([]);

	const handleFilters = (e) => {
		const value = e.target.value;
		const key = e.target.name;

		console.log("filters bef:", filters);
		setFilters({
			...filters,
			[e.target.name]: value,
		});
	};

	useEffect(() => {
		const getOrders = async (dispatch) => {
			await getAllOrders(dispatch);
		};
		getOrders(dispatch);
	}, [dispatch]);

	const handleDelete = (id) => {
		deleteProduct(id, dispatch);
	};

	const columns = [
		{ field: "orderId", headerName: "ID", width: 220 },
		// { field: "userId", headerName: "User ID", width: 200 },
		{ field: "amount", headerName: "Amount", width: 200 },
		{
			field: "",
			headerName: "address",
			width: 200,
			renderCell: (params) => {
				return (
					<div className="productListItem">
						{params.row.address.city} || {params.row.address.area}
					</div>
				);
			},
		},
		{
			field: "createdAt",
			headerName: "Palced At",
			width: 160,
			renderCell: (params) => {
				return (
					<div className="productListItem">{format(params.row.createdAt)}</div>
				);
			},
		},

		{ field: "status", headerName: "Status", width: 200 },
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={"/order/" + params.row._id}>
							<button className="productListEdit">Edit</button>
						</Link>
						<DeleteOutline
							className="productListDelete"
							onClick={() => handleDelete(params.row._id)}
						/>
					</>
				);
			},
		},
	];

	return (
		<div className="productList">
			<FilterContainer>
				<Filter>
					<FilterText>Filter Products:</FilterText>
					<Select name="categories" onChange={handleFilters}>
						<Option selected>Type</Option>
						<Option value="all">All</Option>
						<Option value="book">Book</Option>
						<Option value="guide">Guide</Option>
						<Option value="bundles">Bundles</Option>
					</Select>
				</Filter>
			</FilterContainer>
			<DataGrid
				rows={orders}
				disableSelectionOnClick
				columns={columns}
				getRowId={(row) => row._id}
				pageSize={50}
				checkboxSelection
			/>
			{/* <Products cat={cat} filters={filters} sort={sort} /> */}
		</div>
	);
}
