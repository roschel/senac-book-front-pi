import React from 'react';
import './styles.scss'
import { Route, Switch } from 'react-router-dom';
import Products from './components/Products';
import User from './components/User';

const Admin = () => (
    <div className="admin-container">
        <div className="admin-content">
            <Switch>
                <Route path="/admin/products">
                    <Products />
                </Route>
                <Route path="/admin/users">
                    <User />
                </Route>
            </Switch>
        </div>
    </div>
);

export default Admin;