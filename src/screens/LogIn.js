import React from 'react';
import '../styles/LogIn.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'


const ValidEmail = '123@gmail.com';
const ValidPassword = 'qwerty123';

export default class LogIn extends React.Component{
    state = {
        email:'',
        password:'',
        error: false,
        redirect: false,
    }

    SignIn = () => {
        const { email, password } = this.state;
        if(email === ValidEmail && password === ValidPassword){
            this.setState({
                error: false,
                redirect: true,
            })
        } else {
            this.setState({
                error: true
            })
        }
    }

    redirect = () => {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/inputData' />
        }
    }

    render(){
        console.log(this.state);
        const { error } = this.state;
        return(
            <div className="wrapperLogIn">
                <div className="logInBlock">
                    <h3>Sign In</h3>
                    <span>Email: {ValidEmail}</span>
                    <span>Password: {ValidPassword}</span>
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
                    {
                        this.redirect()
                    }
                    <Button variant="contained" color="primary" style={{ width:'30%', height:'50px'}} onClick={ this.SignIn }>
                        Sign In
                    </Button>
                </div>
            </div>
        );
    }
}