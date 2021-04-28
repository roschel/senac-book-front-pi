import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../../core/components/Routes/PrivateRoute';
import ClientAddress from './components/ClientAddress';
import ClientData from './components/ClientData';
import NavBarClient from './components/NavbarClient';

import './styles.scss';

const Client = () => (
    <div className="admin-container">
        <NavBarClient />
        <div className="admin-content">
            <Switch>
                <PrivateRoute allowedRoutes={['ROLE_CLIENTE']} path="/client/:clientId" exact>
                    <ClientData />
                </PrivateRoute>
                <PrivateRoute allowedRoutes={['ROLE_CLIENTE']} path="/client/:clientId/addresses">
                    <ClientAddress />
                </PrivateRoute>
            </Switch>
        </div>
    </div>
);

export default Client;