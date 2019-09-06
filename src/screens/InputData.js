import React, { Fragment } from "react";
import Button from '@material-ui/core/Button';
import * as api from '../api/index';
import Charts from '../screens/Chart.js';
import '../styles/InputData.scss';
import HistoricalValues from "./HistoricalValues";
import BigTrades from '../screens/BigTrades'
import ChangeStatistic from "./ChangeStatistic";
import LatestStats from "./LatestStats";
import CoinNews from "./CoinNews";
import Cookies from "./Cookies";
import TableFavouriteCoins from "./TableFavouriteCoins";
import AddFavouriteCoins from "./AddFavouriteCoins";
import PieChartMarketCap from "./PieChartMarketCap";
import Swap from '../static/images/swap.png'
import Delete from '../static/images/delete.png';
import TextField from '@material-ui/core/TextField';
import controller from "../controlers/Const";
import RecentEvents from "./RecentEvents";
import GlobalInfoData from "./GlobalInfoData";

let perc = 1, labelsCount = 100/perc;
let bigestAskAmount, bigestAskPrice, bigestBidAmount, bigestBidPrice, currentPrice;
let tickers = [], tickers1 = [];

let arrBuy = [], arrSell = [];

let coinGeckoData = [];

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
        coinGecko: [],
        staticCoinGecko: [],
        FavouriteCoinsList: [],
        top10Coins:[], 
        dependencyObj: {},
    }

    componentDidMount(){
        this.getCoinGeckoData();
        this.getFavouriteCoins();
        this.CheckCookies();
        this.getDataFromLocStore();
        console.log('controller inputdata', controller)
    }

    getCoinGeckoData = () => {

        api.crudBuilder(`https://min-api.cryptocompare.com/data/all/coinlist`).get().then(
            resp => {         
                let data = resp.data.Data;
                localStorage.setItem('data', JSON.stringify(data));
            }).catch(err => console.log('Error:', err));

        api.crudBuilder(`https://api.coingecko.com/api/v3/coins`).get().then(
            resp => {         
                let data = resp.data;
                this.createDependencyObj(data);
                localStorage.setItem('coingeckoData', JSON.stringify(data));
                this.setState({
                    coinGecko: data,
                },()=>this.filterTop10())
            }).catch(err => console.log('Error:', err));
        
    }

    createDependencyObj = (arr) => {
        let obj = {};
        arr.forEach(item => {
            obj[item.symbol] = item.id;
        })
        this.setState({
            dependencyObj: obj
        })
    }

    filterTop10 = () => {
        let data = JSON.parse(localStorage.getItem('coingeckoData'));
        let arr = [];
        arr = data.filter((item) => item.market_data.market_cap_rank < 11);
        this.setState({
            top10Coins: arr,
        })
    }

    getFavouriteCoins = () => {
        let dataCoins = JSON.parse(localStorage.getItem('FavouriteCoins'));
        this.setState({
            FavouriteCoinsList: dataCoins
        })
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
                            // tickers1.push(ticker)
                            // localStorage.setItem('tickers', JSON.stringify(tickers1));
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

    getNews = () => {
        const { variantFrom, variantTo, } = this.state;  
        
        if(variantFrom && variantTo){
            api.crudBuilder(`https://min-api.cryptocompare.com/data/v2/news/?categories=${variantFrom},${variantTo}`).get().then(
                resp => {
                    this.setState({
                        arrPosts: resp.data.Data,
                        showNews: true
                    })
                }).catch(err => {
                    console.log(err);
                });
        } else {
            alert('Enter tickers!!!');
        }
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
        const { arr, showChart, labels, dataBuy, dataSell, loader, showNews, arrPosts, variantFrom, variantTo, coinId, imgCoin, accept, coinGecko, FavouriteCoinsList, top10Coins, dependencyObj } = this.state
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
                    showChart ? <HistoricalValues /> : null
                }
                {
                    showChart ? <BigTrades arrBuy={arrBuy} arrSell={arrSell} /> : null
                }
                <Button variant="contained" color="primary" style={{width:'30%', height:'50px', margin:'20px' }} onClick={ this.getNews }>
                    Show News
                </Button> 
                {
                    showNews ? <CoinNews arrPosts={arrPosts} /> : null
                }

                {
                    !accept ? <Cookies checkAccept = { this.checkAccept } /> : null
                }
                <h3>Top 10</h3>
                <TableFavouriteCoins top10={top10Coins} /> 
                <AddFavouriteCoins coinGecko={coinGecko} />
                {
                    FavouriteCoinsList ? <TableFavouriteCoins favouriteCoins={FavouriteCoinsList} /> : null
                }
                <RecentEvents variantFrom={from} />
                <GlobalInfoData />

            </div>
        );
    }
}