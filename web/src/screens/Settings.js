import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../styles/Settings.scss';
import AddFavouriteCoins from './AddFavouriteCoins';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';


class Settings extends React.Component{
  
    render(){
        const { coinGecko, value, changeExchange } = this.props;
        console.log(this.props.value)
        return(
            <div className="sWrapper">
                <AddFavouriteCoins coinGecko={coinGecko} />
                <FormControl style={{ width:'200px' }}>
                    <InputLabel htmlFor="age-native-simple">Select your exchange:</InputLabel>
                    <Select
                        native
                        onChange={ (event) => changeExchange(event.target.value) }
                    >
                        <option value={value}></option>
                        <option value='binance'>Binance</option>
                        <option value='bitflinex'>Bitflinex</option>
                    </Select>
                </FormControl>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        value: state
    }
};

export default connect(mapStateToProps, actions)(Settings);