import React from 'react';
import HistoricalValues from '../screens/HistoricalValues';
import '../styles/GeneralData.scss'
import GlobalInfoData from '../screens/GlobalInfoData';
import Button from '@material-ui/core/Button';
import CoinNews from '../screens/CoinNews';
import * as api from '../api/index';
import RecentEvents from '../screens/RecentEvents';
import TableFavouriteCoins from '../screens/TableFavouriteCoins';
import Axios from 'axios';


export default class GeneralData extends React.Component{

    state = {
        arrPosts: [],
        showNews: false,
        top10Coins:[], 
        count: 1
    }

    componentDidMount(){
        this.filterTop10();
    }

    //get all coin data list and filter by rank. Result is top 10 coin
    filterTop10 = () => {
        const { coinGecko } = this.props;
        const { count } = this.state;
        let data = coinGecko;
        let arr = [];
        arr = data.filter((item) => item.market_data.market_cap_rank <= 10 * count);
        this.setState({
            top10Coins: arr,
        })
    };

    //func for getting news by 'coin from' and 'coin to'
    getNews = () => {
        const { variantFrom, variantTo, } = this.props;  
        
        if(variantFrom && variantTo){
            Axios.get(`https://min-api.cryptocompare.com/data/v2/news/?categories=${variantFrom},${variantTo}`).then(
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

    render(){
        const { showNews, arrPosts, top10Coins, count } = this.state;
        const { from, recentEvents } = this.props; 
        return(
            <div className="wrapper">
                <Button variant="contained" color="primary" style={{width:'30%', height:'50px', margin:'20px', outline: 'none' }} onClick={() => this.getNews() }>
                    Show News
                </Button> 
                {
                    showNews ? <CoinNews arrPosts={arrPosts} /> : null               
                }
                <h3>Top {count * 10} Coins</h3>
                <TableFavouriteCoins top10={top10Coins} /> 
                {
                    count < 5 ?
                        <Button variant="contained" color="primary" style={{width:'200px', height:'50px', margin:'20px', outline: 'none' }} onClick={() => this.setState({
                            count: count + 1
                        }, () => {
                            this.filterTop10()
                        })}>
                            Show more
                        </Button>
                    : null
                }
                <HistoricalValues />
                <br />
                <GlobalInfoData />
                <RecentEvents from={from} recentEvents={recentEvents} />
            </div>
        );
    }
}