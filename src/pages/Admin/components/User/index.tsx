import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from '../../../../core/components/Routes/PrivateRoute';
import Form from './components/Form';
import List from './components/List';
import './styles.scss';

const User = () => {
  return (
    <div>
      <Switch>
        <PrivateRoute path="/admin/users" exact>
          <List />
        </PrivateRoute>
        <PrivateRoute allowedRoutes={['ROLE_ADMIN']} path="/admin/users/:userId">
          <Form />
        </PrivateRoute>
      </Switch>
    </div>
  )
}

export default User;