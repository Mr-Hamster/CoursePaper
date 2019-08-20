import React from 'react';
import '../styles/FavouriteCoinSection.scss';
import Delete from '../static/images/delete.png'

export default class FavouriteCoinSection extends React.Component{
    state = {
        arrCoins: [],
        showImg: false,
    }

    componentDidMount(){
        const { arrFavouriteCoins } = this.props;

        this.setState({
            arrCoins: arrFavouriteCoins,
        })
    }   

    removeItem = (index, ticker) => {
        const { arrCoins } = this.state;
        let data = arrCoins;
        let answer = confirm(`Are you sure you want to remove "${ticker.toUpperCase()}" from favorites?`);
        if(answer){
            data.splice(index, 1);
        this.setState({
            arrCoins: data
        })  
        } 
    }

    render(){
        const { arrCoins, showImg } = this.state;
        console.log('state', this.state)
        return(
            arrCoins.length ? 
            <div className="wrapperCoinSection" onHove>
                <h2>Favourite Coins</h2>
                <div className="CoinItems">
                    {
                        arrCoins.map((item, index) => (
                            <div key={index} className="FavouriteCoinItem" onMouseEnter={()=>this.setState({
                                showImg: true
                            })} onMouseLeave={()=>this.setState({
                                showImg: false
                            })}>
                                <img src={item.image.large} className="imgCoinItem" />
                                <h3>{item.name} ({item.symbol.toUpperCase()})</h3>
                                <img src={Delete} className="imgDeleteCoin" onClick={ () => this.removeItem(index, item.symbol) } style={{ display: showImg ? 'block' : 'none' }} />
                            </div>
                        ))
                    }
                </div>
            </div> : null
        );
    }
}