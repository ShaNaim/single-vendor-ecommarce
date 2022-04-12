import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
//... Components ?
import CategoryList from "./components/CategoryList";
import CategoryItem from "./components/CategoryItem";
//.... Pages
import Success from "./pages/Success";
import Profilepage from "./pages/Profile/ProfilePage";
import Product from "./pages/Product/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register/Register";
import Login from "./pages/Register/Login";
import Cart from "./pages/Cart/Cart.jsx";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import PageNotFound from "./pages/PageNotFound";

export default function routes({ user }) {
	return (
		<>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/categories">
					<CategoryItem default="0" />
				</Route>
				<Route exact path="/shop">
					<CategoryItem default="0" />
				</Route>
				<Route exact path="/categories/:category">
					<CategoryList />
				</Route>
				<Route path="/products">
					<ProductList />
				</Route>
				<Route path="/profile">
					<Profilepage user={user} />
				</Route>
				<Route path="/product/:id">
					<Product />
				</Route>
				<Route path="/cart">
					<Cart />
				</Route>
				<Route path="/checkout">
					<CheckoutPage />
				</Route>
				<Route path="/success">
					<Success />
				</Route>
				<Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
				<Route path="/register">{user ? <Redirect to="/" /> : <Register />}</Route>
				<Route path="*">
					<PageNotFound />
				</Route>
			</Switch>
		</>
	);
}
