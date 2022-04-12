import React from "react";
import Input from "../../components/Input";
import MultiSelect from "../../components/select/MultiSelect";
import Topic from "../../components/Topic";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Slide from "@material-ui/core/Slide";
import EditIcon from "@mui/icons-material/Edit";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";

export const Container = styled.div`
	flex: 6;
	display: flex;
	flex-direction: column;
	font-size: 14px;
`;

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 30px;
	margin-bottom: 15px;
	border: 1px solid #948f8f;
`;
export const TopicsWrapper = styled.div`
	padding: 10px;
	margin-top: 20px;
	border: 1px dotted grey;
`;
export const IconWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	padding: 4px;
	cursor: pointer;
	opacity: 0.4;
	border-radius: ${(props) => props.borderRadius || "10px"};
	color: #000000;
	width: ${(props) => props.width || "auto"};
	height: ${(props) => props.width || "auto"};
	margin: ${(props) => props.margin || "16px"};
	border: 2px solid ${(props) => props.color[0]};
	&:hover {
		opacity: 1;
		color: white;
		transition: 0.8s;
		background-image: linear-gradient(
			to right,
			${(props) => props.color[0]} 33%,
			${(props) => props.color[1]} 100%
		);
	}
`;
const SectionMain = (props) => {
	return (
		<div>
			<Container>
				<Wrapper>
					<Input
						inputRef={props.CategoryInputRef}
						onKeyDown={props.handleKeyDown}
						tabIndex="1"
						name=""
						label="Main Category"
						onChange={props.handleChange}
						focused={props.CategoryInputRef.current.value === "" ? false : true}
					/>

					<MultiSelect
						label="Sub Category"
						subCatagory={props.subCatagory}
						setSubCatagory={props.setSubCatagory}
						options={props.topics.map((topic) => topic.name)}
					/>
					{props.showUpdate ? (
						<IconWrapper width="40px" color={["#ecdb3a", "#a38d28"]}>
							<IconButton
								onClick={props.updateCategory}
								color="inherit"
								aria-label="Update Category"
							>
								<UpgradeIcon />
							</IconButton>
						</IconWrapper>
					) : (
						<IconWrapper width="40px" color={["#2d819b", "#9bd7db"]}>
							<IconButton
								onClick={props.addNewCategory}
								color="inherit"
								aria-label="Add Category"
							>
								<AddIcon />
							</IconButton>
						</IconWrapper>
					)}
				</Wrapper>
				<TopicsWrapper>
					{props.category.map((topic, index) => {
						return (
							<Topic
								name="mainCategory"
								catId={topic._id}
								handleDelete={props.handleDelete}
								className="m-1"
								key={index}
								handleClick={props.handleClick}
								label={topic.mainCategory}
							/>
						);
					})}
				</TopicsWrapper>
			</Container>
		</div>
	);
};

export default SectionMain;
