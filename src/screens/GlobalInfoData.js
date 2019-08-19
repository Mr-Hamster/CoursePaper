import React from 'react'
import * as api from '../api/index';


export default class GlobalInfoData extends React.Component{
    state = {
        globalInfo:[]
    }

    componentDidMount(){
        api.crudBuilder(`https://api.coingecko.com/api/v3/global`).get().then(
                resp => {
                    console.log('global info', resp.data.data);
                    this.setState({
                        globalInfo: resp.data.data
                    })
                }).catch(err => {
                    alert(`${err}`)
                });
    }

    render(){
        const { globalInfo } = this.state;
        return(
            <div>
                <h2>
                    Global Info Data
                </h2>
                <p>
                    Market cap change percentage 24h usd: {globalInfo.market_cap_change_percentage_24h_usd}
                </p>
                <p>
                    Market cap percentage: {  }
                </p>
                <p>
                    Total market cap (usd): 
                </p>
                <p>
                    Total volume (usd): 
                </p>
                {/* market_cap_change_percentage_24h_usd

                market_cap_percentage

                total_market_cap (usd)

                total_volume (usd) */}
            </div>
        )
    }
}