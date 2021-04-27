import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { getSessionData, isAllowedRole, isAuthenticated, isTokenValid, logout } from '../utils/auth';
import './styles.scss';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setUserName(getSessionData().userFirstName)
  }, [location])

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    logout();
    history.replace('/admin/products')
}

  return (
    <nav className="row bg-primary main-nav">
      <div className="col2">
        <Link to="/" className='nav-logo-text'>
          <h4>Senac Books</h4>
        </Link>
      </div>
      <div className="col-6 offset-4" >
        <ul className="main-menu">
          <li>
            <NavLink to="/" exact>
              HOME
            </NavLink>
          </li>
          {/* <li>
            {(!isAuthenticated() || !isAllowedRole(["ROLE_CLIENTE"])) ? (
              <NavLink to="/auth/login">
                Login
              </NavLink>
            ) : (
              <NavLink to={`/client/${getSessionData().userId}`}>
                Olá, {userName}
              </NavLink>
            )}
          </li> */}

          <li>
            {(isAuthenticated() && isTokenValid()) ? (
              isAllowedRole(["ROLE_CLIENTE"]) ? (
                <NavLink to={`/client/${getSessionData().userId}`}>
                  Olá, {userName}
                </NavLink>
              ) : (
                <NavLink to="/admin/products">
                  Login
                </NavLink>
              )
            ) : (
              <NavLink to="/auth/login">
                Login
              </NavLink>
            )}
          </li>

          {userName && (
            <Link to="/auth/login" onClick={handleLogout}>
              Logout
            </Link>
          )}
          <li>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;