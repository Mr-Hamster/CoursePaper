import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as api from '../api/index';
import Charts from '../screens/Chart.js';

import '../styles/InputData.scss';

// let from = [], to = [];

let perc = 1, labelsCount = 100/perc;
let bigestAskAmount, bigestAskPrice, bigestBidAmount, bigestBidPrice;

export default class InputData extends React.Component {
    state = {
        variantFrom: 'BTC',
        variantTo: 'USDT',
        showChart: false,
        labels: [],
        dataBuy: [],
        dataSell: [],
        loader: false,
    }
     
    // AddDataToSessionStore = () => {
    //     const { variantFrom, variantTo } = this.state

    //     // from = JSON.parse(localStorage.getItem('variantFrom'));
    //     from.push(variantFrom);
    //     localStorage.setItem('variantFrom', JSON.stringify(from));

    //     to.push(variantTo);
    //     localStorage.setItem('variantTo', JSON.stringify(to));

    // }

    

    LoadData = () => {
        const { variantFrom, variantTo } = this.state;  
        let requestResp;
        // this.AddDataToLocalStore();
        this.setState({
            loader: true,
            showChart: false,
        })
        if(!variantFrom || !variantTo){
            alert('Please enter tickers!');
        }else{
            let ticker = `${variantFrom}${variantTo}`;
            api.crudBuilder(`https://api.binance.com/api/v1/depth?symbol=${ticker}&limit=1000`).get().then(
                resp => {
                    requestResp = resp.request.responseText;
                    this.getPrice(ticker, requestResp);
                }).catch(err => console.log('Error:', err));
        }
    }

    getPrice = (ticker, requestResp) => {
        api.crudBuilder(`https://api.binance.com/api/v3/ticker/price?symbol=${ticker}`).get().then(
            resp => {         
                let currentPrice = JSON.parse(resp.request.responseText).price;
                this.buildChart(currentPrice, requestResp)
            }).catch(err => console.log('Error:', err));
    }    

    buildChart = (current, data) => {
        let minPrice = 0;
        let jsonData = JSON.parse(data);
        let asks = [], bids = [];
        // BUY
        for(var i in jsonData.bids) {
            let price = parseFloat(jsonData.bids[i][0]);
            let amount = parseFloat(jsonData.bids[i][1]);
            let bidsParsedObj = {
                price: price,
                amount: amount
            };

            if(minPrice < price) {
                bids.push(bidsParsedObj);

                if (bigestBidAmount < amount || !bigestBidAmount) {
                    bigestBidAmount = amount;
                    bigestBidPrice = price;
                }
            }
        }

        // SELL
        for(var i in jsonData.asks){
            let price = parseFloat(jsonData.asks[i][0]);
            let amount = parseFloat(jsonData.asks[i][1]);
            let asksParsedObj = {
                price: price,
                amount: amount
            };

            if(minPrice < price){
                asks.push(asksParsedObj);

                if(bigestAskAmount < amount || !bigestAskAmount) {
                    bigestAskAmount = amount;
                    bigestAskPrice = price;
                }
            }
        }
    let dataBuy = [], dataSell = [],
        labels = this.buildLabelsList(current);

    //BUY
    for(let i in bids){
        for(let j in labels){

            let index = parseInt(j);

            if(index < labels.length/2){
                let label1 = parseFloat(labels[index].split(' - ')[0]),
                    label2 = parseFloat(labels[index].split(' - ')[1]);

                if(bids[i].price >= label1 && bids[i].price < label2){
                    if(!dataBuy[j]){
                        dataBuy[j] = bids[i].amount;
                    } else {
                        dataBuy[j] += bids[i].amount;
                    }
                }
            }
        }
    }

    //SELL
    for(let p in asks){
        for(let j in labels){
            let index = parseInt(j) - 1;

            if(index >= labels.length/2){
                let label1 = parseFloat(labels[index].split(' - ')[0]),
                    label2 = parseFloat(labels[index].split(' - ')[1]);

                    //console.log(label1, label2, data1[p].price);
                if(asks[p].price >= label1 && asks[p].price < label2){
                    if(!dataSell[index]){
                        dataSell[index] = asks[p].amount;
                    } else {
                        dataSell[index] += asks[p].amount;
                    }
                }
            }
        }
    }

    let dSell = dataSell.length;

    console.log(labels);
    for(let i = labels.length; i >= 0; i--){
        if(i >= dSell){
            labels.splice(i, 1);
        } else if((!dataBuy[i] || dataBuy[i] == 0) && (!dataSell[i] || dataSell[i] == 0)) {
            labels.splice(i, 1);
            dataBuy.splice(i, 1);
            dataSell.splice(i, 1);
        }
    }
    console.log(labels);
    this.setState({
        labels: labels,
        dataBuy: dataBuy,
        dataSell: dataSell,
        showChart: true,
        loader:false,
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
        const { showChart, labels, dataBuy, dataSell, loader} = this.state
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
                    loader ? 'Loading...' : null
                }
                {
                    showChart ? <Charts labels={labels}  dataBuy={dataBuy} dataSell={dataSell} bigestAskAmount={bigestAskAmount} bigestAskPrice={bigestAskPrice} bigestBidAmount={bigestBidAmount} bigestBidPrice={bigestBidPrice}/> : null
                }
            </div>
        );
    }
}