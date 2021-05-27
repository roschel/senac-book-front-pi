import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import Tooltip from '../tooltip/tooltip';
import { getSessionData, isAllowedRole, isAuthenticated, isTokenValid, logout } from '../utils/auth';
import imgCart from '../../assets/images/cesta.svg'
import './styles.scss';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const history = useHistory();
  const [tooltipVisible, setTooltipVisible] = useState(false);

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
                <div
                  onClick={() => setTooltipVisible(!tooltipVisible)}
                  onMouseEnter={() => setTooltipVisible(true)}
                  onMouseLeave={() => setTooltipVisible(false)}
                  className="perfil">
                  <span>Olá, {userName}</span>
                  <Tooltip visible={tooltipVisible}>
                    <Link to={`/client/${getSessionData().userId}`}>
                      Perfil
                    </Link>
                    <br />
                    <Link to="/auth/login" onClick={handleLogout}>
                      Logout
                    </Link>
                  </Tooltip>
                </div>
              ) : (
                <div
                  onClick={() => setTooltipVisible(!tooltipVisible)}
                  onMouseEnter={() => setTooltipVisible(true)}
                  onMouseLeave={() => setTooltipVisible(false)}
                  className="perfil">
                  <NavLink to="/admin/products">
                    Login
                  </NavLink>
                  <Tooltip visible={tooltipVisible}>
                    <Link to="/auth/login" onClick={handleLogout}>
                      Logout
                    </Link>
                  </Tooltip>
                </div>
              )
            ) : (
              <NavLink to="/auth/login">
                Login
              </NavLink>
            )}
          </li>

          {/* {userName && (
            <Link to="/auth/login" onClick={handleLogout}>
              Logout
            </Link>
          )} */}
          <li>
            <NavLink to="/cart" exact>
              <img className="img-cart" src={imgCart} alt="" />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;