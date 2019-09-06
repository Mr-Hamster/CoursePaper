import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../styles/Settings.scss';
import controller from '../controlers/Const'
import AddFavouriteCoins from './AddFavouriteCoins';

export default class Settings extends React.Component{
    state = {
        value: '',
    }

    componentDidMount(){

    }

    changeExchange = (event) => {
        controller.exchange = event.target.value
    }

    render(){
        const { coinGecko } = this.props;
        console.log('prooops', coinGecko)
        return(
            <div className="sWrapper">
                <AddFavouriteCoins coinGecko={coinGecko} />
                <FormControl style={{ width:'200px' }}>
                    <InputLabel htmlFor="age-native-simple">Select your exchange:</InputLabel>
                    <Select
                        native
                        onChange={ this.changeExchange }
                    >
                        <option value=''></option>
                        <option value={'Binance'}>Binance</option>
                        <option value={'General Data'}>General Data</option>
                    </Select>
                </FormControl>
            </div>
        );
    }
}