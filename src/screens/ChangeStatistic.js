import React, { Fragment, useCallback } from 'react';
import '../styles/ChangeStatistic.scss';
import * as api from '../api/index';
import { Table } from 'react-bootstrap';
import PieChart from "./PieChart";

let arrRes = [];

export default class ChangeStatistic extends React.Component{
    state = {
        arrStatistic: [],
        arrVolume: []
    }

    componentDidMount(){
        let currentTime = new Date().getTime();
        let times, histo;
        const { from, to } = this.props;

        api.crudBuilder(`https://min-api.cryptocompare.com/data/histominute?fsym=${from}&tsym=${to}&limit=1`).get().then(
            resp => {
                arrRes = [];
                let currentPrice = resp.data.Data[1].close;
                this.getStatistic(histo = 'minute', times = 5, currentPrice);
                this.getStatistic(histo = 'minute', times = 15, currentPrice);
                this.getStatistic(histo = 'hour', times = 2, currentPrice);
                this.getStatistic(histo = 'hour', times = 5, currentPrice);
                this.getStatistic(histo = 'hour', times = 13, currentPrice);
                this.getStatistic(histo = 'day', times = 2, currentPrice);
                this.getStatistic(histo = 'day', times = 8, currentPrice);
                this.getStatistic(histo = 'day', times = 31, currentPrice);
            }).catch(err => {
                alert(`${err}`);
            });

    }

    getStatistic = (histo, times, currentPrice) => {
        const { from, to } = this.props;
        let value;
        
        api.crudBuilder(`https://min-api.cryptocompare.com/data/histo${histo}?fsym=${from}&tsym=${to}&limit=40`).get().then(
            resp => {
                value = resp.data.Data[resp.data.Data.length - times].close;
                // console.log('time:', resp.data.Data[resp.data.Data.length - times].time);
                // console.log('histo times', histo, times)
                // console.log('volume', resp.data.Data)
                let res =  this.getPercent(currentPrice, value);
                arrRes.push(res);
                this.setState({
                    arrStatistic: arrRes
                })
                return res;
            }).catch(err => {
                console.log(err);
            });
    }

    getPercent = (currentPrice, value) => {
        let result = value * 100 / currentPrice;
        result = 100 - result;
        return -1*result.toFixed(3)+'%';
    }

    render(){
        const { arrStatistic } = this.state; 
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
                            <tr>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                            </tr>                           
                        </tbody>
                </Table>
                <PieChart />
            
            </Fragment>
        );
    }
}