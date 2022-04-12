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
	object-fit: cover;
`;

const ImgContainer = styled.div`
	height: 100%;
	background: #5990f55e;
	align-items: center;
	justify-content: center;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const Container = styled.div`
	height: 100%;
	margin-bottom: 5vh;
	${mobile({ height: "100%" })}
`;

const HomeSlider = () => {
	const products = sliderItems;

	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};
	return (
		<>
			<Container>
				<Slider {...settings}>
					{products.map((item) => {
						return (
							<>
								<Slide bg={item.bg} key={item.id}>
									<ImgContainer>
										<Image src={item.img} />
									</ImgContainer>
								</Slide>
							</>
						);
					})}
				</Slider>
			</Container>
		</>
	);
};

export default HomeSlider;
