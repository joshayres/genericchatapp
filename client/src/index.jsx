
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import { Auth0Provider } from "@auth0/auth0-react"

ReactDOM.render(
  <Auth0Provider
    domain="joshayres.auth0.com"
    clientId="lWfHKBC5ZbV2pBbl6L8UCMCZVG74mlzu"
    redirectUri={window.location.origin}
    audience="https://joshayres.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>,
  document.getElementById('app'));