import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as api from '../api/index';
import Charts from '../screens/Chart.js';

import '../styles/InputData.scss';

export default class InputData extends React.Component {
    state = {
        variantFrom: '',
        variantTo: '',
    }
    
    LoadData = () => {
        const { variantFrom, variantTo } = this.state;  
        if(!variantFrom || !variantTo){
            alert('Please enter tickers!');
        }else{
            let ticker = `${variantFrom.toUpperCase()}${variantTo.toUpperCase()}`;
            const binance = api.crudBuilder(`https://api.binance.com/api/v1/depth?symbol=${ticker}&limit=1000`).get();
            const binancePrice = api.crudBuilder(`https://api.binance.com/api/v1/depth?symbol=${ticker}`).get();
            console.log(binance,binancePrice);
        }
    }

    render() {
        console.log('State.........',this.state);
        return (
            <div className="wrapperInputData">
                <div className="inputData"> 
                    <div className="textField"> 
                        <TextField
                            id="outlined-uncontrolled"
                            label="From"
                            defaultValue=""
                            margin="normal"
                            variant="outlined"
                            onChange = { (event) => {
                                this.setState({
                                    variantFrom: event.target.value
                                })
                            } }
                        />
                        <TextField
                            id="outlined-uncontrolled"
                            label="To"
                            defaultValue=""
                            margin="normal"
                            variant="outlined"
                            onChange = { (event) => {
                                this.setState({
                                    variantTo: event.target.value
                                })
                            } }
                        />
                    </div>
                    <Button variant="contained" color="primary" style={{width:'30%', height:'50px'}} onClick={ this.LoadData }>
                        Get Exchanges Results
                    </Button>
                </div>
                <Charts />
            </div>
        );
    }
}