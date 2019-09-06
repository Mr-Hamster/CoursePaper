import React, { Component } from "react";
import { ThemeProvider } from '@material-ui/styles';
import * as api from '../api/index';
import '../styles/App.scss';
import InputData from "../screens/InputData";
import LogIn from "../screens/LogIn";
import { Switch, Route,  } from 'react-router-dom'
import Cookies from "../screens/Cookies";

class App extends Component {
    state = {
        
    }

    componentDidMount(){
        
    }

    LoadRecentEvents = () => {
        api.eventsRequest(`https://developers.coinmarketcal.com/v1/events?max=150`).get().then(
            resp => {
                let data = resp.data.body;
                localStorage.setItem('recentEvents', JSON.stringify(data));
            }).catch(err => {
                alert(`${err}`)
            });
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