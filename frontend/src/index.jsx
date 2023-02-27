import React from 'react';
import ReactDOM from 'react-dom';
import { ENVIRONMENT } from './constants';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';
import './ribbon.css';

const showDevRibbon = ENVIRONMENT === 'development';

ReactDOM.render(
  <>
    {showDevRibbon && <a className="github-fork-ribbon" href="#dev" data-ribbon="Development" title="Development">Development</a>}
    <App />
  </>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
