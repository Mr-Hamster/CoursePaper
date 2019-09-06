import React, { Component } from "react";
import { ThemeProvider } from '@material-ui/styles';
import * as api from '../api/index';
import '../styles/App.scss';
import InputData from "../screens/InputData";
import Cookies from "../screens/Cookies";

class App extends Component {
    state = {
        accept: false,
    }

    componentDidMount(){
        this.LoadCoinList();
        this.LoadRecentEvents();
    }

    LoadCoinList = () => {
        this.CheckCookies();
        api.crudBuilder(`https://min-api.cryptocompare.com/data/all/coinlist`).get().then(
            resp => {         
                let data = resp.data.Data;
                localStorage.setItem('data', JSON.stringify(data));
            }).catch(err => console.log('Error:', err));
    }

    CheckCookies = () => {
        let accept = JSON.parse(localStorage.getItem('accept'));
        console.log('accept', accept);
        if(!accept){
            this.setState({
                accept: false,
            })
        } else {
            this.setState({
                accept: true,
            })
        }
    }

    checkAccept = () => {
        this.setState({ 
            accept: true
          })
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
        const { accept } = this.state;
        return (
            <ThemeProvider>
                <div className="AppWrapper">
                    <h1>CRYPTO CAP</h1>
                    <InputData />
                    {
                        !accept ? <Cookies checkAccept = { this.checkAccept } /> : null
                    }
                </div>
            </ThemeProvider>
        );
    }
}

export default App;