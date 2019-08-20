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

let arrFavouriteCoins = [], data = [];


export default class AddFavouriteCoins extends React.Component{
    state = {
        open: false,
        coin: '',
        data:[]
    }

    componentDidMount(){
        data = JSON.parse(localStorage.getItem('coingeckoData'));
        console.log(data);
        this.setState({
            data: data
        })
    }

    AddCoin = () => {
        const { coin } = this.state;
        this.setState({
            open: false,
        })
        data.filter(item => {
            if (item.symbol === coin){
                arrFavouriteCoins.push(item)
            }
        });
        console.log(arrFavouriteCoins);
    }

    render(){
        console.log(this.state)
        const { data } = this.state;
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
                            data.map((item, index) => (
                                <MenuItem key={index} value={item.symbol} style={{ display: 'flex', justifyContent:'space-between',}}>
                                    <img src={item.image.small} style={{ width:'35px' }} />{item.symbol.toUpperCase()}
                                </MenuItem>
                            ))
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
                <FavouriteCoinSection arrFavouriteCoins={arrFavouriteCoins} />
            </div>
        );
    }
}