import React, { Component } from "react";
import { ThemeProvider } from '@material-ui/styles';

import '../styles/App.scss';
import InputData from "../screens/InputData";

class App extends Component {
    render() {
        return (
            <ThemeProvider>
                <div className="AppWrapper">
                    <h1>CRYPTO CAP</h1>
                    <InputData />
                </div>
            </ThemeProvider>
        );
    }
}

export default App;