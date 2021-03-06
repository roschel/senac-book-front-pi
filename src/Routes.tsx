import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ProductDetails from './pages/Home/components/ProductDetails';
import Home from './pages/Home';

import Navbar from './core/components/Navbar';
import Admin from './pages/Admin';

import Auth from './pages/Auth';

import Register from './pages/Client/components/Form'
import Client from './pages/Client';

import Cart from './pages/Cart'
import FinalCheckout from '../src/pages/Cart/components/Checkout/components/FinalCheckout'

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

			<Route path="/auth">
				<Auth />
			</Route>

			<Redirect from="/admin" to="/admin/products" exact />

			<Route path="/admin">
				<Admin />
			</Route>

			<Route path="/client/register">
				<Register />
			</Route>

			<Route path="/cart">
				<Cart />
			</Route>

      		<Route path="/client">
				<Client />
			</Route>

      		<Route path="/finalCheckout">
				<FinalCheckout />
			</Route>

		</Switch>
	</BrowserRouter>
)

export default Routes;