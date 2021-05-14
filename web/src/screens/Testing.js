import React from 'react'
import controller from '../controlers/const';
import * as api from '../api/index';
import { connect } from 'react-redux';

class Testing extends React.Component{

    state = {
        ticker: 'BTCUSDT',
        bitfinexData: [],
        binance: [],
    }

    componentDidMount(){
        this.choosenExchange();
    }

    choosenExchange = () => {
        const { value } = this.props;
        console.log('value',value)
        switch(value){
            case 'binance':
                this.getDataFromBinance();
                console.log('1');
                break;
            case 'bitflinex':
                this.getDataFromBitflinex();
                console.log('2');
                break;
            default: 
                console.log('3');
        }
    }

    getDataFromBinance = () => {
        axios.get(`https://api.binance.com/api/v1/depth?symbol=${this.state.ticker}&limit=1000`).then(
            resp => {         
                let data = resp.data;
                this.setState({
                    binance: data,
                })
            }).catch(err => console.log('Error:', err));
    }

    getDataFromBitflinex = () => {
        api.crudBuilder(`https://api.bitfinex.com/v1/pubticker/BTCUSD`).get().then(
            resp => {         
                let data = resp.data;
                this.setState({
                    bitfinexData: data,
                })
            }).catch(err => console.log('Error:', err));
    }

    render(){
        console.log(this.props.value);
        console.log(this.state)
        return(
            <div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        value: state
    }
};

export default connect(mapStateToProps)(Testing);