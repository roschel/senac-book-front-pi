import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { Flip, toast, ToastContainer } from 'react-toastify';
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
  const history = useHistory();

  useEffect(() => {
    setUserName(getSessionData().userFirstName)
  }, [location])

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    logout();
    history.replace("/")
  }

  const handleShowModal = () => {
    setShowModal(true)
  }

  const toggleIconTheme = () => {
    iconTheme === imgSun ? setIconTheme(imgMoon) : setIconTheme(imgSun)
    toggleTheme()
  }

  return (
    <>

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
                        <Link to="/admin/products" onClick={handleLogout}>
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
                      Login Menu
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
                        <Link to="/admin/products" onClick={handleLogout}>
                          Logout
                      </Link>
                      </div>
                    </Tooltip>
                  </div>
                )) : (
                <Link to="#" onClick={handleShowModal}>
                  Login
                </Link>
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
        style={{ width: "auto", color: "var(--white-equals)" }}
      />
    </>
  )
}

export default Navbar;

export const notify = (type: "error" | "success" | "warn", message: string) => {
  toast[type](message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    closeButton: false,
  })
};