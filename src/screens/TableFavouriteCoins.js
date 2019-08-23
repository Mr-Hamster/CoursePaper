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
        console.log('coins', this.state);
        const { data } = this.state;
        return(
            <div style={{ width:'90%' }} >
                {data ? 
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
                            <th>Last 7 Days</th>
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
                                    <td>{item.market_data.current_price.usd}$</td>
                                    <td style={{color: item.market_data.price_change_percentage_1h_in_currency.usd > 0 ? 'green' : 'red' }} >{item.market_data.price_change_percentage_1h_in_currency.usd}%</td>
                                    <td style={{color: item.market_data.price_change_percentage_24h > 0 ? 'green' : 'red' }} >{item.market_data.price_change_percentage_24h}%</td>      
                                    <td style={{color: item.market_data.price_change_percentage_7d > 0 ? 'green' : 'red' }} >{item.market_data.price_change_percentage_7d}%</td>                               
                                    <td>{item.market_data.total_volume.usd}$</td>
                                    <td>{item.market_data.circulating_supply}</td>
                                    <td>{item.market_data.market_cap.usd}$</td>
                                    <td>Table cell</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table> : null}
            </div>
        );
    }
}