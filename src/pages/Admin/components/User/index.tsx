import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from '../../../../core/components/Search';
import Form from './components/Form';
import List from './components/List';
import './styles.scss';

const User = () => {
  return (
    <div>
      <Switch>
        <Route path="/admin/users" exact>
          <List />
        </Route>
        <Route path="/admin/users/:userId">
          <Form />
        </Route>
      </Switch>
    </div>
  )
}

export default User;