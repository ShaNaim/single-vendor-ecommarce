import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logOut } from "../../redux/apiCalls";
import { useSelector, useDispatch } from "react-redux";
//... UI
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { IconButton, Avatar } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";

const Profile = (props) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const dispatch = useDispatch();
	const open = Boolean(anchorEl);
	const user = useSelector((state) => state.user.currentUser);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = (e) => {
		e.preventDefault();
		logOut(dispatch);
	};
	return (
		<div>
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
					<div>
						{props.isMobile && (
							<>
								<Link to="/products">
									<MenuItem>
										<ShoppingBasketIcon className="me-2 text-success" />
										Products
									</MenuItem>
								</Link>
								<Link to="/shop">
									<MenuItem>
										<ShoppingBasketIcon className="me-2 text-success" />
										Shop
									</MenuItem>
								</Link>
								<Divider />
							</>
						)}
						{user ? (
							<>
								<Link to="/profile">
									<MenuItem>
										<Avatar /> Profile
									</MenuItem>
								</Link>
								<MenuItem>
									<Avatar /> My Orders
								</MenuItem>
								<Divider />
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
					</div>
				</Menu>
			</>
		</div>
	);
};

export default Profile;
