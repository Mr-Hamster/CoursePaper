import React, { Fragment } from "react";
import '../styles/HistoricalValues.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Line} from 'react-chartjs-2';
import * as api from '../api/index';
import Delete from '../static/images/delete.png'

let dates = [], numbers = [], dates1 = [];

export default class HistoricalValues extends React.Component{
    state = {
        value: 0,
        value_classificaton: '',
        limit: 5,
        showChart: false,
    }

    componentDidMount(){
        api.crudBuilder('https://api.alternative.me/fng/').get().then(
            resp => {
                this.setState({
                    value: resp.data.data[0].value,
                    value_classificaton: resp.data.data[0].value_classification,
                })
                
            }).catch(err => console.log('Error:', err));
    }

    loadChart = () => {
        const { limit } = this.state;
        api.crudBuilder(`https://api.alternative.me/fng/?limit=${limit}`).get().then(
            resp => {
                let data = resp.data.data;
                numbers = data.map((item) =>  item.value);
                dates = data.map((item) => new Date(item.timestamp*1000));
                dates1 = dates.map(item => item.toLocaleDateString());
                this.setState({
                    showChart: true,
                })
            }).catch(err => console.log('Error:', err));
    }

    render(){
        const {value, value_classificaton, showChart} = this.state
        console.log(this.state);

        const dataChart = {
            labels: dates1.reverse(),
            datasets: [
              {
                label: `Crypto Fear & Greed Index`,
                fill: true,
                borderColor: '#004D40',
                borderWidth: 1,
                backgroundColor: '#4DB6AC',
                pointBorderColor: '#000',
                pointBackgroundColor: '#4DB6AC',
                pointHoverBackgroundColor: '#4DB6AC',
                pointHoverBorderColor: '#EC932F',
                data: numbers.reverse()
              }
            ]
          };

        return(
            <div className="wrapper">
                <div className="wrapperScale">
                    <h3>Historical Values</h3>
                    <div> 
                        Now: <span style={{ fontSize: '18px', fontWeight: 'bold', color: value > 80 ? '#84cf63' : value > 60 ? '#99b861' : value > 40 ? '#a6a95e' : value > 20 ? '#bd905d' : '#d5765b' }}>{value_classificaton}</span> 
                    </div>
                    <div className="scale">
                        <div className="target" style={{ bottom: `${value*2}px` }}/>
                            <div style={{ position:'absolute', bottom: `${value*2 }px`, fontSize: '18px', fontWeight: 'bold', left:'60px', color: value > 80 ? '#84cf63' : value > 60 ? '#99b861' : value > 40 ? '#a6a95e' : value > 20 ? '#bd905d' : '#d5765b' }}>
                                {value}
                            </div>
                    </div>
                    <div className="inputLimit">
                        Enter limit: 
                        <TextField
                            id="outlined-number"
                            label="Days"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                            value={this.state.limit}
                            onChange = {(event)=>{
                                this.setState({
                                    limit: event.target.value,
                                })
                            }}
                            style={{width: '80px', marginLeft: '15px'}}
                        />
                    </div>
                    <Button variant="contained" color="primary" style={{width:'100%', height:'50px'}} onClick={ this.loadChart }>
                        Get Chart
                    </Button>
                </div>
                <div style={{ width: '60%' }}>
                    {
                        showChart ? 
                        <div style={{ position:'relative' }}>
                            <Line data={dataChart} />
                            <img src={Delete} style={{ width:'25px', cursor: 'pointer', position:'absolute', top: '0px', right: '0px' }} onClick={ () => this.setState({
                                showChart: false
                            }) } />
                        </div>
                        : null
                    }
                </div>
                
            </div>
        );
    }
}