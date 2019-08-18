import React from 'react';
import * as api from '../api/index';
import '../styles/LatestStats.scss'


export default class LatestStats extends React.Component{
    state = {
        general: [],
        facebook: [],
        reddit: [],
        twitter: [],
        crypto: [],
    }

    componentDidMount(){
        const { coinId } = this.props;
        api.statsRequest(`https://min-api.cryptocompare.com/data/social/coin/latest?coinId=${coinId}`).get().then(
            resp => {
                this.setState({
                    general: resp.data.Data.General,
                    facebook: resp.data.Data.Facebook,
                    reddit: resp.data.Data.Reddit,
                    twitter: resp.data.Data.Twitter,
                    crypto: resp.data.Data.CryptoCompare,
                })
                console.log('data', resp.data.Data);
            }).catch(err => {
                console.log(err);
            });
    }

    render(){
        const { general, facebook, reddit, twitter, crypto } = this.state;
        const { imgCoin } = this.props; 
        return(
            <div className="wrapperSocial">
                <h2>
                    Latest Social Data
                </h2>
                <div className="titleSocial">
                    <img src={imgCoin} style={{ width:'200px' }}/>
                    <div>
                        <h3>
                            {general.CoinName} ({general.Name})
                        </h3>
                        <h4>
                            Points: {general.Points}
                        </h4>
                    </div>
                </div>
                <div className="wrapperSocialBlock">
                    <div className="socialBlock">
                        <h3>
                            Facebook:
                        </h3>
                        <p>Points: {facebook.Points}</p>
                        <p>Likes: {facebook.likes}</p>
                        <p>Talking about: {facebook.talking_about}</p>
                        <p>Source: <a href={facebook.link}>{facebook.link}</a></p>
                    </div>
                    <div className="socialBlock">
                        <h3>
                            Reddit:
                        </h3>
                        <p>Points: {reddit.Points}</p>
                        <p>Active Users: {reddit.active_users}</p>
                        <p>Comments per hour: {reddit.comments_per_hour}</p>
                        <p>Comments per day: {reddit.comments_per_day}</p>
                        <p>Subscribers: {reddit.subscribers}</p>
                        <p>Posts per hour: {reddit.posts_per_hour}</p>
                        <p>Posts per day: {reddit.posts_per_day}</p>
                        <p>Source: <a href={reddit.link}>{reddit.link}</a></p>
                    </div>
                    <div className="socialBlock">
                        <h3>
                            Twitter:
                        </h3>
                        <p>Points: {twitter.Points}</p>
                        <p>Followers: {twitter.followers}</p>
                        <p>Following: {twitter.following}</p>
                        <p>Source: <a href={twitter.link}>{twitter.link}</a></p>
                    </div>
                    <div className="socialBlock">
                        <h3>
                            Crypto Compare:
                        </h3>
                        <p>Points: {crypto.Points}</p>
                        <p>Followers: {crypto.Followers}</p>
                        <p>Posts: {crypto.Posts}</p>
                        <p>Comments: {crypto.Comments}</p>
                        <p>Page Views: {crypto.PageViews}</p>
                    </div>
                </div>
            </div>
        );  
    }
}