import styled from "styled-components";
import { mobile } from "../responsive";

export const Product = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 8px;
	display: flex;
	background-color: #f7f5f5cf;
	box-shadow: 0.3px 0.5px 1px 0.2px #22222287;
	border-radius: 5px;
`;

export const ProductDetail = styled.div`
	font-size: 12px;
`;

export const Price = styled.span`
	font-size: 14px;
	font-weight: 600;
`;

export const Details = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: space-between;
`;

export const ProductName = styled.span``;

export const ProductId = styled.span``;

export const ProductColor = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
`;

export const ProductSize = styled.span``;

export const PriceDetail = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const ProductAmountContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
`;

export const ProductAmount = styled.div`
	font-size: 16px;
`;

export const ProductPrice = styled.div`
	font-weight: 200;
	${mobile({ marginBottom: "20px" })}
`;

export const AddContainer = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
export const IconContainer = styled.div`
	cursor: pointer;
	width: 25%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	:hover {
		background: #008080a9;
		color: white;
		transition: 0.6s;
	}
`;
export const AmountContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 40px;
	width: 120px;
	margin: 8px 0px;
	border: teal 1px solid;
	font-weight: 700;
`;
export const RemoveButton = styled.span`
	color: tomato;
	border-radius: 5px;
	font-size: 20px;
	margin-right: 16px;
	cursor: pointer;
`;

export const Amount = styled.span`
	width: 50%;
	height: 100%;
	border-left: 1px solid teal;
	border-right: 1px solid teal;
	display: flex;
	align-items: center;
	justify-content: center;
`;
