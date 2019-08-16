import React from 'react';
import '../styles/Cookies.scss'
import Button from '@material-ui/core/Button';
import Cancel from '../static/images/delete.png'

export default class Cookies extends React.Component{

    AcceptCookies = () => {
        let accept = true;
        localStorage.setItem('accept', JSON.stringify(accept));
        this.props.checkAccept();
    }

    render(){
        return(
            <div className="cookiesWrapper"> 
                <h3>
                    Privacy Policy
                </h3>
                <p>
                    We use cookies.
                </p>
                <Button variant="contained" color="primary" style={{width:'20%', height:'50px'}} onClick={ this.AcceptCookies } >
                    Accept
                </Button>
                <img src={Cancel} className="imgCancel" onClick={ this.AcceptCookies } />
            </div>
        );
    }
}