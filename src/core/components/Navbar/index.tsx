import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import Login from '../../../pages/Auth/components/Login';
import Modal from '../Modal';
import { getSessionData, isAllowedRole, isAuthenticated, isTokenValid, logout } from '../utils/auth';
import { getLocationElement } from '../utils/functions';
import imgCart from '../../assets/images/cesta.svg'
import './styles.scss';
import Tooltip from '../tooltip';

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const history = useHistory();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [top, left, height, width] = getLocationElement(document.getElementById("profile"));
  const [showModalLogin, setShowModalLogin] = useState(false);

  useEffect(() => {
    setUserName(getSessionData().userFirstName)
  }, [location])

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    logout();
    // history.replace('/admin/products')
    history.replace('/')
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
              isAllowedRole(["ROLE_CLIENTE"]) ? (
                <div
                  onClick={() => setTooltipVisible(!tooltipVisible)}
                  onMouseEnter={() => setTooltipVisible(true)}
                  onMouseLeave={() => setTooltipVisible(false)}
                >
                  <span
                    id="profile"
                    className={`perfil ${tooltipVisible ? "perfil-active" : ""}`}
                  >
                    Olá, {userName}
                  </span>
                  <Tooltip
                    visible={tooltipVisible}
                    location={{
                      left: left ?? 0,
                      top: top ?? 0,
                      height: height,
                      width: width
                    }}
                    position="bottom"
                  >
                    <Link
                      to={`/client/${getSessionData().userId}`}
                    >
                      Perfil
                    </Link>
                    <br />
                    <Link
                      to="/auth/login" onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </Tooltip>
                </div>
              ) : (
                // <NavLink to="/admin/products">
                <Link to="/" onClick={() => setShowModalLogin(true)}>
                  LOGIN
                </Link>
                // </NavLink>
              )
            ) : (
              // <NavLink to="/auth/login">
              <Link to="/" onClick={() => setShowModalLogin(true)}>
                LOGIN
              </Link>
              // {/* </NavLink> */}
            )}
          </li>

          {/* {userName && (
            <Link to="/auth/login" onClick={handleLogout}>
              Logout
            </Link>
          )} */}
          <li>
            <NavLink to="/cart" exact>
                <img className="img-cart" src={imgCart} alt=""/>
            </NavLink>
          </li>
        </ul>
      </div>

      <Modal
        showModal={showModalLogin}
        setShowModal={setShowModalLogin}
      >
        <Login
          setShowModal={setShowModalLogin}
        />
      </Modal>
    </nav>
  )
}

export default Navbar;