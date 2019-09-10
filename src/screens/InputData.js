import React, { Fragment } from "react";
import Button from '@material-ui/core/Button';
import * as api from '../api/index';
import Charts from '../screens/Chart.js';
import '../styles/InputData.scss';
import BigTrades from '../screens/BigTrades'
import ChangeStatistic from "./ChangeStatistic";
import LatestStats from "./LatestStats";
import Cookies from "./Cookies";
import TableFavouriteCoins from "./TableFavouriteCoins";
import Swap from '../static/images/swap.png'
import Delete from '../static/images/delete.png';
import TextField from '@material-ui/core/TextField';
import GeneralData from "../components/GeneralData";

let perc = 1, labelsCount = 100/perc;
let bigestAskAmount, bigestAskPrice, bigestBidAmount, bigestBidPrice, currentPrice;
let tickers = [], tickers1 = [];

let arrBuy = [], arrSell = [];


export default class InputData extends React.Component {
    state = {
        variantFrom: '',
        from:'',
        variantTo: '',
        showChart: false,
        labels: [],
        dataBuy: [],
        dataSell: [],
        loader: false,
        arr: [],
        showNews: false,
        arrPosts: [],
        count: 10,
        coinId: 0,
        imgCoin:'',
        accept: false,
        staticCoinGecko: [],
        FavouriteCoinsList: [],
    }

    componentDidMount(){
        this.getCoinGeckoData();
        this.getFavouriteCoins();
        this.CheckCookies();
        this.getDataFromLocStore();
    }

    getCoinGeckoData = () => {

        api.crudBuilder(`https://min-api.cryptocompare.com/data/all/coinlist`).get().then(
            resp => {         
                let data = resp.data.Data;
                localStorage.setItem('data', JSON.stringify(data));
            }).catch(err => console.log('Error:', err));
        
    }

    getFavouriteCoins = () => {
        let dataCoins = JSON.parse(localStorage.getItem('FavouriteCoins'));
        this.setState({
            FavouriteCoinsList: dataCoins
        })
    }

    CheckCookies = () => {
        let accept = JSON.parse(localStorage.getItem('accept'));
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
    
    LoadData = () => {
        const { variantFrom, variantTo } = this.state;  
        let requestResp;
        if(!variantFrom || !variantTo){
            alert('Please enter tickers!');
        }else{
            this.setState({
                from: variantFrom
            })
            let ticker = `${variantFrom}${variantTo}`;
            this.getValueFromData();
            this.AddDataToStore();
            api.crudBuilder(`https://api.binance.com/api/v1/depth?symbol=${ticker}&limit=1000`).get().then(
                resp => {
                    this.setState({
                        loader: true,
                        showChart: false,
                    })
                    requestResp = resp.request.responseText;
                    this.getPrice(ticker, requestResp);
                }).catch(err => {
                    alert(`${err}`)
                    this.setState({
                        loader: false,
                    })
                });
        }
    }

    getValueFromData = () => {
        const { variantFrom } = this.state;  

        let data = [];
        let result;
        data = JSON.parse(localStorage.getItem('data'));
        for(let key in data){
            if(key === variantFrom){
                result = data[key];
            }
        }        
        let imgUrl = 'https://www.cryptocompare.com' + result.ImageUrl;
        this.setState({
            coinId: result.Id,
            imgCoin: imgUrl,
        })
    }

    AddDataToStore = () => {
        const { variantFrom, variantTo } = this.state;
        let data = sessionStorage.getItem('obj');
        let ticker = `${variantFrom}-${variantTo}`;
        let obj = {
            name: ticker,
            counter: 1
        }
        let parsedData = JSON.parse(data);
      
        if(!parsedData){
            tickers.push(obj);
            sessionStorage.setItem('obj', JSON.stringify(tickers));
        } else {
            parsedData.forEach((item, i) => {  
                const filtered = parsedData.filter(val => val.name === obj.name);
                if(filtered.length){
                    if(item.name === obj.name){
                        parsedData[i].counter++;
                        sessionStorage.setItem('obj', JSON.stringify(parsedData));
                        if(parsedData[i].counter >= 3){
                            let tickers = localStorage.getItem('tickers');
                            let parsedTickers = JSON.parse(tickers);
                            if(!parsedTickers){
                                tickers1.push(ticker)
                                localStorage.setItem('tickers', JSON.stringify(tickers1));
                            }else{
                                const filteredTickers = parsedTickers.filter(val => val === ticker);
                                if(filteredTickers.length == 0){
                                    parsedTickers.push(ticker);
                                    localStorage.setItem('tickers', JSON.stringify(parsedTickers));
                                }
                            }
                            this.getDataFromLocStore();
                        }
                        return;
                    }
                } else {
                    parsedData.push(obj);
                    sessionStorage.setItem('obj', JSON.stringify(parsedData));
                }
            });
        }

    }

    getPrice = (ticker, requestResp) => {
        api.crudBuilder(`https://api.binance.com/api/v3/ticker/price?symbol=${ticker}`).get().then(
            resp => {         
                currentPrice = JSON.parse(resp.request.responseText).price;
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

        arrBuy = bids;
        arrSell = asks;

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

    getDataFromLocStore = () => {
        let arr = JSON.parse(localStorage.getItem('tickers'));
        this.setState({
            arr
        })
    }

    autoPasting = (item) => {
        let value = item.split('-');
        this.setState({
            variantFrom: value[0],
            variantTo: value[1],
        },() => this.LoadData())
    }

    removeItem = (index, item) => {
        let loc = JSON.parse(localStorage.getItem('tickers'));
        loc.splice(index,1);
        localStorage.setItem('tickers',JSON.stringify(loc));

        let session = JSON.parse(sessionStorage.getItem('obj'));
        session.forEach(val => {
            if(val.name === item){
                val.counter = 0;
                sessionStorage.setItem('obj',JSON.stringify(session));
            }
        })
        this.setState({
            arr: loc
        })
        this.getDataFromLocStore();
    }

    Swaping = () => {
        const { variantFrom, variantTo } = this.state;
        let extraValue = variantFrom;
        this.setState({
            variantFrom: variantTo,
            variantTo: extraValue,
        })
        this.LoadData();
    }

    render() {
        // console.log('State.........',this.state);
        const { arr, showChart, labels, dataBuy, dataSell, 
                loader, variantFrom, variantTo, coinId, imgCoin, 
                accept, 
                FavouriteCoinsList, top10Coins, 
                from 
            } = this.state;
            const { dependencyObj, recentEvents, coinGecko } = this.props;
        return (
            <div className="wrapperInputData">
                <h1>Crypto Cap</h1>
                    <div className="inputData"> 
                        <div className="textField"> 
                            <TextField
                                id="outlined-uncontrolled"
                                label="From"
                                defaultValue=""
                                margin="normal"
                                variant="outlined"
                                onChange = { (event)=>{
                                    this.setState({
                                        variantFrom: event.target.value.toUpperCase()
                                    })
                                }}
                                value={variantFrom}
                                style={{ width: '300px' }}
                            />
                            <img src={Swap} className="imgSwap" onClick={ this.Swaping } />
                            <TextField
                                id="outlined-uncontrolled"
                                label="To"
                                defaultValue=""
                                margin="normal"
                                variant="outlined"
                                onChange = { (event)=>{
                                    this.setState({
                                        variantTo: event.target.value.toUpperCase()
                                    })
                                }}
                                value={variantTo}
                                style={{ width: '300px' }}
                            />
                        </div>
                    {
                        arr ? 
                        <div className="valueFromLocStore">
                            {
                                arr.map((item, index) => (
                                    <div key={index} className="helpers">
                                        <img src={Delete} alt='delete' style={{ position:"absolute", width: '15px', right: '8px', top: '8px', cursor: 'pointer' }} onClick={ ()=> this.removeItem(index, item) } />
                                        <button onClick={ () => this.autoPasting(item) } style={{ height: '30px', width:'100px', cursor: 'pointer' }}>
                                            {item}
                                        </button>
                                    </div>
                                ))
                            }
                        </div>   
                    : null
                    }   
                </div>         
                    <Button variant="contained" color="primary" style={{width:'30%', height:'50px'}} onClick={ this.LoadData }>
                        Get Exchanges Results
                    </Button>
                {
                    loader ? 'Loading...' : null
                }
                {/* {
                    <PieChartMarketCap coinGecko={coinGecko} /> // Delete
                } */}
                {
                    showChart ? <ChangeStatistic from={variantFrom} to={variantTo} dependencyObj={dependencyObj} /> : null
                }
                {
                    showChart ? <LatestStats coinId = {coinId} imgCoin={imgCoin} /> : null
                }
                {
                    showChart ? <Charts currentPrice={currentPrice} labels={labels} dataBuy={dataBuy} dataSell={dataSell} arrBuy={arrBuy} arrSell={arrSell} /> : null
                }
                
                {
                    showChart ? <BigTrades arrBuy={arrBuy} arrSell={arrSell} /> : null
                }
                {
                    !accept ? <Cookies checkAccept = { this.checkAccept } /> : null
                }
                <GeneralData variantFrom={variantFrom} variantTo={variantTo} from={from} recentEvents={recentEvents} coinGecko={coinGecko} />
                {
                    FavouriteCoinsList ? <Fragment>
                                            <h3>Favourite Coins</h3>
                                            <TableFavouriteCoins favouriteCoins={FavouriteCoinsList} /> 
                                         </Fragment> : null
                }
            </div>
        );
    }
}