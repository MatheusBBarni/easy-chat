import React from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';

import ResetCss from './styles/reset-css';
import GlobalStyles from './styles/global';
import Routes from './pages/routes';

function App() {
  return (
    <Router>
      <ResetCss />
      <GlobalStyles />
      <Routes />
    </Router>
  );
}

export default App;
