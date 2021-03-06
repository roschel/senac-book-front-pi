import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProductDetails from './pages/Home/components/ProductDetails';
import Home from './pages/Home';
import ListarProduto from './pages/Admin/ListarProduto';

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
			<Route path="/Admin/products">
				<ListarProduto />
			</Route>
		</Switch>
	</BrowserRouter>
)

export default Routes;