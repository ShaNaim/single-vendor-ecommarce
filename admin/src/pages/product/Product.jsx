import "../newProduct/newProduct.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
//Components
import Imagethumb from "../../components/ImageThumb";
import ItemSelect from "../../components/select/ItemSelect.jsx";
// UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Slide from "@material-ui/core/Slide";

export default function Product() {
	const location = useLocation();
	const productId = location.pathname.split("/")[2];
	const product = useSelector((state) => state.product.products.find((product) => product._id === productId));
	const [inputs, setInputs] = useState(product);
	const [subCategory, setSubCategory] = useState("");
	const [inputError, setInputError] = useState(false);
	const [file, setFile] = useState(null);
	const [category, setCategory] = useState([]);

	const dispatch = useDispatch();
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
		setSubCategory(event.target.value);
	};

	const getAllCategories = async () => {
		const res = await userRequest.get(`/layout/category`);
		if (res.data) {
			setCategory(res.data);
		}
	};

	useEffect(() => {
		try {
			getAllCategories();
			setSubCategory(product.category);
		} catch (error) {
			console.error("Category Error:", error);
		}
	}, [product]);

	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const handleClick = (e) => {
		e.preventDefault();
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
			if (e.target.name === "updateData") {
				const responseProduct = { ...inputs, category: subCategory };
				const updatedProduct = updateProduct(product._id, responseProduct, dispatch);
				setInputs(updatedProduct);
				alert("Product Updated");
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
								getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
									const responseProduct = { ...inputs, img: downloadURL, category: subCategory };
									const updatedProduct = await updateProduct(product._id, responseProduct, dispatch);
									setInputs(updatedProduct);
									alert("Product Updated");
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
						{inputs.img && <Imagethumb src={inputs.img} alt="IMG" />}
						<input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
						<button onClick={handleClick} name="updateImage" className="addProductButton">
							Update Image
						</button>
					</div>
				</Box>
				<Box
					component="div"
					sx={{
						"& > :not(style)": { m: 1, width: "40ch" },
					}}
					noValidate
					autoComplete="off"
				>
					<div className="addProductItem">
						<TextField focused required value={inputs.title} error={inputError} name="title" id="outlined-required" label="Product Name" onChange={handleChange} />
					</div>
					<div className="addProductItem">
						<TextField
							focused
							required
							value={inputs.description}
							error={inputError}
							name="description"
							id="outlined-required"
							label="Description"
							multiline
							rows={4}
							onChange={handleChange}
						/>
					</div>
					<div className="addProductItem">
						<TextField focused required value={inputs.buyingPrice} error={inputError} name="buyingPrice" id="outlined-required" label="Buying Price" onChange={handleChange} />
					</div>
					<div className="addProductItem">
						<TextField focused required value={inputs.price} error={inputError} name="price" id="outlined-required" label="Selling Price" onChange={handleChange} />
					</div>
				</Box>
				<div className="addProductItem">
					<label>Categories</label>
					<label style={{ fontSize: "24px", color: "red" }}>{subCategory}</label>
					<ItemSelect options={category} catagory={subCategory} handleSelectChange={handleCategoryChange} />
				</div>

				<div className="addProductItem">
					<label>Stock</label>
					<select name="inStock" value={inputs.inStock} onChange={handleChange}>
						<option value="">None</option>
						<option value="true">Yes</option>
						<option value="false">No</option>
					</select>

					<button onClick={handleClick} name="updateData" className="addProductButton">
						Update
					</button>
				</div>
			</form>
		</div>
	);
}
