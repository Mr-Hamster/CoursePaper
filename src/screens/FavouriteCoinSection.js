import React from 'react';
import '../styles/FavouriteCoinSection.scss';
import Delete from '../static/images/delete.png'

export default class FavouriteCoinSection extends React.Component{
    state = {
        FavouriteCoins: [],
    }

    componentDidMount(){
        const { coinsFromLocStore, } = this.props;

        this.setState({
            FavouriteCoins: coinsFromLocStore,
        })
    }   

    removeItem = (index, ticker) => {
        const { coinsFromLocStore, addToCoinList } = this.props;

        let answer = confirm(`Are you sure you want to remove "${ticker.toUpperCase()}" from favorites?`);
        if(answer){
            let item = coinsFromLocStore.splice(index, 1);
            addToCoinList(item);
            this.setState({
                FavouriteCoins: coinsFromLocStore,
            })
            localStorage.setItem('FavouriteCoins', JSON.stringify(coinsFromLocStore));
        } 
    }

    render(){
        const { FavouriteCoins } = this.state;
        return(
            <div className="wrapperCoinSection">
                <h2>Favourite Coins</h2>
                <div className="CoinItems">
                    {
                        FavouriteCoins ? FavouriteCoins.map((item, index) => (
                            <div key={index} className="FavouriteCoinItem">
                                <img src={item.image.large} className="imgCoinItem" />
                                <h3>{item.name} ({item.symbol.toUpperCase()})</h3>
                                <img src={Delete} className="imgDeleteCoin" onClick={ () => this.removeItem(index, item.symbol) } />
                            </div>
                        )) : null
                    }
                </div>
            </div>
        );
    }
}