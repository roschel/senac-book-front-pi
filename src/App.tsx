import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import './globalStyles.scss';

const App: React.FC = () => (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
)

export default App;
