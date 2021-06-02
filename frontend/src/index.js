import React from 'react';

import axios from 'axios';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

require('dotenv').config();

axios.defaults.baseURL = process.env.REACT_APP_API_URL || '127.0.0.1:5000';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
