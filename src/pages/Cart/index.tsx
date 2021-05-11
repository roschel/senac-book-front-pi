import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../../core/components/Routes/PrivateRoute';
import Checkout from './components/Checkout';
import Items from './components/Items';

const Cart = () => (
    <div className="">
        <div className="">
            <Switch>
                <Route path="/cart" exact>
                    <Items />
                </Route>
                <PrivateRoute allowedRoutes={['ROLE_CLIENTE']} path="/cart/checkout">
                    <Checkout />
                </PrivateRoute>
            </Switch>
        </div>
    </div>
);

export default Cart;