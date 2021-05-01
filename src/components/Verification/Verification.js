import React from 'react';
import '../../styles/LogIn.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, } from 'react-router-dom'

export default class Verification extends React.Component{
    state = {
      code: '',
    };

    render() {
        const { code } = this.state;
        return(
            <div className="wrapperLogIn">
                <div className="logInBlock">
                    <h3>Thanks For Signing Up!</h3>
                    <p>
                      Please verify your account by entering the code that <br /> has been sent to khomiaknazarii@gmail.com
                    </p>
                    <TextField
                      id="outlined-uncontrolled"
                      label="Code"
                      defaultValue=""
                      margin="normal"
                      variant="outlined"
                      type="number"
                      onChange = { (event) => {
                          this.setState({
                            code: event.target.value
                          })
                      } }
                      value={code}
                      style={{ width: '60%',  }}
                    />
                    <Button variant="contained" color="primary" style={{ width:'30%', height:'50px', marginTop: "30px"}} onClick={ this.SignIn }>
                      Submit
                    </Button>
                    <div className='resendButton'>Resend Code</div>
                </div>
            </div>
        );
    }
}