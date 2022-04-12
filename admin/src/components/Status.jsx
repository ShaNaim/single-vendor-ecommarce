import React, { useState } from "react";
import StatusModal from "./StatusModal";
import styled from "styled-components";
const Wrapper = styled.div`
	border: 1px dotted grey;
	padding: 10px;
`;
const StatusTitle = styled.button`
	margin-left: 8px;
	font-size: 20px;
	width: 120px;
	height: 46px;
	border-radius: 25px;
	border: 1px solid white;
	text-align: center;
	cursor: pointer;
	margin: 8px;
	color: ${({ status }) =>
		status === "pending"
			? "#8f9e09"
			: status === "delivery-failed"
			? "#eb4c4c"
			: status === "complete"
			? "#2c9629"
			: status === "cancelled"
			? "#97341b"
			: status === "on-the-way"
			? "#1d2e8f"
			: status === "processing"
			? "#942194"
			: "black"};
	background: ${({ status }) =>
		status === "pending"
			? "#ebf784"
			: status === "delivery-failed"
			? "#eb4c4c"
			: status === "complete"
			? "#96e993"
			: status === "cancelled"
			? "#f17f62"
			: status === "on-the-way"
			? "#6a7deb"
			: status === "processing"
			? "#eb71eb"
			: "black"};
	&:hover {
		border: 1px solid #7e367e;
	}
`;

const Status = ({ status, setStatus, value, edit }) => {
	const handleClose = () => {
		setOpen(false);
	};
	const [open, setOpen] = useState(false);
	return (
		<Wrapper>
			<p id="parent-modal-description">
				STATUS :
				<StatusTitle
					disabled={!edit}
					onClick={() => {
						setOpen(true);
					}}
					status={!edit ? status : value}
				>
					{!edit ? status : value}
				</StatusTitle>
				Payment STATUS :
				<StatusTitle disabled={!edit} status={!edit ? status : value}>
					{!edit ? status : value}
				</StatusTitle>
			</p>
			<StatusModal
				setStatus={setStatus}
				handleClose={handleClose}
				status={value}
				open={open}
			/>
		</Wrapper>
	);
};

export default Status;
