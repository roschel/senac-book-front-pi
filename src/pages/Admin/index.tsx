import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../../core/components/Routes/PrivateRoute';
import NavbarLeft from './components/NavbarLeft';
import Orders from './components/Orders';
import Products from './components/Products';
import User from './components/User';
import './styles.scss';

const Admin = () => (
    <div className="admin-container">
        <NavbarLeft />
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/admin/products">
                    <Products />
                </PrivateRoute>
                <PrivateRoute path="/admin/users">
                    <User />
                </PrivateRoute>
                <PrivateRoute path="/admin/clients/orders">
                    <Orders />
                </PrivateRoute>
            </Switch>
        </div>
    </div>
);

export default Admin;