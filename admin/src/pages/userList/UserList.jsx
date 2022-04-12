import "./userList.css";
import { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { userRequest } from "../../requestMethods";

export default function UserList() {
	const handleDelete = (id) => {
		//setData(data.filter((item) => item.id !== id));
		console.log(id);
	};

	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const res = await userRequest.get("users");
				console.log("RESPOND :", res.data);
				setUsers(res.data);
			} catch {}
		};
		getUsers();
	}, []);

	const columns = [
		{ field: "_id", headerName: "ID", width: 90 },
		// {
		// 	field: "email",
		// 	headerName: "User",
		// 	width: 200,
		// 	renderCell: (params) => {
		// 		return (
		// 			<div className="userListUser">
		// 				<img className="userListImg" src={params.row.avatar} alt="" />
		// 				{params.row.username}
		// 			</div>
		// 		);
		// 	},
		// },
		{ field: "email", headerName: "Email", width: 200 },
		{
			field: "isAdmin",
			headerName: "Admin",
			width: 120,
		},
		{
			field: "",
			headerName: "address",
			width: 400,
			renderCell: (params) => {
				return (
					<div className="productListItem">
						{params.row.address.address} || {params.row.address.city} ||{" "}
						{params.row.address.area}
					</div>
				);
			},
		},
		// {
		// 	field: "transaction",
		// 	headerName: "Transaction Volume",
		// 	width: 160,
		// },
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={"/user/" + params.row.id}>
							<button className="userListEdit">Edit</button>
						</Link>
						<DeleteOutline
							className="userListDelete"
							onClick={() => handleDelete(params.row.id)}
						/>
					</>
				);
			},
		},
	];

	return (
		<div className="userList">
			<DataGrid
				rows={users}
				disableSelectionOnClick
				columns={columns}
				getRowId={(row) => row._id}
				pageSize={8}
				checkboxSelection
			/>
		</div>
	);
}
