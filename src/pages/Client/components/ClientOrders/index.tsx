import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../../../../core/components/Routes/PrivateRoute';
import List from './components/List';
  
const ClientOrders = () => {

  return (
    <div>
      <Switch>
        <PrivateRoute path="/client/:clientId/orders" exact>
          <List />
        </PrivateRoute>
        <PrivateRoute allowedRoutes={['ROLE_ADMIN']} path="/admin/users/:userId">
          {/* <Form /> */}
        </PrivateRoute>
      </Switch>
    </div>
  )
}

export default ClientOrders;