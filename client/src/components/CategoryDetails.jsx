import React from "react";
import styled from "styled-components";

const Title = styled.span`
	margin-right: 8px;
	font-weight: 500;
`;

const Item = styled.span`
	margin: 2px;
	font-weight: 400;
	text-transform: capitalize;
`;

const CategoryDetails = ({ categories }) => {
	return (
		<div>
			<Title>Categories :</Title>
			{categories.map((cat) => {
				return (
					<>
						<Item>{cat}</Item>.
					</>
				);
			})}
		</div>
	);
};

export default CategoryDetails;
