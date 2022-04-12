import { createRef, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SnackbarProvider } from "notistack";
import { authenticate, getAllOrders } from "./redux/apiCalls";
// UI
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import OrderList from "./pages/Order/OrderList";
import OrderView from "./pages/Order/OrderView";
import Tabs from "./pages/Tabs";
import Categories from "./pages/Category/Categories";
import HomePage from "./pages/HomePage/HomePage";
import Button from "@mui/material/Button";
import Config from "./pages/Config/Config";

function App() {
	const dispatch = useDispatch();

	const currentUser = useSelector((state) => state.user.currentUser);
	let admin = null;
	if (currentUser) admin = currentUser.isAdmin;
	console.log(currentUser);
	const notistackRef = createRef();
	const onClickDismiss = (key) => () => {
		notistackRef.current.closeSnackbar(key);
	};

	return (
		<SnackbarProvider ref={notistackRef} action={(key) => <Button onClick={onClickDismiss(key)}>'Dismiss'</Button>} maxSnack={4}>
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
								<Route exact path="/orders">
									<OrderList />
								</Route>
								<Route path="/order/:id">
									<OrderView />
								</Route>
								<Route path="/layouts/config">
									<Config />
								</Route>
								<Route path="/layouts/categories">
									<Categories />
								</Route>
								<Route path="/layouts/homepage">
									<HomePage />
								</Route>
								<Route path="/layouts/tabs">
									<Tabs />
								</Route>
								<Route path="/user/:userId">
									<User />
								</Route>
								<Route path="/newUser">
									<NewUser />
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
