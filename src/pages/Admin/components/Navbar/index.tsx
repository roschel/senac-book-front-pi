import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './styles.scss'

const Navbar = () => (
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
                    <NavLink to="/admin">
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/user">
                        User
                    </NavLink>
                </li>
            </ul>
        </div>
    </nav>
)

export default Navbar;