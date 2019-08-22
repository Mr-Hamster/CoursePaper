import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FavouriteCoinSection from './FavouriteCoinSection';

let data = [];
let coinsFromLocStore = [];

export default class AddFavouriteCoins extends React.Component{
    state = {
        open: false,
        coin: '',
        data:[],
        showFavouriteCoins: false,
    }

    componentDidUpdate(prevProps){
        const { coinGecko } = this.props;

        if (this.props.coinGecko !== prevProps.coinGecko) {
            console.log('coinGecko', coinGecko);
            coinsFromLocStore = JSON.parse(localStorage.getItem('FavouriteCoins'));
            console.log('coin from loc store', coinsFromLocStore);  
            if(!!coinsFromLocStore){
                this.setState({
                    showFavouriteCoins: true
                })
            }
            this.setState({
                data: coinGecko
            })
        }
    }

    AddCoin = () => {
        const { coin } = this.state;
        this.setState({
            open: false,
            showFavouriteCoins: true
        })
        if(coinsFromLocStore){
            data.filter(item => {
                if (item.symbol === coin){
                    coinsFromLocStore.push(item);
                    localStorage.setItem('FavouriteCoins', JSON.stringify(coinsFromLocStore));
                }
            });
        } else {
            let newCoins = [];
            data.filter(item => {
                if (item.symbol === coin){
                    newCoins.push(item);
                    localStorage.setItem('FavouriteCoins', JSON.stringify(newCoins));
                }
            });
        }
    }

    closeFavouriteCoins = () => {
        this.setState({ 
            showFavouriteCoins: false 
        })
    }

    render(){
        const { data, showFavouriteCoins } = this.state;
        return(
            <div style={{ width:'100%', }} >
            <Button variant="contained" color="primary" style={{width:'30%', height:'50px', margin:'20px' }} onClick={ () => this.setState({ open: true }) }>
                Add Favourite Coins
            </Button> 
            <Dialog disableBackdropClick disableEscapeKeyDown open={this.state.open} onClose={()=>{
                    this.setState({
                        open: false
                    })
                }}>
                <DialogTitle>Choose your favourite coin</DialogTitle>
                <DialogContent>
                <form style={{ display: 'flex', flexWrap: 'wrap', justifyContent:'center'}} >
                    <FormControl style={{ display: 'flex', width: '150px', justifyContent:'space-between', }} >
                    <InputLabel htmlFor="age-simple">Coin</InputLabel>
                    <Select
                        value={this.state.coin}
                        onChange={ (event)=> this.setState({ coin: event.target.value })}
                        input={<Input id="age-simple" />}
                    >
                        {
                            data ? data.map((item, index) => (
                                <MenuItem key={index} value={item.symbol} style={{ display: 'flex', justifyContent:'space-between',}}>
                                    <img src={item.image.small} style={{ width:'35px' }} />{item.symbol.toUpperCase()}
                                </MenuItem>
                            )) : null
                        }
                    </Select>
                    </FormControl>
                </form>
                </DialogContent>
                <DialogActions>
                <Button onClick={ ()=>{
                    this.setState({
                        open: false
                    })
                } } color="primary">
                    Cancel
                </Button>
                <Button onClick={ this.AddCoin } color="primary">
                    Ok
                </Button>
                </DialogActions>
            </Dialog>
                {
                    showFavouriteCoins ? <FavouriteCoinSection coinsFromLocStore={coinsFromLocStore} closeFavouriteCoins={this.closeFavouriteCoins} /> : null
                }
            </div>
        );
    }
}