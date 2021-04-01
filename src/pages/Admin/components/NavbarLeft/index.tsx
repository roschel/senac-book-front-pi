import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss'

const NavbarLeft = () => (
    <nav className="navbarLeft">
            <ul>
                <li>
                    <NavLink className="admin-nav-item" to="/admin/products" exact>
                       Produtos
                    </NavLink>
                </li>
                <li>
                    <NavLink className="admin-nav-item" to="/admin/users">
                        Usuários
                    </NavLink>
                </li>
                <li>
                    <NavLink className="admin-nav-item" to="/admin/clients">
                        Clientes
                    </NavLink>
                </li>
            </ul>
        
    </nav>
)

export default NavbarLeft;