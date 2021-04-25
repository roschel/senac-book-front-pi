import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getSessionData, isAllowedRole, isAuthenticated } from '../utils/auth';
import './styles.scss'

const Navbar = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    console.log('reiniciou')
    setUserName(getSessionData().userFirstName)
  }, [userName])


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
          <li>
            {(!isAuthenticated() && !isAllowedRole(["ROLE_CLIENTE"])) ? (
              <NavLink to="/auth/login">
                Login
              </NavLink>
            ) : (
              <NavLink to={`/client/${getSessionData().userId}`}>
                Olá, {userName}
              </NavLink>
            )}


          </li>
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;