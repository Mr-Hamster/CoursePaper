import React from 'react'
import * as api from '../api/index';


export default class GlobalInfoData extends React.Component{
    state = {
        globalInfo:[]
    }

    componentDidMount(){
        api.crudBuilder(`https://api.coingecko.com/api/v3/global`).get().then(
                resp => {
                    this.setState({
                        globalInfo: resp.data.data,
                        marketCapPerc: resp.data.data.market_cap_percentage.btc,
                        marketCap: resp.data.data.total_market_cap.btc,
                        totalVolume: resp.data.data.total_volume.btc,
                        cryptoCount: resp.data.data.active_cryptocurrencies
                    })
                }).catch(err => {
                    alert(`${err}`)
                });
    }

    render(){
        const { globalInfo, marketCapPerc, marketCap, totalVolume, cryptoCount } = this.state;
        return(
            <div>
                <h2>
                    Global Info Data
                </h2>
                <p>
                    Market cap change percentage 24h usd: {globalInfo.market_cap_change_percentage_24h_usd}%
                </p>
                <p>
                    Market cap percentage (btc): { marketCapPerc }%
                </p>
                <p>
                    Total market cap (btc): { marketCap }
                </p>
                <p>
                    Total volume (btc): { totalVolume }
                </p>
                <p>
                    Active Cryptocurrencies: { cryptoCount }
                </p>
            </div>
        )
    }
}