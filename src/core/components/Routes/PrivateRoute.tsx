import React from 'react'
import { Redirect, Route } from 'react-router'
import { isAllowedRole, isAuthenticated, Role } from '../utils/auth'

type Props = {
  children: React.ReactNode;
  path: string;
  allowedRoutes?: Role[];
  exact?: boolean;
}

const PrivateRoute = ({children, path, allowedRoutes}: Props) => {

  return (
    <Route
      path={path}
      render={({ location }) => {
        if (!isAuthenticated()) {
          return (
            <Redirect
              to={{
                // pathname: "/auth/login",
                pathname: "/",
                state: {from: location}
              }}
            />
          )
        } else if (isAuthenticated() && !isAllowedRole(allowedRoutes)) {
          return(<Redirect to={{pathname:'/admin'}} />)
        }

        return children
      }}
    >

    </Route>
  )
}

export default PrivateRoute