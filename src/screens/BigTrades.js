import React, { Fragment } from "react"
import '../styles/BigTrades.scss'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Delete from '../static/images/delete.png'

export default class BigTrades extends React.Component{
    state = {
        amount: 1,
        showTrades: false,
        arrTrades: [],
        fromMinToMax: false,
    }

    getTrades = () => {
        const { amount } = this.state;
        const { arrSell, arrBuy } = this.props;
        this.setState({
            showTrades: true,
        })
        let newArrBuy = arrBuy.filter(item => item.type = 'buy');
        let newArrSell = arrSell.filter(item => item.type = 'sell');
        newArrBuy= newArrBuy.filter(item => 
            item.amount >= amount
        );
        newArrSell = newArrSell.filter(item => 
            item.amount >= amount
        );
        let result = newArrBuy.concat(newArrSell);
        result = result.sort((a,b)=>{
            return b.amount - a.amount;
        })
        this.setState({
            arrTrades: result,
        })
    }

    sorting = (value) => {
        const { arrTrades, fromMinToMax } = this.state;
        this.setState({
            fromMinToMax: !fromMinToMax
        })

        let sortedArr = arrTrades.sort( (a,b) => {
            let search = a[value] - b[value];
            if(fromMinToMax){
                search = b[value] - a[value];
            }
            return search;
        });
        this.setState({
            arrTrades: sortedArr,
        })
    }

    render(){
        const { showTrades, arrTrades, amount } = this.state
        return(
            <div className="wrapperTrades">
                <div className="inputTrades">
                <h2>Big Trades</h2>
                    <div className="textField">
                        Enter min value for big trades: 
                        <TextField
                            id="outlined-number"
                            label="Amount"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                            value={amount}
                            onChange = {(event)=>{
                                this.setState({
                                    amount: event.target.value,
                                })
                            }}
                            style={{width: '80px', marginLeft: '15px'}}
                        />
                    </div>
                    <Button variant="contained" color="primary" style={{width: '200px', height:'50px'}} onClick={ this.getTrades }>
                        Get Big Trades
                    </Button>
                </div>
                <div style={{ width:'60%' }}>
                    {
                        showTrades ?
                        <div className="trades">
                            <div className="options">
                                Sort by
                            <Button variant="contained" color="primary" style={{width: '120px', height:'40px'}} onClick={ () => this.sorting('price') }>
                                price
                            </Button>
                            <Button variant="contained" color="primary" style={{width: '120px', height:'40px'}} onClick={ () => this.sorting('amount') }>
                                amount
                            </Button>
                            <img src={Delete} style={{ width:'25px', cursor: 'pointer' }} onClick={ () => this.setState({
                                showTrades: false
                            }) } />
                            </div>
                            <div className="tradesList">
                                {
                                    arrTrades.map((item, index) => (
                                        <div className="tradeItem" key={index} style={{ color: item.type === 'buy' ? 'green' : 'red' }} >
                                            <span>
                                                Price of value: {item.price}
                                            </span>
                                            <span>
                                                Amount of value: {item.amount}
                                            </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        : null     
                    }   
                </div>
            </div>
        );
    }
}