import styled from "styled-components";
import { mobile } from "../../responsive";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 14px;
`;

export const Wrapper = styled.div`
	display: flex;
	margin-bottom: 30px;
	margin-top: 30px;
	background-color: #ffffff;
	${mobile({ padding: "10px", flexDirection: "column" })}
`;

export const ImgContainer = styled.div`
	flex: 2;
	max-height: 400px;
	min-height: 200px;
	min-width: 270px;
	align-items: center;
	box-shadow: 0.3px 0.5px 1px 0.2px #22222287;
	border-radius: 5px;
	justify-content: center;
	${mobile({ marginBottom: "10px" })}
`;

export const Image = styled.img`
	min-height: 280px;
	padding: 20px;
	border-radius: 5px;
	max-height: 400px;
	width: 100%;
	height: 100%;
	${mobile({ width: "100%", padding: "4px" })}
`;

export const Right = styled.div`
	flex: 1;
	padding: 5px;
	max-height: 400px;
	background-color: #f7f5f5cf;
	box-shadow: 0.3px 0.5px 1px 0.2px #22222287;
	border-radius: 5px;
	${mobile({ marginTop: "10px" })}
`;

export const ListGroup = styled.div`
	margin-top: 20%;
	margin-bottom: 20%;
	display: flex;
	flex-direction: column;
`;

export const ListItem = styled.span`
	margin-bottom: 8px;
	padding: 4px;
	background-color: #fafcfa;
`;

export const Middle = styled.div`
	display: flex;
	max-height: 400px;
	flex-direction: column;
	align-items: top;
	background-color: #f7f5f5cf;
	box-shadow: 0.3px 0.5px 1px 0.2px #22222287;
	border-radius: 5px;
	margin-left: 20px;
	margin-right: 20px;
	${mobile({ padding: "10px", marginLeft: "0px", marginRight: "0px" })}
`;

export const InfoContainer = styled.div`
	padding: 10px 40px 20px;
	flex: 2;
	display: flex;
	flex-direction: column;
`;

export const Title = styled.span`
	font-weight: 500;
`;
export const DescContainer = styled.div`
	flex: 2;
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 400px;
`;
export const Table = styled.table``;
export const Price = styled.span`
	font-size: 16px;
	font-weight: 600;
	color: #295e30;
`;

export const IconContainer = styled.div`
	cursor: pointer;
`;
export const LineBreak = styled.hr`
	border: 0.01px solid #d64444;
`;
export const AddContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${mobile({ width: "100%" })}
`;

export const AmountContainer = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
`;

export const Amount = styled.span`
	width: 30px;
	height: 30px;
	border-radius: 10px;
	border: 1px solid teal;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0px 5px;
`;

export const Button = styled.button`
	padding: 5px;
	border: 2px solid teal;
	background-color: white;
	cursor: pointer;
	font-weight: 500;
	border-radius: 12px;

	&:hover {
		background-color: #f8f4f4;
	}
`;

export const SideIcons = styled.span`
	margin-right: 10px;
`;

export const Icon1 = styled.span`
	color: #75d17a;
`;
export const Icon2 = styled.span`
	margin: -7px;

	color: #d18775ce;
`;
