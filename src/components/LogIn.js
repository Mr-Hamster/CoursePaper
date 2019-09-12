import React from 'react';
import '../styles/LogIn.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'
import OpenEye from "../static/images/eye.png"
import ClosedEye from '../static/images/eye1.png'
const ValidEmail = '123@gmail.com';
const ValidPassword = 'qwerty123';

export default class LogIn extends React.Component{
    state = {
        email:'',
        password:'',
        error: false,
        redirect: false,
        eye: false
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
    // if credentials is correct => redirect
    redirect = () => {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/inputData' />
        }
    }

    render(){
        const { error, eye, password, email } = this.state;
        return(
            <div className="wrapperLogIn">
                <div className="logInBlock">
                    <h3>Sign In</h3>
                    {/* for quick sign in */}
                    <span style={{cursor:'pointer'}} onClick={() => this.setState({ email: ValidEmail })}>Email: {ValidEmail}</span>
                    <span style={{cursor:'pointer'}} onClick={() => this.setState({ password: ValidPassword })}>Password: {ValidPassword}</span>
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
                            value={email}
                            style={{ width: '100%',  }}
                        />
                        <div style={{ display:'flex', width: '100%', alignItems:'center', position: 'relative', }} >
                            <TextField
                                id="outlined-uncontrolled"
                                label="Password"
                                defaultValue=""
                                margin="normal"
                                variant="outlined"
                                type={!eye ? "password" : 'text' }
                                onChange = { (event) => {
                                    this.setState({
                                        password: event.target.value
                                    })
                                } }
                                value={password}
                                style={{ width: '100%', marginTop:'10px' }}
                            />
                            <div style={{display:'flex', position:'absolute', height:'100%', alignItems:'center', right:'10px'}}>
                                <img src={eye ? OpenEye : ClosedEye} style={{ width:'25px', cursor: 'pointer' }} 
                                    // onMouseEnter={ () => this.setState({
                                    //     eye: true
                                    // })} onMouseLeave={ () => this.setState({
                                    //     eye: false
                                    // })} 
                                    onClick={ ()=> this.setState({
                                        eye: !eye
                                    }) }
                                />
                            </div>
                        </div>
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