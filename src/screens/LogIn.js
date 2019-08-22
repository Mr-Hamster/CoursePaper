import React from 'react';
import '../styles/LogIn.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'


const ValidEmail = '123@gmail.com';
const ValidPassword = 'qwerty123';

export default class LogIn extends React.Component{
    state = {
        email:'123@gmail.com',
        password:'qwerty123',
        error: false,
    }

    SignIn = () => {
        // const { email, password } = this.state;
        // if(email === ValidEmail && password === ValidPassword){
        //     this.setState({
        //         error: false
        //     })
        //     alert('Ok');
        // } else {
        //     this.setState({
        //         error: true
        //     })
        // }
    }

    render(){
        console.log(this.state);
        const { error } = this.state;
        return(
            <div className="wrapperLogIn">
                <div className="logInBlock">
                    <h3>Sign In</h3>
                    <div>
                    <TextField
                        id="outlined-uncontrolled"
                        label="Email"
                        defaultValue=""
                        margin="normal"
                        variant="outlined"
                        type="email"
                        onChange = { (event) => {
                            this.setState({
                                email: event.target.value
                            })
                        } }
                        style={{ width: '80%' }}
                    />
                    <TextField
                        id="outlined-uncontrolled"
                        label="Password"
                        defaultValue=""
                        margin="normal"
                        variant="outlined"
                        type="password"
                        onChange = { (event) => {
                            this.setState({
                                password: event.target.value
                            })
                        } }
                        style={{ width: '80%' }}
                    />
                    </div>
                    {
                        error ? <div style={{ color:'red' }}>Email or password is not correct!</div> : null
                    }
                    <Link style={{width:'30%'}}to={"/inputData"}>
                        <Button variant="contained" color="primary" style={{ height:'50px'}} onClick={ this.SignIn }>
                                Sign In
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}