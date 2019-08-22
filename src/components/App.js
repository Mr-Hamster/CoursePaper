import React, { Component } from "react";
import { ThemeProvider } from '@material-ui/styles';
import * as api from '../api/index';
import '../styles/App.scss';
import InputData from "../screens/InputData";
import LogIn from "../screens/LogIn";
import { Switch, Route,  } from 'react-router-dom'

class App extends Component {
    state = {
        
    }

    componentDidMount(){
        
    }

    render() {
        return (
            <ThemeProvider>
                <div className="AppWrapper">
                <Switch>
                    <Route exact path='/' component={LogIn} />
                    <Route path='/inputData' component={InputData} />
                </Switch>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;