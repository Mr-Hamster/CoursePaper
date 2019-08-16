import React from 'react';
import * as api from '../api/index';

export default class LatestStats extends React.Component{
    state = {

    }

    componentDidMount(){
        const { coinId } = this.props;
        api.statsRequest(`https://min-api.cryptocompare.com/data/social/coin/latest?coinId=${coinId}`).get().then(
            resp => {
                let data = resp.data.Data;
                console.log('asdf', data);
            }).catch(err => {
                console.log(err);
            });
    }

    render(){
        return(
            <div>
                <h2>
                    Latest Social Data
                </h2>
            </div>
        );  
    }
}