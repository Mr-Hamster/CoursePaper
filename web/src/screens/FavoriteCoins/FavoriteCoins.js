import React, { Component } from 'react';
import AddFavouriteCoins from '../AddFavouriteCoins';
import FavouriteCoinSection from '../FavouriteCoinSection';
import TableFavouriteCoins from '../TableFavouriteCoins';
import './FavoriteCoins.scss';

export default class FavoriteCoins extends Component {
  render () {
    const { coinGecko } = this.props;
    return (
      <div>
        <AddFavouriteCoins coinGecko={coinGecko} />
        <TableFavouriteCoins favouriteCoins />
      </div>
    )
  }
};
