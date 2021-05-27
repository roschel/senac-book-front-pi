import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../../../../core/components/Routes/PrivateRoute';
import List from './components/List';
import './styles.scss';

const Orders = () => {
  return (
    <div>
      <Switch>
        <PrivateRoute path="/admin/clients/orders" exact>
          <List />
        </PrivateRoute>
      </Switch>
    </div>
  )
}

export default Orders;