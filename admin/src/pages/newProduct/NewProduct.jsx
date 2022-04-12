import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { userRequest } from "../../requestMethods";

// UI
import "./newProduct.css";
import ItemSelect from "../../components/select/ItemSelect.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Slide from "@material-ui/core/Slide";

export default function NewProduct() {
	const [inputs, setInputs] = useState({});
	const [inputError, setInputError] = useState(false);
	const [file, setFile] = useState(null);
	const dispatch = useDispatch();
	const [subCategory, setSubCategory] = useState([]);
	const [category, setCategory] = useState([]);
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

	const handleCategoryChange = (event) => {
		console.log(event.target.value);
		setSubCategory(event.target.value);
	};

	const getAllCategories = async () => {
		const res = await userRequest.get(`/layout/category`);
		console.log("CATEGORY ::", res.data);
		if (res.data) {
			setCategory(res.data);
		}
	};

	useEffect(() => {
		try {
			getAllCategories();
		} catch (error) {
			console.error("Category Error:", error);
		}
	}, []);

	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const handleClick = (e) => {
		e.preventDefault();
		console.log(!inputs.title);

		if (
			!inputs.title ||
			!inputs.description ||
			!inputs.buyingPrice ||
			!inputs.price ||
			inputs.title === "" ||
			inputs.description === "" ||
			inputs.buyingPrice === "" ||
			inputs.price === ""
		) {
			if (!inputs.title || inputs.title === "") {
				setInputError((prev) => {
					return { ...prev, [inputError.title]: true };
				});
				alert("Please Provide Title", "error", true);
			}
			if (!inputs.description || inputs.description === "") {
				setInputError((prev) => {
					return { ...prev, [inputError.description]: true };
				});
				alert("Please Provide Description", "error", true);
			}
			if (!inputs.buyingPrice || inputs.buyingPrice === "") {
				setInputError((prev) => {
					return { ...prev, [inputError.buyingPrice]: true };
				});
				alert("Please Provide Buying Price", "error", true);
			}
			if (!inputs.price || inputs.price === "") {
				setInputError((prev) => {
					return { ...prev, [inputError.price]: true };
				});
				alert("Please Provide Price", "error", true);
			}
		} else {
			if (file) {
				try {
					const fileName = new Date().getTime() + file.name;
					const storage = getStorage(app);
					const storageRef = ref(storage, fileName);
					const uploadTask = uploadBytesResumable(storageRef, file);
					uploadTask.on(
						"state_changed",
						(snapshot) => {
							const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							console.log("Upload is " + progress + "% done");

							switch (snapshot.state) {
								case "paused":
									console.log("Upload is paused");
									break;
								case "running":
									console.log("Upload is running");
									break;
								default:
							}
						},
						(error) => {
							console.log("Upload is Blocked", error);
						},
						() => {
							getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
								const product = { ...inputs, img: downloadURL, category: subCategory };
								addProduct(product, dispatch);
								alert("Product Added");
							});
						}
					);
				} catch (error) {
					alert(error, "warning", true);
				}
			} else {
				alert("Please Provide Photo", "warning", true);
			}
		}
	};

	return (
		<div className="newProduct">
			<h1 className="addProductTitle">New Product</h1>
			<form className="addProductForm">
				<Box
					component="form"
					sx={{
						"& > :not(style)": { m: 1, width: "40ch" },
					}}
					noValidate
					autoComplete="off"
				>
					<div className="addProductItem">
						<label>Image</label>
						<input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
					</div>
				</Box>
				<Box
					component="form"
					sx={{
						"& > :not(style)": { m: 1, width: "40ch" },
					}}
					noValidate
					autoComplete="off"
				>
					<div className="addProductItem">
						<TextField required error={inputError} name="title" id="outlined-required" label="Product Name" onChange={handleChange} />
					</div>
					<div className="addProductItem">
						<TextField required error={inputError} name="description" id="outlined-required" label="Description" multiline rows={4} onChange={handleChange} />
					</div>
					<div className="addProductItem">
						<TextField required error={inputError} name="buyingPrice" id="outlined-required" label="Buying Price" onChange={handleChange} />
					</div>
					<div className="addProductItem">
						<TextField required error={inputError} name="price" id="outlined-required" label="Selling Price" onChange={handleChange} />
					</div>
				</Box>
				<div className="addProductItem">
					<label>Categories</label>
					<ItemSelect options={category} catagory={subCategory} handleSelectChange={handleCategoryChange} />
					{/* <input type="text" placeholder="book,anatomy" onChange={handleCat} /> */}
				</div>
				<div className="addProductItem">
					<label>Stock</label>
					<select name="inStock" onChange={handleChange}>
						<option value="true">Yes</option>
						<option value="false">No</option>
					</select>
				</div>

				<button onClick={handleClick} className="addProductButton">
					Create
				</button>
			</form>
		</div>
	);
}
