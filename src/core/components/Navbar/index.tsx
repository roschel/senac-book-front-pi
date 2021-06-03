import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Login from '../../../pages/Auth/components/Login';
import imgCart from '../../assets/images/cart-light.svg';
import imgMoon from '../../assets/images/moon-light.svg';
import imgSun from '../../assets/images/sun-light.svg';
import Tooltip from '../tooltip';
import { getSessionData, isAllowedRole, isAuthenticated, isTokenValid, logout } from '../utils/auth';
import { getLocationElement } from '../utils/functions';
import './styles.scss';

type Props = {
  toggleTheme: () => void;
}

const Navbar = ({ toggleTheme }: Props) => {
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const [top, left, height, width] = getLocationElement(document.getElementById("profile"));
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [iconTheme, setIconTheme] = useState(imgSun)

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

  const toggleIconTheme = () => {
    iconTheme === imgSun ? setIconTheme(imgMoon) : setIconTheme(imgSun)
    toggleTheme()
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
                    <div>
                      <Link to={`/client/${getSessionData().userId}`}>
                        Perfil
                      </Link>
                      <br />
                      <Link to="/" onClick={handleLogout}>
                        Logout
                      </Link>
                    </div>
                  </Tooltip>
                </div>
              ) : (
                <div
                  onClick={() => setShowTooltip(!showTooltip)}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <Link to="/admin/products"
                    id="profile"
                    className={`profile ${showTooltip ? "profile-active" : ""}`}
                  >
                    Login
                  </Link>
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
                    <div>
                      <Link to="/" onClick={handleLogout}>
                        Logout
                      </Link>
                    </div>
                  </Tooltip>
                </div>
              )) : (
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
          <li>
            <div className="cart" onClick={toggleIconTheme}>
              <img src={iconTheme} alt="" width={30} />
            </div>
          </li>
        </ul>
        <Login showModal={showModal} setShowModal={setShowModal} />
      </div>
    </nav>
  )
}

export default Navbar;
