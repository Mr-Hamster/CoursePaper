import React, { Fragment } from 'react';
import Swap from '../static/images/swap.png'
import Delete from '../static/images/delete.png';
import TextField from '@material-ui/core/TextField';

import '../styles/InputCoin.scss';

export default class InputCoin extends React.Component{

    render(){
        const { variantFrom, variantTo, getVariantTo, getVariantFrom, Swaping, arr, autoPasting, removeItem } = this.props;
        return(
            <div className="inputData"> 
                <div className="textField"> 
                    <TextField
                        id="outlined-uncontrolled"
                        label="From"
                        defaultValue=""
                        margin="normal"
                        variant="outlined"
                        onChange = { 
                            getVariantFrom
                         }
                        value={variantFrom}
                        style={{ width: '300px' }}
                    />
                    <img src={Swap} className="imgSwap" onClick={ Swaping } />
                    <TextField
                        id="outlined-uncontrolled"
                        label="To"
                        defaultValue=""
                        margin="normal"
                        variant="outlined"
                        onChange = { 
                            getVariantTo
                        } 
                        value={variantTo}
                        style={{ width: '300px' }}
                    />
                </div>
                {
                    arr ? 
                    <div className="valueFromLocStore">
                        {
                            arr.map((item, index) => (
                                <div key={index} className="helpers">
                                    <img src={Delete} alt='delete' style={{ position:"absolute", width: '15px', right: '8px', top: '8px', cursor: 'pointer' }} onClick={ ()=> removeItem(index, item) } />
                                    <button onClick={ () => autoPasting(item) } style={{ height: '30px', width:'100px', cursor: 'pointer' }}>
                                        {item}
                                    </button>
                                </div>
                            ))
                        }
                    </div>   
                : null
                }   
            </div>              
        );
    }
}