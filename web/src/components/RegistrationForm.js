import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OpenEye from '@material-ui/icons/Visibility';
import ClosedEye from '@material-ui/icons/VisibilityOff';
import '../styles/RegistrationForm.scss';
import { signUp } from '../api';

const validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export default class RegistrForm extends React.Component{
    state = {
        username: '',
        email: '',
        psw: '',
        confirmPsw: '',
        pswEye: false,
        confirmPswEye: false,
        check: false,
        errUsername: true,
        errEmail: true,
        errPsw: true,
        errConfirmPsw: true,
    };

    Register = () => {
        this.setState({
            check: true
        },()=>{
            this.validation();
        })
        this.sendData();
    }

    validation = () => {
        const { username, email, psw, confirmPsw, } = this.state;

        username.length ? this.setState({
            errUsername: false
        }) : this.setState({
            errUsername: true
        })

        validEmail.test(email) ? this.setState({
            errEmail: false
        }): this.setState({
            errEmail: true
        })

        psw.length > 8 ? this.setState({
            errPsw: false
        }): this.setState({
            errPsw: true
        })

        psw.length > 8 && psw == confirmPsw ? this.setState({
            errConfirmPsw: false
        }): this.setState({
            errConfirmPsw: true
        })
    }

    sendData = () => {
        const { errUsername, errConfirmPsw, 
            errEmail, errPsw, username,
            email, psw, } = this.state;
        if(!errConfirmPsw && !errEmail && !errUsername && !errPsw){
            let newUser = {
                username,
                email: email,
                password: psw
            }
            signUp(newUser)
                .then(({ data }) => {
                    console.log(data)
                })
                .catch((err) => {
                    alert(err.response.data.error)
                })
        } else {
            console.log('error')
        }
    }

    render(){
        const { username, errUsername, email, psw, 
            confirmPsw, check, errConfirmPsw, errEmail, 
            errPsw,
            pswEye,
            confirmPswEye,
        } = this.state;
        return(
            <div className='regWrapper'>
                <div className='regForm'>
                    <h3>
                        Sign Up
                    </h3>
                    <TextField
                        id="outlined-uncontrolled"
                        label="Username"
                        margin="normal"
                        variant="outlined"
                        type="text"
                        name="lastname"
                        onChange = { (event) => {
                            this.setState({
                                username: event.target.value
                            },()=>{
                                this.validation()
                            })
                        } }
                        value={username}
                        style={{ width: '70%',  }}
                    />
                    {
                        check && errUsername ? <span style={{color:'red'}}>This field can not be empty!</span> : null
                    }
                    <TextField
                        id="outlined-uncontrolled"
                        label="Email"
                        defaultValue=""
                        margin="normal"
                        variant="outlined"
                        name="email"
                        type="text"
                        onChange = { (event) => {
                            this.setState({
                                email: event.target.value
                            },()=>{
                                this.validation()
                            })
                        } }
                        value={email}
                        style={{ width: '70%',  }}
                    />
                    {
                        check && errEmail ? <span style={{color:'red'}}>Email not valid!</span> : null
                    }
                    <div style={{ display:'flex', width: '70%', alignItems:'center', position: 'relative', }} >
                        <TextField
                            id="outlined-uncontrolled"
                            label="Password"
                            defaultValue=""
                            margin="normal"
                            variant="outlined"
                            type={!pswEye ? "password" : 'text' }
                            onChange = { (event) => {
                                this.setState({
                                    psw: event.target.value
                                })
                            } }
                            value={psw}
                            style={{ width: '100%', marginTop:'10px' }}
                        />
                        <div style={{display:'flex', position:'absolute', height:'100%', alignItems:'center', right:'10px'}}>
                            {
                                pswEye ? (
                                    <OpenEye onClick={() => this.setState({
                                        pswEye: !pswEye
                                    })}/>
                                ) : (
                                    <ClosedEye onClick={() => this.setState({
                                        pswEye: !pswEye
                                    })}/>
                                )
                            }
                        </div>
                    </div>
                    {
                        check && errPsw ? <span style={{color:'red'}}>Password must be minimal 8 chars!</span> : null
                    }
                    <div style={{ display:'flex', width: '70%', alignItems:'center', position: 'relative', }} >
                        <TextField
                            id="outlined-uncontrolled"
                            label="Confirm Password"
                            defaultValue=""
                            margin="normal"
                            variant="outlined"
                            type={!confirmPswEye ? "password" : 'text' }
                            onChange = { (event) => {
                                this.setState({
                                    confirmPsw: event.target.value
                                })
                            } }
                            value={confirmPsw}
                            style={{ width: '100%', marginTop:'10px' }}
                        />
                        <div style={{display:'flex', position:'absolute', height:'70%', alignItems:'center', right:'10px'}}>
                            {
                                confirmPswEye ? (
                                    <OpenEye onClick={() => this.setState({
                                        confirmPswEye: !confirmPswEye
                                    })}/>
                                ) : (
                                    <ClosedEye onClick={() => this.setState({
                                        confirmPswEye: !confirmPswEye
                                    })}/>
                                )
                            }
                        </div>
                    </div>
                    {
                        check && errConfirmPsw ? <span style={{color:'red'}}>Passwords must matched!</span> : null
                    }
                    <Button variant="contained" color="primary" style={{ width:'30%', height:'50px', marginTop:'40px'}} onClick={ this.Register }>
                        Sign Up
                    </Button>
                </div>
            </div>
        );
    }
}