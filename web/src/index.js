import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { Router } from 'react-router-dom';

window.history_ = require('history').createBrowserHistory();

ReactDOM.render((
  <Router history={window.history_}>
    <App />
  </Router>
), document.getElementById('root'));
