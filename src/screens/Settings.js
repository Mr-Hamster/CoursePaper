import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../styles/Settings.scss';
import controller from '../controlers/Const'

export default class Settings extends React.Component{
    state = {
        value: ''
    }

    changeExchange = (event) => {
        controller.exchange = event.target.value
    }

    render(){
        // const { exchange, changeExchange } = this.props;
        return(
            <div className="sWrapper">
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