import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LogIn from "./screens/LogIn.js";
import InputData from "./screens/InputData.js";

ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'))