import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import styled from "styled-components";
import { useLocation } from "react-router";
import { useState } from "react";

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

export default function ProductList() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.product.products);

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
		getProducts(dispatch);

		if (filters && filters.categories == "all") {
			setfilteredProducts(products);
		} else {
			setfilteredProducts(
				products.filter((item) =>
					Object.entries(filters).every(
						([key, value]) => item[key].includes(value)
						//console.log("filters :", item[key], "key : ", key, "value :", value)
					)
				)
			);
		}
	}, [dispatch, filters]);

	const handleDelete = (id) => {
		deleteProduct(id, dispatch);
	};

	const columns = [
		{ field: "_id", headerName: "ID", width: 220 },
		{
			field: "product",
			headerName: "Product",
			width: 200,
			renderCell: (params) => {
				return (
					<div className="productListItem">
						<img className="productListImg" src={params.row.img} alt="" />
						{params.row.title}
					</div>
				);
			},
		},
		{ field: "inStock", headerName: "Stock", width: 200 },
		{ field: "categories", headerName: "categories", width: 200 },
		{
			field: "price",
			headerName: "Price",
			width: 160,
		},
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={"/product/" + params.row._id}>
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
				rows={filteredProducts}
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
