import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';
// import './styles.scss'

const ClientAddress = () => {
    return (
        <div>
            <Switch>
                <Route path="/client/:clientId/addresses" exact>
                    <List />
                </Route>
                <Route path="/client/:clientId/addresses/:addressId">
                    <Form />
                </Route>
            </Switch>
        </div>
    );
}

export default ClientAddress;