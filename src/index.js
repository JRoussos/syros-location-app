import React from 'react';
import ReactDOM from 'react-dom';

import App from './recycle/recycle';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './i18n/i18n';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();