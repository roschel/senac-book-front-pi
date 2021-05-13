import React from 'react';
import { NavLink } from 'react-router-dom';
import { getSessionData } from '../../../../core/components/utils/auth';
import './styles.scss'

const NavBarClient = () => (
  <nav className="navbarLeft">
    <ul>
      <li>
        <NavLink className="admin-nav-item" to={`/client/${getSessionData().userId}`} exact>
          Cadastro
        </NavLink>
      </li>
      <li>
        <NavLink className="admin-nav-item" to={`/client/${getSessionData().userId}/addresses`}>
          Endereços
        </NavLink>
      </li>
      <li>
        <NavLink className="admin-nav-item" to={`/client/${getSessionData().userId}/orders`}>
          Pedidos
        </NavLink>
      </li>
    </ul>

  </nav>
)

export default NavBarClient;