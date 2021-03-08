import React from 'react';
import './styles.scss'
import { Route, Switch } from 'react-router-dom';
import Products from './components/Products';

const Admin = () => (
    <div className="admin-container">
        <div className="admin-content">
            <Switch>
                <Route path="/admin/products">
                    <Products />
                </Route>
            </Switch>
        </div>
    </div>
);

export default Admin;