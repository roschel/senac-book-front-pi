import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import Login from '../../../pages/Auth/components/Login';
import imgCart from '../../assets/images/cesta.svg';
import Tooltip from '../tooltip';
import { getSessionData, isAllowedRole, isAuthenticated, isTokenValid, logout } from '../utils/auth';
import { getLocationElement } from '../utils/functions';
import './styles.scss';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const [top, left, height, width] = getLocationElement(document.getElementById("profile"));
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setUserName(getSessionData().userFirstName)
  }, [location])

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    logout();
  }

  const handleShowModal = () => {
    setShowModal(true)
  }

  return (
    <nav className="main-nav">
      <div>
        <Link to="/" className='nav-logo-text'>
          <h4>Senac Books</h4>
        </Link>
      </div>

      <div>
        <ul className="main-menu">
          <li>
            <NavLink to="/" exact>
              HOME
            </NavLink>
          </li>
          <li>
            {(isAuthenticated() && isTokenValid()) ? (
              <div
                onClick={() => setShowTooltip(!showTooltip)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <span
                  id="profile"
                  className={`profile ${showTooltip ? "profile-active" : ""}`}
                >
                  Olá, {userName}
                </span>
                <Tooltip
                  showTooltip={showTooltip}
                  position="bottom"
                  location={{
                    left: left ?? 0,
                    top: top ?? 0,
                    height: height,
                    width: width
                  }}
                >
                  {isAllowedRole(["ROLE_CLIENTE"]) ? (
                    <div>
                      <Link to={`/client/${getSessionData().userId}`}>
                        Perfil
                      </Link>
                      <br />
                      <Link to="/" onClick={handleLogout}>
                        Logout
                      </Link>
                    </div>
                  ) : (
                    <Link to="/" onClick={handleLogout}>
                      Logout
                    </Link>
                  )}
                </Tooltip>
              </div>
            ) : (
              <NavLink to="/auth/login">
                <Link to="/" onClick={handleShowModal}>
                  Login
                </Link>
              </NavLink>
            )}
          </li>
          <li>
            <NavLink to="/cart" exact className="cart">
              <img className="img-cart" src={imgCart} alt="Carrinho" />
            </NavLink>
          </li>
        </ul>
        <Login showModal={showModal} setShowModal={setShowModal} />
      </div>
    </nav>
  )
}

export default Navbar;
