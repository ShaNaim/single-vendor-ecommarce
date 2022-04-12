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

export const WrapperLabel = styled.span`
	font-size: 20px;
	font-weight: 600;
	color: #221d1d;
	padding: 0px 5px 0px;
	border: 1px solid #948f8f;
	border-bottom: 1px solid white;
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

export const DetailsContainer = styled.div`
	min-width: 280px;
	max-width: 380px;
	min-height: 260px;
	max-height: 360px;
	border: 1px solid grey;
`;

export const DetailsWrapper = styled.div`
	min-width: 280px;
	max-width: 280px;
	min-height: 200px;
	max-height: 220px;
`;
