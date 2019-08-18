import React, { Component } from "react";
import { ThemeProvider } from '@material-ui/styles';
import * as api from '../api/index';
import '../styles/App.scss';
import InputData from "../screens/InputData";
import CoinNews from "../screens/CoinNews";
import Cookies from "../screens/Cookies";

class App extends Component {
    state = {
        accept: false,
    }

    componentDidMount(){
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