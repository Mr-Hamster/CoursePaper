import React from 'react';
import {Pie} from 'react-chartjs-2';
import * as api from '../api/index';

const data = {
	labels: [
		'Sell',
		'Buy',
	],
	datasets: [{
		data: [300, 50],
		backgroundColor: [
		'red',
		'green',
		],
		hoverBackgroundColor: [
        'red',
        'green',
		]
	}]
};

export default class PieChartMarketCap extends React.Component{
	state = {

	}

	componentDidMount(){
        // const { coinGecko } = this.props;
        // console.log('qweqweqwe', coinGecko);
		// let ticker = from + to;
		// api.crudBuilder(`https://api.binance.com/api/v1/aggTrades?symbol=${ticker}`).get().then(
        //     resp => {         
        //         console.log('data for pie chart',resp)
        //     }).catch(err => console.log('Error:', err));
    }
    
    componentDidUpdate(prevProps){
        const { coinGecko } = this.props;
        
        if(prevProps.coinGecko !== coinGecko){
            console.log('qweqweqwe', coinGecko);
        }
    }

    render(){
        // const { coinGecko } = this.props;
        // console.log('qweqweqwe', coinGecko);
        return(
            <div style={{ display:'flex', width:'20%' }}>
                <Pie data={data} />
            </div>
        );
    }
}