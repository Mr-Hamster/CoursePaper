import React from 'react';
import { withRouter } from 'react-router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OpenEye from '@material-ui/icons/Visibility';
import ClosedEye from '@material-ui/icons/VisibilityOff';
import '../styles/RegistrationForm.scss';
import { signUp } from '../api';
import Loader from './loader';

class RegistrForm extends React.Component{
    state = {
        username: '',
        email: '',
        psw: '',
        confirmPsw: '',
        pswEye: false,
        confirmPswEye: false,
        isLoad: false,
    };

    Register = () => {
        this.sendData();
    };

    sendData = () => {
        const { username, psw, email } = this.state;
        this.setState({
            isLoad: true,
        });
        signUp({
            username,
            email,
            password: psw,
        })
            .then(({ data }) => {
                const { history } = this.props;
                history.push(`/verification/${data._id}`)
                this.setState({
                    isLoad: false,
                });
            })
            .catch((err) => {
                this.setState({
                    isLoad: false,
                })
                alert(err.response.data.message)
            })
    };

    validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    render() {
        const {
            username,
            email,
            psw, 
            confirmPsw,
            pswEye,
            confirmPswEye,
            isLoad,
        } = this.state;
        if (isLoad) {
            return (
                <div className='regWrapper'>
                    <Loader />
                </div>
            )
        } else return(
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
                            })
                        }}
                        value={username}
                        style={{ width: '70%',  }}
                    />
                    {
                        username && username.length < 3 ? <span style={{color:'red'}}>Minimum 3 characters!</span> : null
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
                            })
                        } }
                        value={email}
                        style={{ width: '70%',  }}
                    />
                    {
                        email && !this.validateEmail(email) ? <span style={{color:'red'}}>Email not valid!</span> : null
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
                        psw && psw.length < 8 ? <span style={{color:'red'}}>Password must be minimal 8 chars!</span> : null
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
                        confirmPsw && psw !== confirmPsw ? <span style={{color:'red'}}>Passwords must matched!</span> : null
                    }
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!(psw === confirmPsw && email && email.trim() && username && username.trim() && psw.length >= 8)}
                        style={{ width:'30%', height:'50px', marginTop:'40px'}}
                        onClick={psw === confirmPsw && email && email.trim() && username && username.trim() && psw.length >= 8
                            ? this.Register : () => {}
                        }
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
        );
    }
}

export default withRouter(RegistrForm);
