import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../Auth';
import NavbarLeft from './components/NavbarLeft';
import Products from './components/Products';
import User from './components/User';
import './styles.scss';

const Admin = () => (
    <div className="admin-container">
        <NavbarLeft />
        <div className="admin-content">
            <Switch>
                <Route path="/admin/login">
                    <Auth />
                </Route>
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