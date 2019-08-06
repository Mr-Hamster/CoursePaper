import React from "react"
import '../styles/HistoricalValues.scss'
import * as api from '../api/index';

export default class HistoricalValues extends React.Component{
    state = {
        value: 0,
        value_classificaton: '',
    }

    componentDidMount(){
        api.crudBuilder('https://api.alternative.me/fng/').get().then(
            resp => {
                console.log('valueeeee: ', resp.data);
                this.setState({
                    value: resp.data.data[0].value,
                    value_classificaton: resp.data.data[0].value_classification,
                })
                
            }).catch(err => console.log('Error:', err));
    }

    render(){
        const {value, value_classificaton} = this.state
        return(
            <div className="wrapper">
                {value_classificaton}
                <div className="scale">
                    <div className="target" style={{ bottom: `${value*2}px` }}/>
                    <div style={{ position:'absolute', bottom: `${value*2}px`, left:'60px', transition: 'transform .2s ease-in-out', }}>
                        {value}
                    </div>
                </div>
            </div>
        );
    }
}