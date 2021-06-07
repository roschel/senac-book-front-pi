import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import FinalCheckout from '../src/pages/Cart/components/Checkout/components/FinalCheckout';
import Navbar from './core/components/Navbar';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Client from './pages/Client';
import Register from './pages/Client/components/Form';
import Home from './pages/Home';
import { ThemeProvider } from 'styled-components';
import { darkTheme, GlobalStyles, lightTheme } from './themes'

const Routes = () => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Navbar toggleTheme={toggleTheme} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Redirect from="/admin" to="/admin/products" exact />

          <Route path="/admin">
            <Admin />
          </Route>

          <Route path="/client/register">
            <Register />
          </Route>

          <Route path="/cart">
            <Cart />
          </Route>

          <Route path="/client">
            <Client />
          </Route>

          <Route path="/finalCheckout">
            <FinalCheckout />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default Routes;