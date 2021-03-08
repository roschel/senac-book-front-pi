import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ProductDetails from './pages/Home/components/ProductDetails';
import Home from './pages/Home';
import Navbar from './core/components/Navbar';
import Admin from './pages/Admin';

const Routes = () => (
	<BrowserRouter>
		<Navbar />
		<Switch>
			<Route path="/" exact>
				<Home />
			</Route>
			<Route path="/products/:productId">
				<ProductDetails />
			</Route>
			<Redirect from="/admin" to="/admin/products" exact />
			<Route path="/admin">
				<Admin />
			</Route>
		</Switch>
	</BrowserRouter>
)

export default Routes;