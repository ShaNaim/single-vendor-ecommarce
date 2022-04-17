import "./App.css";
import { createRef } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { SnackbarProvider } from "notistack";
// Components
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";

//Pages
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import OrderList from "./pages/Order/OrderList";
import OrderView from "./pages/Order/OrderView";
import Categories from "./pages/Category/Categories";
import Message from "./pages/message/Message";
import MessageDetails from "./pages/message/MessageDetails";
// UI
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
/////
function App() {
	const currentUser = useSelector((state) => state.user.currentUser);
	let admin = null;
	if (currentUser) admin = currentUser.isAdmin;
	const notistackRef = createRef();
	const onClickDismiss = (key) => () => {
		notistackRef.current.closeSnackbar(key);
	};

	return (
		<SnackbarProvider
			ref={notistackRef}
			action={(key) => (
				<Button onClick={onClickDismiss(key)}>
					{" "}
					<CloseIcon />{" "}
				</Button>
			)}
			maxSnack={4}
		>
			<Router>
				<Switch>
					<Route path="/login">
						<Login />
					</Route>
					{admin ? (
						<>
							<Topbar />
							<div className="container">
								<Sidebar />
								<Route exact path="/">
									<Home />
								</Route>
								<Route exact path="/users">
									<UserList />
								</Route>
								<Route exact path="/messages">
									<Message />
								</Route>
								<Route exact path="/messages/details/:id">
									<MessageDetails />
								</Route>
								<Route exact path="/orders">
									<OrderList />
								</Route>
								<Route path="/order/:id">
									<OrderView />
								</Route>
								<Route path="/layouts/categories">
									<Categories />
								</Route>
								<Route path="/user/:userId">
									<User />
								</Route>
								<Route path="/products">
									<ProductList />
								</Route>
								<Route path="/product/:productId">
									<Product />
								</Route>
								<Route path="/newproduct">
									<NewProduct />
								</Route>
							</div>
						</>
					) : (
						<Redirect to="/login" />
					)}
				</Switch>
			</Router>
		</SnackbarProvider>
	);
}

export default App;
