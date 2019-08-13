import React from 'react'
import '../styles/ChangeStatistic.scss'
import * as api from '../api/index';
import { Table } from 'react-bootstrap'

let currentPrice;

export default class ChangeStatistic extends React.Component{
    state = {
        currentPrice: 0
    }

    componentDidMount(){
        let currentTime = new Date().getTime();
        let times;

        this.getCurrentPrice();

        // let timestamp_5min = currentTime - 300;
        // let timestamp_15min = currentTime - 900;
        // let timestamp_1hour = currentTime - 3600;
        // let timestamp_4hour = currentTime - 14400;
        // let timestamp_12hour = currentTime - 43200;
        // let timestamp_1day = currentTime - 86400;
        // let timestamp_7days = currentTime - 604800;
        // let timestamp_30days = currentTime - 18144000;
        // this.getStatistic(timestamp_5min, times = 1);
        // this.getStatistic(timestamp_15min, times = 3);
        // this.getStatistic(timestamp_1hour, times = 12);
        // this.getStatistic(timestamp_4hour, times = 48);
        // this.getStatistic(timestamp_12hour, times = 144);
        // this.getStatistic(timestamp_1day, times = 288);
        this.getStatistic(times = 7);
        this.getStatistic(times = 30);
        this.getStatistic(times = 10);
        // this.getStatistic(timestamp_30days, times = 8640);
    }

    getStatistic = (times) => {
        const { from, to } = this.props;
        let value;
        
        api.crudBuilder(`https://min-api.cryptocompare.com/data/histoday?fsym=${from}&tsym=${to}`).get().then(
            resp => {
                console.log(resp.data.Data)
                value = resp.data.Data[resp.data.Data.length - times].close;
                console.log('asdasd',resp.data.Data[resp.data.Data.length - times].time, currentPrice );
                console.log('res: ', this.getPercent(currentPrice, value) + '%');
            }).catch(err => {
                alert(`${err}`);
            });
    }

    getPercent = (currentPrice, value) => {
        let result = value * 100 / currentPrice;
        result = 100 - result;
        return -1*result.toFixed(3);
    }

    getCurrentPrice = () => {
        const { from, to } = this.props;

        api.crudBuilder(`https://min-api.cryptocompare.com/data/histominute?fsym=${from}&tsym=${to}&limit=1`).get().then(
            resp => {
                currentPrice = resp.data.Data[1].close;
                console.log('currentPrice', currentPrice)
            }).catch(err => {
                alert(`${err}`);
            });
    }

    render(){
        return(
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
                            <th>0</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>0</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
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
        );
    }
}