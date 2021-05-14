import React from 'react'
import Table from 'react-bootstrap/Table'

export default class TableFavouriteCoins extends React.Component{
    state = {
        data: []
    }

    componentDidMount(){
        let dataCoins = JSON.parse(localStorage.getItem('FavouriteCoins'));
        this.setState({
            data: dataCoins
        })
    }

    render(){
        const { favouriteCoins, top10 } = this.props;
        const { data } = this.state;
        return(
            <div style={{ width:'90%' }} >
                { data ? 
                 <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Coin</th>
                            <th></th>
                            <th>Price</th>
                            <th>1h</th>
                            <th>24h</th>
                            <th>7d</th>
                            <th>24h Volume</th>
                            <th>Circulating Supply</th>
                            <th>Mkt Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item,index) => (
                                <tr key={index} >
                                    <td>{index+1}</td>
                                    <td style={{ display:'flex', justifyContent:'center', alignItems:'center', }} >
                                        <div style={{ display:'flex', width:'130px', justifyContent:'flex-start', alignItems:'center', }} >
                                            <img src={item.image.small} style={{ height:'20px', marginRight:'10px' }} />{item.name}
                                        </div>
                                    </td>
                                    <td>{item.symbol.toUpperCase()}</td>
                                    <td>{item.market_data.current_price.usd.toFixed(3)}$</td>
                                    <td style={{color: item.market_data.price_change_percentage_1h_in_currency.usd > 0 ? 'green' : 'red' }} >{item.market_data.price_change_percentage_1h_in_currency.usd}%</td>
                                    <td style={{color: item.market_data.price_change_percentage_24h > 0 ? 'green' : 'red' }} >{item.market_data.price_change_percentage_24h.toFixed(3)}%</td>      
                                    <td style={{color: item.market_data.price_change_percentage_7d > 0 ? 'green' : 'red' }} >{item.market_data.price_change_percentage_7d.toFixed(3)}%</td>                               
                                    <td>{item.market_data.total_volume.usd}$</td>
                                    <td>{item.market_data.circulating_supply}</td>
                                    <td>{item.market_data.market_cap.usd}$</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table> : null
                }
                { top10 ? 
                 <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Coin</th>
                            <th></th>
                            <th>Price</th>
                            <th>1h</th>
                            <th>24h</th>
                            <th>7d</th>
                            <th>14d</th>
                            <th>30d</th>
                            <th>60d</th>
                            <th>200d</th>
                            <th>1year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            top10.map((item,index) => (
                                <tr key={index} >
                                    <td>{index+1}</td>
                                    <td style={{ display:'flex', justifyContent:'center', alignItems:'center', }} >
                                        <div style={{ display:'flex', width:'130px', justifyContent:'flex-start', alignItems:'center', }} >
                                            <img src={item.image.small} style={{ height:'20px', marginRight:'10px' }} />{item.name}
                                        </div>
                                    </td>
                                    <td>{item.symbol.toUpperCase()}</td>
                                    <td>{item.market_data.current_price.usd}$</td>
                                    <td style={{color: item.market_data.price_change_percentage_1h_in_currency.usd > 0 ? 'green' : 'red' }} >{item.market_data.price_change_percentage_1h_in_currency.usd.toFixed(3)}%</td>
                                    <td style={{color: item.market_data.price_change_percentage_24h > 0 ? 'green' : 'red' }} >{item.market_data.price_change_percentage_24h.toFixed(3)}%</td>      
                                    <td style={{color: item.market_data.price_change_percentage_7d > 0 ? 'green' : 'red' }} >{item.market_data.price_change_percentage_7d.toFixed(3)}%</td>                               
                                    <td style={{color: item.market_data.price_change_percentage_14d > 0 ? 'green' : 'red' }} >{item.market_data.price_change_percentage_14d.toFixed(3)}%</td>  
                                    <td style={{color: item.market_data.price_change_percentage_30d > 0 ? 'green' : 'red' }} >{item.market_data.price_change_percentage_30d.toFixed(3)}%</td>  
                                    <td style={{color: item.market_data.price_change_percentage_60d > 0 ? 'green' : 'red' }} >{item.market_data.price_change_percentage_60d.toFixed(3)}%</td>  
                                    <td style={{color: item.market_data.price_change_percentage_200d > 0 ? 'green' : 'red' }} >{item.market_data.price_change_percentage_200d.toFixed(3)}%</td>  
                                    <td style={{color: item.market_data.price_change_percentage_1y > 0 ? 'green' : 'red' }} >{item.market_data.price_change_percentage_1y.toFixed(3)}%</td>  

                                </tr>
                            ))
                        }
                    </tbody>
                </Table> : null
                }
            </div>
        );
    }
}