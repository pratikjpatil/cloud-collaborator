import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <React.StrictMode>

    <Auth0Provider
      domain="dev-v0vo7am3h6r6xl05.us.auth0.com"
      clientId="9MzX5x4spAsMPwhBsm11nwK2BZXzMAuT"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >

      <App />

    </Auth0Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
