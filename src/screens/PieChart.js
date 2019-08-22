import React from 'react';
import {Pie} from 'react-chartjs-2';
import * as api from '../api/index';

const data = {
	labels: [
		'Red',
		'Green',
	],
	datasets: [{
		data: [300, 50],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		]
	}]
};

export default class PieChart extends React.Component{
	state = {

	}

	componentDidMount(){
		const { from, to } = this.props;
		let ticker = from + to;
		api.crudBuilder(`https://api.binance.com/api/v1/aggTrades?symbol=${ticker}`).get().then(
            resp => {         
                console.log('data for pie chart',resp)
            }).catch(err => console.log('Error:', err));
		
	}

    render(){
        return(
            <div style={{ display:'flex', width:'20%' }}>
                <Pie data={data} />
            </div>
        );
    }
}