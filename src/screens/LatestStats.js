import React from 'react';
import * as api from '../api/index';

export default class LatestStats extends React.Component{
    state = {

    }

    componentDidMount(){
        api.statsRequest(`https://min-api.cryptocompare.com/data/social/coin/latest`).get().then(
            resp => {
                console.log('resp', resp)
            }).catch(err => {
                console.log(err);
            });
    }

    render(){
        return(
            <div>

            </div>
        );  
    }
}