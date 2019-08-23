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


export default class AddFavouriteCoins extends React.Component{
    state = {
        open: false,
        coin: '',
        data:[],
        showFavouriteCoins: false,
        choosenCoins: [],
    }

    componentDidMount(){
        let coinsFromLocStore = JSON.parse(localStorage.getItem('FavouriteCoins'));
        console.log('qweqwe',coinsFromLocStore)
        if(coinsFromLocStore){
            this.setState({
                showFavouriteCoins: true,
                choosenCoins: coinsFromLocStore,
            })
        }    
    }

    componentDidUpdate(prevProps){
        const { coinGecko } = this.props;
        const { choosenCoins } = this.state;
        if (coinGecko !== prevProps.coinGecko) {
            // for(let key of choosenCoins){
            //     for (let item of coinGecko){
            //         if(key.symbol === item.symbol){
            //             // console.log('item!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',item.symbol);
            //             coinGecko.splice()
            //         }
            //     }
            // }
            this.updateCoinList();
        }
    }

    AddCoin = () => {
        const { coin, data, choosenCoins } = this.state;
        
        this.setState({
            open: false,
            showFavouriteCoins: true,
        })
        let arrCoins= [];
        arrCoins = choosenCoins;
        data.filter((item) => {
            if (item.symbol === coin){
                arrCoins.push(item);
                this.setState({
                    choosenCoins: arrCoins,
                })
                localStorage.setItem('FavouriteCoins', JSON.stringify(arrCoins));
            }
        });
        this.updateCoinList();

    }

    updateCoinList = () => {
        const { coinGecko } = this.props;
        const { choosenCoins } = this.state;

        choosenCoins.map(item => {
            coinGecko.forEach((key, index) => {
                if(item.symbol === key.symbol){
                    coinGecko.splice(index,1);
                }
            }
            );
        });
        this.setState({
            data: coinGecko
        })
    } 


    closeFavouriteCoins = () => {
        this.setState({ 
            showFavouriteCoins: false 
        })
    }

    addToCoinList = (item) => {
        console.log('123', item)
        const { coinGecko } = this.props;
        let arr = coinGecko;
        arr.push(item[0]);
        let qwe = arr.sort((a,b) => {
            return a.market_data.market_cap_rank - b.market_data.market_cap_rank;
        });
        console.log('sorting', qwe)
        this.setState({
            data: qwe
        })
    }

    render(){
        const { data, showFavouriteCoins, choosenCoins } = this.state;
        console.log('coin state', this.state);
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
                <Button onClick={ () => this.AddCoin() } color="primary">
                    Ok
                </Button>
                </DialogActions>
            </Dialog>
                {
                    showFavouriteCoins ? <FavouriteCoinSection coinsFromLocStore={choosenCoins} closeFavouriteCoins={this.closeFavouriteCoins} addToCoinList={this.addToCoinList} /> : null
                }
            </div>
        );
    }
}