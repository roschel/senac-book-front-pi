import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductDetails from './pages/Home/components/ProductDetails';
import Home from './pages/Home';

const Routes = () => (
	<BrowserRouter>
		{/* <Navbar /> */}
		<Switch>
			<Route path="/" exact>
				<Home />
			</Route>
			<Route path="/products/:productId">
				<ProductDetails />
			</Route>
		</Switch>
	</BrowserRouter>
)

export default Routes;