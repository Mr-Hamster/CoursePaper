import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as api from '../api/index';
import Charts from '../screens/Chart.js';

import '../styles/InputData.scss';

let from = [], to = [];

export default class InputData extends React.Component {
    state = {
        variantFrom: 'BTC',
        variantTo: 'USDT',
        showChart: false,
        labels: [],
        dataBuy: [],
        dataSell: [],
    }
    
    AddDataToSessionStore = () => {
        const { variantFrom, variantTo } = this.state

        // from = JSON.parse(localStorage.getItem('variantFrom'));
        from.push(variantFrom);
        localStorage.setItem('variantFrom', JSON.stringify(from));

        to.push(variantTo);
        localStorage.setItem('variantTo', JSON.stringify(to));

    }

    LoadData = () => {
        const { variantFrom, variantTo } = this.state;  
        this.AddDataToLocalStore();
        if(!variantFrom || !variantTo){
            alert('Please enter tickers!');
        }else{
            let ticker = `${variantFrom}${variantTo}`;
            console.log(ticker);
            const binance = api.crudBuilder(`https://api.binance.com/api/v1/depth?symbol=${ticker}&limit=1000`).get().then(
                resp => {
                    console.log(resp);
                }
                ).catch(err => console.log('Error:', err));
            const binancePrice = api.crudBuilder(`https://api.binance.com/api/v3/ticker/price?symbol=${ticker}`).get().then(
                resp => {
                    let requestResp = resp.request.responseText;
                    console.log(requestResp);
                }
                ).catch(err => console.log('Error:', err));
            this.setState({
                showChart: true,
            })
        }
    }

    buildChart = (data1, data2, current) => {
    let dataBuy = [], dataSell = [],
        labels = buildLabelsList(current);

    //BUY
    for(let i in data2){
        for(let j in labels){

            let index = parseInt(j);

            if(index < labels.length/2){
                let label1 = parseFloat(labels[index].split(' - ')[0]),
                    label2 = parseFloat(labels[index].split(' - ')[1]);

                if(data2[i].price >= label1 && data2[i].price < label2){
                    if(!dataBuy[j]){
                        dataBuy[j] = data2[i].amount;
                    } else {
                        dataBuy[j] += data2[i].amount;
                    }
                }
            }
        }
    }

    //SELL
    for(let p in data1){
        for(let j in labels){
            let index = parseInt(j) - 1;

            if(index >= labels.length/2){

                let label1 = parseFloat(labels[index].split(' - ')[0]),
                    label2 = parseFloat(labels[index].split(' - ')[1]);
                if(data1[p].price >= label1 && data1[p].price < label2){
                    if(!dataSell[index]){
                        dataSell[index] = data1[p].amount;
                    } else {
                        dataSell[index] += data1[p].amount;
                    }
                }
            }
        }
    }

    let dSell = dataSell.length;

    for(let i = labels.length; i >= 0; i--){
        if(i >= dSell){
            labels.splice(i, 1);
        } else if((!dataBuy[i] || dataBuy[i] == 0) && (!dataSell[i] || dataSell[i] == 0)) {
            labels.splice(i, 1);
            dataBuy.splice(i, 1);
            dataSell.splice(i, 1);
        }
    }

    this.setState({
        labels: labels,
        dataBuy: dataBuy,
        dataSell: dataSell,
    })
    }

    buildLabelsList = (current) => {
        let labels1 = [], labels2 = [], newCurrent1 = parseFloat(current), newCurrent2 = newCurrent1;
    
        for(let i = 1; i <= labelsCount; i++){
            let label1 = '0 - ';
            if(i != 1) label1 = parseFloat(newCurrent1.toFixed(7)) + ' - ';
            let label2 = parseFloat(newCurrent2.toFixed(7)) + ' - ';
            newCurrent1 = parseFloat(current) - current*perc*(labelsCount-i)/100;
            newCurrent2 = parseFloat(current) + current*perc*i/100;
            label1 += parseFloat(newCurrent1.toFixed(7));
            label2 += parseFloat(newCurrent2.toFixed(7));
            labels1.push(label1);
            labels2.push(label2);
        }
    
        return labels1.concat(labels2);
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
                                    variantFrom: event.target.value.toUpperCase()
                                })
                            } }
                            value={this.state.variantFrom}
                            style={{ width: '300px' }}
                        />
                        <TextField
                            id="outlined-uncontrolled"
                            label="To"
                            defaultValue=""
                            margin="normal"
                            variant="outlined"
                            onChange = { (event) => {
                                this.setState({
                                    variantTo: event.target.value.toUpperCase()
                                })
                            } }
                            value={this.state.variantTo}
                            style={{ width: '300px' }}
                        />
                    </div>
                    <Button variant="contained" color="primary" style={{width:'30%', height:'50px'}} onClick={ this.LoadData }>
                        Get Exchanges Results
                    </Button>
                </div>
                {
                    this.state.showChart ? <Charts /> : null
                }
            </div>
        );
    }
}