import React, { Fragment } from 'react';
import '../styles/ChangeStatistic.scss';
import * as api from '../api/index';
import { Table } from 'react-bootstrap';
import {Bar} from 'react-chartjs-2';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Pie} from 'react-chartjs-2';

let arrRes = [], height, result = [];

const options = {
    responsive: true,
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: true
      }
    },
    legend: {
      position: 'bottom',
    },
    scales: {
        xAxes: [
            {
              display: true,
              gridLines: {
                display: false
              },
            }
          ],
          yAxes: [
            {
              type: 'linear',
              display: true,
              position: 'right',
              id: 'y-axis-1',
              gridLines: {
                display: true
              },
              labels: {
                show: true
              }
            },
            {
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y-axis-2',
              gridLines: {
                display: true
              },
              labels: {
                show: true
              }
            }
          ]
    }
  };

export default class ChangeStatistic extends React.Component{
    state = {
        arrStatistic: [],
        arrPrice: [],
        arrVolume: [],
        timestamp: [],
        histo: 'minute',
        limit: '60',
        volume: 'volumefrom',
        price: 'close',
        x: 0,
        pieChartArr: [],
        total_24hVolume: []
    }

    componentDidMount(){
        this.getDataForVolumeChange();
        this.getPriceChanges();
        this.buildChart();
        // this.getPieChart();
    }

//     PROBLEM with        vs_currency

    getDataForVolumeChange = () => {
        const { from, to, dependencyObj } = this.props;
        let valueFrom;
        let valueTo = to.toLowerCase();
        let currentTimeUNIX = Date.now() / 1000; //UNIX Timestamp
        currentTimeUNIX = Math.round(currentTimeUNIX);
        let currentTime = new Date().getTime();
        for(let key in dependencyObj){
            if(key === from.toLocaleLowerCase()){
                valueFrom = dependencyObj[key];
            }
        }
        api.crudBuilder(`https://min-api.cryptocompare.com/data/histoday?fsym=${from}&tsym=${to}&limit=1&aggregate=0&toTs=${currentTime}`).get().then(
            resp => { 
                this.setState({
                    total_24hVolume: resp.data.Data[1]
                })
            }).catch(err => {
            console.log('Error:', err)
        });
        api.crudBuilder(`https://api.coingecko.com/api/v3/coins/${valueFrom}/market_chart/range?vs_currency=ltc&from=${currentTimeUNIX-5*60*2}&to=${currentTimeUNIX}`).get().then(
            resp => { 
                let data = resp.data.total_volumes;   
                // data.map(item => console.log(item[0]));
                console.log('data volume', data); 
            }).catch(err => {
                console.log('Error:', err)
            });
    }

    getPieChart = () => {
        const { from, to } = this.props;
        let ticker = from + to;
        result = [];
        let currentTime = new Date().getTime();
        let FiveMin = 300000;
        
        this.getDataForPieChart(ticker, currentTime, FiveMin).then(
            () => this.getDataForPieChart(ticker, currentTime, FiveMin*3).then(
                () => this.getDataForPieChart(ticker, currentTime, FiveMin*12).then(
                    () => this.getDataForPieChart(ticker, currentTime, this.toFix(FiveMin*12*4)).then(
                        () => this.getDataForPieChart(ticker, currentTime, FiveMin*12*4*3).then(
                            () => this.getDataForPieChart(ticker, currentTime, FiveMin*12*4*3*2).then(
                                () => this.getDataForPieChart(ticker, currentTime, FiveMin*12*4*3*2*7).then(
                                    () => this.getDataForPieChart(ticker, currentTime, FiveMin*12*4*3*2*7*3).then(
                                    ).catch()
                                ).catch()
                            ).catch()
                        ).catch()
                    ).catch()
                ).catch()
            ).catch()
        ).catch()
    }

    toFix = (num) => {
        console.log('num', num);
        console.log('e', 300000*12*4);
        return num.toLocaleString('fullwide', {useGrouping:false})
    }

    getDataForPieChart = (ticker, currentTime, time) => {
        let promiseVar = new Promise((resolve, reject) => {
            api.crudBuilder(`https://api.binance.com/api/v1/aggTrades?symbol=${ticker}&startTime=${currentTime-time}&endTime=${currentTime}`).get().then(
                resp => {         
                    let data = resp.data;
                    let dataBuy = data.filter(item => item.m);
                    let resultBuy = 0;
                    dataBuy.forEach((item) => {
                        resultBuy += +item.q
                    })

                    let dataSell = data.filter(item => !item.m);
                    let resultSell = 0;
                    dataSell.forEach((item) => {
                        resultSell += +item.q
                    })

                    result.push([resultBuy, resultSell]);
                    console.log('res', result)
                    this.setState({
                        pieChartArr: result
                    })
                    resolve();
                }).catch(err => {
                    console.log('Error:', err)
                    reject();
                });
                console.log('res1', result)
        })

        return promiseVar;
    }

    getPriceChanges = () => {
        let times, histo;
        const { from, to } = this.props;
        api.crudBuilder(`https://min-api.cryptocompare.com/data/histominute?fsym=${from}&tsym=${to}&limit=1`).get().then(
            resp => {
                arrRes = [];
                let currentPrice = resp.data.Data[1].close;
                this.getStatistic(histo = 'minute', times = 5, currentPrice).then(
                    () => this.getStatistic(histo = 'minute', times = 15, currentPrice).then(
                        () => this.getStatistic(histo = 'hour', times = 2, currentPrice).then(
                            () => this.getStatistic(histo = 'hour', times = 5, currentPrice).then(
                                () => this.getStatistic(histo = 'hour', times = 13, currentPrice).then(
                                    () => this.getStatistic(histo = 'day', times = 2, currentPrice).then(
                                        () => this.getStatistic(histo = 'day', times = 8, currentPrice).then(
                                            () => this.getStatistic(histo = 'day', times = 31, currentPrice)
                                        ).catch()
                                    ).catch()
                                ).catch()
                            ).catch()
                        ).catch()
                    ).catch()
                ).catch();
            }).catch(err => {
                alert(`${err}`);
            });
    }

    getStatistic = (histo, times, currentPrice) => {
        let promiseVar = new Promise((resolve, reject) => {
        
            const { from, to } = this.props;
            let value;
            
            api.crudBuilder(`https://min-api.cryptocompare.com/data/histo${histo}?fsym=${from}&tsym=${to}&limit=40`).get().then(
                resp => {
                    value = resp.data.Data[resp.data.Data.length - times].close;
                    let res = this.getPercent(currentPrice, value); 
                    arrRes.push(res);
                    this.setState({
                        arrStatistic: arrRes,
                    })
                    resolve();
                }).catch(err => {
                    reject()
                    console.log(err);
                });
        })
        
        return promiseVar;
        
    }

    getPercent = (currentPrice, value) => {
        let result = value * 100 / currentPrice;
        result = 100 - result;
        return -1 * result.toFixed(3) + '%';
    }

    handleChangeTime = (event) => {
        let value = event.target.value;
        let res = value.split('-');
        this.setState({
            histo: res[0],
            limit: res[1],
        },()=>{
            this.buildChart();
        })
    }

    handleChangeVolume = (event) => {
        this.setState({
            volume: event.target.value
        },() => {
            this.buildChart();
        })
    }

    handleChangePrice = (event) => {
        this.setState({
            price: event.target.value
        },() => {
            this.buildChart();
        })
    }

    buildChart = () => {
        const { from, to, } = this.props;
        const { histo, limit, volume, price } = this.state; 
        api.crudBuilder(`https://min-api.cryptocompare.com/data/histo${histo}?fsym=${from}&tsym=${to}&limit=${limit}`).get().then(
            resp => {
                let dataPrice = price === 'close' ? resp.data.Data.map(item => item.close) : price === 'high' ? resp.data.Data.map(item => item.high) : price === 'low' ? resp.data.Data.map(item => item.low) : resp.data.Data.map(item => item.open);
                let dataVolume = volume === 'volumefrom' ? resp.data.Data.map(item => item.volumefrom) : resp.data.Data.map(item => item.volumeto);
                let timestamp = resp.data.Data.map(item => new Date(item.time * 1000));
                timestamp =  histo === 'minute' || histo === 'hour' ? timestamp.map(item => item.toLocaleTimeString()) : timestamp.map(item => item.toLocaleDateString());

                this.setState({
                    arrPrice: dataPrice,
                    arrVolume: dataVolume,
                    timestamp: timestamp,
                })
            }).catch(err => {
                console.log(err);
            });
    }

    onMouseMove = (event) => {
        this.setState({ 
            x: event.screenX, 
            y: event.screenY,
        });
        height = document.getElementById('block').clientHeight - 70;
      }

    render(){
        const { arrStatistic, arrPrice, timestamp, arrVolume, volume, price, x, pieChartArr, } = this.state; 
        const data = {
            labels: timestamp,
            datasets: [{
                label: price === 'close' ? 'Close' : price === 'open' ? 'Open' : price === 'high' ? 'High' : 'Low',
                type:'line',
                data: arrPrice,
                fill: false,
                borderColor: '#B71C1C',
                borderWidth: 2,
                backgroundColor: '#E57373',
                pointBorderColor: '#E57373',
                pointBackgroundColor: '#E57373',
                pointHoverBackgroundColor: '#E57373',
                pointHoverBorderColor: '#EC932F',
                yAxisID: 'y-axis-2'
                },
                {
                    type: 'bar',
                    label: volume === 'volumefrom' ? 'Volume From' : 'Volume to',
                    data: arrVolume,
                    fill: false,
                    backgroundColor: '#71B37C',
                    borderColor: '#71B37C',
                    hoverBackgroundColor: '#71B37C',
                    hoverBorderColor: '#71B37C',
                    yAxisID: 'y-axis-1'
                }
            ]
        };
        const pieChart = {
            labels: [
                'Buy',
                'Sell',
            ],
            datasets: [{
                data: pieChartArr,
                backgroundColor: [
                'green',
                'red',
                ],
                hoverBackgroundColor: [
                'green',
                'red',
                ]
            }]
        };
        // console.log(this.state.total_24hVolume);
        return(
            <Fragment>
                <h2>
                    Price Change
                </h2>
                <Table striped bordered hover variant="dark" style={{width: "70%", marginTop: '20px'}}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>5min</th>
                                <th>15min</th>
                                <th>1h</th>
                                <th>4h</th>
                                <th>12h</th>
                                <th>1d</th>
                                <th>7d</th>
                                <th>30d</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>By price:</th>
                                {
                                    arrStatistic.map((item, index) => (
                                        <th key={index}>{item}</th>
                                    ))
                                }
                            </tr>     
                            <tr>
                                <th>By volume:</th>
                                
                            </tr>                           
                        </tbody>
                </Table>
                <div style={{ display:'flex', width:'20%' }}>
                    <Pie data={pieChart} />
                </div>
                <div style={{ display: 'flex', width: '70%', justifyContent: 'space-around', margin: '15px' }} >
                    <FormControl style={{ width:'150px' }}>
                        <InputLabel htmlFor="age-native-simple">Select by time:</InputLabel>
                        <Select
                            native
                            onChange={ this.handleChangeTime }
                            value={`${this.state.histo}-${this.state.limit}`}
                        >
                        <option value='minute-60'>1 hour</option>
                        <option value='hour-24'>1 day</option>
                        <option value='day-8'>7 days</option>
                        <option value='day-31'>30 days</option>
                        </Select>
                    </FormControl>
                    <FormControl style={{ width:'150px' }}>
                        <InputLabel htmlFor="age-native-simple">Select by volume:</InputLabel>
                        <Select
                            native
                            onChange={ this.handleChangeVolume }
                            value={this.state.volume}
                        >
                        <option value={'volumefrom'}>Volume From</option>
                        <option value={'volumeto'}>Volume To</option>
                        </Select>
                    </FormControl>
                    <FormControl style={{ width:'150px' }}>
                        <InputLabel htmlFor="age-native-simple">Select by price:</InputLabel>
                        <Select
                            native
                            onChange={ this.handleChangePrice }
                            value={this.state.volume}
                        >
                        <option value={'close'}>Close</option>
                        <option value={'open'}>Open</option>
                        <option value={'high'}>High</option>
                        <option value={'low'}>Low</option>
                        </Select>
                    </FormControl>
                </div>
                <div style={{width:'65%', }} onMouseMove={ this.onMouseMove } id="block">
                    <div style={{ height: height, width: '2px', border: 'solid 1px', position:'absolute', left: x - 3 }}>
                    </div>
                    <Bar
                        data={data}
                        options={options}
                    />
                </div>
            
            </Fragment>
        );
    }
}