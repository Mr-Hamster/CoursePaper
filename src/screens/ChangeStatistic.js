import React, { Fragment, useCallback } from 'react';
import '../styles/ChangeStatistic.scss';
import * as api from '../api/index';
import { Table } from 'react-bootstrap';
import {Bar} from 'react-chartjs-2';

let arrRes = [];

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
        // arrVolume: [], 
        arrClose: [],
        arrVolumeFrom: [],
        timestamp: [],
    }

    componentDidMount(){
        this.getPriceChanges();
        this.buildChart();
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
                console.log(resp.data.Data);
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

    buildChart = () => {
        const { from, to } = this.props
        api.crudBuilder(`https://min-api.cryptocompare.com/data/histominute?fsym=${from}&tsym=${to}&limit=60`).get().then(
            resp => {
                console.log(resp.data.Data)
                let dataClose = resp.data.Data.map(item => item.close);
                let dataVolumeFrom = resp.data.Data.map(item => item.volumefrom);
                let timestamp = resp.data.Data.map(item => new Date(item.time * 1000));
                timestamp = timestamp.map(item => `${item.getHours()}:${item.getMinutes()}`);

                this.setState({
                    arrClose: dataClose,
                    arrVolumeFrom: dataVolumeFrom,
                    timestamp: timestamp,
                })
            }).catch(err => {
                console.log(err);
            });
    }

    render(){
        const { arrStatistic, arrClose, timestamp, arrVolumeFrom } = this.state; 
        console.log(this.state);
        
        const data = {
            labels: timestamp,
            datasets: [{
                label: 'Buy',
                type:'line',
                data: arrClose,
                fill: false,
                borderColor: '#004D40',
                borderWidth: 1,
                backgroundColor: '#4DB6AC',
                pointBorderColor: '#000',
                pointBackgroundColor: '#4DB6AC',
                pointHoverBackgroundColor: '#4DB6AC',
                pointHoverBorderColor: '#EC932F',
                yAxisID: 'y-axis-2'
                },
                {
                    type: 'bar',
                    label: 'VolumeFrom',
                    data: arrVolumeFrom,
                    fill: false,
                    backgroundColor: '#71B37C',
                    borderColor: '#71B37C',
                    hoverBackgroundColor: '#71B37C',
                    hoverBorderColor: '#71B37C',
                    yAxisID: 'y-axis-1'
                }
            ]
        };

        return(
            <Fragment>
                <Table striped bordered hover variant="dark" style={{width: "70%", marginTop: '20px'}}>
                        <thead>
                            <tr>
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
                                {
                                    arrStatistic.map((item, index) => (
                                        <th key={index}>{item}</th>
                                    ))
                                }
                            </tr>                           
                        </tbody>
                </Table>
                <div style={{width:'60%'}}>
                <Bar
                    data={data}
                    options={options}
                />
                </div>
            
            </Fragment>
        );
    }
}