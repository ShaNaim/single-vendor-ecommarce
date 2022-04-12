import React, { useEffect, useState, useRef } from "react";
import { useSnackbar } from "notistack";
import { userRequest } from "../../requestMethods";
// UI
import Input from "../../components/Input";
import MultiSelect from "../../components/select/MultiSelect";
import Topic from "../../components/Topic";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Slide from "@material-ui/core/Slide";
import EditIcon from "@mui/icons-material/Edit";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteIcon from "@mui/icons-material/Delete";
import SectionMain from "../../components/SectonMain/SectionMain";
import {
	Container,
	Wrapper,
	WrapperLabel,
	TopicsWrapper,
	IconWrapper,
	DetailsContainer,
	DetailsWrapper,
} from "./StyledHomepage";

function useForceUpdate() {
	const [value, setValue] = useState(0); // integer state
	return () => setValue((value) => value + 1); // update the state to force render
}

async function addTopic(topic) {
	try {
		const res = await userRequest.post(`/layout/topic`, topic);

		if (res) return res.data;
		else return null;
	} catch (error) {
		console.error(error);
	}
}

async function addCategory(category) {
	try {
		const res = await userRequest.post(`/layout/category`, category);

		if (res) return res.data;
		else return null;
	} catch (error) {
		console.error(error);
	}
}

async function deleteTopic(id) {
	try {
		const res = await userRequest.delete(`/layout/topic/${id}`);
		if (res) return res.data;
		else return null;
	} catch (error) {
		console.error(error);
	}
}

async function deleteCategory(id) {
	try {
		const res = await userRequest.delete(`/layout/category/${id}`);
		if (res) return res.data;
		else return null;
	} catch (error) {
		console.error(error);
	}
}

async function updateCategoryItem(id, category) {
	try {
		const res = await userRequest.put(`/layout/category/${id}`, category);
		if (res) return res.data;
		else return null;
	} catch (error) {
		console.error(error);
	}
}

const HomePage = () => {
	const [topics, setTopics] = useState([]);
	const [inputValue, setInputValue] = useState({});
	const [subCatagory, setSubCatagory] = useState([]);
	const [category, setCategory] = useState([]);
	const [details, setDetails] = useState({});
	const [showDetails, setShowDetails] = useState(false);
	const [showUpdate, setShowUpdate] = useState(false);
	const [editItem, setEditItem] = useState({});
	const topicInputRef = useRef("");
	const CategoryInputRef = useRef("");
	const froceUpdate = useForceUpdate();
	const { enqueueSnackbar } = useSnackbar();
	console.log("rerender");

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

	const handelEdit = (e) => {
		const item = category.find((item) => item._id === e);
		CategoryInputRef.current.focus();
		setInputValue((prev) => {
			return { ...prev, mainCategory: item.mainCategory };
		});
		CategoryInputRef.current.value = item.mainCategory;
		setSubCatagory(item.subCategories);
		setEditItem(item);
		setShowUpdate(true);
	};

	const handleClick = (e) => {
		const item = category.find((item) => item._id === e);
		setDetails(item);
		setShowDetails(true);
	};

	const handleDelete = async (id, name, type) => {
		if (type === "topics") {
			const deletedTopic = await deleteTopic(id);
			if (deletedTopic) {
				const newTopics = topics.filter((topic) => topic._id !== id);
				setTopics(newTopics);
				alert(`${name} Deleted`, "warning");
			}
		} else if (type === "mainCategory") {
			const deletedCategory = await deleteCategory(id);
			if (deletedCategory) {
				const newCategories = category.filter((topic) => topic._id !== id);
				setCategory(newCategories);
				alert(`${name} Deleted`, "warning");
			}
		}
	};

	const addNewTopic = async (e) => {
		if (inputValue.topics) {
			const newTopic = await addTopic({ name: inputValue.topics });
			if (newTopic) {
				setTopics([...topics, newTopic]);
				setInputValue((prev) => {
					return { ...prev, topics: "" };
				});
				alert(`New Topic ${inputValue.topics} Added`, "success");
				topicInputRef.current.value = "";
			}
		} else {
			topicInputRef.current.value = "put";
		}
	};

	const addNewCategory = async (e) => {
		if (inputValue.mainCategory) {
			const tempCategory = {
				mainCategory: inputValue.mainCategory,
				subCategories: subCatagory,
			};
			const newCategory = await addCategory(tempCategory);
			if (newCategory) {
				setCategory([...category, newCategory]);
				setSubCatagory([]);
				setInputValue((prev) => {
					return { ...prev, mainCategory: "" };
				});
				CategoryInputRef.current.value = "";
			}
		} else {
			alert("Please Provide a value", "info", true);
		}
	};

	const updateCategory = async (e) => {
		const updateItem = editItem;
		updateItem.subCategories = subCatagory;
		const res = await updateCategoryItem(editItem._id, { ...editItem });
		if (res) {
			setDetails(updateItem);
			setShowDetails(true);
			froceUpdate();
		} else {
			alert("Update Failed", "danger", true);
		}
	};

	const handleChange = (e) => {
		setInputValue((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			if (e.target.name === "topics") addNewTopic(e);
		}
	};

	useEffect(() => {
		try {
			const getAllTopic = async () => {
				const res = await userRequest.get(`/layout/topic`);
				if (res.data) {
					setTopics(res.data);
				}
			};

			getAllTopic();
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		try {
			const getAllCategories = async () => {
				const res = await userRequest.get(`/layout/category`);
				if (res.data) {
					setCategory(res.data);
				}
			};
			getAllCategories();
		} catch (error) {
			console.error("Category Error:", error);
		}
	}, []);

	return (
		<Container>
			<div>
				<WrapperLabel>Main Category</WrapperLabel>
				<Wrapper>
					<SectionMain
						CategoryInputRef={CategoryInputRef}
						handleKeyDown={handleKeyDown}
						handleChange={handleChange}
						subCatagory={subCatagory}
						setSubCatagory={setSubCatagory}
						topics={topics}
						showUpdate={showUpdate}
						updateCategory={updateCategory}
						addNewCategory={addNewCategory}
						category={category}
						handleDelete={handleDelete}
						handleClick={handleDelete}
					/>
					{showDetails && (
						<DetailsContainer>
							<DetailsWrapper>
								<div>
									{details.subCategories.map((topic, index) => {
										return (
											<Topic
												name="topics"
												className="m-1"
												key={index}
												label={topic}
											/>
										);
									})}
								</div>
							</DetailsWrapper>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-evenly",
								}}
							>
								<IconWrapper
									borderRadius="50%"
									width="40px"
									margin="0"
									color={["#1eb4b9", "#7dbba3e1"]}
								>
									<IconButton
										onClick={() => {
											handelEdit(details._id);
										}}
										color="inherit"
										aria-label="add an alarm"
										size="small"
									>
										<EditIcon fontSize="inherit" />
									</IconButton>
								</IconWrapper>
								<span
									style={{
										padding: "15px",
										fontWeight: "600",
										border: "1px solid #559242e0",
										textAlign: "center",
										borderRadius: "30px",
									}}
								>
									{details.mainCategory}
								</span>
								<IconWrapper
									borderRadius="50%"
									width="40px"
									margin="0"
									color={["#ff0000", "#e6a29fdf"]}
								>
									<IconButton
										onClick={addNewTopic}
										color="inherit"
										aria-label="add an alarm"
										size="small"
									>
										<DeleteIcon fontSize="inherit" />
									</IconButton>
								</IconWrapper>
							</div>
						</DetailsContainer>
					)}
				</Wrapper>
			</div>

			<div>
				<Wrapper></Wrapper>
			</div>
			<div>
				<WrapperLabel>Sub Category</WrapperLabel>
				<Wrapper></Wrapper>
			</div>
		</Container>
	);
};

export default HomePage;
