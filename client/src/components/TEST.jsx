import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import styled from "styled-components";

import { mobile } from "../responsive";
import { sliderItems } from "../data";

const Slide = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: #59e3f55e;
`;

const ImgContainer = styled.div`
	height: 100%;
	background: red;
	flex: 1;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const Arrow = styled.div`
	width: 20px;
	height: 80px;
	border-radius: 50px;
	background-color: #2b2222;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: -1.5;
	bottom: -2;
	left: ${(props) => props.direction === "left" && "10px"};
	right: ${(props) => props.direction === "right" && "10px"};
	margin: auto;
	cursor: pointer;
	opacity: 0.1;
	z-index: 2;
	:hover {
		background-color: #b61717;
		opacity: 0.3;
	}
`;

const Container = styled.div`
	height: 40vh;
	margin-bottom: 20px;
	${mobile({ height: "24vh" })}
`;

function SimpleArrow(props) {
	const { className, onClick } = props;
	return <Arrow className={className} onClick={onClick} />;
}

const Test = () => {
	const products = sliderItems;

	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <SimpleArrow />,
		prevArrow: <SimpleArrow />,
	};
	return (
		<>
			<Slider {...settings}>
				{products.map((item) => {
					return (
						<>
							<Container>
								<Slide bg={item.bg} key={item.id}>
									<ImgContainer>
										<Image src={item.img} />
									</ImgContainer>
								</Slide>
							</Container>
						</>
					);
				})}
			</Slider>
		</>
	);
};

export default Test;
