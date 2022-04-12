import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMobile } from "../../customHooks";
import { mobile } from "../../responsive";
//... UI
import { Badge } from "@material-ui/core";
import Profile from "./Profile";
//... Icon
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { ShoppingCartOutlined } from "@material-ui/icons";
//....
const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	background: #58a5d8;
	${({ isMobile }) => isMobile && "position: -webkit-sticky;"}
	${({ isMobile }) => isMobile && "position: sticky;"}
	${({ isMobile }) => isMobile && "top: 0;"}
	z-index: 20;
	padding: 1px 15% 1px 15%;
	color: white;
	margin-bottom: 10px;
	${mobile({
		flexDirection: "column",
		width: "100%",
		padding: "0 0 0 0",
		marginBottom: 4,
	})}
`;

const TitleConatiner = styled.div`
	flex: 2;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 2px 30px 2px 30px;
	background: #58a5d8;
	color: white;
	${mobile({
		flexDirection: "column",
		padding: "2px 0px 0 0px",
		justifyContent: "space-evenly",
	})};
`;

const Container = styled.div`
	flex: 1;
	max-height: 60px;
	min-height: 60px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	${mobile({ justifyContent: "space-around" })}
`;

const MenuConatiner = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 2px 30px 2px 30px;
	background: #58a5d8;
	color: white;
	${mobile({ display: "none" })}
`;

const LinkContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	color: white;
	margin-left: 20px;
	margin-right: 20px;
	> span {
		margin-top: -1px;
		font-size: 12px;
		${mobile({ marginLeft: "5px", marginTop: "2px" })}
	}
`;

const LinkContainerMobile = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: flex-end;
	${mobile({ marginRight: "18px" })}
`;

const AppTitle = styled.span`
	${({ isMobile }) => (isMobile ? "font-size: 16px;" : "font-size: 22px;")}
	font-weight: 700;
	color: #fffefe;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	text-shadow: -4px 4px 1px rgba(31, 29, 29, 0.27);
`;

const NavBar = () => {
	const isMobile = useMobile(1000);
	const quantity = useSelector((state) => state.cart.quantity);

	return (
		<Wrapper isMobile={isMobile}>
			<TitleConatiner>
				<Container>
					<Link to="/">
						<AppTitle isMobile={isMobile}>Tennis Online Shopping</AppTitle>
					</Link>
					{isMobile && (
						<LinkContainerMobile>
							<Link to="/cart">
								<LinkContainer>
									<Badge badgeContent={quantity} color="primary">
										<ShoppingCartOutlined />
									</Badge>
									<span>Cart</span>
								</LinkContainer>
							</Link>
							<Profile isMobile={isMobile} />
						</LinkContainerMobile>
					)}
				</Container>
			</TitleConatiner>
			<MenuConatiner>
				<Link to="/products">
					<LinkContainer>
						<ShoppingBasketIcon />
						<span>Products</span>
					</LinkContainer>
				</Link>
				<Link to="/shop">
					<LinkContainer>
						<ShoppingBasketIcon />
						<span>Shop</span>
					</LinkContainer>
				</Link>
				<Link to="/cart">
					<LinkContainer>
						<Badge badgeContent={quantity} color="primary">
							<ShoppingCartOutlined />
						</Badge>
						<span>Cart</span>
					</LinkContainer>
				</Link>
				<Profile isMobile={isMobile} />
			</MenuConatiner>
		</Wrapper>
	);
};

export default NavBar;
