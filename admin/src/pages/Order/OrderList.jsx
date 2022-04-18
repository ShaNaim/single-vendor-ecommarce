import "./styledOrder.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllOrders } from "../../redux/apiCalls";
import { format } from "timeago.js";

export default function OrderList() {
	const dispatch = useDispatch();
	const orders = useSelector((state) => state.order.orders);

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
				return <div className="productListItem">{format(params.row.createdAt)}</div>;
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
						<DeleteOutline className="productListDelete" onClick={() => handleDelete(params.row._id)} />
					</>
				);
			},
		},
	];

	return (
		<div className="productList">
			<DataGrid rows={orders} disableSelectionOnClick columns={columns} getRowId={(row) => row._id} pageSize={50} checkboxSelection />
			{/* <Products cat={cat} filters={filters} sort={sort} /> */}
		</div>
	);
}
