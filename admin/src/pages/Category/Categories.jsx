import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { userRequest } from "../../requestMethods";
import app from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// Components
import Topic from "../../components/Topic";
import Imagethumb from "../../components/ImageThumb";
import { Container, Wrapper, WrapperLabel, TopicsWrapper, IconWrapper } from "./StyledCategory";
// UI
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Slide from "@material-ui/core/Slide";
import TextField from "@mui/material/TextField";

const Categories = () => {
	const [inputValue, setInputValue] = useState("");
	const [category, setCategory] = useState([]);
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);

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

	const handleClick = async (e) => {
		e.preventDefault();
		const add = async () => {
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
						async () => {
							getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
								async function addCategory(image) {
									const tempCategory = {
										name: inputValue,
										image: image,
										show: true,
									};
									try {
										const res = await userRequest.post(`/layout/category`, tempCategory);
										getAllCategories();
										setInputValue("");
										setImage("");
										setFile("");
										alert(`${res.data.name} Added `, "success", true);
									} catch (error) {
										console.log(error);
										alert("Category Add Failed");
									}
								}
								addCategory(downloadURL);
							});
						}
					);
				} catch (error) {
					alert(error, "warning", true);
				}
			} else {
				alert("Please Provide Photo", "warning", true);
			}
		};
		await add();
		console.log(inputValue.mainCategory);
	};

	const handleDelete = async (id, name) => {
		async function deleteCategory(id) {
			try {
				const res = await userRequest.delete(`/layout/category/${id}`);
				if (res) return res.data;
				else return null;
			} catch (error) {
				console.error(error);
			}
		}
		const deletedCategory = await deleteCategory(id);
		if (deletedCategory) {
			const newCategories = category.filter((topic) => topic._id !== id);
			setCategory(newCategories);
			alert(`${name} Deleted`, "warning");
		}
	};

	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleImagePreview = (e) => {
		let tempFile = e.target.files[0];
		const reader = new FileReader();
		reader.addEventListener(
			"load",
			function () {
				setImage(reader.result);
			},
			false
		);
		if (tempFile) {
			setFile(tempFile);
			reader.readAsDataURL(tempFile);
		}
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

	return (
		<Container>
			<div>
				<WrapperLabel>Category</WrapperLabel>
				<Wrapper>
					<Container>
						<Wrapper>
							<div className="addProductItem">
								<label>Image</label>
								<input onChange={handleImagePreview} accept="image/*" id="addPhoto" type="file" />
							</div>

							<div className="addProductItem">{image && <Imagethumb src={image} alt="IMG" />}</div>
							<TextField name="mainCategory" label="Category Name" onChange={handleChange} value={inputValue} />

							<IconWrapper width="40px" color={["#2d819b", "#9bd7db"]}>
								<IconButton
									// onClick={addNewCategory}
									onClick={handleClick}
									color="inherit"
									aria-label="Add Category"
								>
									<AddIcon />
								</IconButton>
							</IconWrapper>
						</Wrapper>
						<TopicsWrapper>
							{category.map((topic, index) => {
								return <Topic name="mainCategory" catId={topic._id} handleDelete={handleDelete} className="m-1" key={index} label={topic.name} />;
							})}
						</TopicsWrapper>
					</Container>
				</Wrapper>
			</div>
		</Container>
	);
};

export default Categories;
