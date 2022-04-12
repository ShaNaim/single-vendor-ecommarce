import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IconButton, Avatar } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@material-ui/core";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { mobile } from "../responsive";
import { ShoppingCartOutlined } from "@material-ui/icons";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { logOut } from "../redux/apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { deepPurple } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { ReactComponent as BoltIcon } from "./icons/searchIcon.svg";
import { IconContext } from "react-icons/lib";
import { SidebarData } from "./SidebarData";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import SubMenu from "./SubMenu";

const SearchIcon = styled(BoltIcon)`
	width: 25px;
	height: 25px;
	margin: 10px;
`;

const Wrapper = styled.div`
	min-height: 70px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	padding: 2px 15% 2px 15%;
	background: #58a5d8;
	color: white;
	margin-bottom: 10px;
	${mobile({
		flexDirection: "column",
		width: "100%",
		padding: "2px 0 0 0",
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
	})}
`;

const Container = styled.div`
	flex: 1;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	${mobile({ justifyContent: "space-around" })}
`;

const Form = styled.form`
	flex: 1;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	margin-left: 10px;
	${mobile({
		marginLeft: 0,
		paddingLeft: 10,
		paddingright: 10,
		marginTop: 4,
		backgroundColor: "#9575cd",
		width: "100%",
	})}
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

const AppTitle = styled.span`
	font-size: 22px;
	font-weight: 700;
	color: #fffefe;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const SearchField = styled.input`
	width: 100%;
	height: 30px;
	box-sizing: border-box;
	border: 2px solid #9c27b0;
	border-radius: 10px;
	outline: none;
	padding: 12px 20px 12px 46px;
	font-size: 18px;
	background-color: white;
	background-image: url("/images/searchIcon.png");
	background-position: 5px 1px;
	background-repeat: no-repeat;
	transition: height 0.4s ease-in-out, background-position 0.4s ease-in-out;
	:focus {
		height: 40px;
		background-position: 10px 6px;
	}
`;

const NavIcon = styled(Link)`
	margin-left: 2rem;
	font-size: 1.7rem;
	height: 80px;
	color: black;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const SidebarNav = styled.nav`
	background: #f1f2f5;
	color: black;
	width: 250px;
	height: 100vh;
	display: flex;
	justify-content: center;
	position: fixed;
	top: 0;
	left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
	transition: 350ms;
	z-index: 10;
`;

const SidebarWrap = styled.div`
	width: 100%;
`;

const Testnavbar = () => {
	const quantity = useSelector((state) => state.cart.quantity);
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();
	// const { isFetching, error } = useSelector((state) => state.user);
	const [anchorEl, setAnchorEl] = useState(null);
	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => setSidebar(!sidebar);
	const open = Boolean(anchorEl);

	const handleLogout = (e) => {
		e.preventDefault();
		logOut(dispatch);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Wrapper>
			<TitleConatiner>
				<Container>
					<NavIcon to="#">
						<FaBars onClick={showSidebar} />
					</NavIcon>
					<>
						<IconContext.Provider value={{ color: "#111010" }}>
							<SidebarNav sidebar={sidebar}>
								<SidebarWrap>
									<NavIcon to="#">
										<AiOutlineClose onClick={showSidebar} />
									</NavIcon>
									{SidebarData.map((item, index) => {
										return <SubMenu item={item} key={index} />;
									})}
								</SidebarWrap>
							</SidebarNav>
						</IconContext.Provider>
					</>

					<Link to="/">
						<AppTitle>
							<span>WhiteCoatBD</span>
						</AppTitle>
					</Link>
					{true ? (
						<Link to="/cart">
							<LinkContainer>
								<Badge badgeContent={quantity} color="primary">
									<ShoppingCartOutlined />
								</Badge>
								<span>Cart</span>
							</LinkContainer>
						</Link>
					) : (
						<></>
					)}
				</Container>
				<Form>
					<SearchField />
					<IconButton size="small" color="secondary" aria-label="search">
						<SearchIcon />
					</IconButton>
				</Form>
			</TitleConatiner>
			<MenuConatiner>
				<Link to="/category">
					<LinkContainer>
						<ShoppingBasketIcon />
						<span>Shop</span>
					</LinkContainer>
				</Link>
				<Link to="/cart">
					<Badge badgeContent={5} color="primary">
						<LinkContainer>
							<ShoppingCartOutlined />
							<span>Cart</span>
						</LinkContainer>
					</Badge>
				</Link>
				<>
					<Tooltip title="Account settings">
						<IconButton
							onClick={handleClick}
							size="small"
							sx={{ ml: 2 }}
							aria-controls={open ? "account-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
						>
							<Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
						</IconButton>
					</Tooltip>
					<Menu
						anchorEl={anchorEl}
						id="account-menu"
						open={open}
						onClose={handleClose}
						onClick={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								overflow: "visible",
								filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
								mt: 1.5,
								"& .MuiAvatar-root": {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1,
								},
								"&:before": {
									content: '""',
									display: "block",
									position: "absolute",
									top: 0,
									right: 14,
									width: 10,
									height: 10,
									bgcolor: "background.paper",
									transform: "translateY(-50%) rotate(45deg)",
									zIndex: 0,
								},
							},
						}}
						transformOrigin={{ horizontal: "right", vertical: "top" }}
						anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
					>
						{user ? (
							<>
								<Link to="/">
									<MenuItem>
										<Avatar /> Profile
									</MenuItem>
								</Link>
								<MenuItem>
									<Avatar /> My account
								</MenuItem>
								<Divider />
								<MenuItem>
									<ListItemIcon>
										<PersonAdd fontSize="small" />
									</ListItemIcon>
									Add another account
								</MenuItem>
								<MenuItem>
									<ListItemIcon>
										<Settings fontSize="small" />
									</ListItemIcon>
									Settings
								</MenuItem>
								<MenuItem onClick={handleLogout}>
									<ListItemIcon>
										<Logout fontSize="small" />
									</ListItemIcon>
									Logout
								</MenuItem>
							</>
						) : (
							<>
								<Link to="/login">
									<MenuItem>Login</MenuItem>
								</Link>
								<Link to="/register">
									<MenuItem>Register</MenuItem>
								</Link>
							</>
						)}
					</Menu>
				</>
			</MenuConatiner>
		</Wrapper>
	);
};

export default Testnavbar;
